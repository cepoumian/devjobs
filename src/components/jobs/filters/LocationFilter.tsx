import { MapPin } from "lucide-react";

interface LocationFilterProps {
  location: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const LocationFilter = (props: LocationFilterProps) => {
  const { location, onChange } = props;
  return (
    <div className="location-filter">
      <MapPin size={32} className="location-filter__icon" />
      <input
        type="text"
        placeholder="Filter by location..."
        className="location-filter__input"
        value={location}
        onChange={onChange}
      />
    </div>
  );
};

export default LocationFilter;
