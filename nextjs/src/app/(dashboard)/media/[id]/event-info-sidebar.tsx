"use client";

import Image from "next/image";
import { Languages, DollarSign, Share2, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MediaItem } from "@/types/media";

interface EventInfoSidebarProps {
  media: MediaItem;
  isUpcoming: boolean;
}

export default function EventInfoSidebar({ media, isUpcoming }: EventInfoSidebarProps) {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: media.Title,
        text: media.Description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="w-[264px] shrink-0">
      {/* Info Cards */}
      <div className="flex flex-col">
        {/* Languages */}
        <div className="flex items-center gap-4 border-b border-[#e2e4e9]/10 py-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#e2e4e9] bg-white p-2.5">
            <Languages className="h-6 w-6 text-[#525866]" />
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-['Montserrat'] text-sm font-normal leading-5 tracking-[-0.084px] text-[#525866]">
              Languages
            </p>
            <p className="font-['Montserrat'] text-base font-medium leading-6 tracking-[-0.176px] text-[#0a0d14]">
              {media.Languages || "Arabic, English"}
            </p>
          </div>
        </div>

        {/* Speaker */}
        <div className="flex items-center gap-4 border-b border-[#e2e4e9]/10 py-4">
          <div className="relative h-11 w-11 overflow-hidden rounded-full border border-[#e2e4e9]">
            {media.SpeakerImage ? (
              <Image
                src={media.SpeakerImage}
                alt={media.Speaker || "Speaker"}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-[#c2d6ff]">
                <span className="font-['Montserrat'] text-sm font-medium text-[#525866]">
                  {media.Speaker?.charAt(0) || "S"}
                </span>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-['Montserrat'] text-sm font-normal leading-5 tracking-[-0.084px] text-[#525866]">
              Speaker
            </p>
            <p className="font-['Montserrat'] text-base font-medium leading-6 tracking-[-0.176px] text-[#0a0d14]">
              {media.Speaker || "TBA"}
            </p>
          </div>
        </div>

        {/* Fee */}
        <div className="flex items-center gap-4 py-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#e2e4e9] bg-white p-2.5">
            <DollarSign className="h-6 w-6 text-[#525866]" />
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-['Montserrat'] text-sm font-normal leading-5 tracking-[-0.084px] text-[#525866]">
              Fee
            </p>
            <p className="font-['Montserrat'] text-base font-medium leading-6 tracking-[-0.176px] text-[#0a0d14]">
              {media.Fee || "Free"}
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex flex-col gap-3.5">
        {/* Register Button - Only for upcoming events */}
        {isUpcoming && (
          <Button
            className="h-10 w-full justify-between rounded-lg bg-primary px-3.5 font-['Montserrat'] text-sm font-medium text-white hover:bg-primary/90"
          >
            <span className="px-1">Register Now</span>
            <ChevronRight className="h-5 w-5" />
          </Button>
        )}

        {/* Share Button */}
        <Button
          variant="outline"
          className="h-10 w-full justify-between rounded-lg border-[#e2e4e9] bg-white px-3.5 font-['Montserrat'] text-sm font-medium text-[#525866] shadow-[0px_1px_2px_0px_rgba(82,88,102,0.06)] hover:bg-[#f6f8fa]"
          onClick={handleShare}
        >
          <span className="px-1">Share</span>
          <Share2 className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
