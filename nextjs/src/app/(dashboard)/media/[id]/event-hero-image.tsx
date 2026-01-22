"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { MediaItem } from "@/types/media";

interface EventHeroImageProps {
  media: MediaItem;
  isUpcoming: boolean;
}

export default function EventHeroImage({ media, isUpcoming }: EventHeroImageProps) {
  return (
    <div className="relative w-full overflow-hidden rounded-[18px] border border-[#e2e4e9] bg-white p-[11px] shadow-[0px_1px_2px_0px_rgba(228,229,231,0.24)]">
      {/* Image */}
      <div className="relative h-[229px] w-full overflow-hidden rounded-[10px]">
        <Image
          src={media.Image || "/images/placeholder.jpg"}
          alt={media.Title}
          fill
          className="object-cover"
          priority
        />

        {/* Tags */}
        <div className="absolute bottom-3 left-3 flex gap-1">
          <Badge
            variant="secondary"
            className="rounded-md bg-[#f6f8fa] px-2 py-1 font-['Montserrat'] text-xs font-medium text-[#525866]"
          >
            Event
          </Badge>
          <Badge
            variant="default"
            className="rounded-md bg-black/40 px-2 py-1 font-['Montserrat'] text-xs font-medium text-white backdrop-blur-xs"
          >
            {isUpcoming ? "Upcoming" : "Completed"}
          </Badge>
        </div>
      </div>

      {/* Countdown Timer for Upcoming Events */}
      {isUpcoming && media.DaysLeft !== null && media.HoursLeft !== null && (
        <div className="absolute right-[11px] top-[11px] flex h-[42px] items-center gap-2 rounded-lg bg-white px-3 py-1 shadow-xs">
          <div className="flex flex-col items-center justify-center rounded-lg bg-[#f6f8fa] px-2 py-1.5">
            <p className="font-['Montserrat'] text-center text-sm font-medium leading-5 tracking-[-0.084px] text-[#0a0d14]">
              {String(media.DaysLeft).padStart(2, "0")}
            </p>
          </div>
          <p className="font-['Montserrat'] text-[11px] font-normal leading-4 text-[#525866]/60">
            Days
          </p>
          <p className="font-['Montserrat'] text-sm font-semibold leading-4 text-[#525866]/60">
            :
          </p>
          <div className="flex flex-col items-center justify-center rounded-lg bg-[#f6f8fa] px-2 py-1.5">
            <p className="font-['Montserrat'] text-center text-sm font-medium leading-5 tracking-[-0.084px] text-[#0a0d14]">
              {String(media.HoursLeft).padStart(2, "0")}
            </p>
          </div>
          <p className="font-['Montserrat'] text-[11px] font-normal leading-4 text-[#525866]/60">
            Hrs
          </p>
          <p className="font-['Montserrat'] text-[13px] font-normal leading-5 tracking-[-0.078px] text-[#525866]">
            Left
          </p>
        </div>
      )}
    </div>
  );
}
