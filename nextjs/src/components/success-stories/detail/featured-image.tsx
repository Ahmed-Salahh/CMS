"use client";

import Image from "next/image";
import { Star } from "lucide-react";

interface FeaturedImageProps {
  imageUrl: string;
  rating: number;
}

export function FeaturedImage({ imageUrl, rating }: FeaturedImageProps) {
  return (
    <div className="bg-white flex flex-col gap-[10px] p-[11px] rounded-[18px]">
      <div className="relative w-[975px] h-[229px] rounded-[10px] overflow-hidden">
        <Image
          src={imageUrl}
          alt="Story featured image"
          fill
          className="object-cover"
          priority
          unoptimized
        />

        {/* Rating Badge */}
        <div className="absolute bottom-[21px] left-[24px] bg-[#f6f8fa] flex items-center justify-center gap-[6px] px-[8px] py-[4px] rounded-[6px]">
          <div className="flex items-center gap-[1.6px] h-[16px]">
            <Star className="w-4 h-4 fill-[#f2ae40] text-[#f2ae40]" />
          </div>
          <div className="flex items-center gap-[6px]">
            <p
              className="font-['Inter'] font-normal text-[14px] leading-[20px] tracking-[-0.084px] text-[#161922]"
              style={{
                fontFeatureSettings: "'cv09' 1, 'ss11' 1, 'calt' 0, 'liga' 0",
              }}
            >
              {rating.toFixed(1)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
