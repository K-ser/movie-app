import React from 'react';
import { Heart } from 'lucide-react';
import { Movie, Genre } from '../types/movie';
// import { MovieGrid } from './MovieGrid';

interface CategorySectionProps {
  genres: Genre[];
  moviesByGenre: { [key: number]: Movie[] };
  isFavorite: (movieId: number) => boolean;
  onToggleFavorite: (movie: Movie) => void;
  onMovieClick: (movie: Movie) => void;
}

export const CategorySection: React.FC<CategorySectionProps> = ({
  genres,
  moviesByGenre,
  isFavorite,
  onToggleFavorite,
  onMovieClick
}) => {
  const popularGenreIds = [28, 35, 18, 27, 878, 53]; // Action, Comedy, Drama, Horror, Sci-Fi, Thriller

  return (
    <div className="space-y-12">
      {popularGenreIds.map((genreId) => {
        const genre = genres.find(g => g.id === genreId);
        const movies = moviesByGenre[genreId] || [];

        if (!genre || movies.length === 0) return null;

        return (
          <div key={genreId} className="space-y-6">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-bold text-white border-l-4 border-amber-500 pl-4">
                {genre.name}
              </h2>
              <div className="flex-1 h-px bg-gradient-to-r from-gray-700 to-transparent" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
              {movies.slice(0, 8).map((movie) => (
                <div
                  key={movie.id}
                  className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group cursor-pointer"
                  onClick={() => onMovieClick(movie)}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(movie);
                      }}
                      className={`absolute top-2 right-2 p-2 rounded-full backdrop-blur-sm transition-all duration-200 ${
                        isFavorite(movie.id)
                          ? 'bg-red-500/90 text-white hover:bg-red-600'
                          : 'bg-gray-900/50 text-gray-300 hover:bg-gray-800/70 hover:text-red-400'
                      }`}
                    >
                      <Heart className={`w-5 h-5 ${isFavorite(movie.id) ? 'fill-current' : ''}`} />
                    </button>
                  </div>
                  <div className="p-3">
                    <h3 className="text-white font-medium text-sm line-clamp-2 group-hover:text-amber-400 transition-colors">
                      {movie.title}
                    </h3>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-amber-400 text-xs font-medium">
                        ⭐ {movie.vote_average.toFixed(1)}
                      </span>
                      <span className="text-gray-400 text-xs">
                        {new Date(movie.release_date).getFullYear()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};