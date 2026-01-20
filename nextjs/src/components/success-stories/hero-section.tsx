import { Home, ChevronRight } from "lucide-react";
import Image from "next/image";
export function HeroSection() {
  return (
    <div className="relative h-[244px] w-full ">
        <Image
        src="/CMS/Header.png"
        alt="Success Stories Hero Background"   
        fill
        className="object-cover"
      />
      <div className="absolute left-1/2 top-[166px] flex -translate-x-1/2 items-center gap-[6px]">
        <div className="flex items-center gap-[6px]">
          <Home className="h-5 w-5 text-white" />
          <p className="text-sm font-medium tracking-tight text-white">Home</p>
        </div>
        <ChevronRight className="h-5 w-5 text-white/70" />
        <div className="flex items-center gap-[6px]">
          <p className="text-sm font-medium tracking-tight text-white">
            Success Stories
          </p>
        </div>
      </div>
      <h1 className="absolute left-1/2 top-[138px] -translate-x-1/2 -translate-y-full whitespace-nowrap text-center text-5xl font-semibold text-white">
        Success Stories
      </h1>
    </div>
  );
}
