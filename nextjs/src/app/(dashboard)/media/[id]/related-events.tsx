"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MediaItem } from "@/types/media";

interface RelatedEventsProps {
  events: MediaItem[];
}

export default function RelatedEvents({ events }: RelatedEventsProps) {
  return (
    <div className="mt-16">
      {/* Header */}
      <div className="relative mb-8">
        {/* Logo Container Background */}
        <div className="absolute -left-11 top-0 h-[65px] w-[127px] bg-linear-to-r from-primary to-primary/80 rounded-r-lg" />
        
        <div className="flex items-end gap-4 pl-16">
          <h2 className="font-['Montserrat'] text-[40px] font-medium leading-[48px] tracking-[-0.4px] text-[#0a0d14]">
            Related Events
          </h2>
        </div>
        <div className="ml-16 mt-3 h-[5px] w-[50px] rounded bg-primary" />
      </div>

      {/* Events Grid */}
      <div className="relative">
        <div className="flex gap-6 overflow-hidden">
          {events.map((event) => (
            <RelatedEventCard key={event.MediaID} event={event} />
          ))}
        </div>
        
        {/* Fade Effect on Right */}
        {events.length > 3 && (
          <div className="absolute right-0 top-0 h-full w-[192px] bg-linear-to-r from-transparent to-white pointer-events-none" />
        )}
      </div>
    </div>
  );
}

interface RelatedEventCardProps {
  event: MediaItem;
}

function RelatedEventCard({ event }: RelatedEventCardProps) {
  const isUpcoming = event.EventStatus === "upcoming";

  return (
    <Link href={`/media/${event.MediaID}`}>
      <Card className="relative w-[332px] shrink-0 overflow-hidden rounded-[18px] border-[#e2e4e9] bg-white p-[22px] shadow-[0px_1px_2px_0px_rgba(228,229,231,0.24)] transition-shadow hover:shadow-lg">
        {/* Image Container */}
        <div className="relative h-[128px] w-full overflow-hidden rounded-lg">
          <Image
            src={event.Image || "/images/placeholder.jpg"}
            alt={event.Title}
            fill
            className="object-cover"
          />

          {/* Tags */}
          <div className="absolute bottom-2 left-2 flex gap-1">
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

          {/* Countdown Timer for Upcoming Events */}
          {isUpcoming && event.DaysLeft !== null && event.HoursLeft !== null && (
            <div className="absolute -top-2 right-0 flex h-[42px] items-center gap-2 rounded-lg bg-white px-2 py-1 shadow-xs">
              <div className="flex flex-col items-center justify-center rounded-lg bg-[#f6f8fa] px-2 py-1.5">
                <p className="font-['Montserrat'] text-center text-sm font-medium leading-5 tracking-[-0.084px] text-[#0a0d14]">
                  {String(event.DaysLeft).padStart(2, "0")}
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
                  {String(event.HoursLeft).padStart(2, "0")}
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

        {/* Content */}
        <div className="mt-4">
          <h3 className="font-['Montserrat'] text-base font-medium leading-5 tracking-[-0.096px] text-[#0a0d14]">
            {event.Title}
          </h3>
          <p className="mt-2 line-clamp-3 bg-linear-to-b from-[#525866] to-white bg-clip-text font-['Montserrat'] text-sm font-normal leading-5 tracking-[-0.084px] text-transparent">
            {event.Description}
          </p>
        </div>

        {/* Read More Button */}
        <Button
          variant="ghost"
          className="mt-4 h-10 w-full justify-center gap-1 rounded-lg bg-[#f6f8fa] font-['Montserrat'] text-sm font-medium text-[#525866] hover:bg-[#e2e4e9]"
        >
          Read More
          <ChevronRight className="h-5 w-5" />
        </Button>
      </Card>
    </Link>
  );
}
