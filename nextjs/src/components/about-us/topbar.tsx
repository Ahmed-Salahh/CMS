import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronRight, Languages, Search } from "lucide-react";

interface TopbarProps {
  logoSrc: string;
  searchIconSrc: string;
  translateIconSrc: string;
  arrowRightSrc: string;
}

export function Topbar({
  logoSrc,
  searchIconSrc,
  translateIconSrc,
  arrowRightSrc,
}: TopbarProps) {
  return (
    <div className="absolute bg-white border-b border-[#e2e4e9] flex gap-[16px] items-center left-1/2 px-[44px] py-[20px]  -translate-x-1/2 w-[1440px] z-50">
      <div className="flex flex-1 gap-[24px] items-center overflow-clip">
        <div className="h-[40px] overflow-clip w-[80px]">
          <div className="absolute inset-0">
            <Image
              alt="Altamayyuz Logo"
              className="block mt-2 "
              src={logoSrc}
              width={100}
              height={40}
            />
          </div>
        </div>
        <div className="flex gap-[4px] items-start">
          <div className="bg-white flex gap-[8px] items-center px-[12px] py-[8px] rounded-[8px]">
            <div className="font-medium text-sm text-[#525866] tracking-tight">
              Home
            </div>
          </div>
          <div className="bg-[#f6f8fa] flex gap-[8px] items-center px-[12px] py-[8px] rounded-[8px]">
            <div className="font-medium text-sm text-[#0a0d14] tracking-tight">
              About Us
            </div>
          </div>
          <a className="bg-white cursor-pointer flex gap-[8px] items-center px-[12px] py-[8px] rounded-[8px]">
            <div className="font-medium text-sm text-[#525866] tracking-tight">
              Programs
            </div>
          </a>
          <a className="bg-white cursor-pointer flex gap-[8px] items-center px-[12px] py-[8px] rounded-[8px]">
            <div className="font-medium text-sm text-[#525866] tracking-tight">
              Media
            </div>
          </a>
          <a className="bg-white cursor-pointer flex gap-[8px] items-center px-[12px] py-[8px] rounded-[8px]">
            <div className="font-medium text-sm text-[#525866] tracking-tight">
              Success Stories
            </div>
          </a>
          <a className="bg-white cursor-pointer flex gap-[8px] items-center px-[12px] py-[8px] rounded-[8px]">
            <div className="font-medium text-sm text-[#525866] tracking-tight">
              FAQs
            </div>
          </a>
          <a className="bg-white cursor-pointer flex gap-[8px] items-center px-[12px] py-[8px] rounded-[8px]">
            <div className="font-medium text-sm text-[#525866] tracking-tight">
              Contact Us
            </div>
          </a>
        </div>
      </div>
      <div className="flex flex-col gap-[4px] items-center w-[240px]">
        <div className="relative w-full">
         <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#525866] text-sm" />
          <Input placeholder="Search..." className="pl-10 bg-white" />
        </div>
      </div>
      <div className="flex gap-[16px] items-center">
        <div className="flex gap-[4px] items-center">
          <div className="flex gap-[4px] items-center justify-center">
            <div className="overflow-clip relative size-[20px]">
           <Languages className="absolute text-[#525866] text-sm" />
            </div>
            <p className="font-medium text-sm text-[#525866] tracking-tight">
              العربية
            </p>
          </div>
        </div>
        <Button className="bg-[#00adb5] hover:bg-[#00adb5]/90 border border-white gap-1">
          Login
      <ChevronRight />
        </Button>
      </div>
    </div>
  );
}
