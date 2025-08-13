import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { CharacterFilters as CharacterFiltersType, CharacterStatus } from "@/types/character";

type Props = {
  filters: CharacterFiltersType;
  onChange: (newFilters: CharacterFiltersType) => void;
};

export function CharacterFilters({ filters, onChange }: Props) {
  return (
    <div className="flex gap-4 mb-4">
      <Input
        placeholder="Search by name"
        value={filters.name || ""}
        onChange={(e) => onChange({ ...filters, name: e.target.value })}
      />

      <Select
        value={filters.status ?? "all"}
        onValueChange={(value) => onChange({ ...filters, status: value as CharacterStatus })}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="alive">Alive</SelectItem>
          <SelectItem value="dead">Dead</SelectItem>
          <SelectItem value="unknown">Unknown</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
