import { useState } from 'react';
import { useMovies } from '@/hooks/useMovies';
import { ArrowRight } from 'lucide-react';
import { useRecommend } from '@/hooks/useRecommend';
import { useDetails} from "@/hooks/useDetails";
import InfoModal from "@/components/InfoModal";
import PosterGrid from '@/components/PosterGrid';
import Select from 'react-select';

export default function Home() {
  const [title, setTitle] = useState('');
  const [qtd, setQtd] = useState(5)
  const { data: options = [] } = useMovies(0, 100, true);
  const {data: recs, isFetching, refetch, isFetched,} = useRecommend(title, qtd);

  const handleRecommend = () => {
    if (!title) return;
    refetch();
  };

  const handlePoster = (m) => setQtd(m.movie_id);
  const closeModal = () => setQtd(null);

   return (
       <div className="mx-auto w-full max-w-screen-sm px-4">
           <h1 className="text-center text-3xl sm:text‑4xl font-bold text-sky-700 mb-4">
               Movie Recommender
           </h1>

           <div className="w-full max-w-md px-4">
               <Select
                   options={options.map(o => ({value: o.movie, label: o.movie}))}
                   onChange={opt => setTitle(opt?.value || '')}
                   placeholder="Choose a movie…"
                   className="react-select-container mb-2"
                   classNamePrefix="rs"
                   isSearchable
               />

               <div className="flex gap-3 mb-3 text-slate-300">
                   {[5, 10, 15].map(n => (
                       <label key={n} className="inline-flex items-center gap-1 cursor-pointer">
                           <input
                               type="radio"
                               name="qtd"
                               value={n}
                               checked={qtd === n}
                               onChange={() => setQtd(n)}
                               className="accent-sky-600"
                           />
                           {n}
                       </label>
                   ))}
               </div>

               <button
                   onClick={handleRecommend}
                   disabled={!title || isFetching}
                   className="w-full inline-flex items-center justify-center gap-2
                     px-4 py-2 rounded-md bg-sky-600 hover:bg-sky-700
                     disabled:bg-sky-300 text-white transition-colors"
               >
                   {isFetching ? 'Loading…' : 'Recommend'} <ArrowRight size={18}/>
               </button>
           </div>

           {isFetched && recs?.length > 0 && (
               <PosterGrid
                   items={recs}
                   className="mt-8"
               />
           )}
       </div>
   );
}
