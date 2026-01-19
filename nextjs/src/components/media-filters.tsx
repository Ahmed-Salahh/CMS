"use client";

import React, { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const MEDIA_TYPES = [
  { id: "all", label: "All Media" },
  { id: "news", label: "News" },
  { id: "events", label: "Events" },
  { id: "gallery", label: "Gallery" },
  { id: "others", label: "Others" },
];

interface MediaFiltersProps {
  currentType: string;
  currentSearch: string;
}

export default function MediaFilters({
  currentType,
  currentSearch,
}: MediaFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchInput, setSearchInput] = useState(currentSearch);
  const [isPending, startTransition] = useTransition();

  const handleTypeChange = (type: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (type === "all") {
      params.delete("type");
    } else {
      params.set("type", type);
    }
    // Reset all filter parameters when changing type
    params.delete("page");
    params.delete("sort");
    params.delete("date");
    params.delete("media_type");
    params.delete("event_status");

    startTransition(() => {
      router.push(`/media?${params.toString()}`);
    });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());

    if (searchInput) {
      params.set("search", searchInput);
    } else {
      params.delete("search");
    }
    params.delete("page"); // Reset to first page

    startTransition(() => {
      router.push(`/media?${params.toString()}`);
    });
  };

  return (
    <div className="sticky top-0 h-screen w-[264px] border-r border-[#e2e4e9] bg-white">
      <div className="flex flex-col gap-5 p-5">
        {/* Title & Description */}
        <div className="flex flex-col gap-1">
          <h2 className="font-['Montserrat'] text-lg font-medium leading-6 tracking-[-0.27px] text-[#0a0d14]">
            Media
          </h2>
          <p className="font-['Montserrat'] text-sm font-normal leading-5 tracking-[-0.084px] text-[#525866]">
            Switch between sections
          </p>
        </div>

        {/* Search */}
        <form onSubmit={handleSearch} className="relative">
          <Search className="absolute left-2 top-1/2 h-5 w-5 -translate-y-1/2 text-[#525866]" />
          <Input
            type="text"
            placeholder="Search..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="h-9 rounded-lg border-none bg-white pl-9 pr-2 font-['Montserrat'] text-sm font-normal leading-5 tracking-[-0.084px] text-[#525866] placeholder:text-[#525866] focus-visible:ring-0"
          />
        </form>

        {/* Divider */}
        <Separator />

        {/* Category Tabs */}
        <div className="flex flex-col gap-2">
          {MEDIA_TYPES.map((type) => {
            const isActive = type.id === currentType;
            return (
              <Button
                key={type.id}
                onClick={() => handleTypeChange(type.id)}
                variant={isActive ? "secondary" : "ghost"}
                disabled={isPending}
                className="justify-start"
              >
                {type.label}
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
