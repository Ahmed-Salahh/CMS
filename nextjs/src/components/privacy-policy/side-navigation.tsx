"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";

const navItems = [
  { id: "us", label: "Us" },
  { id: "information-collect", label: "The information we collect" },
  { id: "collection-use", label: "Collection and use of your personal data" },
  { id: "transferring-disclosing", label: "Transferring and disclosing your personal data" },
  { id: "social-media", label: "Social Media" },
  { id: "protect-handle", label: "How We Protect and Handle Your Personal Data" },
  { id: "international-transfer", label: "International data transfer operations" },
  { id: "retention", label: "How long do we retain your personal data?" },
  { id: "your-rights", label: "Your Rights" },
  { id: "contact-us", label: "Contact Us" },
  { id: "legal-notice", label: "Legal notice" },
  { id: "links-websites", label: "Links to other websites" },
  { id: "privacy-personal", label: "Privacy and personal information" },
  { id: "disclaimer", label: "Disclaimer" },
  { id: "indemnification", label: "Indemnification" },
  { id: "copyright", label: "Ownership of the copyright of this website" },
  { id: "applicable-law", label: "Applicable law" },
  { id: "cookie-policy", label: "COOKIE POLICY" },
  { id: "cookies", label: "Cookies" },
  { id: "third-party-cookies", label: "How are third party cookies used?" },
  { id: "list-cookies", label: "List of cookies" },
];

export function SideNavigation() {
  const [activeSection, setActiveSection] = useState("us");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredItems = navItems.filter((item) =>
    item.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="bg-white border-r border-[#e2e4e9] flex flex-col gap-[20px] pr-[20px] py-[20px] w-[264px] sticky top-[100px] h-fit max-h-[calc(100vh-120px)] overflow-y-auto">
      {/* Header */}
      <div className="flex flex-col gap-[12px]">
        <div className="flex flex-col gap-[4px]">
          <h2 className="font-medium text-lg text-[#0a0d14] tracking-[-0.27px]">
            Privacy Policy
          </h2>
          <p className="font-normal text-sm text-[#525866] tracking-[-0.084px]">
            Switch between sections
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full">
          <Search className="absolute left-[8px] top-1/2 -translate-y-1/2 w-5 h-5 text-[#525866]" />
          <Input
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-[36px] py-[8px] bg-white border-none text-sm text-[#525866] placeholder:text-[#525866] rounded-[8px]"
          />
        </div>

        <Separator className="bg-[#e2e4e9]" />
      </div>

      {/* Navigation Items */}
      <nav className="flex flex-col gap-[8px]">
        {filteredItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleNavClick(item.id)}
            className={`text-left px-[8px] py-[8px] rounded-[8px] font-medium text-sm tracking-[-0.084px] transition-colors ${
              activeSection === item.id
                ? "bg-[#f6f8fa] text-[#0a0d14]"
                : "bg-white text-[#525866] hover:bg-[#f6f8fa]"
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </div>
  );
}
