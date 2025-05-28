import React, { useState } from 'react';
import PropTypes from 'prop-types';
import InfoModal from "@/components/InfoModal/InfoModal";
import MovieCard from '../MovieCard/MovieCard';
import './PosterGrid.css';
import { useDetails } from "@/hooks/useDetails";

const getItemId = (item) => item.id || item.movie_id;

export default function PosterGrid({ items, className = '' }) {
  const isGridStyling = items.length > 5;
  const [selectedItemId, setSelectedItemId] = useState(null);

  const { data: movieDetails, isFetching: isLoadingMovieDetails } = useDetails(selectedItemId);

  const handleMovieCardClick = (itemId) => {
    setSelectedItemId(itemId);
  };

  const closeModal = () => {
    setSelectedItemId(null);
  };

  return (
    <>
      <div
        className={[
          'poster-grid',
          isGridStyling ? 'columns' : '',
          className,
        ].filter(Boolean).join(' ')}
      >
        {items.map((item) => {
          const itemId = getItemId(item);
          if (!itemId) {
            console.warn("Item no PosterGrid sem ID:", item);
            return null;
          }
          return (
            <div key={itemId} className="poster-item">
              <MovieCard
                movieId={itemId}
                title={item.title}
                poster={item.poster}
                onClick={handleMovieCardClick}
              />
            </div>
          );
        })}
      </div>
      <InfoModal
        isOpen={!!selectedItemId}
        onClose={closeModal}
        movie={movieDetails}
        loading={isLoadingMovieDetails}
      />
    </>
  );
}

 PosterGrid.propTypes = {
   items: PropTypes.arrayOf(PropTypes.shape({
     id: PropTypes.any,
     title: PropTypes.string,
     poster: PropTypes.string,
   })).isRequired,
   className: PropTypes.string,
 };