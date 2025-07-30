import { useState, useEffect, useCallback } from 'react';
import { Movie } from '@/components/MovieCard';
import { movieService } from '@/services/movieService';

export const useMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  const [userRatings, setUserRatings] = useState<Record<string, number>>({});

 
  useEffect(() => {
    const loadPopularMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await movieService.getPopularMovies();
        if (response.Response === 'True' && response.Search) {
          setMovies(response.Search);
        } else {
          setError('No movies found');
        }
      } catch (err) {
        setError('Failed to load movies');
      }
      setLoading(false);
    };

    loadPopularMovies();
  }, []);


  const searchMovies = useCallback(async () => {
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    setError(null);
    try {
      const response = await movieService.searchMovies(searchQuery);
      if (response.Response === 'True' && response.Search) {
        setMovies(response.Search);
      } else {
        setError(response.Error || 'No movies found');
        setMovies([]);
      }
    } catch (err) {
      setError('Failed to search movies');
    }
    setLoading(false);
  }, [searchQuery]);

 
  useEffect(() => {
    let filtered = movies.map(movie => ({
      ...movie,
      userRating: userRatings[movie.imdbID]
    }));

    if (selectedGenre !== 'all') {
      filtered = filtered.filter(movie => 
        movie.Genre?.toLowerCase().includes(selectedGenre.toLowerCase())
      );
    }

    if (selectedYear !== 'all') {
      filtered = filtered.filter(movie => movie.Year === selectedYear);
    }

    setFilteredMovies(filtered);
  }, [movies, selectedGenre, selectedYear, userRatings]);

  const updateUserRating = (movieId: string, rating: number) => {
    setUserRatings(prev => ({
      ...prev,
      [movieId]: rating
    }));
  };

  const clearFilters = () => {
    setSelectedGenre('all');
    setSelectedYear('all');
  };

  return {
    movies: filteredMovies,
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
  };
};