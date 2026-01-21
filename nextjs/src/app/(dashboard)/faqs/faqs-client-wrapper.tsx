"use client";

import { useState, useEffect, useMemo } from "react";
import { FAQSidebar, FAQContent } from "@/components/faqs";
import { FAQCategory } from "@/types/faqs";

interface FAQsClientWrapperProps {
  categories: FAQCategory[];
}

export function FAQsClientWrapper({ categories }: FAQsClientWrapperProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(
    categories[0]?.slug || null
  );
  const [searchQuery, setSearchQuery] = useState("");

  // Filter categories based on search
  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) {
      return categories;
    }

    const query = searchQuery.toLowerCase();
    return categories
      .map((category) => ({
        ...category,
        faqs: category.faqs.filter(
          (faq) =>
            faq.question.toLowerCase().includes(query) ||
            faq.answer.toLowerCase().includes(query)
        ),
      }))
      .filter((category) => category.faqs.length > 0);
  }, [categories, searchQuery]);

  const handleCategorySelect = (slug: string) => {
    setActiveCategory(slug);
    // Scroll to category section
    const element = document.getElementById(slug);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleHelpfulClick = async (faqId: number, isHelpful: boolean) => {
    try {
      await fetch(`/api/faqs/${faqId}/helpful`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ is_helpful: isHelpful }),
      });
    } catch (error) {
      console.error("Failed to mark FAQ as helpful:", error);
    }
  };

  // Update active category based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = categories.map((cat) => ({
        slug: cat.slug,
        element: document.getElementById(cat.slug),
      }));

      for (const section of sections) {
        if (section.element) {
          const rect = section.element.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom > 200) {
            setActiveCategory(section.slug);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [categories]);

  return (
    <div className="flex gap-0">
      {/* Sidebar */}
      <div className="sticky top-[80px] h-fit">
        <FAQSidebar
          categories={categories}
          activeCategory={activeCategory}
          onCategorySelect={handleCategorySelect}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 px-[20px] py-[26px]">
        <FAQContent
          categories={filteredCategories}
          onHelpfulClick={handleHelpfulClick}
        />
      </div>
    </div>
  );
}
