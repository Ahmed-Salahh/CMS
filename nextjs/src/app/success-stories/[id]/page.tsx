import { notFound } from "next/navigation";
import { HeroSection } from "@/components/success-stories/detail/hero-section";
import { FeaturedImage } from "@/components/success-stories/detail/featured-image";
import { ArticleHeader } from "@/components/success-stories/detail/article-header";
import { ArticleBody } from "@/components/success-stories/detail/article-body";
import { SidebarAuthor } from "@/components/success-stories/detail/sidebar-author";
import { SidebarRating } from "@/components/success-stories/detail/sidebar-rating";
import { SidebarShare } from "@/components/success-stories/detail/sidebar-share";
import { OtherStories } from "@/components/success-stories/detail/other-stories";
import { Topbar } from "@/components/success-stories/topbar";
import { Footer } from "@/components/success-stories/footer";

// Image constants

  "https://www.figma.com/api/mcp/asset/668ee4e7-8ced-416d-accd-a305a3732602";
const imgLogo = "/CMS/Logo.png";
const imgTwitterX = "/CMS/twitter.png";
const imgLinkedin =
  "https://www.figma.com/api/mcp/asset/85fa166b-60eb-4ff6-8f3e-149861485658";

async function getStoryDetails(id: string) {
  try {
    // Use absolute URL for server-side fetch
    const baseUrl = typeof window === 'undefined' 
      ? (process.env.NEXT_PUBLIC_NEXTJS_API_URL || 'http://localhost:3000')
      : '';
    const apiUrl = baseUrl ? `${baseUrl}/api/success-stories/${id}` : `/api/success-stories/${id}`;
    
    const res = await fetch(apiUrl, {
      cache: "no-store",
      next: { revalidate: 0 }
    });
    console.log(`Fetched story ${id} from ${apiUrl} with status: ${res.status}`);
    if (!res.ok) {
      console.error(`Failed to fetch story ${id}: ${res.status} ${res.statusText}`);
      return null;
    }

    // Check if response is JSON
    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      console.error(`API returned non-JSON response: ${contentType}`);
      return null;
    }

    const data = await res.json();
    console.log(`Story data for ${id}:`, JSON.stringify(data, null, 2));
    return data;
  } catch (error) {
    console.error("Error fetching story details:", error);
    return null;
  }
}

export const dynamic = 'force-dynamic';

export default async function StoryDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  
  // Add temporary logging
  console.log(`Fetching story with ID: ${id}`);
  
  const data = await getStoryDetails(id);

  if (!data || !data.success || !data.data) {
    notFound();
  }

  const story = data.data;
  const related_stories = data.related_stories || [];

  return (
    <div className="bg-white relative w-full min-h-screen">
         <Topbar />
      {/* Hero Section */}
      <HeroSection  />

      {/* Main Content Container */}
      <div className="flex flex-col gap-[67px] items-end justify-center w-[90%] mx-auto pt-0 mt-0">
        {/* Two Column Layout */}
        <div className="flex gap-[90px] items-start mt-0 ">
          {/* Article Column - Left */}
          <div className="bg-[#f6f8fa] flex flex-col gap-[19px] items-start pb-[67px] pl-[44px] pr-[36px] pt-[32px] w-[1077px]">
            {/* Featured Image */}
            <FeaturedImage
              imageUrl={story.story_image || "/images/placeholder.jpg"}
              rating={parseFloat(story.rating)}
            />

            {/* Article Content */}
            <div className="flex flex-col gap-[27px] items-end w-[997px]">
              <div className="flex flex-col gap-[20px] items-start w-full">
                {/* Title & Program Info */}
                <ArticleHeader
                  title={story.title}
                  programName={
                    story.program_name ||
                    "Flagship Program in Finance & Accounting"
                  }
                />
              </div>

              {/* Article Body */}
              <ArticleBody content={story.description} />
            </div>
          </div>

          {/* Sidebar - Right */}
          <div className="flex flex-col gap-[32px] items-start w-[264px] relative">
            <div className="absolute flex flex-col gap-[32px] items-start left-0 top-[37px] w-[264px]">
              <div className="flex flex-col gap-[2px] items-start w-full">
                <div className="flex flex-col items-start w-full">
                  {/* Author Info */}
                  <SidebarAuthor
                    authorName={story.author_name}
                    authorImage={story.author_image || "/images/default-avatar.png"}
                  />

                  {/* Rating */}
                  <SidebarRating />
                </div>
              </div>

              {/* Share Button */}
              <SidebarShare />
            </div>
          </div>
        </div>

        {/* Other Stories Section */}
        <div className="w-full mt-0 pt-0 mb-[100px]">
        <OtherStories stories={related_stories || []} />
        </div>
          <div
              className="absolute bottom-0 h-auto left-1/2 pointer-events-none -translate-x-1/2 w-full"
            //   style={{ top: "1200px" }}
            >
              <Footer
                logoSrc={imgLogo}
                twitterSrc={imgTwitterX}
                linkedinSrc={imgLinkedin}
                className="bg-[#3f4b76] flex items-center justify-between pointer-events-auto px-[44px] py-[20px] w-full mx-auto"
              />
            </div>
      </div>
      
    </div>
  );
}
