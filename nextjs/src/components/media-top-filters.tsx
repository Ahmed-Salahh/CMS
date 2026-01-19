"use client";

import React, { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Calendar, Filter, Grid3x3 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SORT_OPTIONS = [
  { value: "recent", label: "Recent First" },
  { value: "oldest", label: "Oldest First" },
  { value: "title", label: "Title A-Z" },
];

// Media Type options for Gallery
const MEDIA_TYPE_OPTIONS = [
  { value: "all", label: "All" },
  { value: "image", label: "Image" },
  { value: "video", label: "Video" },
];

// Event Status options for Events
const EVENT_STATUS_OPTIONS = [
  { value: "all", label: "All" },
  { value: "upcoming", label: "Upcoming" },
  { value: "completed", label: "Completed" },
];

interface MediaTopFiltersProps {
  currentType: string;
}

export default function MediaTopFilters({ currentType }: MediaTopFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const currentSort = searchParams.get("sort") || "recent";
  const currentMediaType = searchParams.get("media_type") || "all";
  const currentEventStatus = searchParams.get("event_status") || "all";
  const currentDate = searchParams.get("date") || "";

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === "all" || value === "") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    params.delete("page"); // Reset to first page

    startTransition(() => {
      router.push(`/media?${params.toString()}`);
    });
  };

  // Determine which filters to show based on type
  const showMediaTypeFilter = currentType === "gallery";
  const showEventStatusFilter = currentType === "events";
  const showAnyFilters = currentType !== "all";

  if (!showAnyFilters) {
    return null;
  }

  return (
    <div className="mb-8 flex w-full gap-3.5">
      {/* Filter by Date - Always visible */}
      <div className="relative flex-1">
        <Calendar className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#868c98]" />
        <Input
          type="date"
          value={currentDate}
          onChange={(e) => updateFilter("date", e.target.value)}
          placeholder="Filter by Date"
          disabled={isPending}
          className="h-10 rounded-[10px] border-[#e2e4e9] bg-white pl-10 font-['Montserrat'] text-sm text-[#868c98] shadow-[0px_1px_2px_0px_rgba(228,229,231,0.24)]"
        />
      </div>

      {/* Sort Dropdown - Always visible */}
      <div className="flex-1">
        <Select
          value={currentSort}
          onValueChange={(value) => updateFilter("sort", value)}
          disabled={isPending}
        >
          <SelectTrigger className="h-10 rounded-[10px] border-[#e2e4e9] bg-white font-['Montserrat'] text-sm text-[#525866] shadow-[0px_1px_2px_0px_rgba(228,229,231,0.24)]">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-[#868c98]" />
              <SelectValue placeholder="Recent First" />
            </div>
          </SelectTrigger>
          <SelectContent>
            {SORT_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Media Type Dropdown - Only for Gallery */}
      {showMediaTypeFilter && (
        <div className="flex-1">
          <Select
            value={currentMediaType}
            onValueChange={(value) => updateFilter("media_type", value)}
            disabled={isPending}
          >
            <SelectTrigger className="h-10 rounded-[10px] border-[#e2e4e9] bg-white font-['Montserrat'] text-sm text-[#525866] shadow-[0px_1px_2px_0px_rgba(228,229,231,0.24)]">
              <div className="flex w-full items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Grid3x3 className="h-5 w-5 text-[#868c98]" />
                  <span>Media Type</span>
                </div>
                <span className="rounded-full bg-[#f6f8fa] px-2 py-0.5 text-xs font-medium text-[#525866]">
                  {MEDIA_TYPE_OPTIONS.find(
                    (opt) => opt.value === currentMediaType,
                  )?.label || "All"}
                </span>
              </div>
            </SelectTrigger>
            <SelectContent>
              {MEDIA_TYPE_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Event Status Dropdown - Only for Events */}
      {showEventStatusFilter && (
        <div className="flex-1">
          <Select
            value={currentEventStatus}
            onValueChange={(value) => updateFilter("event_status", value)}
            disabled={isPending}
          >
            <SelectTrigger className="h-10 rounded-[10px] border-[#e2e4e9] bg-white font-['Montserrat'] text-sm text-[#525866] shadow-[0px_1px_2px_0px_rgba(228,229,231,0.24)]">
              <div className="flex w-full items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Grid3x3 className="h-5 w-5 text-[#868c98]" />
                  <span>Event Status</span>
                </div>
                <span className="rounded-full bg-[#f6f8fa] px-2 py-0.5 text-xs font-medium text-[#525866]">
                  {EVENT_STATUS_OPTIONS.find(
                    (opt) => opt.value === currentEventStatus,
                  )?.label || "All"}
                </span>
              </div>
            </SelectTrigger>
            <SelectContent>
              {EVENT_STATUS_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
}
