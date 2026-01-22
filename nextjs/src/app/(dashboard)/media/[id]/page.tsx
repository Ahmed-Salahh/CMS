import React from "react";
import PageHero from "@/components/page-hero";
import EventHeroImage from "./event-hero-image";
import EventInfoSidebar from "./event-info-sidebar";
import EventLocationCard from "./event-location-card";
import EventFlyerCard from "./event-flyer-card";
import EventDateInfo from "./event-date-info";
import RelatedEvents from "./related-events";
import { MediaItem } from "@/types/media";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

async function fetchMediaDetails(mediaId: string): Promise<{
  media: MediaItem;
  related_events: MediaItem[];
} | null> {
  try {
    const url = `${process.env.API_URL}/app/get_media/${mediaId}/`;

    const response = await fetch(url, {
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error("Failed to fetch media details");
    }

    const data = await response.json();
    return {
      media: data.media,
      related_events: data.related_events || [],
    };
  } catch (error) {
    console.error("Error fetching media details:", error);
    return null;
  }
}

export default async function MediaDetailsPage({ params }: PageProps) {
  const { id } = await params;
  const data = await fetchMediaDetails(id);

  if (!data) {
    notFound();
  }

  const { media, related_events } = data;
  const isEvent = media.Type === "events";
  const isUpcoming = media.EventStatus === "upcoming";

  // Dynamic breadcrumbs
  const breadcrumbs = [
    { label: "Media", href: "/media" },
    { label: isEvent ? "Events" : media.Type, href: `/media?type=${media.Type}` },
    { label: "Event Details" },
  ];

  return (
    <div className="flex min-h-screen w-full flex-col">
      {/* Hero Section */}
      <PageHero
        title="Event Details"
        breadcrumbs={breadcrumbs}
      />

      {/* Main Content */}
      <div className="relative bg-[#f6f8fa] pb-20">
        {/* White Background Overlay for Content Section */}
        <div className="absolute left-0 top-0 h-[824px] w-[1077px] bg-linear-to-r from-[#f6f8fa] to-[#f6f8fa]" />

        <div className="container relative mx-auto px-11">
          {/* Event Hero Section with Sidebar */}
          <div className="flex gap-10 pt-8">
            {/* Left Content - Hero Image and Details */}
            <div className="flex-1">
              {/* Hero Image Card */}
              <EventHeroImage
                media={media}
                isUpcoming={isUpcoming}
              />

              {/* Title and Description */}
              <div className="mt-8">
                <h1 className="font-['Montserrat'] text-[40px] font-medium leading-[48px] tracking-[-0.4px] text-[#0a0d14]">
                  {media.Title}
                </h1>

                {/* Location and Flyer Row */}
                <div className="mt-6 flex gap-4">
                  <EventLocationCard
                    location={media.Location}
                    locationAddress={media.LocationAddress}
                  />
                  <EventFlyerCard
                    flyerUrl={media.EventFlyer}
                    fileName={media.EventFlyerFileName}
                  />
                </div>

                {/* Description */}
                <div className="mt-8 space-y-4">
                  <p className="font-['Montserrat'] text-base font-normal leading-5 tracking-[-0.096px] text-[#525866] text-justify">
                    {media.LongDescription || media.Description}
                  </p>
                </div>

                {/* Divider */}
                <div className="my-8 h-px bg-[#e2e4e9]" />

                {/* Date and Time Info */}
                <EventDateInfo media={media} />
              </div>
            </div>

            {/* Right Sidebar */}
            <EventInfoSidebar media={media} isUpcoming={isUpcoming} />
          </div>

          {/* Related Events Section */}
          {related_events.length > 0 && (
            <RelatedEvents events={related_events} />
          )}
        </div>
      </div>
    </div>
  );
}
