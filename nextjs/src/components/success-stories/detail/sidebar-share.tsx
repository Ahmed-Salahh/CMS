"use client";

import { Share2 } from "lucide-react";

export function SidebarShare() {
  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: document.title,
          url: window.location.href,
        })
        .catch(() => {
          // Fallback: copy to clipboard
          navigator.clipboard.writeText(window.location.href);
        });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="flex flex-col gap-[14px] items-start w-[264px]">
      <button
        onClick={handleShare}
        className="bg-white border border-[#e2e4e9] border-solid flex gap-[4px] items-center justify-center overflow-hidden pl-[14px] pr-[10px] py-[10px] rounded-[10px] w-full hover:bg-[#f6f8fa] transition-colors cursor-pointer"
        style={{ boxShadow: "0px 1px 2px 0px rgba(82, 88, 102, 0.06)" }}
      >
        <p
          className="font-['Montserrat'] font-medium text-[14px] leading-[20px] tracking-[-0.084px] text-[#525866] text-center px-[4px]"
          style={{ fontFeatureSettings: "'calt' 0, 'liga' 0" }}
        >
          Share
        </p>
        <Share2 className="w-5 h-5 text-[#525866]" />
      </button>
    </div>
  );
}
