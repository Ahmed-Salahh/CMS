import { Play } from "lucide-react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MediaItem } from "@/types/media";

export type { MediaItem };

interface MediaCardProps {
  media: MediaItem;
  onClick?: () => void;
}

export default function MediaCard({ media, onClick }: MediaCardProps) {
  const isEvent = media.Type === "events";
  const isGallery = media.Type === "gallery";
  const isUpcomingEvent = isEvent && media.EventStatus === "upcoming";

  return (
    <Card
      className="group relative flex max-h-[400px] w-full cursor-pointer flex-col rounded-[18px] border-[#e2e4e9] bg-white p-[22px] transition-shadow hover:shadow-lg"
      onClick={onClick}
    >
      {/* Image Container */}
      <div className="relative h-[197px] w-full">
        <Image
          src={media.Image || "/images/placeholder.jpg"}
          alt={media.Title}
          width={288}
          height={197}
          className="h-[197px] w-full object-cover rounded-lg"
        />

        {/* Tags */}
        <div
          className={`absolute flex gap-1 ${
            isGallery ? "bottom-2 left-2" : "bottom-2 left-2"
          }`}
        >
          {/* Type Tag */}
          <Badge variant="secondary" className="font-['Montserrat']">
            {media.Type.charAt(0).toUpperCase() + media.Type.slice(1)}
          </Badge>

          {/* Event Status Tag */}
          {isEvent && media.EventStatus && (
            <Badge
              variant="default"
              className="bg-black/40 text-white backdrop-blur-xs font-['Montserrat'] hover:bg-black/50"
            >
              {media.EventStatus === "upcoming" ? "Upcoming" : "Completed"}
            </Badge>
          )}

          {/* Gallery Facility Tag */}
          {isGallery && media.Facility && (
            <Badge
              variant="default"
              className="bg-black/40 text-white backdrop-blur-xs font-['Montserrat'] hover:bg-black/50"
            >
              {media.Facility}
            </Badge>
          )}
        </div>

        {/* Countdown Timer for Upcoming Events */}
        {isUpcomingEvent &&
          media.DaysLeft !== null &&
          media.HoursLeft !== null && (
            <div className="absolute right-0 -top-2 flex h-[42px] w-[205px] items-center gap-2 rounded-lg bg-white px-2 py-1">
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

        {/* Play Icon for Gallery Videos */}
        {isGallery && media.MediaType === "video" && (
          <div className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 p-1 backdrop-blur-xs">
            <Play className="h-8 w-8 fill-[#cdd0d5] text-[#cdd0d5]" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="my-4 flex flex-1 flex-col">
        <h3 className="font-['Montserrat'] text-base font-medium leading-5 tracking-[-0.096px] text-[#0a0d14]">
          {media.Title}
        </h3>
        <p className="mt-2 line-clamp-2 font-['Montserrat'] text-sm font-normal leading-5 tracking-[-0.084px] text-[#525866]">
          {media.Description}
        </p>
      </div>

      {/* Action Button */}
      <CardContent className="mt-auto p-0">
        <Button className="w-full bg-[#f6f8fa] font-['Montserrat'] text-sm font-medium text-[#525866] hover:bg-[#e2e4e9]">
          View Media
        </Button>
      </CardContent>
    </Card>
  );
}
