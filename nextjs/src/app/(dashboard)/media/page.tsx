import React from "react";
import MediaCard, { MediaItem } from "@/components/media-card";
import SharedPagination from "@/components/programs-pagination";
import MediaFilters from "@/components/media-filters";
import MediaTopFilters from "@/components/media-top-filters";
import PageHero from "@/components/page-hero";
import Link from "next/link";

interface PageProps {
  searchParams: Promise<{
    type?: string;
    search?: string;
    page?: string;
    per_page?: string;
    sort?: string;
    date?: string;
    media_type?: string;
    event_status?: string;
  }>;
}

async function fetchMedia(filters: {
  type: string;
  search: string;
  page: number;
  per_page: number;
  sort?: string;
  date?: string;
  media_type?: string;
  event_status?: string;
}) {
  try {
    const params = new URLSearchParams();

    if (filters.type && filters.type !== "all") {
      params.append("type", filters.type);
    }

    if (filters.search) {
      params.append("search", filters.search);
    }

    if (filters.sort) {
      params.append("sort", filters.sort);
    }

    if (filters.date) {
      params.append("date", filters.date);
    }

    if (filters.media_type) {
      params.append("media_type", filters.media_type);
    }

    if (filters.event_status) {
      params.append("event_status", filters.event_status);
    }

    params.append("page", filters.page.toString());
    params.append("per_page", filters.per_page.toString());

    const url = `${process.env.API_URL}/app/list_media/${params.toString() ? `?${params.toString()}` : ""}`;

    const response = await fetch(url, {
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch media");
    }

    const data = await response.json();
    return {
      media: data.media || [],
      total: data.total || 0,
      page: data.page || 1,
      per_page: data.per_page || 9,
      total_pages: data.total_pages || 1,
    };
  } catch (error) {
    console.error("Error fetching media:", error);
    return {
      media: [],
      total: 0,
      page: 1,
      per_page: 8,
      total_pages: 1,
    };
  }
}

export default async function MediaPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const filters = {
    type: params.type || "all",
    search: params.search || "",
    page: params.page ? parseInt(params.page) : 1,
    per_page: params.per_page ? parseInt(params.per_page) : 8,
    sort: params.sort,
    date: params.date,
    media_type: params.media_type,
    event_status: params.event_status,
  };

  const { media, total, page, per_page, total_pages } =
    await fetchMedia(filters);

  // Get dynamic title based on type
  const getPageTitle = () => {
    switch (filters.type) {
      case "news":
        return "News";
      case "events":
        return "Events";
      case "gallery":
        return "Gallery";
      case "others":
        return "Others";
      default:
        return "All Media";
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      {/* Header */}
      <PageHero
        title={getPageTitle()}
        breadcrumbs={[{ label: getPageTitle() }]}
      />

      <div className="flex flex-1 bg-[#f6f8fa]">
        {/* Sidebar */}
        <MediaFilters
          currentType={filters.type}
          currentSearch={filters.search}
        />

        {/* Main Content */}
        <div className="flex-1">
          <div className="container mx-auto px-11 py-12">
            {/* Top Filters */}
            <MediaTopFilters currentType={filters.type} />

            {/* Media Grid */}
            {media.length === 0 ? (
              <div className="flex h-64 items-center justify-center">
                <p className="text-lg text-gray-500">
                  No media items found. Try adjusting your filters.
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {media.map((item: MediaItem) => {
                    // Determine the correct link based on media type
                    let href = `/media/${item.MediaID}`;
                    if (item.Type === "news") {
                      href = `/media/news/${item.MediaID}`;
                    } else if (item.Type === "events") {
                      href = `/media/events/${item.MediaID}`;
                    }
                    
                    return (
                      <Link
                        key={item.MediaID}
                        className="w-full"
                        href={href}
                      >
                        <MediaCard media={item} />
                      </Link>
                    );
                  })}
                </div>

                {/* Pagination */}
                {total_pages > 1 && (
                  <div className="mt-12">
                    <SharedPagination
                      currentPage={page}
                      totalPages={total_pages}
                      itemsPerPage={per_page}
                      totalItems={total}
                      basePath="/media"
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
