import { Select, SelectItem } from "@nextui-org/select";

import { GrLocation } from "react-icons/gr";

const location = [{ label: "Bùi Viện", value: "bui-vien" }];

const SelectLocation = () => {
  return (
    <Select
      placeholder="Vị trí"
      startContent={<GrLocation className="shrink-0" size={18} />}
      fullWidth
      classNames={{
        trigger: "p-0 bg-transparent shadow-none border-none",
        popoverContent: "w-40"
      }}
      size="sm"
      variant="bordered"
    >
      {location.map((item) => (
        <SelectItem key={item.value} value={item.value}>
          {item.label}
        </SelectItem>
      ))}
    </Select>
  );
};

export default SelectLocation;
