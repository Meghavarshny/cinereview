import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Filter, X } from 'lucide-react';

interface FilterBarProps {
  selectedGenre: string;
  selectedYear: string;
  onGenreChange: (genre: string) => void;
  onYearChange: (year: string) => void;
  onClearFilters: () => void;
}

const genres = [
  'Action', 'Adventure', 'Animation', 'Biography', 'Comedy', 'Crime',
  'Documentary', 'Drama', 'Family', 'Fantasy', 'History', 'Horror',
  'Music', 'Mystery', 'Romance', 'Sci-Fi', 'Sport', 'Thriller', 'War', 'Western'
];

const years = Array.from({ length: 30 }, (_, i) => (2024 - i).toString());

export const FilterBar = ({ 
  selectedGenre, 
  selectedYear, 
  onGenreChange, 
  onYearChange, 
  onClearFilters 
}: FilterBarProps) => {
  const hasFilters = selectedGenre !== 'all' || selectedYear !== 'all';

  return (
    <div className="flex flex-wrap items-center gap-4 p-4 bg-card rounded-lg border border-border">
      <div className="flex items-center gap-2 text-sm font-medium">
        <Filter className="w-4 h-4" />
        Filters:
      </div>

      <Select value={selectedGenre} onValueChange={onGenreChange}>
        <SelectTrigger className="w-40">
          <SelectValue placeholder="All Genres" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Genres</SelectItem>
          {genres.map((genre) => (
            <SelectItem key={genre} value={genre.toLowerCase()}>
              {genre}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={selectedYear} onValueChange={onYearChange}>
        <SelectTrigger className="w-32">
          <SelectValue placeholder="All Years" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Years</SelectItem>
          {years.map((year) => (
            <SelectItem key={year} value={year}>
              {year}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {hasFilters && (
        <Button
          variant="outline"
          size="sm"
          onClick={onClearFilters}
          className="flex items-center gap-2"
        >
          <X className="w-3 h-3" />
          Clear Filters
        </Button>
      )}
    </div>
  );
};