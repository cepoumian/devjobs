interface TypeFilterProps {
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TypeFilter = (props: TypeFilterProps) => {
  const { checked, onChange } = props;

  return (
    <div className="type-filter">
      <label className="type-filter__custom-checkbox">
        <input
          type="checkbox"
          className="w-5 h-5 mr-3"
          checked={checked}
          onChange={onChange}
        />
        <span className="custom-checkmark"></span>
        <span className="custom-label">Full Time Only</span>
      </label>
    </div>
  );
};

export default TypeFilter;
