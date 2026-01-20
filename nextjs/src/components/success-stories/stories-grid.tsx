"use client";

import { useState, useEffect } from "react";
import { FeaturedStoryCard } from "./featured-story-card";
import { StoryCard } from "./story-card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type {
  SuccessStory,
  SuccessStoryListResponse,
} from "@/types/success-story";

interface StoriesGridProps {
  searchQuery?: string;
  category?: string;
  sortBy?: string;
  dateFilter?: string;
}

export function StoriesGrid({
  searchQuery = "",
  category = "all",
  sortBy = "recent",
  dateFilter = "",
}: StoriesGridProps) {
  const [stories, setStories] = useState<SuccessStory[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const pageSize = 8; // 1 featured + 6 regular stories

  useEffect(() => {
    fetchStories();
  }, [searchQuery, category, sortBy, dateFilter, currentPage]);

  const fetchStories = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        page: currentPage.toString(),
        page_size: pageSize.toString(),
        sort: sortBy,
      });

      if (searchQuery) queryParams.set("search", searchQuery);
      if (category && category !== "all") queryParams.set("category", category);
      if (dateFilter) queryParams.set("start_date", dateFilter);

      const response = await fetch(
        `/api/success-stories?${queryParams.toString()}`,
      );
      const data: SuccessStoryListResponse = await response.json();
      console.log("Fetched stories:", data);
      if (data.success) {
        setStories(data.data);
        setTotalPages(data.pagination.total_pages);
        setTotalCount(data.pagination.total_count);
      }
    } catch (error) {
      console.error("Error fetching success stories:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return (
      <div className="w-full bg-[#f8f9fa] px-[60px] py-[47px] flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!stories.length) {
    return (
      <div className="w-full bg-[#f8f9fa] px-[60px] py-[47px] text-center min-h-[400px] flex items-center justify-center">
        <p className="text-xl text-gray-600">No success stories found.</p>
      </div>
    );
  }

  const featuredStory = stories.find((s) => s.is_featured) || stories[0];
  const regularStories = stories.filter((s) => s.id !== featuredStory.id);

  return (
    <div className="w-full bg-[#f8f9fa] px-[60px] py-[47px]">
      <div className="space-y-[24px]">
        {/* First Row - Featured Story + 1 Card */}
        <div className="flex gap-[24px]">
          <FeaturedStoryCard
            id={featuredStory.id}
            title={featuredStory.title}
            description={featuredStory.description}
            authorName={featuredStory.author_name}
            image={featuredStory.story_image}
            authorImage={featuredStory.author_image}
            rating={featuredStory.rating}
          />
          {regularStories[0] && (
            <StoryCard
              id={regularStories[0].id}
              title={regularStories[0].title}
              description={regularStories[0].description}
              authorName={regularStories[0].author_name}
              image={regularStories[0].story_image}
              authorImage={regularStories[0].author_image}
              rating={regularStories[0].rating}
            />
          )}
        </div>

        {/* Second Row - 3 Cards */}
        {regularStories.length > 1 && (
          <div className="flex gap-[24px]">
            {regularStories.slice(1, 4).map((story) => (
              <StoryCard
                key={story.id}
                id={story.id}
                title={story.title}
                description={story.description}
                authorName={story.author_name}
                authorImage={story.author_image}
                image={story.story_image}
                rating={story.rating}
              />
            ))}
          </div>
        )}

        {/* Third Row - 3 Cards */}
        {regularStories.length > 4 && (
          <div className="flex gap-[24px]">
            {regularStories.slice(4, 7).map((story) => (
              <StoryCard
                key={story.id}
                id={story.id}
                title={story.title}
                description={story.description}
                authorName={story.author_name}
                authorImage={story.author_image}
                image={story.story_image}
                rating={story.rating}
              />
            ))}
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-[47px] flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="h-10 w-10"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <div className="flex gap-1">
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
              let page;
              if (totalPages <= 5) {
                page = i + 1;
              } else if (currentPage <= 3) {
                page = i + 1;
              } else if (currentPage >= totalPages - 2) {
                page = totalPages - 4 + i;
              } else {
                page = currentPage - 2 + i;
              }

              return (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => handlePageChange(page)}
                  className="min-w-[40px] h-10"
                >
                  {page}
                </Button>
              );
            })}
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="h-10 w-10"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Results count */}
      <div className="mt-4 flex justify-center">
        <div className="text-sm text-[#525866]">
          Showing {(currentPage - 1) * pageSize + 1} -{" "}
          {Math.min(currentPage * pageSize, totalCount)} of {totalCount} stories
        </div>
      </div>
    </div>
  );
}
