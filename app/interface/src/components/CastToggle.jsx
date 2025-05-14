import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { fetchDetails } from '@/hooks/fetchDetails';

export default function MovieToggle({ movieId, title, poster }) {
  const [open, setOpen] = useState(false);
  const { data, isLoading } = useQuery(
    ['details', movieId],
    () => fetchDetails(movieId),
    { enabled: open }
  );

  return (
    <div className="border-b pb-2">
      <div
        className="flex gap-2 items-center cursor-pointer"
        onClick={() => setOpen(o => !o)}
      >
        <img src={poster} alt={title} className="w-10 h-14 object-cover" />
        <span className="font-semibold">{title}</span>
        <span className="ml-auto text-sky-600 text-sm">
          {open ? 'Hide' : 'Show'} more
        </span>
      </div>

      {open && (
        <div className="mt-2 text-sm">
          {isLoading ? 'Loading…' : data.overview}
        </div>
      )}
    </div>
  );
}
