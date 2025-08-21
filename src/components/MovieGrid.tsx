import React from 'react';
import { Movie } from '../types/movie';
import { MovieCard } from './MovieCard';

interface MovieGridProps {
  movies: Movie[];
  title?: string;
  isFavorite: (movieId: number) => boolean;
  onToggleFavorite: (movie: Movie) => void;
  onMovieClick: (movie: Movie) => void;
  loading?: boolean;
}

export const MovieGrid: React.FC<MovieGridProps> = ({ 
  movies, 
  title, 
  isFavorite, 
  onToggleFavorite,
  onMovieClick,
  loading = false 
}) => {
  if (loading) {
    return (
      <div className="space-y-6">
        {title && (
          <h2 className="text-2xl font-bold text-white mb-6">{title}</h2>
        )}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {Array.from({ length: 12 }).map((_, index) => (
            <div key={index} className="bg-gray-800 rounded-xl overflow-hidden animate-pulse">
              <div className="w-full h-80 bg-gray-700" />
              <div className="p-4">
                <div className="h-4 bg-gray-700 rounded mb-2" />
                <div className="h-3 bg-gray-700 rounded w-2/3 mb-2" />
                <div className="h-3 bg-gray-700 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="text-center py-12">
        {title && (
          <h2 className="text-2xl font-bold text-white mb-6">{title}</h2>
        )}
        <p className="text-gray-400 text-lg">No se encontraron películas.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {title && (
        <h2 className="text-2xl font-bold text-white mb-6 border-l-4 border-amber-500 pl-4">
          {title}
        </h2>
      )}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            isFavorite={isFavorite(movie.id)}
            onToggleFavorite={onToggleFavorite}
            onMovieClick={onMovieClick}
          />
        ))}
      </div>
    </div>
  );
};