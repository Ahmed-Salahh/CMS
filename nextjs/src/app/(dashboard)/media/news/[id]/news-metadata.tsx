import { Calendar, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface NewsMetadataProps {
  publishDate: string;
  tags: string[];
}

export default function NewsMetadata({ publishDate, tags }: NewsMetadataProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div className="flex w-full flex-col gap-6">
      {/* Tags */}
      <div className="flex gap-3">
        {tags.map((tag, index) => (
          <div
            key={index}
            className="flex items-center justify-center overflow-hidden rounded-md bg-[#eaedf0] px-2 py-1"
          >
            <p className="font-['Montserrat'] text-xs font-medium leading-4 text-[#525866]">
              {tag}
            </p>
          </div>
        ))}
      </div>

      {/* Divider */}
      <Separator className="bg-[#e2e4e9]" />

      {/* Metadata Container */}
      <div className="flex h-[72px] items-center gap-6">
        {/* Publish Date */}
        <div className="flex items-center">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-[#e2e4e9] bg-white shadow-[0px_1px_2px_0px_rgba(228,229,231,0.24)]">
              <Calendar className="h-6 w-6 text-[#0a0d14]" />
            </div>
            <div className="flex flex-col gap-0.5">
              <p className="font-['Montserrat'] text-xs font-normal leading-4 text-[#525866]">
                Publish Date
              </p>
              <p className="font-['Montserrat'] text-sm font-normal leading-5 tracking-[-0.084px] text-[#0a0d14]">
                {formatDate(publishDate)}
              </p>
            </div>
          </div>
        </div>

        {/* Vertical Divider */}
        <div className="flex h-[72px] w-0 items-center justify-center">
          <div className="h-[72px] w-px rotate-90">
            <Separator className="bg-[#e2e4e9]" />
          </div>
        </div>

        {/* Helpful Buttons */}
        <div className="flex items-center">
          <div className="flex items-center gap-2.5">
            <Button
              variant="outline"
              size="sm"
              className="flex h-auto items-center justify-center gap-0.5 rounded-lg border-none bg-[#f6f8fa] px-0 py-0 shadow-none hover:bg-[#f6f8fa]/90"
            >
              <ThumbsUp className="h-5 w-5 text-[#525866]" />
              <div className="flex items-center justify-center px-1">
                <p className="font-['Montserrat'] text-sm font-medium leading-5 tracking-[-0.084px] text-[#525866]">
                  Helpful
                </p>
              </div>
            </Button>
            <div className="flex h-[17px] w-0 items-center justify-center">
              <div className="h-[17px] w-px rotate-90">
                <Separator className="bg-[#e2e4e9]" />
              </div>
            </div>
            <Button
              variant="outline"
              size="icon"
              className="h-auto w-auto rounded-lg border-none bg-[#f6f8fa] p-0 shadow-none hover:bg-[#f6f8fa]/90"
            >
              <div className="rotate-180">
                <ThumbsUp className="h-5 w-5 text-[#525866]" />
              </div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
