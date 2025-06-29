import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

import { useMeetingsFilters } from "../../hooks/use-meetings-filters";

export const MeetingsSearchFilter = () => {
    const [filters, setFilters] = useMeetingsFilters();
    return (
        <div className="relative">
            <Input placeholder="Filter by name" className="h-9 bg-white w-[200px] pl-7"
            value={filters.search} 
            onChange={(e) => setFilters({search: e.target.value})}/>
            <SearchIcon className="absolute size-4 left-2 top-1/2 -translate-y-1/2 text-muted-foreground" />
        </div>
    )
}