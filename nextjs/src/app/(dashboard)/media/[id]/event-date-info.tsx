"use client";

import { Calendar, Clock } from "lucide-react";
import { MediaItem } from "@/types/media";

interface EventDateInfoProps {
  media: MediaItem;
}

function formatDate(dateString: string | null | undefined): string {
  if (!dateString) return "TBA";
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day} / ${month} / ${year}`;
}

function formatTime(timeString: string | null | undefined): string {
  if (!timeString) return "TBA";
  const [hours, minutes] = timeString.split(":");
  const hour = parseInt(hours, 10);
  const ampm = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 || 12;
  return `${String(hour12).padStart(2, "0")} : ${minutes} ${ampm}`;
}

export default function EventDateInfo({ media }: EventDateInfoProps) {
  return (
    <div className="flex items-center gap-6">
      {/* Start Date & Time */}
      <div className="flex items-center gap-6">
        {/* Start Date */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e2e4e9] p-2 shadow-[0px_1px_2px_0px_rgba(228,229,231,0.24)]">
            <Calendar className="h-6 w-6 text-[#0a0d14]" />
          </div>
          <div className="flex flex-col gap-0.5">
            <p className="font-['Montserrat'] text-xs font-normal leading-4 text-[#525866]">
              Start Date
            </p>
            <p className="font-['Montserrat'] text-sm font-normal leading-5 tracking-[-0.084px] text-[#0a0d14]">
              {formatDate(media.StartDate)}
            </p>
          </div>
        </div>

        {/* Start Time */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e2e4e9] p-2 shadow-[0px_1px_2px_0px_rgba(228,229,231,0.24)]">
            <Clock className="h-6 w-6 text-[#0a0d14]" />
          </div>
          <div className="flex flex-col gap-0.5">
            <p className="font-['Montserrat'] text-xs font-normal leading-4 text-[#525866]">
              Start Time
            </p>
            <p className="font-['Montserrat'] text-sm font-normal leading-5 tracking-[-0.084px] text-[#0a0d14]">
              {formatTime(media.StartTime)}
            </p>
          </div>
        </div>
      </div>

      {/* Vertical Divider */}
      <div className="h-[72px] w-px bg-[#e2e4e9]" />

      {/* End Date & Time */}
      <div className="flex items-center gap-6">
        {/* End Date */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e2e4e9] p-2 shadow-[0px_1px_2px_0px_rgba(228,229,231,0.24)]">
            <Calendar className="h-6 w-6 text-[#0a0d14]" />
          </div>
          <div className="flex flex-col gap-0.5">
            <p className="font-['Montserrat'] text-xs font-normal leading-4 text-[#525866]">
              End Date
            </p>
            <p className="font-['Montserrat'] text-sm font-normal leading-5 tracking-[-0.084px] text-[#0a0d14]">
              {formatDate(media.EndDate)}
            </p>
          </div>
        </div>

        {/* End Time */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e2e4e9] p-2 shadow-[0px_1px_2px_0px_rgba(228,229,231,0.24)]">
            <Clock className="h-6 w-6 text-[#0a0d14]" />
          </div>
          <div className="flex flex-col gap-0.5">
            <p className="font-['Montserrat'] text-xs font-normal leading-4 text-[#525866]">
              End Time
            </p>
            <p className="font-['Montserrat'] text-sm font-normal leading-5 tracking-[-0.084px] text-[#0a0d14]">
              {formatTime(media.EndTime)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
