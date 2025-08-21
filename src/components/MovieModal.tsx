import React, { useEffect, useState } from 'react';
import { X, Star, Calendar, Clock, Users, Play, Heart, Share2 } from 'lucide-react';
import { Movie } from '../types/movie';
import { getImageUrl, getBackdropUrl } from '../services/movieAPI';

interface MovieDetails extends Movie {
  runtime?: number;
  genres?: { id: number; name: string }[];
  production_companies?: { id: number; name: string; logo_path: string }[];
  spoken_languages?: { iso_639_1: string; name: string }[];
  budget?: number;
  revenue?: number;
}

interface Cast {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

interface MovieModalProps {
  movie: Movie | null;
  isOpen: boolean;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (movie: Movie) => void;
}

const API_KEY = '4e44d9029b1270a757cddc766a1bcb63';

export const MovieModal: React.FC<MovieModalProps> = ({
  movie,
  isOpen,
  onClose,
  isFavorite,
  onToggleFavorite
}) => {
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);
  const [cast, setCast] = useState<Cast[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && movie) {
      setLoading(true);
      Promise.all([
        fetch(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=${API_KEY}`),
        fetch(`https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=${API_KEY}`)
      ])
        .then(([detailsRes, creditsRes]) => Promise.all([detailsRes.json(), creditsRes.json()]))
        .then(([details, credits]) => {
          setMovieDetails(details);
          setCast(credits.cast.slice(0, 8));
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [isOpen, movie]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !movie) return null;

  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="relative bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-gray-900/80 hover:bg-gray-800 text-white p-2 rounded-full backdrop-blur-sm transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="overflow-y-auto max-h-[90vh]">
          {/* Hero Section */}
          <div className="relative h-80 overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${getBackdropUrl(movie.backdrop_path)})`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
            </div>
            
            <div className="relative h-full flex items-end p-6">
              <div className="flex gap-6 items-end">
                <img
                  src={getImageUrl(movie.poster_path)}
                  alt={movie.title}
                  className="w-32 h-48 object-cover rounded-lg shadow-2xl"
                />
                <div className="flex-1 pb-2">
                  <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                    {movie.title}
                  </h1>
                  {movie.original_title !== movie.title && (
                    <p className="text-gray-300 text-lg mb-3">
                      {movie.original_title}
                    </p>
                  )}
                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    <div className="flex items-center gap-1 text-amber-400">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="font-medium">{movie.vote_average.toFixed(1)}</span>
                      <span className="text-gray-400">({movie.vote_count.toLocaleString()} votos)</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-300">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(movie.release_date).getFullYear()}</span>
                    </div>
                    {movieDetails?.runtime && (
                      <div className="flex items-center gap-1 text-gray-300">
                        <Clock className="w-4 h-4" />
                        <span>{formatRuntime(movieDetails.runtime)}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <button className="bg-white text-gray-900 px-6 py-3 rounded-lg font-bold flex items-center gap-2 hover:bg-gray-200 transition-colors">
                <Play className="w-5 h-5 fill-current" />
                Ver Trailer
              </button>
              <button
                onClick={() => onToggleFavorite(movie)}
                className={`px-6 py-3 rounded-lg font-bold flex items-center gap-2 transition-colors ${
                  isFavorite
                    ? 'bg-red-500 text-white hover:bg-red-600'
                    : 'bg-gray-800 text-white hover:bg-gray-700'
                }`}
              >
                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                {isFavorite ? 'Quitar de Favoritos' : 'Agregar a Favoritos'}
              </button>
              <button className="bg-gray-800 text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2 hover:bg-gray-700 transition-colors">
                <Share2 className="w-5 h-5" />
                Compartir
              </button>
            </div>

            {/* Genres */}
            {movieDetails?.genres && (
              <div>
                <h3 className="text-white font-bold text-lg mb-3">Géneros</h3>
                <div className="flex flex-wrap gap-2">
                  {movieDetails.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="bg-amber-500/20 text-amber-400 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Overview */}
            <div>
              <h3 className="text-white font-bold text-lg mb-3">Sinopsis</h3>
              <p className="text-gray-300 leading-relaxed">
                {movie.overview || 'Sin descripción disponible.'}
              </p>
            </div>

            {/* Cast */}
            {cast.length > 0 && (
              <div>
                <h3 className="text-white font-bold text-lg mb-3 flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Reparto Principal
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {cast.map((actor) => (
                    <div key={actor.id} className="text-center">
                      <div className="w-20 h-20 mx-auto mb-2 rounded-full overflow-hidden bg-gray-800">
                        {actor.profile_path ? (
                          <img
                            src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                            alt={actor.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-500">
                            <Users className="w-8 h-8" />
                          </div>
                        )}
                      </div>
                      <p className="text-white text-sm font-medium">{actor.name}</p>
                      <p className="text-gray-400 text-xs">{actor.character}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Additional Details */}
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-amber-500 border-t-transparent"></div>
              </div>
            ) : (
              movieDetails && (
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-white font-bold text-lg mb-3">Información</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Idioma Original:</span>
                        <span className="text-white">{movie.original_language.toUpperCase()}</span>
                      </div>
                      {movieDetails.budget > 0 && (
                        <div className="flex justify-between">
                          <span className="text-gray-400">Presupuesto:</span>
                          <span className="text-white">{formatCurrency(movieDetails.budget)}</span>
                        </div>
                      )}
                      {movieDetails.revenue > 0 && (
                        <div className="flex justify-between">
                          <span className="text-gray-400">Recaudación:</span>
                          <span className="text-white">{formatCurrency(movieDetails.revenue)}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-gray-400">Popularidad:</span>
                        <span className="text-white">{movie.popularity.toFixed(0)}</span>
                      </div>
                    </div>
                  </div>

                  {movieDetails.production_companies && movieDetails.production_companies.length > 0 && (
                    <div>
                      <h3 className="text-white font-bold text-lg mb-3">Productoras</h3>
                      <div className="space-y-2">
                        {movieDetails.production_companies.slice(0, 3).map((company) => (
                          <div key={company.id} className="flex items-center gap-3">
                            {company.logo_path ? (
                              <img
                                src={`https://image.tmdb.org/t/p/w92${company.logo_path}`}
                                alt={company.name}
                                className="w-8 h-8 object-contain bg-white rounded p-1"
                              />
                            ) : (
                              <div className="w-8 h-8 bg-gray-700 rounded flex items-center justify-center">
                                <span className="text-xs text-gray-400">🏢</span>
                              </div>
                            )}
                            <span className="text-gray-300 text-sm">{company.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};