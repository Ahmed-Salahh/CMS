import { ChevronRight, Home } from "lucide-react";
import Image from "next/image";

export default function HeaderSection() {
  return (
    <div className="relative h-[244px] w-full">
      {/* Background Image */}
      <Image
        src="/CMS/Header.png"
        alt="Contact Us Hero Background"
        fill
        className="object-cover"
      />

      {/* Title */}
      <h1 className="absolute left-1/2 top-[138px] -translate-x-1/2 -translate-y-full whitespace-nowrap text-center text-5xl font-semibold text-white">
        Contact Us
      </h1>

      {/* Breadcrumbs */}
      <div className="absolute left-1/2 top-[166px] flex -translate-x-1/2 items-center gap-[6px]">
        <div className="flex items-center gap-[6px]">
          <Home className="h-5 w-5 text-white" />
          <p className="text-sm font-medium tracking-tight text-white">Home</p>
        </div>
        <ChevronRight className="h-5 w-5 text-white/70" />
        <div className="flex items-center gap-[6px]">
          <p className="text-sm font-medium tracking-tight text-white">
            Contact Us
          </p>
        </div>
      </div>
    </div>
  );
}
