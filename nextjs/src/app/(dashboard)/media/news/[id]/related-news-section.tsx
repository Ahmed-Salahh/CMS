import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { MediaItem } from "@/types/media";
import { Button } from "@/components/ui/button";

interface RelatedNewsSectionProps {
  relatedNews: MediaItem[];
}

export default function RelatedNewsSection({
  relatedNews,
}: RelatedNewsSectionProps) {
  return (
    <div className="flex w-full flex-col">
      {/* Section Header */}
      <div className="relative mb-8">
        <div className="mb-2 flex items-center gap-4">
          <div className="relative h-[65px] w-[127px]">
            <Image
              src="/news-hero-default.jpg"
              alt="Logo"
              fill
              className="object-contain"
            />
          </div>
        </div>
        <h2 className="font-['Montserrat'] text-[40px] font-medium leading-[48px] tracking-[-0.4px] text-[#0a0d14]">
          Related News
        </h2>
        <div className="mt-2 h-px w-[50px] bg-linear-to-r from-[#00adb5] to-transparent" />
      </div>

      {/* Related News Grid */}
      <div className="relative overflow-hidden">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {relatedNews.slice(0, 4).map((news) => (
            <div key={news.MediaID} className="group relative">
              <div className="relative h-[344px] w-full overflow-hidden rounded-[18px] border border-[#e2e4e9] bg-white shadow-[0px_1px_2px_0px_rgba(228,229,231,0.24)]">
                {/* Image */}
                <div className="absolute inset-[22px_22px_194px_22px] overflow-hidden rounded-[10px]">
                  <Image
                    src={news.Image || "/news-hero-default.jpg"}
                    alt={news.Title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Tag */}
                <div className="absolute bottom-[204px] left-[32px] flex h-6 items-center justify-center rounded-md bg-[#f6f8fa] px-2 py-1">
                  <p className="font-['Montserrat'] text-xs font-medium leading-4 text-[#525866]">
                    News
                  </p>
                </div>

                {/* Title */}
                <div className="absolute inset-x-[22px] top-[162px]">
                  <p className="line-clamp-2 font-['Montserrat'] text-base font-medium leading-5 tracking-[-0.096px] text-[#0a0d14]">
                    {news.Title}
                  </p>
                </div>

                {/* Description */}
                <div className="absolute inset-x-[22px] top-[207px]">
                  <p className="line-clamp-3 bg-linear-to-b from-[#525866] to-white bg-clip-text font-['Montserrat'] text-sm font-normal leading-5 tracking-[-0.084px] text-transparent">
                    {news.Description}
                  </p>
                </div>

                {/* Read More Button */}
                <Link href={`/media/news/${news.MediaID}`} className="absolute inset-x-[22px] bottom-[16px]">
                  <Button
                    variant="outline"
                    className="flex w-full items-center justify-center gap-1 rounded-lg border-none bg-[#f6f8fa] p-2 shadow-none hover:bg-[#f6f8fa]/90"
                  >
                    <div className="flex items-center justify-center px-1">
                      <p className="font-['Montserrat'] text-sm font-medium leading-5 tracking-[-0.084px] text-[#525866]">
                        Read More
                      </p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-[#525866]" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Gradient Fade on Right */}
        <div className="pointer-events-none absolute right-0 top-0 h-full w-48 bg-linear-to-l from-white to-transparent" />
      </div>
    </div>
  );
}
