"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Languages, Share2 } from "lucide-react";

interface EventSidebarProps {
  languages?: string | null;
  speaker?: string | null;
  speakerImage?: string | null;
  fee?: string | null;
}

export default function EventSidebar({
  languages,
  speaker,
  speakerImage,
  fee,
}: EventSidebarProps) {
  const handleRegister = () => {
    // Handle registration action
    console.log("Register clicked");
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: document.title,
          url: window.location.href,
        });
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      // Fallback: copy to clipboard
      await navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="space-y-6">
      {/* About Event Section */}
      <div className="space-y-0">
        {/* Languages */}
        {languages && (
          <div className="flex items-start gap-4 py-4 border-b border-[#e2e4e9] last:border-b-0">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#f6f8fa]">
              <Languages className="h-6 w-6 text-[#525866]" />
            </div>
            <div className="flex flex-col">
              <span className="font-montserrat text-xs font-normal leading-5 text-[#525866]">
                Languages
              </span>
              <span className="font-montserrat text-sm font-medium leading-6 text-[#0a0d14]">
                {languages}
              </span>
            </div>
          </div>
        )}

        {/* Speaker */}
        {speaker && (
          <div className="flex items-start gap-4 py-4 border-b border-[#e2e4e9] last:border-b-0">
            <div className="relative h-11 w-11 rounded-full overflow-hidden bg-[#f6f8fa]">
              {speakerImage ? (
                <Image
                  src={speakerImage}
                  alt={speaker}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-primary text-white font-montserrat text-sm font-medium">
                  {speaker.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <div className="flex flex-col">
              <span className="font-montserrat text-xs font-normal leading-5 text-[#525866]">
                Speaker
              </span>
              <span className="font-montserrat text-sm font-medium leading-6 text-[#0a0d14]">
                {speaker}
              </span>
            </div>
          </div>
        )}

        {/* Fee */}
        {fee && (
          <div className="flex items-start gap-4 py-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#f6f8fa]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-[#525866]"
              >
                <line x1="12" y1="1" x2="12" y2="23" />
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-montserrat text-xs font-normal leading-5 text-[#525866]">
                Fee
              </span>
              <span className="font-montserrat text-sm font-medium leading-6 text-[#0a0d14]">
                {fee}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="space-y-3.5 pt-4">
        <Button
          onClick={handleRegister}
          className="w-full h-10 bg-primary hover:bg-primary/90 font-montserrat text-sm font-medium"
        >
          Register Now
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="ml-2"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </Button>

        <Button
          variant="ghost"
          onClick={handleShare}
          className="w-full h-10 font-montserrat text-sm font-medium text-[#525866] hover:text-[#0a0d14] hover:bg-transparent"
        >
          Share
          <Share2 className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
