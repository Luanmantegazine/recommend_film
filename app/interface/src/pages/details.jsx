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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <img
            src={data.poster}
            alt={data.title}
            className="w-full rounded-xl shadow-md object-cover aspect-[2/3]"
        />

        <div className="md:col-span-2 space-y-4">
          <h1 className="text-2xl font-bold">{data.title}</h1>

          <div className="flex flex-wrap gap-2">
            {data.genres.map(g => (
                <span
                    key={g}
                    className="px-2 py-0.5 rounded-full text-xs bg-sky-100 text-sky-800"
                >
          {g}
        </span>
            ))}
          </div>

          <p className="text-sm leading-relaxed">{data.overview}</p>

          <table className="text-sm">
            <tbody>
            <tr>
              <td className="pr-4 text-slate-500">Diretor</td>
              <td>{data.director}</td>
            </tr>
            <tr>
              <td className="pr-4 text-slate-500">Duração</td>
              <td>{data.runtime} min</td>
            </tr>
            <tr>
              <td className="pr-4 text-slate-500">Lançamento</td>
              <td>{new Date(data.release_date).toLocaleDateString()}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>

  );
};

export default Details;