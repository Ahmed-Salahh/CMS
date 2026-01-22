import React from "react";
import Link from "next/link";
import MediaCard from "@/components/media-card";
import { MediaItem } from "@/types/media";

interface RelatedEventsSectionProps {
  relatedEvents: MediaItem[];
}

export default function RelatedEventsSection({
  relatedEvents,
}: RelatedEventsSectionProps) {
  if (relatedEvents.length === 0) {
    return null;
  }

  return (
    <section className="py-8">
      {/* Section Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="flex items-center justify-center w-[127px] h-[65px] relative">
          {/* Logo Container - matches Figma design */}
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#468796] to-[#3c4a78] flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          </div>
        </div>
        <div>
          <h2 className="font-montserrat text-3xl md:text-[40px] font-medium leading-tight md:leading-[48px] tracking-[-0.4px] text-[#0a0d14]">
            Related Events
          </h2>
          <div className="mt-2 h-[2px] w-[50px] bg-primary" />
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {relatedEvents.slice(0, 4).map((event) => (
          <Link
            key={event.MediaID}
            href={`/media/events/${event.MediaID}`}
            className="w-full"
          >
            <MediaCard media={event} />
          </Link>
        ))}
      </div>
    </section>
  );
}
