"use client";

import { Star } from "lucide-react";
import { useState } from "react";

export function SidebarRating() {
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);
  const [selectedRating, setSelectedRating] = useState<number>(0);

  const handleStarClick = (rating: number) => {
    setSelectedRating(rating);
    // TODO: Send rating to API
  };

  return (
    <div className="bg-white flex h-[76px] items-center overflow-hidden pr-[16px] py-[16px] w-full">
      <div className="flex-1 flex flex-col gap-[4px] items-start justify-center">
        <p
          className="font-['Montserrat'] font-medium text-[16px] leading-[24px] tracking-[-0.176px] text-[#161922] whitespace-pre-wrap"
          style={{ fontFeatureSettings: "'calt' 0, 'liga' 0" }}
        >
          Rate this Story
        </p>

        {/* Star Rating */}
        <div className="flex gap-[16px] items-center">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => handleStarClick(star)}
              onMouseEnter={() => setHoveredStar(star)}
              onMouseLeave={() => setHoveredStar(null)}
              className="overflow-hidden w-6 h-6 cursor-pointer transition-transform hover:scale-110"
            >
              <Star
                className={`w-6 h-6 ${
                  star <= (hoveredStar || selectedRating)
                    ? "fill-[#f2ae40] text-[#f2ae40]"
                    : "fill-[#ced2d0] text-[#ced2d0]"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
