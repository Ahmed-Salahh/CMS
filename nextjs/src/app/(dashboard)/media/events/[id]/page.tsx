import React from "react";
import { notFound } from "next/navigation";
import PageHero from "@/components/page-hero";
import { SingleMediaResponse } from "@/types/media";
import EventHeroSection from "./event-hero-section";
import EventSidebar from "./event-sidebar";
import EventMetadata from "./event-metadata";
import RelatedEventsSection from "./related-events-section";
import { Separator } from "@/components/ui/separator";

interface PageProps {
  params: Promise<{ id: string }>;
}

async function fetchEventDetails(eventId: string): Promise<SingleMediaResponse | null> {
  try {
    const url = `${process.env.API_URL}/app/get_media/${eventId}/`;

    const response = await fetch(url, {
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error("Failed to fetch event details");
    }

    const data: SingleMediaResponse = await response.json();
    
    // Verify it's an event type
    if (data.media.Type !== "events") {
      return null;
    }
    
    return data;
  } catch (error) {
    console.error("Error fetching event details:", error);
    return null;
  }
}

export default async function EventDetailsPage({ params }: PageProps) {
  const { id } = await params;
  const data = await fetchEventDetails(id);

  if (!data) {
    notFound();
  }

  const { media: event, related_events = [] } = data;

  // Breadcrumbs
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Media", href: "/media" },
    { label: "Events", href: "/media?type=events" },
    { label: "Event Details" },
  ];

  return (
    <div className="flex min-h-screen w-full flex-col">
      {/* Hero Section with Gradient Background */}
      <PageHero
        title="Event Details"
        breadcrumbs={breadcrumbs}
      />

      {/* Main Content */}
      <div className="relative flex-1 bg-[#f6f8fa]">
        <div className="container mx-auto px-4 md:px-11 py-8 md:py-12">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            {/* Left Column - Main Content */}
            <div className="flex-1">
              {/* Hero Image Section with Countdown */}
              <EventHeroSection 
                image={event.Image} 
                eventStatus={event.EventStatus}
                daysLeft={event.DaysLeft}
                hoursLeft={event.HoursLeft}
              />

              {/* Event Title */}
              <h1 className="mt-6 md:mt-8 font-montserrat text-2xl md:text-[40px] font-medium leading-tight md:leading-[48px] tracking-[-0.4px] text-[#0a0d14]">
                {event.Title}
              </h1>

              {/* Location and Event Flyer Row */}
              <EventMetadata
                location={event.Location}
                locationAddress={event.LocationAddress}
                eventFlyer={event.EventFlyer}
                eventFlyerFileName={event.EventFlyerFileName}
                startDate={event.StartDate}
                endDate={event.EndDate}
                startTime={event.StartTime}
                endTime={event.EndTime}
              />

              {/* Event Description */}
              <div className="mt-6 space-y-6">
                <p className="font-montserrat text-sm md:text-base font-normal leading-5 tracking-[-0.096px] text-[#525866] text-justify">
                  {event.Description}
                </p>
                {event.LongDescription && (
                  <p className="font-montserrat text-sm md:text-base font-normal leading-5 tracking-[-0.096px] text-[#525866] text-justify">
                    {event.LongDescription}
                  </p>
                )}
              </div>

              {/* Divider */}
              <div className="my-8 md:my-12">
                <Separator className="bg-[#e2e4e9]" />
              </div>
            </div>

            {/* Right Column - Event Sidebar */}
            <div className="w-full lg:w-[264px] lg:shrink-0">
              <EventSidebar
                languages={event.Languages}
                speaker={event.Speaker}
                speakerImage={event.SpeakerImage}
                fee={event.Fee}
              />
            </div>
          </div>

          {/* Related Events Section */}
          {related_events.length > 0 && (
            <div className="mt-8 md:mt-12">
              <RelatedEventsSection relatedEvents={related_events} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
