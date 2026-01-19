import { Linkedin } from "lucide-react";
import Image from "next/image";

interface FooterProps {
  logoSrc: string;
  twitterSrc: string;
  linkedinSrc: string;
  className?: string;
}

export function Footer({
  logoSrc,
  twitterSrc,
  linkedinSrc,
  className,
}: FooterProps) {
  return (
    <div className={className} data-name="Footer">
      <div className="flex gap-[30px] items-center w-full">
        <div className="flex items-center overflow-clip" data-name="Left">
          <div className="h-[40px] overflow-clip w-[80px]" data-name="Logo">
            <div className="relative h-full w-full">
              <Image
                alt="Logo"
                className="block max-w-none size-full"
                src={logoSrc}
                width={80}
                height={40}
              />
            </div>
          </div>
        </div>
        <div className="flex gap-[4px] items-start" data-name="Navigation Menu">
          <div className="bg-transparent flex gap-[8px] items-center px-[12px] py-[8px] rounded-[8px]">
            <div className="flex gap-[6px] items-center">
              <div className="font-medium text-sm text-white tracking-tight whitespace-nowrap">
                Home
              </div>
            </div>
          </div>
          <div className="bg-transparent flex gap-[8px] items-center px-[12px] py-[8px] rounded-[8px]">
            <div className="flex gap-[6px] items-center">
              <div className="font-medium text-sm text-white tracking-tight whitespace-nowrap">
                About Us
              </div>
            </div>
          </div>
          <div className="bg-transparent flex gap-[8px] items-center px-[12px] py-[8px] rounded-[8px]">
            <div className="flex gap-[6px] items-center">
              <div className="font-medium text-sm text-white tracking-tight whitespace-nowrap">
                Programs
              </div>
            </div>
          </div>
          <div className="bg-transparent flex gap-[8px] items-center px-[12px] py-[8px] rounded-[8px]">
            <div className="flex gap-[6px] items-center">
              <div className="font-medium text-sm text-white tracking-tight whitespace-nowrap">
                Media
              </div>
            </div>
          </div>
          <div className="bg-transparent flex gap-[8px] items-center px-[12px] py-[8px] rounded-[8px]">
            <div className="flex gap-[6px] items-center">
              <div className="font-medium text-sm text-white tracking-tight whitespace-nowrap">
                Success Stories
              </div>
            </div>
          </div>
          <div className="bg-transparent flex gap-[8px] items-center px-[12px] py-[8px] rounded-[8px]">
            <div className="flex gap-[6px] items-center">
              <div className="font-medium text-sm text-white tracking-tight whitespace-nowrap">
                FAQs
              </div>
            </div>
          </div>
          <div className="bg-transparent flex gap-[8px] items-center px-[12px] py-[8px] rounded-[8px]">
            <div className="flex gap-[6px] items-center">
              <div className="font-medium text-sm text-white tracking-tight whitespace-nowrap">
                Contact Us
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-[30px] items-center">
        <div className="flex gap-[4px] items-start" data-name="Navigation Menu">
          <a className="bg-transparent flex gap-[8px] items-center opacity-50 px-[12px] py-[8px] rounded-[8px]">
            <div className="flex gap-[6px] items-center">
              <div className="font-medium text-sm text-white tracking-tight whitespace-nowrap">
                Privacy Policy
              </div>
            </div>
          </a>
          <a className="bg-transparent flex gap-[8px] items-center opacity-50 px-[12px] py-[8px] rounded-[8px]">
            <div className="flex gap-[6px] items-center">
              <div className="font-medium text-sm text-white tracking-tight whitespace-nowrap">
                Complaints & Suggestions
              </div>
            </div>
          </a>
        </div>
        <div className="flex gap-[10px] items-center" data-name="Right">
          <div className="bg-white/10 flex gap-[4px] items-center justify-center overflow-clip p-[10px] rounded-[10px] shadow-sm">
            <div className="overflow-clip relative size-[20px]">
             <Image
                alt="Twitter/X"
                className="block max-w-none size-full"
                src={twitterSrc}
                width={20}
                height={20}
              />
            </div>
          </div>
          <div className="bg-white/10 flex gap-[4px] items-center justify-center overflow-clip p-[10px] rounded-[10px] shadow-sm">
            <div className="overflow-clip relative size-[20px]">
             <Linkedin width={20} height={20} className="text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
