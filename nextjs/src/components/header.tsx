"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ArrowRight, Globe, ChevronRight } from "lucide-react";

export default function Header() {
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/programs", label: "Programs" },
    { href: "/media", label: "Media" },
    { href: "/success-stories", label: "Success Stories" },
    { href: "/faqs", label: "FAQs" },
    { href: "/contact", label: "Contact Us" },
  ];

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="bg-white border-b border-[#e2e4e9] flex gap-4 items-center px-11 py-5">
      {/* Left Section */}
      <div className="flex flex-1 gap-6 items-center">
        {/* Logo */}
        <div className="h-10 w-20 relative overflow-hidden">
          <Image
            src="/logo.png"
            alt="Altamayyuz Academy"
            fill
            className="object-contain"
          />
        </div>

        {/* Navigation Menu */}
        <nav className="flex gap-1 items-start">
          {navLinks.map((link) => (
            <Button
              key={link.href}
              asChild
              variant="ghost"
              size="sm"
              className={`font-montserrat font-medium text-sm tracking-[-0.084px] ${
                isActive(link.href)
                  ? "bg-[#f6f8fa] text-[#0a0d14] hover:bg-[#f6f8fa]"
                  : "text-[#525866] hover:bg-[#f6f8fa]"
              }`}
            >
              <Link href={link.href}>{link.label}</Link>
            </Button>
          ))}
        </nav>
      </div>

      {/* Search Input */}
      <div className="w-60 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#868c98]" />
        <Input
          type="text"
          placeholder="Search..."
          className="pl-10 font-montserrat font-normal text-sm tracking-[-0.084px] border-[#e2e4e9] shadow-[0px_1px_2px_0px_rgba(228,229,231,0.24)]"
        />
      </div>

      {/* Right Section */}
      <div className="flex gap-4 items-center">
        {/* Language Switcher */}
        <Button
          variant="ghost"
          size="sm"
          className="gap-1 font-montserrat font-medium text-sm tracking-[-0.084px] text-[#525866]"
        >
          <Globe className="w-5 h-5" />
          <span>العربية</span>
        </Button>

        {/* Login Button */}
        <Button className="text-base">
          Login
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>
    </header>
  );
}
