"use client";

import React from "react";
import { MapPin, Calendar, Clock, FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface EventMetadataProps {
  location?: string | null;
  locationAddress?: string | null;
  eventFlyer?: string | null;
  eventFlyerFileName?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  startTime?: string | null;
  endTime?: string | null;
}

function formatDate(dateString: string | null | undefined): string {
  if (!dateString) return "--";
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day} / ${month} / ${year}`;
}

function formatTime(timeString: string | null | undefined): string {
  if (!timeString) return "--";
  const [hours, minutes] = timeString.split(":");
  const hour = parseInt(hours, 10);
  const ampm = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 || 12;
  return `${String(displayHour).padStart(2, "0")} : ${minutes} ${ampm}`;
}

export default function EventMetadata({
  location,
  locationAddress,
  eventFlyer,
  eventFlyerFileName,
  startDate,
  endDate,
  startTime,
  endTime,
}: EventMetadataProps) {
  const handleDownloadFlyer = () => {
    if (eventFlyer) {
      window.open(eventFlyer, "_blank");
    }
  };

  const handleOpenMap = () => {
    if (locationAddress) {
      const encodedAddress = encodeURIComponent(locationAddress);
      window.open(`https://maps.google.com/?q=${encodedAddress}`, "_blank");
    }
  };

  return (
    <div className="mt-6 space-y-4">
      {/* Location and Event Flyer Row */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Location */}
        {(location || locationAddress) && (
          <div className="flex flex-1 items-center gap-3 rounded-lg border border-[#e2e4e9] bg-white p-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#f6f8fa]">
              <MapPin className="h-6 w-6 text-[#525866]" />
            </div>
            <div className="flex flex-1 flex-col min-w-0">
              <span className="font-montserrat text-xs font-normal text-[#525866]">
                Location
              </span>
              <span className="font-montserrat text-sm font-medium text-[#0a0d14] truncate">
                {locationAddress || location}
              </span>
            </div>
            {locationAddress && (
              <Button
                variant="ghost"
                size="icon"
                onClick={handleOpenMap}
                className="h-8 w-8 shrink-0"
                title="Open in maps"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[#525866]"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polygon points="10 8 16 12 10 16 10 8" />
                </svg>
              </Button>
            )}
          </div>
        )}

        {/* Event Flyer */}
        {eventFlyer && (
          <div className="flex items-center gap-3 rounded-lg border border-[#e2e4e9] bg-white p-3 md:w-[240px]">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center">
              <FileText className="h-6 w-6 text-red-500" />
            </div>
            <div className="flex flex-1 flex-col min-w-0">
              <span className="font-montserrat text-xs font-normal text-[#525866]">
                Event Flyer
              </span>
              <span className="font-montserrat text-sm font-medium text-[#0a0d14] truncate">
                {eventFlyerFileName || "Download Flyer"}
              </span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleDownloadFlyer}
              className="h-8 w-8 shrink-0"
              title="Download flyer"
            >
              <Download className="h-5 w-5 text-[#525866]" />
            </Button>
          </div>
        )}
      </div>

      {/* Date and Time Section */}
      {(startDate || endDate) && (
        <>
          <Separator className="bg-[#e2e4e9] my-6" />
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-0">
            {/* Start Date & Time */}
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#f6f8fa]">
                  <Calendar className="h-6 w-6 text-[#525866]" />
                </div>
                <div className="flex flex-col">
                  <span className="font-montserrat text-xs font-normal text-[#525866]">
                    Start Date
                  </span>
                  <span className="font-montserrat text-sm font-medium text-[#0a0d14]">
                    {formatDate(startDate)}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#f6f8fa]">
                  <Clock className="h-6 w-6 text-[#525866]" />
                </div>
                <div className="flex flex-col">
                  <span className="font-montserrat text-xs font-normal text-[#525866]">
                    Start Time
                  </span>
                  <span className="font-montserrat text-sm font-medium text-[#0a0d14]">
                    {formatTime(startTime)}
                  </span>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="hidden sm:block h-[72px] w-px bg-[#e2e4e9] mx-6" />

            {/* End Date & Time */}
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#f6f8fa]">
                  <Calendar className="h-6 w-6 text-[#525866]" />
                </div>
                <div className="flex flex-col">
                  <span className="font-montserrat text-xs font-normal text-[#525866]">
                    End Date
                  </span>
                  <span className="font-montserrat text-sm font-medium text-[#0a0d14]">
                    {formatDate(endDate)}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#f6f8fa]">
                  <Clock className="h-6 w-6 text-[#525866]" />
                </div>
                <div className="flex flex-col">
                  <span className="font-montserrat text-xs font-normal text-[#525866]">
                    End Time
                  </span>
                  <span className="font-montserrat text-sm font-medium text-[#0a0d14]">
                    {formatTime(endTime)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
