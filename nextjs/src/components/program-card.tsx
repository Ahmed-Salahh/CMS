"use client";

import Image from "next/image";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Calendar, MapPin, Languages, ArrowRight } from "lucide-react";
import Link from "next/link";

interface ProgramCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  duration: string;
  language: string;
  location: string;
  targetAudience: string;
  status: "open" | "upcoming" | "closed";
  daysLeft?: number;
  hoursLeft?: number;
  redirectLink?: string;
}

const ProgramCard: React.FC<ProgramCardProps> = ({
  id,
  title,
  description,
  image,
  duration,
  language,
  location,
  targetAudience,
  status,
  daysLeft,
  hoursLeft,
  redirectLink = "/details/program",
}) => {
  const statusConfig = {
    open: { color: "bg-teal-500", text: "Open", bgClass: "bg-black/40" },
    upcoming: {
      color: "bg-yellow-500",
      text: "Upcoming",
      bgClass: "bg-black/40",
    },
    closed: { color: "bg-gray-500", text: "Closed", bgClass: "bg-black/40" },
  };

  const currentStatus = statusConfig[status];

  return (
    <Card className=" border border-[#e2e4e9] rounded-[18px] shadow-sm hover:shadow-md transition-shadow p-4">
      <div className="relative w-full h-[200px] ">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover rounded-lg"
        />

        {/* Countdown Timer - Top Left */}
        {(daysLeft !== undefined || hoursLeft !== undefined) && (
          <div className="absolute -top-2 -right-2 bg-white rounded-lg px-3 py-1 flex items-center gap-2">
            <div className="flex items-center gap-1">
              <div className="bg-[#f6f8fa] rounded-lg px-2 py-1">
                <span className="text-sm font-medium text-[#0a0d14]">
                  {String(daysLeft || 0).padStart(2, "0")}
                </span>
              </div>
              <span className="text-[11px] text-[#525866]/60">Days</span>
            </div>
            <span className="text-sm font-semibold text-[#525866]/60">:</span>
            <div className="flex items-center gap-1">
              <div className="bg-[#f6f8fa] rounded-lg px-2 py-1">
                <span className="text-sm font-medium text-[#0a0d14]">
                  {String(hoursLeft || 0).padStart(2, "0")}
                </span>
              </div>
              <span className="text-[11px] text-[#525866]/60">Hrs</span>
            </div>
            <span className="text-[13px] text-[#525866]">Left</span>
          </div>
        )}

        <div className="absolute bottom-4 left-4 flex">
          {/* Target Audience Tag - Bottom Left */}
          <div className=" bg-[#f6f8fa] rounded-l-md px-3 py-1">
            <span className="text-xs font-medium text-[#525866]">
              {targetAudience}
            </span>
          </div>

          {/* Status Badge - Bottom Center */}
          <div
            className={`${currentStatus.bgClass} backdrop-blur-sm rounded-r-md px-3 py-1 flex items-center gap-1`}
          >
            <div className="w-4 h-4 relative">
              <div className="absolute inset-[18.75%] rounded-full border-2 border-white" />
              <div
                className={`absolute inset-[31.25%] rounded-full ${currentStatus.color}`}
              />
            </div>
            <span className="text-xs font-medium text-white">
              {currentStatus.text}
            </span>
          </div>
        </div>
      </div>

      <CardHeader className="pt-4 px-0 pb-0 flex flex-col h-[calc(100%-200px-1rem)]">
        <div className="flex-1">
          <CardTitle className="text-lg font-semibold text-[#0a0d14] leading-6 mb-3">
            {title}
          </CardTitle>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-3">
            <Badge
              variant="outline"
              className="bg-white border-[#e2e4e9] text-[#525866] text-xs font-medium px-2 py-1 rounded-md flex items-center gap-1"
            >
              <Calendar className="w-4 h-4 text-[#cdd0d5]" />
              {duration}
            </Badge>
            <Badge
              variant="outline"
              className="bg-white border-[#e2e4e9] text-[#525866] text-xs font-medium px-2 py-1 rounded-md flex items-center gap-1"
            >
              <Languages className="w-4 h-4 text-[#cdd0d5]" />
              {language}
            </Badge>
            <Badge
              variant="outline"
              className="bg-white border-[#e2e4e9] text-[#525866] text-xs font-medium px-2 py-1 rounded-md flex items-center gap-1"
            >
              <MapPin className="w-4 h-4 text-[#cdd0d5]" />
              {location}
            </Badge>
          </div>

          {/* Description with opacity overlay */}
          <div className="relative mb-4">
            <CardDescription className="text-sm text-[#525866] leading-5 line-clamp-[5] text-justify">
              {description}
            </CardDescription>
            <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
          </div>
        </div>

        {/* Read More Button */}
        <Link href={`${redirectLink}?id=${id}`} className="mt-auto">
          <Button
            variant="ghost"
            className="w-full bg-[#f6f8fa] text-[#525866] hover:bg-[#e2e4e9] rounded-lg flex items-center justify-center gap-1 py-2"
          >
            Read More
            <ArrowRight className="w-5 h-5" />
          </Button>
        </Link>
      </CardHeader>
    </Card>
  );
};

export default ProgramCard;
