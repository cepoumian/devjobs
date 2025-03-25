export type Filters = {
  searchTerm: string;
  location: string;
  remoteOnly: boolean;
};

export type OptionalFilters = Partial<Filters>;

export type OnSubmit = (filters: {
  searchTerm: string;
  location: string;
  remoteOnly: boolean;
}) => void;
