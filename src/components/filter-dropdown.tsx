import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@radix-ui/react-select";

export function FilterDropdown() {
  return (
    <div>
      <Select>
        <SelectTrigger
          id="category"
          className="ring-0 focus:ring-0 bg-transparent border-gray-400 text-gray-400 data-[placeholder]:text-gray-500 focus-visible:ring-offset-0 selection:ring-0 ring-offset-0"
        >
          <SelectValue placeholder="Filtro" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="blueberry">Blueberry</SelectItem>
          <SelectItem value="grapes">Grapes</SelectItem>
          <SelectItem value="pineapple">Pineapple</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

export default FilterDropdown;
