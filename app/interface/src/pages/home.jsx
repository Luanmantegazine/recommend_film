import React, { useState } from "react";
import Select from "react-select";
import { useMovies } from "../hooks/useMovies";
import { useRecommend } from "../hooks/useRecommend";
import PosterGrid from "../components/PosterGrid";

const Home = () => {
  const [selected, setSelected] = useState(null);
  const { data: options } = useMovies(0, 500, true); // retrieve first 500 titles for dropdown
  const { data: recs, isFetching } = useRecommend({ title: selected?.movie });

  const selectOptions = options?.map((o) => ({ value: o.movie, label: o.movie }));

  return (
    <div className="max-w-screen-xl mx-auto p-4 space-y-6">
      <Select
        options={selectOptions}
        onChange={(o) => setSelected({ movie: o.value })}
        placeholder="Choose a movie..."
        isClearable
        className="mb-4"
      />

      {isFetching && <p className="text-center">Loading recommendations…</p>}
      {recs && <PosterGrid items={recs} onClick={(m)=>window.location.href=`/movie/${m.title}`}/>}
    </div>
  );
};

export default Home;