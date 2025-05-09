from __future__ import annotations

import uvicorn
from models import MovieCompact, MovieDetail, RecResp
from fastapi import FastAPI, HTTPException, Query
from fastapi.responses import JSONResponse
from app.processing.preprocess import Recommender, read_csv_to_df
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Movie Recommender API",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

rec_engine = Recommender()
movies_raw, _, movies2 = read_csv_to_df()


@app.get("/movies", response_model=list[MovieCompact], tags=["Movie API"])
def list_movies(
        offset: int = Query(0, ge=0),
        limit: int = Query(100, gt=0, le=500),
        compact: bool = True,
):
    chunk = movies_raw.iloc[offset: offset + limit]
    if compact:
        return JSONResponse([{"movieId": int(m.movie_id), "movie": m.title} for m in chunk.itertuples()])
    return JSONResponse(content=chunk.to_dict("records"))


@app.get("/recommend", response_model=list[RecResp], tags=["Movie API"])
def recommend(
        title_id: int | None = None,
        title: str | None = None,
        top_k: int = Query(25, ge=1, le=50)
):
    if (title_id is None) == (title is None):
        raise HTTPException(status_code=422, detail="Passe title_id ou title")

    if title is None:
        try:
            title = movies_raw.loc[movies_raw.movie_id == title_id, "title"].iloc[0]
        except IndexError:
            raise HTTPException(status_code=404, detail="Filme não encontrado")

    recs = rec_engine.recommend(title, top_k=top_k)
    return [RecResp(title=t, poster=p) for t, p in recs]


@app.get("/details/{movie_id}", response_model=MovieDetail, tags=["Movie API"])
def details(movie_id: int):
    try:
        base = movies_raw.loc[movies_raw.movie_id == movie_id].iloc[0]
    except IndexError:
        raise HTTPException(status_code=404, detail="Filme não encontrado")

    return JSONResponse(
        {
            "movie_id": int(movie_id),
            "title": base.title,
            "overview": base.overview,
            "genres": base.genres,
            "keywords": base.keywords,
            "cast": base.top_cast,
            "director": base.director,
            "production_companies": base.prod_comp,

        }
    )


if __name__ == '__main__':
    uvicorn.run(app=app, port=8000)
