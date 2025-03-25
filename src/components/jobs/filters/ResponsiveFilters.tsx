import CompactFiltersBar from "./CompactFiltersBar";
import FilterModal from "./FilterModal";
import Filters, { useFiltersContext } from "./Filters";
import { OnSubmit } from "@/types/components/filters";
import FullFiltersBar from "./FullFiltersBar";

// Responsive Container Component for easy composition
export const ResponsiveContainer = () => {
  const { isMobile } = useFiltersContext();

  return isMobile ? (
    <>
      <CompactFiltersBar />
      <FilterModal />
    </>
  ) : (
    <>
      <FullFiltersBar />
    </>
  );
};

interface ResponsiveFiltersProps {
  onSubmit: OnSubmit;
}

// Main default export for convenience
const ResponsiveFilters = ({ onSubmit }: ResponsiveFiltersProps) => {
  return (
    <Filters onSubmit={onSubmit}>
      <ResponsiveContainer />
    </Filters>
  );
};

export default ResponsiveFilters;
