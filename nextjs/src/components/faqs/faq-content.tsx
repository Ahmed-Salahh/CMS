"use client";

import { FAQCategory } from "@/types/faqs";
import { FAQCategorySection } from "./faq-category-section";

interface FAQContentProps {
  categories: FAQCategory[];
  onHelpfulClick?: (faqId: number, isHelpful: boolean) => void;
}

export function FAQContent({ categories, onHelpfulClick }: FAQContentProps) {
  return (
    <div className="flex flex-col gap-[40px] w-full max-w-[1100px]">
      {categories.map((category) => (
        <FAQCategorySection
          key={category.id}
          category={category}
          onHelpfulClick={onHelpfulClick}
        />
      ))}
    </div>
  );
}
