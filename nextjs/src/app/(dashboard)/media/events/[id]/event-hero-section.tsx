"use client";

import React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

interface EventHeroSectionProps {
  image: string;
  eventStatus?: "upcoming" | "completed" | null;
  daysLeft?: number | null;
  hoursLeft?: number | null;
}

export default function EventHeroSection({
  image,
  eventStatus,
  daysLeft,
  hoursLeft,
}: EventHeroSectionProps) {
  const isUpcoming = eventStatus === "upcoming";
  const showCountdown = isUpcoming && daysLeft !== null && hoursLeft !== null;

  return (
    <div className="relative w-full rounded-[18px] border border-[#e2e4e9] bg-white p-[11px] shadow-sm">
      {/* Main Image Container */}
      <div className="relative w-full h-[200px] sm:h-[229px] rounded-[10px] overflow-hidden">
        <Image
          src={image || "/images/placeholder.jpg"}
          alt="Event"
          fill
          className="object-cover"
          priority
        />

        {/* Countdown Timer - Top Right */}
        {showCountdown && (
          <div className="absolute right-0 top-0 flex h-[42px] items-center gap-1 rounded-bl-[10px] rounded-tr-[10px] bg-white px-2 py-1">
            <div className="flex items-center gap-1">
              {/* Days */}
              <div className="flex flex-col items-center justify-center rounded-lg bg-[#f6f8fa] px-2 py-1.5">
                <span className="font-montserrat text-sm font-medium leading-5 tracking-[-0.084px] text-[#0a0d14]">
                  {String(daysLeft).padStart(2, "0")}
                </span>
              </div>
              <span className="font-montserrat text-[11px] font-normal leading-4 text-[#525866]/60">
                Days
              </span>
              <span className="font-montserrat text-sm font-semibold leading-4 text-[#525866]/60">
                :
              </span>
              {/* Hours */}
              <div className="flex flex-col items-center justify-center rounded-lg bg-[#f6f8fa] px-2 py-1.5">
                <span className="font-montserrat text-sm font-medium leading-5 tracking-[-0.084px] text-[#0a0d14]">
                  {String(hoursLeft).padStart(2, "0")}
                </span>
              </div>
              <span className="font-montserrat text-[11px] font-normal leading-4 text-[#525866]/60">
                Hrs
              </span>
              <span className="font-montserrat text-sm font-normal leading-5 tracking-[-0.084px] text-[#525866]">
                Left
              </span>
            </div>
          </div>
        )}

        {/* Tags - Bottom Left */}
        <div className="absolute bottom-2 left-2 flex gap-2">
          <Badge 
            variant="secondary" 
            className="bg-[#f6f8fa] font-montserrat text-xs font-medium text-[#525866]"
          >
            Event
          </Badge>
          {eventStatus && (
            <Badge 
              className="bg-black/40 font-montserrat text-xs font-medium text-white backdrop-blur-[2px] hover:bg-black/50"
            >
              {eventStatus === "upcoming" ? "Upcoming" : "Completed"}
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
}
