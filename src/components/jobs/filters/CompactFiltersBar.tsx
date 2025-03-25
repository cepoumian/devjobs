import { Filter, Search } from "lucide-react";
import { useFiltersContext } from "./Filters";
import Button from "@/components/reusable/Button";
import SearchInput from "./SearchFilter";

const CompactFiltersBar = () => {
  const { openFilterModal, handleSubmit } = useFiltersContext();

  return (
    <div className="filters filters--compact">
      <form onSubmit={handleSubmit} className="filters__form">
        <div className="filters__fields">
          <SearchInput />
          <button
            type="button"
            onClick={openFilterModal}
            className="filters__filter-button"
          >
            <Filter size={32} />
          </button>
          <Button type="submit" isIcon>
            <Search size={32} />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CompactFiltersBar;
