import { useFiltersContext } from "./Filters";
import SearchInput from "./SearchFilter";
import Button from "@/components/reusable/Button";
import LocationFilter from "./LocationFilter";
import TypeFilter from "./TypeFilter";

const FullFiltersBar = () => {
  const { filters, updateFilter, handleSubmit } = useFiltersContext();

  return (
    <div className="filters filters--full">
      <form onSubmit={handleSubmit} className="filters__form">
        <div className="filters__fields">
          <div className="filters__field">
            <SearchInput showIcon />
          </div>
          <div className="filters__field">
            <LocationFilter
              location={filters.location}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                updateFilter("location", e.target.value)
              }
            />
          </div>
          <div className="filters__fields-container">
            <TypeFilter
              checked={filters.remoteOnly}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                updateFilter("remoteOnly", e.target.checked);
              }}
            />
            <Button type="submit" isIcon>
              Search
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FullFiltersBar;
