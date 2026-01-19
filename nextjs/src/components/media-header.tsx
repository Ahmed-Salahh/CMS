import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Home } from "lucide-react";

const bgImage = "/header-bg.png";

interface MediaHeaderProps {
  currentPageTitle: string;
}

export default function MediaHeader({ currentPageTitle }: MediaHeaderProps) {
  return (
    <div className="relative h-[244px] w-full overflow-hidden bg-gradient-to-r from-[#468796] to-[#3c4a78]">
      {/* Background Images */}
      <div
        className="absolute left-[-26px] top-[60px] h-[640px] w-[640px] opacity-30"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div
        className="absolute left-[826px] top-[-222px] h-[640px] w-[640px] opacity-30 blur-md"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Content */}
      <div className="relative flex h-full flex-col items-center justify-center">
        {/* Title */}
        <h1 className="font-['Montserrat'] text-[57px] font-medium leading-[64px] tracking-[-0.25px] text-white">
          Media
        </h1>

        {/* Breadcrumbs */}
        <div className="mt-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink
                  href="/"
                  className="flex items-center gap-1.5 font-['Montserrat'] text-sm font-medium text-white hover:text-white/90"
                >
                  <Home className="h-5 w-5" />
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-[#cdd0d5]" />
              <BreadcrumbItem>
                <BreadcrumbPage className="font-['Montserrat'] text-sm font-medium text-white">
                  {currentPageTitle}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
    </div>
  );
}
