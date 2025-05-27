from __future__ import annotations

import uvicorn
from typing import Any, List
from models import MovieBrief, MovieDetail, Cast, RecommendRequest
from fastapi import FastAPI, HTTPException, Query
from app.api.processing.preprocess import TMDBRecommender

from fastapi.middleware.cors import CORSMiddleware
from processing.client import ( discover_movies, movie_details, IMG_W185, IMG_W500, fetch_person_photo,
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


@app.get("/movies", response_model=List[MovieBrief])
def get_movies(
        page: int = Query(1, ge=1, description="Página de resultados"),
        sort_by: str = Query("popularity.desc", description="Ordenação TMDB"),
        vote_count_gte: int = Query(100, ge=0, description="Min. de votos"),
):
    params = {
        "sort_by": sort_by,
        "vote_count.get": vote_count_gte,
        "page": page,
    }

    results = discover_movies(**params)
    return [
        MovieBrief(
            id=m["id"],
            title=m["title"],
            poster=IMG_W500 + m["poster_path"] if m.get("poster_path") else None,
            year=(m.get("release_date") or "")[:4] or None,
            rating=m.get("vote_average")

        )
        for m in results
    ]


@app.post("/recommend", response_model=List[MovieBrief])
def recommend(req: RecommendRequest):
    rec_map: dict[str, dict] = {}
    for liked in req.liked_movies:
        try:
            sims = rec_engine.recommend(liked)
        except Exception:
            continue
        for rec_title, rec_poster in sims:
            if rec_title not in rec_map:
                rec_map[rec_title] = {"title": rec_title, "poster": rec_poster}

    detailed: List[dict] = []
    for rec in rec_map.values():
        results = search_movie(rec["title"])
        if not results:
            continue
        mid = results[0]["id"]
        try:
            data = gett(f"/movie/{mid}")
            rating = data.get("vote_average", 0)
            year = (data.get("release_date") or "")[:4] or None
        except Exception:
            rating, year = 0, None
        detailed.append({
            "id":     mid,
            "title":  rec["title"],
            "poster": rec["poster"],
            "year":   year,
            "rating": rating,
        })

    sorted_recs = sorted(
        detailed,
        key=lambda x: x.get("rating", 0),
        reverse=True
    )[: req.top_k]

    # 4) Mapeia para MovieBrief e retorna
    return [MovieBrief(**r) for r in sorted_recs]

@app.get("/details/{movie_id}", response_model=MovieDetail)
def details(movie_id: int):
    try:
        data = movie_details(movie_id, lang="en-US")
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

    return MovieDetail(
        movie_id=movie_id,
        title=data.get("title", ""),
        overview=data.get("overview"),
        genres=[g["name"] for g in data.get("genres", [])],
        director=director,
        cast=cast_list,
        poster=IMG_W500 + data["poster_path"] if data.get("poster_path") else None,
    )


if __name__ == '__main__':
    uvicorn.run(app=app, port=8000)
