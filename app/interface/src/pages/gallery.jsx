import React, { useState } from "react";
import { useMovies } from "@/hooks/useMovies";
import PosterGrid from "../components/PosterGrid";
import Pagination from "../components/Pagination";
import { useNavigate } from "react-router-dom";

const LIMIT = 50;

const Gallery = () => {
  const [page, setPage] = useState(0);
  const offset = page * LIMIT;
  const { data: movies, isFetching } = useMovies(offset, LIMIT, false);
  const navigate = useNavigate();

  return (
    <div className="max-w-screen-xl mx-auto p-4">
      {isFetching && <p>Loading…</p>}
      {movies && (
        <PosterGrid
          items={movies.map((m) => ({ ...m, poster: m.poster }))}
          onClick={(m) => navigate(`/movie/${m.title}`)}
        />
      )}
      <Pagination
        pageCount={Math.ceil(1000 / LIMIT)} /* rough total pages */
        onPageChange={(e) => setPage(e.selected)}
      />
    </div>
  );
};

export default Gallery;