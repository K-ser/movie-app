import React from 'react';
import { Heart, Star, Calendar } from 'lucide-react';
import { Movie } from '../types/movie';
import { getImageUrl } from '../services/movieAPI';

interface MovieCardProps {
  movie: Movie;
  isFavorite: boolean;
  onToggleFavorite: (movie: Movie) => void;
  onMovieClick: (movie: Movie) => void;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie, isFavorite, onToggleFavorite, onMovieClick }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).getFullYear();
  };

  const formatRating = (rating: number) => {
    return rating.toFixed(1);
  };

  return (
    <div 
      className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group cursor-pointer"
      onClick={() => onMovieClick(movie)}
    >
      <div className="relative overflow-hidden">
        <img
          src={getImageUrl(movie.poster_path)}
          alt={movie.title}
          className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <button
        //   onClick={() => onToggleFavorite(movie)}
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(movie);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-all duration-200 ${
            isFavorite
              ? 'bg-red-500/90 text-white hover:bg-red-600'
              : 'bg-gray-900/50 text-gray-300 hover:bg-gray-800/70 hover:text-red-400'
          }`}
        >
          <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
        </button>
      </div>

      <div className="p-4">
        <h3 className="text-white font-bold text-lg mb-2 line-clamp-2 group-hover:text-amber-400 transition-colors">
          {movie.title}
        </h3>
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1 text-amber-400">
            <Star className="w-4 h-4 fill-current" />
            <span className="text-sm font-medium">{formatRating(movie.vote_average)}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-400">
            <Calendar className="w-4 h-4" />
            <span className="text-sm">{formatDate(movie.release_date)}</span>
          </div>
        </div>

        <p className="text-gray-400 text-sm line-clamp-3 leading-relaxed">
          {movie.overview || 'Sin descripción disponible.'}
        </p>
      </div>
    </div>
  );
};