import React from "react";
import { notFound } from "next/navigation";
import PageHero from "@/components/page-hero";
import { NewsArticleResponse } from "@/types/media";
import NewsHeroSection from "./news-hero-section";
import NewsAuthorSidebar from "./news-author-sidebar";
import NewsMetadata from "./news-metadata";
import RelatedNewsSection from "./related-news-section";
import { Separator } from "@/components/ui/separator";

interface PageProps {
  params: Promise<{ id: string }>;
}

async function fetchNewsArticle(newsId: string): Promise<NewsArticleResponse | null> {
  try {
    const url = `${process.env.API_URL}/app/get_news_article/${newsId}/`;

    const response = await fetch(url, {
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error("Failed to fetch news article");
    }

    const data: NewsArticleResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching news article:", error);
    return null;
  }
}

export default async function NewsArticlePage({ params }: PageProps) {
  const { id } = await params;
  const data = await fetchNewsArticle(id);

  if (!data) {
    notFound();
  }

  const { news, related_news } = data;

  // Breadcrumbs
  const breadcrumbs = [
    { label: "Media", href: "/media" },
    { label: "News", href: "/media?type=news" },
    { label: "News Article" },
  ];

  // Mock tags for now - you can extend the backend to support tags
  const tags = ["Insurance", "life", "Benefits", "Education", "Money"];

  return (
    <div className="flex min-h-screen w-full flex-col">
      {/* Hero Section with Gradient Background */}
      <PageHero
        title="News Article"
        breadcrumbs={breadcrumbs}
      />

      {/* Main Content */}
      <div className="relative flex-1 bg-[#f6f8fa]">
        <div className="container mx-auto px-11 py-12">
          <div className="flex gap-8">
            {/* Left Column - Main Content */}
            <div className="flex-1">
              {/* Hero Image Section */}
              <NewsHeroSection image={news.Image} title={news.Title} />

              {/* Article Title */}
              <h1 className="mt-8 font-['Montserrat'] text-[40px] font-medium leading-[48px] tracking-[-0.4px] text-[#0a0d14]">
                {news.Title}
              </h1>

              {/* Article Content */}
              <div className="mt-6 space-y-6">
                <p className="font-['Montserrat'] text-base font-normal leading-5 tracking-[-0.096px] text-[#525866] text-justify">
                  {news.Description}
                </p>
                {news.LongDescription && (
                  <p className="font-['Montserrat'] text-base font-normal leading-5 tracking-[-0.096px] text-[#525866] text-justify">
                    {news.LongDescription}
                  </p>
                )}
              </div>

              {/* Metadata Section */}
              <div className="mt-12">
                <NewsMetadata
                  publishDate={news.CreatedAt || new Date().toISOString()}
                  tags={tags}
                />
              </div>

              {/* Divider */}
              <div className="my-12">
                <Separator className="bg-[#e2e4e9]" />
              </div>
            </div>

            {/* Right Column - Author Sidebar */}
            <div className="w-[264px]">
              <NewsAuthorSidebar />
            </div>
          </div>

          {/* Related News Section */}
          {related_news.length > 0 && (
            <div className="mt-12">
              <RelatedNewsSection relatedNews={related_news} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
