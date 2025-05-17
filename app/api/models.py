from pydantic import BaseModel


class MovieCompact(BaseModel):
    movieId: int
    movie: str


class RecResp(BaseModel):
    title: str
    movie_id: int
    poster: str | None = None


class MovieDetail(BaseModel):
    movie_id: int
    title: str
    overview: str
    genres: list[str]
    cast: list[str]
    director: str
    production_companies: list[str]
