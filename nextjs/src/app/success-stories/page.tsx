"use client";

import { useState } from "react";
import { Topbar } from "@/components/success-stories/topbar";
import { HeroSection } from "@/components/success-stories/hero-section";
import { StoriesHeader } from "@/components/success-stories/stories-header";
import { StoriesGrid } from "@/components/success-stories/stories-grid";
import { Footer } from "@/components/success-stories/footer";

// Image constants

  "https://www.figma.com/api/mcp/asset/668ee4e7-8ced-416d-accd-a305a3732602";
const imgLogo = "/CMS/Logo.png";
const imgTwitterX = "/CMS/twitter.png";
const imgLinkedin =
  "https://www.figma.com/api/mcp/asset/85fa166b-60eb-4ff6-8f3e-149861485658";


export default function SuccessStoriesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("recent");
  const [dateFilter, setDateFilter] = useState("");

  return (
    <div className="relative min-h-screen w-full bg-white">
      {/* Fixed Topbar */}
      <Topbar />

      {/* Hero Section with Breadcrumb */}
      <div className="pt-[80px]">
        <HeroSection />
      </div>

      {/* Header with Title, Description and Filters */}
      <StoriesHeader
        onSearchChange={setSearchQuery}
        onCategoryChange={setCategory}
        onSortChange={setSortBy}
        onDateChange={setDateFilter}
      />

      {/* Stories Grid */}
      <StoriesGrid
        searchQuery={searchQuery}
        category={category}
        sortBy={sortBy}
        dateFilter={dateFilter}
      />

      {/* Footer */}
      <div
        className="absolute bottom-0 h-auto left-1/2 pointer-events-none -translate-x-1/2 w-full"
        style={{ top: "2130px" }}
      >
        <Footer
          logoSrc={imgLogo}
          twitterSrc={imgTwitterX}
          linkedinSrc={imgLinkedin}
          className="bg-[#3f4b76] flex items-center justify-between pointer-events-auto px-[44px] py-[20px] w-full mx-auto"
        />
      </div>
    </div>
  );
}
