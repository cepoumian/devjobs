import { Search } from "lucide-react";
import { useFiltersContext } from "./Filters";

interface SearchFilterProps {
  showIcon?: boolean;
}

const SearchFilter = (props: SearchFilterProps) => {
  const { showIcon = false } = props;
  const { filters, updateFilter } = useFiltersContext();
  return (
    <div className="search-filter">
      {showIcon && <Search size={32} />}
      <input
        type="text"
        placeholder="Filter by title..."
        className="search-filter__input"
        value={filters.searchTerm}
        onChange={(e) => updateFilter("searchTerm", e.target.value)}
      />
    </div>
  );
};

export default SearchFilter;
