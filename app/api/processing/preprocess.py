import os
import json
import string
from functools import lru_cache
from pathlib import Path
from typing import List, Tuple

import numpy as np
import pandas as pd
import requests
import nltk
from nltk.corpus import stopwords
from nltk.stem.snowball import SnowballStemmer
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity

TMDB_API_KEY = os.getenv("TMDB_API_KEY", "6177b4297dff132d300422e0343471fb")
if not TMDB_API_KEY:
    raise RuntimeError("Defina a variável de ambiente TMDB_API_KEY")

nltk.download('stopwords')
POSTER_URL = "https://image.tmdb.org/t/p/w780/"
PERSON_URL = "https://image.tmdb.org/t/p/w220_and_h330_face/"
HTTP_TIMEOUT = (3.5, 10)  # connect, read

STEMMER = SnowballStemmer("english")
STOP_WORDS = set(stopwords.words("english"))

ROOT_DIR = Path(__file__).resolve().parent.parent
DATA_DIR = ROOT_DIR / "Files"
MOVIES_CSV = DATA_DIR / "tmdb_5000_movies.csv"
CREDITS_CSV = DATA_DIR / "tmdb_5000_credits.csv"


def _safe_request(url: str) -> dict:
    try:
        resp = requests.get(url, timeout=HTTP_TIMEOUT)
        resp.raise_for_status()
        return resp.json()
    except requests.RequestException:
        return {}


def _normalize_tokens(tokens: List[str]) -> List[str]:
    punc_table = str.maketrans("", "", string.punctuation)
    clean = []
    for t in tokens:
        t = t.lower().translate(punc_table)
        root = STEMMER.stem(t)
        if len(root) > 2 and root not in STOP_WORDS:
            clean.append(root)
    return clean


def read_csv_to_df() -> Tuple[pd.DataFrame, pd.DataFrame, pd.DataFrame]:
    movies = pd.read_csv(
        MOVIES_CSV,
        converters={
            "genres": json.loads,
            "keywords": json.loads,
            "production_companies": json.loads,
        },
    )
    credits = pd.read_csv(
        CREDITS_CSV,
        converters={"cast": json.loads, "crew": json.loads},
    )

    movies = movies.merge(credits, on="title", how="inner")
    movies = movies.dropna(subset=["overview"])

    movies["genres"] = movies["genres"].apply(lambda l: [g["name"] for g in l])
    movies["keywords"] = movies["keywords"].apply(lambda l: [k["name"] for k in l])
    movies["top_cast"] = movies["cast"].apply(lambda l: [c["name"] for c in l[:10]])
    movies["director"] = movies["crew"].apply(
        lambda l: next((c["name"] for c in l if c.get("job") == "Director"), "")
    )
    movies["prod_comp"] = movies["production_companies"].apply(
        lambda l: [c["name"] for c in l]
    )

    movies["tokens"] = (
            movies["overview"].str.split()
            + movies["genres"]
            + movies["keywords"]
            + movies["top_cast"]
            + movies["prod_comp"]
    ).apply(_normalize_tokens)

    new_df = movies[
        ["movie_id", "title", "tokens", "genres", "keywords", "top_cast", "prod_comp"]
    ].copy()
    new_df["genres"] = new_df["genres"].str.join(" ").str.lower()
    new_df["keywords"] = new_df["keywords"].apply(lambda l: " ".join(l))
    new_df["tcast"] = new_df["top_cast"].apply(lambda l: " ".join(l).lower())
    new_df["tproduction_comp"] = new_df["prod_comp"].apply(lambda l: " ".join(l).lower())
    new_df["tags"] = new_df["tokens"].apply(lambda l: " ".join(l))

    movies2 = movies[
        [
            "movie_id",
            "title",
            "budget",
            "overview",
            "popularity",
            "release_date",
            "revenue",
            "runtime",
            "spoken_languages",
            "status",
            "vote_average",
            "vote_count",
        ]
    ].copy()

    return movies, new_df, movies2


class Recommender:
    movies_raw: pd.DataFrame
    movies_vec: pd.DataFrame
    similarity: np.ndarray
    cv: CountVectorizer

    def __init__(self) -> None:
        self.movies_raw, self.movies_vec, _ = read_csv_to_df()
        self._build_vectors()

    def _build_vectors(self) -> None:
        self.cv = CountVectorizer(
            max_features=5_000,
            stop_words=None,
            tokenizer=lambda x: x,
            preprocessor=lambda x: x,
            token_pattern=None,
            lowercase=False,

        )

        mat = self.cv.fit_transform(self.movies_raw["tokens"])
        self.similarity = cosine_similarity(mat)

    @lru_cache(maxsize=32)
    def recommend(self, title: str, top_k: int = 25) -> List[Tuple[str, str]]:
        if title not in self.movies_raw["title"].values:
            return []

        idx = self.movies_raw.index[self.movies_raw["title"] == title][0]
        sims = list(enumerate(self.similarity[idx]))
        sims_sorted = sorted(sims, key=lambda x: x[1], reverse=True)[1: top_k + 1]

        recs = []
        for i, _ in sims_sorted:
            rec_title = self.movies_raw.iloc[i]["title"]
            poster = self._fetch_poster(self.movies_raw.iloc[i]["movie_id"])
            recs.append((rec_title, poster))
        return recs

    @staticmethod
    @lru_cache(maxsize=4_096)
    def _fetch_poster(movie_id: int) -> str:
        url = (
            f"https://api.themoviedb.org/3/movie/{movie_id}"
            f"?api_key={TMDB_API_KEY}"
        )
        data = _safe_request(url)
        path = data.get("poster_path")
        return POSTER_URL + path if path else ""

    @staticmethod
    @lru_cache(maxsize=4_096)
    def fetch_person(person_id: int) -> Tuple[str, str]:
        url = (
            f"https://api.themoviedb.org/3/person/{person_id}"
            f"?api_key={TMDB_API_KEY}"
        )
        data = _safe_request(url)
        photo = PERSON_URL + data.get("profile_path", "") if data.get("profile_path") else ""
        bio = data.get("biography", "")
        return photo, bio


if __name__ == "__main__":
    rec = Recommender()
