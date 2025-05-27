from __future__ import annotations

from pydantic import BaseModel, Field
from typing import Optional, List


class MovieBrief(BaseModel):
    id:     int
    title:  str
    poster: Optional[str] = None
    year:   Optional[str] = None
    rating: Optional[float] = None


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


class RecommendRequest(BaseModel):
    liked_movies: List[str] = Field("likedMovies", alias="title")
    top_k: Optional[int] = 10

    class Config:
        allow_population_by_field_name = True
        allow_population_by_alias = True

