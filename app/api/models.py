from pydantic import BaseModel


class MovieCompact(BaseModel):
    movieId: int
    movie: str


class RecResp(BaseModel):
    title: str
    movie_id: int
    poster: str | None = None

class Cast(BaseModel):
    name: str
    photo: str | None = None


class MovieDetail(BaseModel):
    movie_id: int
    title: str
    overview: str | None
    genres: list[str] | str
    director: str | None
    cast: list[Cast] = []
