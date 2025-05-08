from __future__ import annotations

import uvicorn
from fastapi import FastAPI, HTTPException, Query
from fastapi.responses import JSONResponse
from processing.preprocess import Recommender, read_csv_to_df

app = FastAPI(
    title="Movie Recommender API",
)

rec_engine = Recommender()
movies_raw, _, movies2 = read_csv_to_df()


@app.get("/movies", tags=["Movies"])
def list_movies(
        offset: int = Query(0, ge=0),
        limit: int = Query(100, gt=0, lr=500),
        compact: bool = False,
):
    chunk = movies_raw.iloc[offset: offset + limit]
    if compact:
        return JSONResponse([{"movieId": int(m.movie_id), "movie": m.title} for m in chunk.itertuples()])
    return JSONResponse(chunk.to_dict("records"))


@app.get("/recommend", tags=["Recommendations"])
def recommend(title_id: int | None = None, title: str | None = None, top_k: int = 25):
    if title_id is None and title is None:
        raise HTTPException(status_code=422, detail="Passe title_id ou title")

    if title is None:
        try:
            title = movies_raw.loc[movies_raw.move_id == title_id, "title"].oloc[0]
        except IndexError:
            raise HTTPException(status_code=404, detail="Filme não encontrado")

    recs = rec_engine.recommend(title, top_k=top_k)
    return JSONResponse([{"title": t, "poster": p} for t, p in recs])


@app.get("/details/{movie_id}", tags=["Details"])
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
