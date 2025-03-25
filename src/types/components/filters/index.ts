export type Filters = {
  searchTerm: string;
  location: string;
  fullTimeOnly: boolean;
};

export type OnSubmit = (filters: {
  searchTerm: string;
  location: string;
  fullTimeOnly: boolean;
}) => void;
