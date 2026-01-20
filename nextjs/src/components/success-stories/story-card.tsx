import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface StoryCardProps {
  id: number;
  title: string;
  description: string;
  authorName: string;
  authorImage?: string;
  image: string;
  rating?: number;
}

export function StoryCard({
  id,
  title,
  description,
  authorName,
  authorImage,
  image,
  rating = 4.5,
}: StoryCardProps) {
  return (
    <Link href={`/success-stories/${id}`} className="block">
      <Card className="flex h-[427px] w-[424px] flex-col overflow-hidden rounded-[12px] border-0 shadow-md transition-shadow hover:shadow-lg cursor-pointer" data-testid="story-card">
        {/* Image */}
        <div className="relative h-[240px] w-full">
          <Image src={image} alt={title} fill className="object-cover" />
          {/* Rating Badge */}
          <div className="absolute bottom-[12px] left-[12px]">
            <Badge className="flex items-center gap-1 bg-white/90 text-[#0a0d14] hover:bg-white">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{rating}</span>
            </Badge>
          </div>
        </div>

        {/* Content */}
        <CardContent className="flex flex-1 flex-col p-[20px]">
          <h3 className="mb-[12px] text-lg font-semibold text-[#0a0d14] leading-[24px] line-clamp-2">
            {title}
          </h3>

          {/* Author Info */}
          <div className="mb-[12px] flex items-center gap-[8px]">
            <div className="relative h-5 w-5 overflow-hidden rounded-full bg-[#e9ecef] flex items-center justify-center">
              {authorImage ? (
                <Image
                  src={authorImage}
                  alt={authorName}
                  width={20}
                  height={20}
                  className="object-cover"
                  unoptimized
                />
              ) : (
                <span className="text-[10px] font-medium text-[#525866]">
                  {authorName.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
            <span className="text-xs font-medium text-[#525866]">
              {authorName}
            </span>
          </div>

          {/* Description */}
          <p
            className="text-sm font-normal text-[#525866] leading-[20px] line-clamp-3 flex-1"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </CardContent>

        {/* Footer */}
        <CardFooter className="p-[20px] pt-0">
          {/* <Button
            variant="outline"
            className="w-full border-[#468796] text-[#468796] hover:bg-[#468796] hover:text-white"
          >
            Read More
          </Button> */}
            <Button
        
            className="w-full flex items-center justify-center gap-2 text-sm font-medium bg-[#F6F8FA]  text-[#525866] hover:bg-[#E9ECEF] hover:text-[#525866]"
          >
            Read More <ChevronRight className="w-5 h-5" />
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
