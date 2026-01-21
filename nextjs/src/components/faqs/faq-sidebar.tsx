"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { FAQCategory } from "@/types/faqs";

interface FAQSidebarProps {
  categories: FAQCategory[];
  activeCategory: string | null;
  onCategorySelect: (slug: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function FAQSidebar({
  categories,
  activeCategory,
  onCategorySelect,
  searchQuery,
  onSearchChange,
}: FAQSidebarProps) {
  return (
    <div className="bg-white border-r border-[#e2e4e9] pr-[20px] py-[20px] w-[264px] flex flex-col gap-[20px]">
      {/* Header */}
      <div className="flex flex-col gap-[12px]">
        <div className="flex flex-col gap-[4px] w-[224px]">
          <h2 className="font-['Montserrat'] font-medium text-[18px] leading-[24px] tracking-[-0.27px] text-[#0a0d14]">
            FAQs
          </h2>
          <p className="font-['Montserrat'] font-normal text-[14px] leading-[20px] tracking-[-0.084px] text-[#525866]">
            Switch between sections
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full">
          <Search className="absolute left-[8px] top-1/2 -translate-y-1/2 h-[20px] w-[20px] text-[#525866]" />
          <Input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-[36px] py-[8px] bg-white rounded-[8px] border-none font-['Montserrat'] text-[14px] leading-[20px] tracking-[-0.084px] placeholder:text-[#525866]"
          />
        </div>

        {/* Divider */}
        <div className="h-px bg-[#e2e4e9] w-full" />
      </div>

      {/* Category Menu */}
      <div className="flex flex-col gap-[8px]">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategorySelect(category.slug)}
            className={cn(
              "w-full text-left p-[8px] rounded-[8px] flex items-center gap-[6px] transition-colors",
              activeCategory === category.slug
                ? "bg-[#f6f8fa]"
                : "bg-white hover:bg-[#f6f8fa]/50"
            )}
          >
            <span
              className={cn(
                "font-['Montserrat'] font-medium text-[14px] leading-[20px] tracking-[-0.084px]",
                activeCategory === category.slug
                  ? "text-[#0a0d14]"
                  : "text-[#525866]"
              )}
            >
              {category.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
