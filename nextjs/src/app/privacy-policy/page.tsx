import { HeroSection } from "@/components/privacy-policy/hero-section";
import { SideNavigation } from "@/components/privacy-policy/side-navigation";
import { PrivacyContent } from "@/components/privacy-policy/privacy-content";
import { Footer } from "@/components/about-us/footer";
import { Topbar } from "@/components/success-stories/topbar";

// Image constants
const imgChatGptImageDec32025053619Pm1 =
  "https://www.figma.com/api/mcp/asset/6a0118dc-32e5-40cc-a0b7-10a583b434a0";
const imgLogo = "/CMS/Logo.png";
const imgTwitterX = "/CMS/twitter.png";
const imgLinkedin =
  "https://www.figma.com/api/mcp/asset/85fa166b-60eb-4ff6-8f3e-149861485658";

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-[#f6f8fa] relative w-full min-h-screen">
      {/* Topbar Navigation */}
      <Topbar />

      {/* Header Section */}
      <HeroSection backgroundImageSrc={imgChatGptImageDec32025053619Pm1} />

      {/* Main Content Container */}
      <div className="relative pt-[324px] pb-[100px]">
        {/* Background white area that extends behind content */}
        <div className="absolute left-[304px] right-0 top-[324px] bottom-0 bg-white rounded-tl-[20px]" />
        
        {/* Content wrapper */}
        <div className="relative flex gap-0 mx-[44px]">
          {/* Side Menu */}
          <SideNavigation />

          {/* Main Content Area */}
          <PrivacyContent />
        </div>
      </div>

      {/* Footer */}
      <Footer
        logoSrc={imgLogo}
        twitterSrc={imgTwitterX}
        linkedinSrc={imgLinkedin}
        className="bg-[#3f4b76] flex items-center justify-between px-[44px] py-[20px] w-full"
      />
    </div>
  );
}
