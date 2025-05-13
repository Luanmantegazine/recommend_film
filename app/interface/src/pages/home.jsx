import { useState } from 'react';
import { useMovies } from '@/hooks/useMovies';
import { ChevronRight } from 'lucide-react';
import { useRecommend } from '@/hooks/useRecommend';
import PosterGrid from '@/components/PosterGrid';
import Select from 'react-select';

export default function Home() {
  const [title, setTitle] = useState('');
  const { data: options = [] } = useMovies(0, 100, true);

  const {
    data: recs,
    isFetching,
    refetch,
    isFetched,
    error,
  } = useRecommend(title, 5);

  const handleRecommend = () => {
    if (!title) return;
    refetch();              // dispara fetch com o title atual
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Movie Recommender</h1>

      <Select
        options={options.map(o => ({ value: o.movie, label: o.movie }))}
        onChange={opt => setTitle(opt?.value || '')}
        placeholder="Select a movie..."
        className="mb-2"
      />

      <button
  onClick={handleRecommend}
  className="flex items-center gap-1 px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-md disabled:opacity-40"
  disabled={!title || isFetching}
>
  Recommend <ChevronRight size={16} />
</button>

{isFetching && (
  <p className="mt-6 text-center text-slate-500 animate-pulse">
    Carregando recomendações…
  </p>
)}

{isFetched && recs?.length > 0 && (
  <>
    <h2 className="mt-8 mb-2 text-lg font-semibold">Talvez você também goste:</h2>
    <PosterGrid items={recs} onClick={m => navigate(`/movie/${m.title}`)} />
  </>
)}
    </div>
  );
}
