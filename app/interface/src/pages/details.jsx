import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchDetails } from '@/hooks/fetchDetails';

export default function Details() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery(['details', data.title_id], () => fetchDetails(data.title_id));

  if (isLoading) return <p className="p-4">Loading…</p>;
  if (error)     return <p className="p-4 text-red-600">Erro ao carregar detalhes.</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <button onClick={() => navigate(-1)} className="mb-4 text-sky-600">
        ← Voltar
      </button>

      <div className="flex flex-col md:flex-row gap-4">
        <img
          src={data.poster || '/img/placeholder.jpg'}
          alt={data.title}
          className="w-full md:w-56 h-80 object-cover rounded"
        />

        <div>
          <h2 className="text-2xl font-bold mb-2">{data.title}</h2>
          <p className="text-sm mb-2">{data.overview}</p>

          <div className="text-sm">
            <strong>Gêneros:</strong> {data.genres.join(', ')} <br />
            <strong>Director:</strong> {data.director} <br />
            <strong>Elenco:</strong> {data.cast.slice(0, 5).join(', ')}
          </div>
        </div>
      </div>
    </div>
  );
}
