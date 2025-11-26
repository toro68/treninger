const EQUIPMENT_OPTIONS = ["kjegler", "vester", "mål", "bob-er", "baller"];

type EquipmentFiltersProps = {
  selected: string[];
  onChange: (items: string[]) => void;
};

export const EquipmentFilters = ({ selected, onChange }: EquipmentFiltersProps) => {
  const toggle = (item: string) => {
    if (selected.includes(item)) {
      onChange(selected.filter((value) => value !== item));
    } else {
      onChange([...selected, item]);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {EQUIPMENT_OPTIONS.map((item) => (
        <label
          key={item}
          className={`flex items-center gap-2 rounded-full border px-3 py-1 text-sm capitalize ${
            selected.includes(item)
              ? "border-black bg-black text-white"
              : "border-zinc-200 text-zinc-600"
          }`}
        >
          <input
            type="checkbox"
            className="accent-black"
            checked={selected.includes(item)}
            onChange={() => toggle(item)}
          />
          {item}
        </label>
      ))}
    </div>
  );
};
