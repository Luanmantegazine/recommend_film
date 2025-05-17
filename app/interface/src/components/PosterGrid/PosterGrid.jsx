import React, {useState} from 'react';
import InfoModal from "@/components/InfoModal/InfoModal";
import MovieCard from '../MovieCard/MovieCard';
import './PosterGrid.css'
import {useDetails} from "@/hooks/useDetails";

export default function PosterGrid({ items, onClick, className = '' }) {
  const isGrid = items.length > 5;
  const [ selectedId, setSelecteId] = useState(null);
  const {data: details, isFetching } = useDetails(selectedId, {enabled: !!selectedId,});
  const closeModal = () => selectedId(null);

  return (
    <div
      className={[
        'poster-grid',
        isGrid ? 'columns' : '',
        className,
      ].join(' ')}
    >
      {items.map((m) => (
        <div key={m.movie_id} className="poster-item">
          <MovieCard
            title={m.title}
            poster={m.poster}
            onClick={() => onClick?.(m)}
          />
        </div>
      ))}
        <InfoModal
        isOpen={!!selectedId && !isFetching}
        onClose={closeModal}
        movie={details}
      />
    </>
  );
}