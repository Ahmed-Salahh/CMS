"use client";

import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Search, ArrowDownUp } from "lucide-react";
import { DateRangePicker } from "./date-range-picker";
import { DateRange } from "react-day-picker";
import { ProgramFilters } from "@/types/programs";

interface ProgramsFilterProps {
  currentFilters: ProgramFilters;
}

const ProgramsFilter: React.FC<ProgramsFilterProps> = ({ currentFilters }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [search, setSearch] = useState(currentFilters.search);
  const [activeTab, setActiveTab] = useState(currentFilters.status);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(() => {
    if (currentFilters.start_date && currentFilters.end_date) {
      return {
        from: new Date(currentFilters.start_date),
        to: new Date(currentFilters.end_date),
      };
    }
    return undefined;
  });

  const updateURL = (updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (value && value !== "all" && value !== "") {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    startTransition(() => {
      router.push(`/programs?${params.toString()}`);
    });
  };

  const handleTabChange = (status: string) => {
    setActiveTab(status);
    updateURL({ status });
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    // Debounce search
    const timeoutId = setTimeout(() => {
      updateURL({ search: value });
    }, 500);
    return () => clearTimeout(timeoutId);
  };

  const handleSortChange = (sort: string) => {
    updateURL({ sort });
  };

  const handleDateChange = (date: DateRange | undefined) => {
    setDateRange(date);
    if (date?.from && date?.to) {
      updateURL({
        start_date: date.from.toISOString().split("T")[0],
        end_date: date.to.toISOString().split("T")[0],
      });
    } else {
      // Clear date filters if range is incomplete
      const params = new URLSearchParams(searchParams.toString());
      params.delete("start_date");
      params.delete("end_date");
      startTransition(() => {
        router.push(`/programs?${params.toString()}`);
      });
    }
  };

  const tabs = [
    { value: "all", label: "All" },
    { value: "open", label: "Open" },
    { value: "upcoming", label: "Upcoming" },
    { value: "closed", label: "Closed" },
  ];

  return (
    <div className="w-full flex items-center justify-between gap-6 mb-6">
      {/* Tabs */}
      <div className="bg-[#f6f8fa] rounded-lg p-1 flex gap-1 w-[394px]">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => handleTabChange(tab.value)}
            disabled={isPending}
            className={`flex-1 px-2 py-1 rounded-md text-sm font-medium tracking-[-0.084px] transition-all ${
              activeTab === tab.value
                ? "bg-white text-[#0a0d14] shadow-sm"
                : "bg-transparent text-[#868c98]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="flex-1 flex items-center gap-3.5">
        {/* Search Input */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#868c98]" />
          <Input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            disabled={isPending}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#e2e4e9] rounded-lg shadow-sm text-sm text-[#868c98] placeholder:text-[#868c98]"
          />
        </div>

        {/* Date Filter */}
        <DateRangePicker
          date={dateRange}
          onDateChange={handleDateChange}
          disabled={isPending}
          placeholder="Filter by Date"
        />

        {/* Sort Dropdown */}
        <div className="w-[178px]">
          <Select
            value={currentFilters.sort}
            onValueChange={handleSortChange}
            disabled={isPending}
          >
            <SelectTrigger className="w-full bg-white border border-[#e2e4e9] rounded-lg shadow-sm h-10">
              <div className="flex items-center gap-2">
                <ArrowDownUp className="w-5 h-5 text-[#868c98]" />
                <SelectValue placeholder="Sort" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Recent First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="name">Name (A-Z)</SelectItem>
              <SelectItem value="name-desc">Name (Z-A)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default ProgramsFilter;
