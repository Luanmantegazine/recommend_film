from sqlalchemy import Column, ForeignKey, Integer, String, UniqueConstraint

from app.api.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True, nullable=False)
    email = Column(String, unique=True, index=True, nullable=True)
    google_id = Column(String, unique=True, index=True, nullable=True)
    hashed_password = Column(String, nullable=True)


class FavoriteMovie(Base):
    __tablename__ = "favorite_movies"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    movie_id = Column(Integer, nullable=False)
    title = Column(String, nullable=False)

    __table_args__ = (
        UniqueConstraint("user_id", "movie_id", name="uq_favorite_movie_user_movie"),
    )