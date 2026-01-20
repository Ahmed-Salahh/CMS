"use client";

import { MapPin, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EventLocationCardProps {
  location?: string | null;
  locationAddress?: string | null;
}

export default function EventLocationCard({ location, locationAddress }: EventLocationCardProps) {
  const handleOpenMaps = () => {
    const query = encodeURIComponent(locationAddress || location || "");
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, "_blank");
  };

  if (!location && !locationAddress) {
    return null;
  }

  return (
    <div className="flex flex-1 items-center gap-3.5 rounded-2xl bg-black/5 p-4 shadow-[0px_1px_2px_0px_rgba(228,229,231,0.24)]">
      {/* Icon */}
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#e2e4e9] bg-white p-2 shadow-[0px_1px_2px_0px_rgba(228,229,231,0.24)]">
        <MapPin className="h-6 w-6 text-[#0a0d14]" />
      </div>

      {/* Text */}
      <div className="flex flex-1 flex-col gap-0.5 overflow-hidden">
        <p className="font-['Montserrat'] text-xs font-normal leading-4 text-[#525866]">
          Location
        </p>
        <p className="truncate font-['Montserrat'] text-sm font-normal leading-5 tracking-[-0.084px] text-[#0a0d14]">
          {locationAddress || location}
        </p>
      </div>

      {/* Directions Button */}
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 shrink-0 rounded-lg"
        onClick={handleOpenMaps}
      >
        <Navigation className="h-5 w-5 text-[#525866]" />
      </Button>
    </div>
  );
}
