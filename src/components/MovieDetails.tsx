import { useState, useEffect } from 'react';
import { X, Calendar, Clock, User, Star, Film } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StarRating } from './StarRating';
import { Movie } from './MovieCard';

interface MovieDetailsProps {
  movie: Movie;
  onClose: () => void;
  onRatingChange: (movieId: string, rating: number) => void;
}

export const MovieDetails = ({ movie, onClose, onRatingChange }: MovieDetailsProps) => {
  const [imageError, setImageError] = useState(false);
  const [movieDetails, setMovieDetails] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://www.omdbapi.com/?i=${movie.imdbID}&apikey=c96c2f2c&plot=full`
        );
        const data = await response.json();
        if (data.Response === 'True') {
          setMovieDetails(data);
        }
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
      setLoading(false);
    };

    fetchMovieDetails();
  }, [movie.imdbID]);

  const details = movieDetails || movie;

  const handleRatingChange = (rating: number) => {
    onRatingChange(movie.imdbID, rating);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-backdrop/80 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-card rounded-lg shadow-2xl">
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-backdrop/50 hover:bg-backdrop/70"
        >
          <X className="w-4 h-4" />
        </Button>

        <div className="relative">
          {!imageError && details.Poster && details.Poster !== 'N/A' ? (
            <div className="relative h-64 md:h-80 overflow-hidden">
              <img
                src={details.Poster}
                alt={details.Title}
                className="w-full h-full object-cover"
                onError={() => setImageError(true)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
            </div>
          ) : (
            <div className="h-64 md:h-80 bg-muted flex items-center justify-center">
              <Film className="w-16 h-16 text-muted-foreground" />
            </div>
          )}
        </div>

        <div className="p-6 space-y-6">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold leading-tight">{details.Title}</h1>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              {details.Year && (
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{details.Year}</span>
                </div>
              )}
              {details.Runtime && details.Runtime !== 'N/A' && (
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{details.Runtime}</span>
                </div>
              )}
              {details.Director && details.Director !== 'N/A' && (
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  <span>Dir: {details.Director}</span>
                </div>
              )}
            </div>

            {details.Genre && details.Genre !== 'N/A' && (
              <div className="flex flex-wrap gap-2">
                {details.Genre.split(', ').map((genre: string) => (
                  <span key={genre} className="bg-primary/20 px-3 py-1 rounded-full text-xs">
                    {genre}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-4">
              {details.Plot && details.Plot !== 'N/A' && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">Plot</h3>
                  <p className="text-muted-foreground leading-relaxed">{details.Plot}</p>
                </div>
              )}

              {details.Actors && details.Actors !== 'N/A' && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">Cast</h3>
                  <p className="text-muted-foreground">{details.Actors}</p>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="bg-muted/30 p-4 rounded-lg space-y-4">
                <div>
                  <h3 className="text-sm font-semibold mb-2">Your Rating</h3>
                  <StarRating
                    rating={movie.userRating || 0}
                    onRatingChange={handleRatingChange}
                    size="lg"
                  />
                </div>

                {details.imdbRating && details.imdbRating !== 'N/A' && (
                  <div>
                    <h3 className="text-sm font-semibold mb-2">IMDb Rating</h3>
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 fill-star-filled text-star-filled" />
                      <span className="text-lg font-bold">{details.imdbRating}</span>
                      <span className="text-sm text-muted-foreground">/10</span>
                    </div>
                  </div>
                )}

                {details.Metascore && details.Metascore !== 'N/A' && (
                  <div>
                    <h3 className="text-sm font-semibold mb-2">Metascore</h3>
                    <div className="text-lg font-bold text-accent">{details.Metascore}/100</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};