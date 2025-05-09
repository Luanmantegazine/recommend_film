import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import client from "../api";
import CastToggle from "../components/CastToggle";

const Details = () => {
  const { id } = useParams();
  const { data, isLoading } = useQuery(["details", id], async () => {
    const { data } = await client.get(`/details/${id}`);
    return data;
  });

  if (isLoading) return <p className="text-center py-8">Loading…</p>;
  if (!data) return <p className="text-center py-8">Not found.</p>;

  return (
    <div className="max-w-screen-lg mx-auto p-4 space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={data.poster || "/img/placeholder.jpg"}
          alt={data.title}
          className="w-full md:w-64 rounded-2xl shadow-lg"
        />
        <div className="flex-1 space-y-2">
          <h1 className="text-3xl font-bold">{data.title}</h1>
          <p className="text-sm text-gray-400">{data.genres.join(", ")}</p>
          <p className="pt-4 leading-relaxed">{data.overview}</p>
        </div>
      </div>

      <section>
        <h2 className="text-xl font-semibold mb-2">Cast</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {data.cast.slice(0, 5).map((c) => (
            <CastToggle key={c.id} photo={c.photo} bio={c.bio} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Details;