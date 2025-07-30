import { useState } from 'react';
import { Film, Loader2 } from 'lucide-react';
import { MovieCard, Movie } from '@/components/MovieCard';
import { MovieDetails } from '@/components/MovieDetails';
import { SearchBar } from '@/components/SearchBar';
import { FilterBar } from '@/components/FilterBar';
import { useMovies } from '@/hooks/useMovies';

const Index = () => {
  const {
    movies,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    searchMovies,
    selectedGenre,
    setSelectedGenre,
    selectedYear,
    setSelectedYear,
    clearFilters,
    updateUserRating
  } = useMovies();

  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseDetails = () => {
    setSelectedMovie(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {}
      <header className="sticky top-0 z-40 border-b border-border bg-backdrop/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center gap-2">
              <Film className="w-8 h-8 text-primary" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                CineReview
              </h1>
            </div>
          </div>
          
          <div className="space-y-4">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              onSearch={searchMovies}
              placeholder="Search for movies..."
            />
            
            <FilterBar
              selectedGenre={selectedGenre}
              selectedYear={selectedYear}
              onGenreChange={setSelectedGenre}
              onYearChange={setSelectedYear}
              onClearFilters={clearFilters}
            />
          </div>
        </div>
      </header>

      {}
      <main className="container mx-auto px-4 py-8">
        {loading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <span className="ml-2 text-muted-foreground">Loading movies...</span>
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <div className="text-destructive mb-2">{error}</div>
            <p className="text-muted-foreground">Try searching for a different movie</p>
          </div>
        )}

        {!loading && !error && movies.length === 0 && (
          <div className="text-center py-12">
            <Film className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">No movies found</h2>
            <p className="text-muted-foreground">Try adjusting your search or filters</p>
          </div>
        )}

        {!loading && movies.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {movies.map((movie) => (
              <MovieCard
                key={movie.imdbID}
                movie={movie}
                onClick={handleMovieClick}
                onRatingChange={updateUserRating}
              />
            ))}
          </div>
        )}
      </main>

      {}
      {selectedMovie && (
        <MovieDetails
          movie={selectedMovie}
          onClose={handleCloseDetails}
          onRatingChange={updateUserRating}
        />
      )}
    </div>
  );
};

export default Index;
