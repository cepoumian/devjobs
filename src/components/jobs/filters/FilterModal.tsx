import Button from "@/components/reusable/Button";
import LocationFilter from "./LocationFilter";
import TypeFilter from "./TypeFilter";
import { useFiltersContext } from "./Filters";

const FilterModal = () => {
  const { isModalOpen, filters, updateFilter, closeFilterModal, handleSubmit } =
    useFiltersContext();

  if (!isModalOpen) return null;

  return (
    <div className="filter-modal__overlay" onClick={closeFilterModal}>
      <div
        className="filter-modal__container"
        onClick={(e) => e.stopPropagation()}
      >
        <form onSubmit={handleSubmit} className="stack">
          <LocationFilter
            location={filters.location}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              updateFilter("location", e.target.value)
            }
          />
          <hr />
          <TypeFilter
            checked={filters.fullTimeOnly}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              updateFilter("fullTimeOnly", e.target.checked);
            }}
          />
          <Button type="submit">Search</Button>
        </form>
      </div>
    </div>
  );
};

export default FilterModal;
