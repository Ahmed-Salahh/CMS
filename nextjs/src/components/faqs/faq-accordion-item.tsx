"use client";

import { useState } from "react";
import { HelpCircle, Plus, Minus, ThumbsUp, ThumbsDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { FAQ } from "@/types/faqs";

interface FAQAccordionItemProps {
  faq: FAQ;
  isOpen: boolean;
  onToggle: () => void;
  onHelpfulClick?: (faqId: number, isHelpful: boolean) => void;
}

export function FAQAccordionItem({
  faq,
  isOpen,
  onToggle,
  onHelpfulClick,
}: FAQAccordionItemProps) {
  const [helpfulStatus, setHelpfulStatus] = useState<"helpful" | "not-helpful" | null>(null);

  const handleHelpfulClick = (isHelpful: boolean) => {
    setHelpfulStatus(isHelpful ? "helpful" : "not-helpful");
    onHelpfulClick?.(faq.id, isHelpful);
  };

  return (
    <div
      className={cn(
        "rounded-[10px] overflow-hidden transition-all",
        isOpen
          ? "bg-[#f6f8fa]"
          : "bg-white border border-[#e2e4e9] shadow-[0px_1px_2px_0px_rgba(228,229,231,0.24)]"
      )}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-start gap-[10px] p-[14px]"
      >
        {/* Question Icon */}
        <HelpCircle className="h-[20px] w-[20px] text-[#525866] shrink-0 mt-0" />

        {/* Question Text */}
        <div className="flex-1 text-left">
          <p className="font-['Montserrat'] font-medium text-[14px] leading-[20px] tracking-[-0.084px] text-[#0a0d14]">
            {faq.question}
          </p>

          {/* Answer (when open) */}
          {isOpen && (
            <div className="mt-[6px] flex flex-col gap-[6px] items-end">
              <p className="w-full font-['Montserrat'] font-normal text-[14px] leading-[20px] tracking-[-0.084px] text-[#525866]">
                {faq.answer}
              </p>

              {/* Helpful Buttons */}
              <div className="flex items-center gap-[10px]">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleHelpfulClick(true);
                  }}
                  className={cn(
                    "flex items-center gap-[2px] px-[4px] py-[2px] rounded-[8px] transition-colors",
                    helpfulStatus === "helpful"
                      ? "bg-[#e2e4e9]"
                      : "bg-[#f6f8fa] hover:bg-[#e2e4e9]"
                  )}
                >
                  <ThumbsUp className="h-[20px] w-[20px] text-[#525866]" />
                  <span className="font-['Montserrat'] font-medium text-[14px] leading-[20px] tracking-[-0.084px] text-[#525866] px-[4px]">
                    Helpful
                  </span>
                </button>

                <div className="h-[17px] w-px bg-[#e2e4e9]" />

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleHelpfulClick(false);
                  }}
                  className={cn(
                    "p-[2px] rounded-[8px] transition-colors",
                    helpfulStatus === "not-helpful"
                      ? "bg-[#e2e4e9]"
                      : "bg-[#f6f8fa] hover:bg-[#e2e4e9]"
                  )}
                >
                  <ThumbsDown className="h-[20px] w-[20px] text-[#525866]" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Toggle Icon */}
        <div className="shrink-0">
          {isOpen ? (
            <Minus className="h-[20px] w-[20px] text-[#525866]" />
          ) : (
            <Plus className="h-[20px] w-[20px] text-[#868c98]" />
          )}
        </div>
      </button>
    </div>
  );
}
