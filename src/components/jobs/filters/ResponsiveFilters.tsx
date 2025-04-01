import CompactFiltersBar from "./CompactFiltersBar";
import FilterModal from "./FilterModal";
import Filters, { useFiltersContext } from "./Filters";
import { OnSubmit } from "@/types/components/filters";
import FullFiltersBar from "./FullFiltersBar";

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

export interface ResponsiveFiltersProps {
  onSubmit: OnSubmit;
}

const ResponsiveFilters = ({ onSubmit }: ResponsiveFiltersProps) => {
  return (
    <Filters onSubmit={onSubmit}>
      <ResponsiveContainer />
    </Filters>
  );
};

export default ResponsiveFilters;
