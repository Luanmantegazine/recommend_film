from __future__ import annotations

from pydantic import BaseModel


class MovieCompact(BaseModel):
    movieId: int
    movie: str


class RecResp(BaseModel):
    title: str
    movie_id: int
    poster: str

class Cast(BaseModel):
    id: int
    name: str
    photo: str | None = None


class MovieDetail(BaseModel):
    movie_id: int
    title: str
    overview: str
    genres: list[str]
    director: str
    cast: list[Cast] = []
