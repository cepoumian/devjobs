/* eslint-disable react-refresh/only-export-components */
import {
  useState,
  useEffect,
  FormEventHandler,
  createContext,
  useContext,
} from "react";
import { type Filters, OnSubmit } from "@/types/components/filters";

export interface FiltersContextType {
  isMobile: boolean;
  isModalOpen: boolean;
  filters: Filters;
  updateFilter: (name: string, value: string | boolean) => void;
  openFilterModal: () => void;
  closeFilterModal: () => void;
  handleSubmit: FormEventHandler<HTMLFormElement>;
}

// Create context for the filters
const FiltersContext = createContext<FiltersContextType | null>(null);

export const useFiltersContext = () => {
  const context = useContext(FiltersContext);
  if (!context) {
    throw new Error(
      "Filters components must be used within a JobsFilters component"
    );
  }
  return context;
};

interface JobsFiltersProps {
  onSubmit: OnSubmit;
  children: React.ReactNode;
}

const Filters = ({ onSubmit, children }: JobsFiltersProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [filters, setFilters] = useState({
    searchTerm: "",
    location: "",
    remoteOnly: false,
  });

  const updateFilter = (name: string, value: string | boolean) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const checkIsMobile = () => {
      // Check if screen size is less than 768px (tablet)
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkIsMobile();

    // Add event listener for window resize
    window.addEventListener("resize", checkIsMobile);

    // Clean up
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (isModalOpen) setIsModalOpen(false);
    onSubmit(filters);
    if (isMobile) {
      setFilters({
        searchTerm: "",
        location: "",
        remoteOnly: false,
      });
    }
  };

  const openFilterModal = () => {
    setIsModalOpen(true);
  };

  const closeFilterModal = () => {
    setIsModalOpen(false);
  };

  // Context value
  const contextValue = {
    isMobile,
    isModalOpen,
    filters,
    updateFilter,
    openFilterModal,
    closeFilterModal,
    handleSubmit,
  };

  return (
    <FiltersContext.Provider value={contextValue}>
      {children}
    </FiltersContext.Provider>
  );
};

export default Filters;
