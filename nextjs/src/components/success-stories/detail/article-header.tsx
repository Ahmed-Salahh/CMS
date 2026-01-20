"use client";

import { GraduationCap, ChevronRight } from "lucide-react";
import Link from "next/link";

interface ArticleHeaderProps {
  title: string;
  programName: string;
}

export function ArticleHeader({ title, programName }: ArticleHeaderProps) {
  return (
    <div className="flex flex-col gap-[20px] w-full">
      {/* Title */}
      <h1
        className="font-['Montserrat'] font-medium text-[40px] leading-[48px] tracking-[-0.4px] text-[#0a0d14] whitespace-pre-wrap"
        style={{ fontFeatureSettings: "'calt' 0, 'liga' 0" }}
      >
        {title}
      </h1>

      {/* Program Info */}
      <div
        className="bg-[rgba(0,0,0,0.02)] flex gap-[14px] h-[61px] items-center overflow-hidden p-[16px] rounded-[16px] w-full"
        style={{ boxShadow: "0px 1px 2px 0px rgba(228, 229, 231, 0.24)" }}
      >
        {/* Icon */}
        <div
          className="border border-[#e2e4e9] border-solid flex items-center justify-center overflow-hidden p-[8px] rounded-full"
          style={{ boxShadow: "0px 1px 2px 0px rgba(228, 229, 231, 0.24)" }}
        >
          <GraduationCap className="w-6 h-6 text-[#0a0d14]" />
        </div>

        {/* Text */}
        <div className="flex-1 flex flex-col gap-[2px] items-start justify-center font-['Montserrat'] font-normal overflow-hidden text-ellipsis whitespace-nowrap">
          <p
            className="text-[12px] leading-[16px] text-[#525866] overflow-hidden w-full"
            style={{ fontFeatureSettings: "'calt' 0, 'liga' 0" }}
          >
            Program
          </p>
          <p
            className="text-[14px] leading-[20px] tracking-[-0.084px] text-[#0a0d14] overflow-hidden w-full"
            style={{ fontFeatureSettings: "'calt' 0, 'liga' 0" }}
          >
            {programName}
          </p>
        </div>

        {/* View Program Button */}
        <Link
          href="#"
          className="bg-[#f6f8fa] flex items-center justify-center overflow-hidden pl-[8px] pr-[6px] py-[6px] rounded-[8px] hover:bg-[#e2e4e9] transition-colors cursor-pointer"
        >
          <p
            className="font-['Montserrat'] font-medium text-[14px] leading-[20px] tracking-[-0.084px] text-[#525866] text-center px-[4px]"
            style={{ fontFeatureSettings: "'calt' 0, 'liga' 0" }}
          >
            View Program
          </p>
          <ChevronRight className="w-5 h-5 text-[#525866]" />
        </Link>
      </div>
    </div>
  );
}
