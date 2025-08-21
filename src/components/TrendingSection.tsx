import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Info } from 'lucide-react';
import { Movie } from '../types/movie';
import { getBackdropUrl } from '../services/movieAPI';
import { MovieGrid } from './MovieGrid';

interface TrendingSectionProps {
  trendingMovies: Movie[];
  popularMovies: Movie[];
  isFavorite: (movieId: number) => boolean;
  onToggleFavorite: (movie: Movie) => void;
  onMovieClick: (movie: Movie) => void;
}

export const TrendingSection: React.FC<TrendingSectionProps> = ({
  trendingMovies,
  popularMovies,
  isFavorite,
  onToggleFavorite,
  onMovieClick
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const featuredMovies = trendingMovies.slice(0, 5);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredMovies.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [featuredMovies.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredMovies.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredMovies.length) % featuredMovies.length);
  };

  const currentMovie = featuredMovies[currentSlide];

  if (!currentMovie) return null;

  return (
    <div className="space-y-12">
      {/* Hero Carousel */}
      <div className="relative h-[70vh] overflow-hidden rounded-2xl">
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
          style={{
            backgroundImage: `url(${getBackdropUrl(currentMovie.backdrop_path)})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
        </div>

        <div className="relative h-full flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
                {currentMovie.title}
              </h1>
              <p className="text-gray-200 text-lg mb-6 line-clamp-3 leading-relaxed">
                {currentMovie.overview}
              </p>
              <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center gap-2 text-amber-400">
                  <span className="text-2xl">⭐</span>
                  <span className="text-xl font-bold">{currentMovie.vote_average.toFixed(1)}</span>
                </div>
                <div className="text-gray-300">
                  {new Date(currentMovie.release_date).getFullYear()}
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => onMovieClick(currentMovie)}
                  className="bg-white text-gray-900 px-8 py-3 rounded-lg font-bold flex items-center gap-2 hover:bg-gray-200 transition-colors"
                >
                  <Play className="w-5 h-5 fill-current" />
                  Ver Detalles
                </button>
                <button 
                  onClick={() => onMovieClick(currentMovie)}
                  className="bg-gray-800/80 text-white px-8 py-3 rounded-lg font-bold flex items-center gap-2 hover:bg-gray-700 transition-colors backdrop-blur-sm"
                >
                  <Info className="w-5 h-5" />
                  Más Info
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-900/50 hover:bg-gray-800/70 text-white p-3 rounded-full backdrop-blur-sm transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-900/50 hover:bg-gray-800/70 text-white p-3 rounded-full backdrop-blur-sm transition-colors"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Slide indicators */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
          {featuredMovies.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-amber-500 scale-125' : 'bg-gray-600 hover:bg-gray-500'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Trending Movies Grid */}
      <MovieGrid
        title="🔥 Tendencias de la Semana"
        movies={trendingMovies.slice(5)}
        isFavorite={isFavorite}
        onToggleFavorite={onToggleFavorite}
        onMovieClick={onMovieClick}
      />

      {/* Popular Movies Grid */}
      <MovieGrid
        title="🌟 Populares"
        movies={popularMovies}
        isFavorite={isFavorite}
        onToggleFavorite={onToggleFavorite}
        onMovieClick={onMovieClick}
      />
    </div>
  );
};