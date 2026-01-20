"use client";

import Image from "next/image";

interface SidebarAuthorProps {
  authorName: string;
  authorImage: string;
}

export function SidebarAuthor({ authorName, authorImage }: SidebarAuthorProps) {
  return (
    <div className="bg-white flex flex-col gap-[2px] items-start w-full">
      <div className="bg-white border-b border-[rgba(226,228,233,0.1)] border-solid flex gap-[16px] h-[76px] items-center overflow-hidden pr-[16px] py-[16px] w-full">
        {/* Avatar */}
        <div className="bg-white border border-[#e2e4e9] border-solid flex items-center justify-center overflow-hidden rounded-full w-[44px] h-[44px]">
          <div className="relative w-full h-full bg-[#c2d6ff] rounded-full overflow-hidden">
            <Image
              src={authorImage || "/images/default-avatar.png"}
              alt={authorName}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        </div>

        {/* Text */}
        <div className="flex flex-col gap-[4px] items-start">
          <p
            className="font-['Montserrat'] font-normal text-[14px] leading-[20px] tracking-[-0.084px] text-[#525866]"
            style={{ fontFeatureSettings: "'calt' 0, 'liga' 0" }}
          >
            Story writer
          </p>
          <p
            className="font-['Montserrat'] font-medium text-[16px] leading-[24px] tracking-[-0.176px] text-[#0a0d14]"
            style={{ fontFeatureSettings: "'calt' 0, 'liga' 0" }}
          >
            {authorName}
          </p>
        </div>
      </div>
    </div>
  );
}
