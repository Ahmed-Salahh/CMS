import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {  ChevronRight, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface FeaturedStoryCardProps {
  id: number;
  title: string;
  description: string;
  authorName: string;
  authorImage?: string;
  image: string;
  rating?: number;
}

export function FeaturedStoryCard({
  id,
  title,
  description,
  authorName,
  authorImage,
  image,
  rating = 4.5,
}: FeaturedStoryCardProps) {
  return (
    <Link href={`/success-stories/${id}`} className="block">
      <Card className="flex h-[427px] w-[872px] overflow-hidden rounded-[12px] border-0 shadow-md hover:shadow-lg transition-shadow cursor-pointer">
        {/* Left side - Image */}
        <div className="relative w-[419px] flex-shrink-0">
          <Image src={image} alt={title} fill className="object-cover" />
          {/* Rating Badge */}
          <div className="absolute bottom-[22px] left-[14px]">
            <Badge className="flex items-center gap-1 bg-white/90 text-[#0a0d14] hover:bg-white">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{rating}</span>
            </Badge>
          </div>
        </div>

        {/* Right side - Content */}
        <div className="flex flex-col justify-between p-[22px] pl-[28px]">
          <div>
            <h3 className="mb-[13px] text-2xl font-semibold text-[#0a0d14] leading-[32px]">
              {title}
            </h3>

            {/* Author Info */}
            <div className="mb-[24px] flex items-center gap-[8px]">
              <div className="relative h-6 w-6 overflow-hidden rounded-full bg-[#e9ecef] flex items-center justify-center">
                {authorImage ? (
                  <Image
                    src={authorImage}
                    alt={authorName}
                    width={54}
                    height={54}
                    priority
                   
                    className="object-cover"
                    unoptimized
                  />
                ) : (
                  <span className="text-xs font-medium text-[#525866]">
                    {authorName.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              <span className="text-sm font-medium text-[#525866]">
                {authorName}
              </span>
            </div>

            {/* Description */}
            <p
              className="text-sm font-normal text-[#525866] leading-[20px] line-clamp-6"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          </div>

          {/* Read More Button */}
          <Button
        
            className="w-full flex items-center justify-center gap-2 text-sm font-medium bg-[#F6F8FA]  text-[#525866] hover:bg-[#E9ECEF] hover:text-[#525866]"
          >
            Read More <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </Card>
    </Link>
  );
}
