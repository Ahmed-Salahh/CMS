"use client";

import { Home, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
export function HeroSection() {
  return (
    <div
      className="h-[244px] overflow-hidden relative mt-[80px]"
     
    >
          <Image
                src="/CMS/Header.png"
                alt="Success Stories Hero Background"   
                fill
                className="object-cover"
              />
      {/* Breadcrumbs */}
      <div className="absolute left-1/2 -translate-x-1/2 top-[166px] flex gap-[6px] items-center">
        <Link
          href="/"
          className="flex gap-[6px] items-center hover:opacity-80 transition-opacity"
        >
          <Home className="w-5 h-5 text-white" />
          <p
            className="font-['Montserrat'] font-medium text-[14px] leading-[20px] text-white tracking-[-0.084px]"
            style={{ fontFeatureSettings: "'calt' 0, 'liga' 0" }}
          >
            Home
          </p>
        </Link>
        <ChevronRight className="w-5 h-5 text-[#cdd0d5]" />
        <Link
          href="/success-stories"
          className="flex gap-[6px] items-center hover:opacity-80 transition-opacity"
        >
          <p
            className="font-['Montserrat'] font-medium text-[14px] leading-[20px] text-white tracking-[-0.084px]"
            style={{ fontFeatureSettings: "'calt' 0, 'liga' 0" }}
          >
            Success Stories
          </p>
        </Link>
        <ChevronRight className="w-5 h-5 text-[#cdd0d5]" />
        <div className="flex gap-[6px] items-center">
          <p
            className="font-['Montserrat'] font-medium text-[14px] leading-[20px] text-white tracking-[-0.084px]"
            style={{ fontFeatureSettings: "'calt' 0, 'liga' 0" }}
          >
            Story Details
          </p>
        </div>
      </div>

      {/* Title */}
      <h1
        className="absolute left-1/2 -translate-x-1/2 top-[138px] -translate-y-full text-center font-['Roboto'] font-medium text-[57px] leading-[64px] tracking-[-0.25px] text-white whitespace-nowrap"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        Story Details
      </h1>
    </div>
  );
}
