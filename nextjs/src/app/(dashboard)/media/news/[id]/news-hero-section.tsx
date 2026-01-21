import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NewsHeroSectionProps {
  image: string;
  title: string;
}

export default function NewsHeroSection({ image, title }: NewsHeroSectionProps) {
  return (
    <div className="relative h-[251px] w-full max-w-[997px]">
      {/* Main Card Container */}
      <div className="absolute inset-0 rounded-[18px] border border-[#e2e4e9] bg-white shadow-[0px_1px_2px_0px_rgba(228,229,231,0.24)]">
        {/* Hero Image */}
        <div className="absolute inset-[11px_11px] overflow-hidden rounded-[10px]">
          <Image
            src={image || "/news-hero-default.jpg"}
            alt={title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Carousel Indicators */}
        <div className="absolute bottom-[37px] left-1/2 flex -translate-x-1/2 gap-2">
          {[0, 1, 2, 3, 4].map((index) => (
            <div
              key={index}
              className={`h-1 w-[22px] rounded-[1.2px] ${
                index === 2
                  ? "bg-[#e2e4e9]"
                  : "bg-[rgba(0,0,0,0.4)] backdrop-blur-[2px]"
              }`}
            />
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="absolute left-[33px] right-[33px] top-1/2 flex -translate-y-1/2 items-center justify-between">
          <Button
            variant="outline"
            size="icon"
            className="h-10 w-10 rounded-full border-[#e2e4e9] bg-white shadow-[0px_1px_2px_0px_rgba(82,88,102,0.06)] hover:bg-white/90"
          >
            <ChevronLeft className="h-5 w-5 text-[#525866]" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-10 w-10 rounded-full bg-[#f6f8fa] hover:bg-[#f6f8fa]/90"
          >
            <ChevronRight className="h-5 w-5 text-[#525866]" />
          </Button>
        </div>

        {/* Tag */}
        <div className="absolute bottom-[21px] left-[21px] flex h-6 items-center justify-center rounded-md bg-[#f6f8fa] px-2 py-1">
          <p className="font-['Montserrat'] text-xs font-medium leading-4 text-[#525866]">
            News
          </p>
        </div>
      </div>
    </div>
  );
}
