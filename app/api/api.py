from __future__ import annotations

import uvicorn
from typing import Any, List, Optional
from models import MovieBrief, MovieDetail, Cast, RecResp, Provider, WatchProviderRegionDetails, PaginatedMovieResponse
from fastapi import FastAPI, HTTPException, Query
from app.api.processing.preprocess import TMDBRecommender

from fastapi.middleware.cors import CORSMiddleware
from processing.client import (discover_movies, movie_details, IMG_W185, IMG_W500, fetch_person_photo,
                               search_movie, gett)

rec_engine = TMDBRecommender(pages=20, year_from=2000)
app = FastAPI(
    title="Movie Recommender API",
    openapi_prefix="/api"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/movies", response_model=PaginatedMovieResponse)
def get_movies(
        page: int = Query(1, ge=1, description="Página de resultados"),
        sort_by: str = Query("popularity.desc", description="Ordenação TMDB"),
        vote_count_gte: int = Query(100, ge=0, description="Min. de votos"),
):
    params = {
        "sort_by": sort_by,
        "vote_count.gte": vote_count_gte,
        "page": page,
    }

    tmdb_data = discover_movies(**params)

    processed_results = [
        MovieBrief(
            id=m["id"],
            title=m["title"],
            poster=IMG_W500 + m["poster_path"] if m.get("poster_path") else None,
            year=(m.get("release_date") or "")[:4] or None,
            rating=m.get("vote_average")
        )
        for m in tmdb_data.get("results", [])
    ]

    return PaginatedMovieResponse(
        page=tmdb_data.get("page"),
        results=processed_results,
        total_pages=tmdb_data.get("total_pages"),
        total_results=tmdb_data.get("total_results")
    )


@app.get("/details/{movie_id}", response_model=MovieDetail)
def details(movie_id: int):
    try:
        data = movie_details(movie_id, lang="pt-BR")
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"Erro TMDB: {e}")

    cast_list: List[Cast] = []
    for member in data.get("credits", {}).get("cast", [])[:10]:
        pid = member.get("id")
        name = member.get("name", "")
        profile = member.get("profile_path")

        if profile:
            photo_url = IMG_W185 + profile
        else:
            photo_url = fetch_person_photo(pid) if pid else None

        cast_list.append(Cast(id=pid, name=name, photo=photo_url))

    crew = data.get("credits", {}).get("crew", [])
    director = next((c["name"] for c in crew if c.get("job") == 'Director'), None)

    vote_average = data.get("vote_average")
    vote_count = data.get("vote_count")

    trailer_key = None

    if data.get("videos") and data["videos"].get("results"):
        videos = data["videos"]["results"]
        official_trailers = [
            v for v in videos
            if v.get("site") == "YouTube" and v.get("type") == "Trailer" and v.get("official") is True
        ]
        if official_trailers:
            trailer_key = official_trailers[0].get("key")
        else:
            any_trailers = [
                v for v in videos if v.get("site") == "YouTube" and v.get("type") == "Trailer"
            ]
            if any_trailers:
                trailer_key = any_trailers[0].get("key")

    watch_providers_data = None
    if data.get("watch/providers") and data["watch/providers"].get("results"):
        results_by_country = data["watch/providers"]["results"]
        if "BR" in results_by_country:
            br_providers = results_by_country["BR"]
            watch_providers_data = WatchProviderRegionDetails(
                link=br_providers.get("link"),
                flatrate=[Provider(**p) for p in br_providers.get("flatrate", [])],
                rent=[Provider(**p) for p in br_providers.get("rent", [])],
                buy=[Provider(**p) for p in br_providers.get("buy", [])]
            )

    return MovieDetail(
        movie_id=movie_id,
        title=data.get("title", ""),
        overview=data.get("overview"),
        genres=[g["name"] for g in data.get("genres", [])],
        director=director,
        cast=cast_list,
        poster=IMG_W500 + data["poster_path"] if data.get("poster_path") else None,
        vote_average=round(vote_average, 1 ) if vote_average is not None else None,
        vote_count=vote_count,
        trailer_key=trailer_key,
        watch_providers_data=watch_providers_data,

    )


@app.get("/search", response_model=List[MovieBrief])
def search(q: str):
    results = search_movie(q)[:10]
    return [
        MovieBrief(
            id=m["id"],
            title=m["title"],
            poster=IMG_W500 + m["poster_path"] if m.get("poster_path") else None,
        )
        for m in results
    ]


@app.get("/recommend/{title}", response_model=List[RecResp])
async def get_content_recommendations(title: str, top_k: int = Query(45, ge=1, le=50)):
    recommendations = rec_engine.recommend(title=title, top_k=top_k)

    return recommendations


if __name__ == '__main__':
    uvicorn.run(app=app, port=8000)
