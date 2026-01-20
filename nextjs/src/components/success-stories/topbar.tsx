"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Search, ChevronRight, Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "../ui/input";

const imgLogo = "/CMS/Logo.svg";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about-us", label: "About Us" },
  { href: "/workflows", label: "Programs" },
  { href: "/success-stories", label: "Success Stories" },
  { href: "/media", label: "Media" },
  { href: "/faqs", label: "FAQs" },
  { href: "/contact-us", label: "Contact Us" },
];

export function Topbar() {
  const pathname = usePathname();

  return (
    <div className="fixed left-0 top-0 z-50 flex h-[80px] w-full items-center justify-around border-b border-gray-100 bg-white px-[60px] shadow-sm">
      {/* Logo */}
      <Link href="/" className="flex items-center">
        <div className="relative h-[40px] w-[150px]">
          <Image
            src={imgLogo}
            alt="Altamayyuz Academy"
            fill
            className="object-contain"
          />
        </div>
      </Link>

      {/* Navigation */}
      <nav className="flex items-center gap-[48px]">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition-colors ${
                isActive
                  ? "text-[#468796] border-b-2 border-[#468796]"
                  : "text-[#0a0d14] hover:text-[#468796]"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="flex flex-col gap-[4px] items-center w-[240px]">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#525866] text-sm" />
          <Input placeholder="Search..." className="pl-10 bg-white" />
        </div>
      </div>

      {/* Actions */}
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