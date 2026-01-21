import Image from "next/image";
import { Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NewsAuthorSidebarProps {
  authorName?: string;
  authorImage?: string;
}

export default function NewsAuthorSidebar({
  authorName = "Ali Mohamed Ghamri",
  authorImage = "/author-avatar.png",
}: NewsAuthorSidebarProps) {
  return (
    <div className="flex w-[264px] flex-col gap-8">
      {/* Author Info */}
      <div className="flex w-full flex-col">
        <div className="flex h-[76px] items-center gap-4 overflow-hidden bg-white pr-4">
          <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-[#e2e4e9] bg-white">
            <div className="relative h-full w-full overflow-hidden rounded-full bg-[#c2d6ff]">
              <Image
                src={authorImage}
                alt={authorName}
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-['Montserrat'] text-sm font-normal leading-5 tracking-[-0.084px] text-[#525866]">
              Author
            </p>
            <p className="font-['Montserrat'] text-base font-medium leading-6 tracking-[-0.176px] text-[#0a0d14]">
              {authorName}
            </p>
          </div>
        </div>
      </div>

      {/* Share Button */}
      <div className="flex w-full flex-col gap-[14px]">
        <Button
          variant="outline"
          className="flex h-10 w-full items-center justify-center gap-1 rounded-[10px] border-[#e2e4e9] bg-white pl-[14px] pr-[10px] shadow-[0px_1px_2px_0px_rgba(82,88,102,0.06)] hover:bg-white/90"
        >
          <div className="flex items-center justify-center px-1">
            <p className="font-['Montserrat'] text-sm font-medium leading-5 tracking-[-0.084px] text-[#525866]">
              Share
            </p>
          </div>
          <Share2 className="h-5 w-5 text-[#525866]" />
        </Button>
      </div>
    </div>
  );
}
