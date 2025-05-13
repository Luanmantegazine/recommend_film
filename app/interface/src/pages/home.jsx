import { useState } from 'react'
import { useMovies } from '@/hooks/useMovies'
import { useRecommend } from '@/hooks/useRecommend'
import PosterGrid from '@/components/PosterGrid'
import Select from 'react-select'

export default function Home() {
  const [title, setTitle] = useState('')
  const { data: options = [] } = useMovies(0, 100, true)
  const {
    data: recs,
    isFetching,
    refetch,
    isFetched,
    error
  } = useRecommend(title, 5)

  const handleRecommend = () => {
    if (!title) return
    refetch({
      queryKey: ['recommend', 5, { title }]
    })
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Movie Recommender</h1>

      <Select
        options={options.map(o => ({ value: o.movie, label: o.movie }))}
        onChange={opt => setTitle(opt.value)}
        placeholder="Select a movie..."
      />

      <button
        onClick={handleRecommend}
        className="mt-2 px-4 py-2 bg-sky-600 text-white rounded"
      >
        Recommend
      </button>

      {isFetching && <p>Loading recommendations…</p>}
      {error && <p className="text-red-600">Erro: {error.message}</p>}

      {isFetched && recs && (
        <PosterGrid items={recs} onClick={m => console.log('clicked', m)} />
      )}
    </div>
  )
}
