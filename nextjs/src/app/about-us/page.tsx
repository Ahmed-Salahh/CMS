import { Topbar } from "@/components/about-us/topbar";
import { HeroSection } from "@/components/about-us/hero-section";
import { SideNavigation } from "@/components/about-us/side-navigation";
import { Footer } from "@/components/about-us/footer";
import { OverviewSection } from "@/components/about-us/overview-section";
import { ClientsSection } from "@/components/about-us/clients-section";
import { TimelineSection } from "@/components/about-us/timeline-section";
import { MissionVisionSection } from "@/components/about-us/mission-vision-section";
import { ValuesSection } from "@/components/about-us/values-section";
import { StatisticsSection } from "@/components/about-us/statistics-section";
// import { TestimonialSection } from "@/components/about-us/testimonial-section";
import { FoundingMembersSection } from "@/components/about-us/founding-members-section";

// Image constants
const imgChatGptImageDec32025053619Pm1 =
  "https://www.figma.com/api/mcp/asset/6a0118dc-32e5-40cc-a0b7-10a583b434a0";
const imgHomeIcon =
  "https://www.figma.com/api/mcp/asset/1dbe2837-cd78-4109-84b7-abad32aff565";
const imgArrowRightGray =
  "https://www.figma.com/api/mcp/asset/668ee4e7-8ced-416d-accd-a305a3732602";
const imgLogo =
  "/CMS/Logo.png";
const imgTwitterX =
  "/CMS/twitter.png";
const imgLinkedin =
  "https://www.figma.com/api/mcp/asset/85fa166b-60eb-4ff6-8f3e-149861485658";
const imgSearchIcon =
  "https://www.figma.com/api/mcp/asset/e24d0577-8821-4918-93e8-f38ecad700a6";
const imgTranslateIcon =
  "https://www.figma.com/api/mcp/asset/cff460c6-f9b0-4cbf-bbf8-e8f2035da182";
const imgArrowRight =
  "https://www.figma.com/api/mcp/asset/23148a07-fac2-4baf-beb3-31b4b278361b";
const imgGroup14454 = "/CMS/Logo.svg";

export default function AboutUsPage() {
  return (
    <div className="bg-white relative w-full min-h-screen" data-name="About Us">
      {/* Topbar Navigation */}
      <Topbar
        logoSrc={imgGroup14454}
        searchIconSrc={imgSearchIcon}
        translateIconSrc={imgTranslateIcon}
        arrowRightSrc={imgArrowRight}
      />

      {/* Header Section */}
      <HeroSection
        backgroundImageSrc={imgChatGptImageDec32025053619Pm1}
        // homeIconSrc={imgHomeIcon}
        // arrowRightGraySrc={imgArrowRightGray}
      />

      {/* Main Content */}
      <div className="absolute flex gap-[44px] left-[44px] top-[354px] right-[44px]">
        {/* Side Menu */}
        <SideNavigation />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col gap-[32px] pb-[100px]">
          <OverviewSection />

          <TimelineSection />
          <ClientsSection />
          <MissionVisionSection />
          <ValuesSection />
          <StatisticsSection />
          {/* <TestimonialSection /> */}
          <FoundingMembersSection />
        </div>
      </div>

      {/* Footer */}
      <div
        className="absolute bottom-0 h-auto left-1/2 pointer-events-none -translate-x-1/2 w-full"
        style={{ top: "3800px" }}
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
