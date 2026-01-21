import Image from "next/image";
import { Home, ChevronRight } from "lucide-react";

interface HeroSectionProps {
  backgroundImageSrc: string;
}

export function HeroSection({ backgroundImageSrc }: HeroSectionProps) {
  return (
    <div className="absolute h-[244px] left-0 overflow-hidden top-[80px] w-full bg-gradient-to-r from-[#468796] to-[#3c4a78]">
      {/* Breadcrumbs */}
      <div className="absolute flex gap-[6px] items-center left-1/2 top-[166px] -translate-x-1/2">
        <div className="flex gap-[6px] items-center">
          <Home className="w-5 h-5 text-white" />
          <p className="font-medium text-sm text-white tracking-tight">Home</p>
        </div>
        <ChevronRight className="w-5 h-5 text-white/70" />
        <div className="flex gap-[6px] items-center">
          <p className="font-medium text-sm text-white tracking-tight">
            Privacy Policy
          </p>
        </div>
      </div>

      {/* Title */}
      <h1 className="absolute font-medium left-1/2 text-[57px] leading-[64px] text-white text-center top-[138px] -translate-x-1/2 -translate-y-full whitespace-nowrap tracking-[-0.25px]">
        Privacy Policy
      </h1>

      {/* Background decorative images */}
      <div className="absolute left-[-26px] size-[640px] top-[60px]">
        <Image
          alt="Background"
          className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
          src={backgroundImageSrc}
          width={640}
          height={640}
        />
      </div>
      <div className="absolute blur-[6px] left-[826px] size-[640px] top-[-222px]">
        <Image
          alt="Background blur"
          className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
          src={backgroundImageSrc}
          width={640}
          height={640}
        />
      </div>
    </div>
  );
}
