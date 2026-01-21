import type { Metadata } from "next";
import { Topbar } from "@/components/success-stories/topbar";
import HeaderSection from "@/components/contact/header-section";
import ContactInfoSection from "@/components/contact/contact-info-section";
import ContactForm from "@/components/contact/contact-form";
import { Footer } from "@/components/success-stories/footer";

export const metadata: Metadata = {
  title: "Contact Us | Al Tamayuz Academy",
  description:
    "Get in touch with Al Tamayuz Academy. We're here to answer your questions and provide support.",
};

const imgLogo = "/CMS/Logo.png";
const imgTwitterX = "/CMS/twitter.png";
const imgLinkedin =
  "https://www.figma.com/api/mcp/asset/85fa166b-60eb-4ff6-8f3e-149861485658";

export default function ContactUsPage() {
  return (
    <div className="relative min-h-screen w-full bg-white">
      {/* Fixed Topbar */}
      <Topbar />

      {/* Header Section with spacing for fixed topbar */}
      <div className="pt-[80px]">
        <HeaderSection />
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-white">
        <div
          className="flex items-start"
          style={{ gap: "32px", paddingRight: "60px" }}
        >
          {/* Left Column - Contact Info */}
          <ContactInfoSection />

          {/* Right Column - Contact Form */}
          <div style={{ paddingTop: "48px" }}>
            <ContactForm />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto">
        <Footer
          logoSrc={imgLogo}
          twitterSrc={imgTwitterX}
          linkedinSrc={imgLinkedin}
          className="bg-[#3f4b76] flex items-center justify-between px-[44px] py-[20px] w-full"
        />
      </div>
    </div>
  );
}
