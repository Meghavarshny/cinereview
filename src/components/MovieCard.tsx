import { useState } from 'react';
import { Calendar, Film } from 'lucide-react';
import { StarRating } from './StarRating';
import { cn } from '@/lib/utils';

export interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Genre?: string;
  Poster: string;
  Plot?: string;
  Director?: string;
  Actors?: string;
  imdbRating?: string;
  userRating?: number;
}

interface MovieCardProps {
  movie: Movie;
  onClick: (movie: Movie) => void;
  onRatingChange: (movieId: string, rating: number) => void;
}

export const MovieCard = ({ movie, onClick, onRatingChange }: MovieCardProps) => {
  const [imageError, setImageError] = useState(false);

  const handleRatingChange = (rating: number) => {
    onRatingChange(movie.imdbID, rating);
  };

  return (
    <div className="group relative bg-card rounded-lg overflow-hidden transition-all duration-300 hover:bg-movie-card-hover hover:scale-105 hover:shadow-[var(--shadow-movie-card)] cursor-pointer">
      <div onClick={() => onClick(movie)} className="relative">
        <div className="aspect-[2/3] overflow-hidden">
          {!imageError && movie.Poster && movie.Poster !== 'N/A' ? (
            <img
              src={movie.Poster}
              alt={movie.Title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              onError={() => setImageError(true)}
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center">
              <Film className="w-12 h-12 text-muted-foreground" />
            </div>
          )}
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-backdrop/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <div className="text-sm text-muted-foreground mb-2">
            {movie.Genre && (
              <span className="bg-primary/20 px-2 py-1 rounded-full text-xs">
                {movie.Genre.split(',')[0]}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-sm mb-2 line-clamp-2 leading-tight">
          {movie.Title}
        </h3>
        
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
          <Calendar className="w-3 h-3" />
          <span>{movie.Year}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <StarRating
              rating={movie.userRating || 0}
              onRatingChange={handleRatingChange}
              size="sm"
            />
          </div>
          {movie.imdbRating && movie.imdbRating !== 'N/A' && (
            <div className="text-xs text-accent font-medium">
              IMDb: {movie.imdbRating}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};