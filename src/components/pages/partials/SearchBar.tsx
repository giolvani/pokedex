import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface SearchBarProps {
    search: string;
    setSearch: (value: string) => void;
    typeFilter: string;
    setTypeFilter: (value: string) => void;
    types: string[];
}

const SearchBar = ({ search, setSearch, typeFilter, setTypeFilter, types }: SearchBarProps) => {
    return (
        <div className="mb-4 flex gap-4">
            <Input
                placeholder="Search Pokémon..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="max-w-sm"
            />
            <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All types</SelectItem>
                    {types.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}

export default SearchBar;