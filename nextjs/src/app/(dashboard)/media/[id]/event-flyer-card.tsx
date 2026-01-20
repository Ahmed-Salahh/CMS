"use client";

import { FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EventFlyerCardProps {
  flyerUrl?: string | null;
  fileName?: string | null;
}

export default function EventFlyerCard({ flyerUrl, fileName }: EventFlyerCardProps) {
  const handleDownload = () => {
    if (flyerUrl) {
      window.open(flyerUrl, "_blank");
    }
  };

  if (!flyerUrl) {
    return null;
  }

  return (
    <div className="flex w-[240px] items-center gap-3.5 rounded-2xl bg-black/5 p-4 shadow-[0px_1px_2px_0px_rgba(228,229,231,0.24)]">
      {/* PDF Icon */}
      <div className="relative flex h-8 w-8 shrink-0 items-center justify-center">
        <FileText className="h-8 w-8 text-[#df1c41]" />
        <div className="absolute -bottom-1 left-0 rounded bg-[#df1c41] px-1 py-0.5">
          <span className="font-['Inter'] text-[8.8px] font-semibold uppercase tracking-[0.176px] text-white">
            PDF
          </span>
        </div>
      </div>

      {/* Text */}
      <div className="flex flex-1 flex-col gap-0.5 overflow-hidden">
        <p className="font-['Montserrat'] text-xs font-normal leading-4 text-[#525866]">
          Event Flyer
        </p>
        <p className="truncate font-['Montserrat'] text-sm font-normal leading-5 tracking-[-0.084px] text-[#0a0d14]">
          {fileName || "event-flyer.pdf"}
        </p>
      </div>

      {/* Download Button */}
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 shrink-0 rounded-lg"
        onClick={handleDownload}
      >
        <Download className="h-5 w-5 text-[#525866]" />
      </Button>
    </div>
  );
}
