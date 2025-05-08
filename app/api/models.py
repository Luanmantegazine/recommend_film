from pydantic import BaseModel


class MovieCompact(BaseModel):
    movieId: int
    movie: str


class RecResp(BaseModel):
    title: str
    poster: str


class MovieDetail(BaseModel):
    movie_id: int
    title: str
    overview: str
    genres: list[str]
    cast: list[str]
    director: str
    production_companies: list[str]
