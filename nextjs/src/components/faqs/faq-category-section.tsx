"use client";

import { useState } from "react";
import { Share2 } from "lucide-react";
import Image from "next/image";
import { FAQCategory } from "@/types/faqs";
import { FAQAccordionItem } from "./faq-accordion-item";

interface FAQCategorySectionProps {
  category: FAQCategory;
  onHelpfulClick?: (faqId: number, isHelpful: boolean) => void;
}

export function FAQCategorySection({
  category,
  onHelpfulClick,
}: FAQCategorySectionProps) {
  const [openFaqId, setOpenFaqId] = useState<number | null>(null);

  const handleToggleFaq = (faqId: number) => {
    setOpenFaqId(openFaqId === faqId ? null : faqId);
  };

  const handleShare = () => {
    // Copy category link to clipboard
    const url = `${window.location.origin}/faqs#${category.slug}`;
    navigator.clipboard.writeText(url);
  };

  return (
    <div id={category.slug} className="flex gap-[62px] items-start w-full scroll-mt-[100px]">
      {/* Left Side - Category Info */}
      <div className="relative grid grid-cols-[max-content] grid-rows-[max-content] items-start justify-items-start shrink-0">
        {/* Decoration Image */}
        <div className="col-start-1 row-start-1 w-[127px] h-[65px] relative">
          <svg width="127" height="65" viewBox="0 0 127 65" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.5" y="0.5" width="64" height="64" rx="7.5" stroke="#00ADB5"/>
            <rect x="62.5" y="0.5" width="64" height="64" rx="7.5" stroke="#00ADB5"/>
          </svg>
        </div>

        {/* Category Title */}
        <h2 className="col-start-1 row-start-1 ml-[62px] mt-[5px] font-['Montserrat'] font-medium text-[40px] leading-[48px] tracking-[-0.4px] text-[#0a0d14]">
          {category.name}
        </h2>

        {/* Share Button */}
        <button
          onClick={handleShare}
          className="col-start-1 row-start-1 ml-[390px] mt-[9px] bg-[rgba(226,228,233,0.5)] p-[10px] rounded-[10px] hover:bg-[rgba(226,228,233,0.8)] transition-colors"
        >
          <Share2 className="h-[20px] w-[20px] text-[#525866]" />
        </button>

        {/* Underline */}
        <div className="col-start-1 row-start-1 ml-[62px] mt-[65px] w-[50px] h-[5px] bg-primary rounded-full" />

        {/* Category Description */}
        <p className="col-start-1 row-start-1 ml-[62px] mt-[79px] w-[368px] font-['Montserrat'] font-medium text-[16px] leading-[24px] tracking-[-0.176px] text-[#525866] text-justify overflow-hidden text-ellipsis">
          {category.description}
        </p>
      </div>

      {/* Right Side - FAQ Accordion */}
      <div className="bg-white border border-[#e2e4e9] rounded-[16px] shadow-[0px_1px_2px_0px_rgba(228,229,231,0.24)] p-[10px] w-[608px] shrink-0">
        <div className="flex flex-col gap-[10px]">
          {category.faqs.map((faq) => (
            <FAQAccordionItem
              key={faq.id}
              faq={faq}
              isOpen={openFaqId === faq.id}
              onToggle={() => handleToggleFaq(faq.id)}
              onHelpfulClick={onHelpfulClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
