import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ContactForm } from "./contact-form";
import { ContactHeader } from "./contact-header";
import { ContactHero } from "./contact-hero";
import { ContactInfo } from "./contact-info";
import { MobileContactInfo } from "./mobile-contact-info";
import { MobileHeader } from "./mobile-header";

export default async function ContactPage() {
  const user = await currentUser();
  const email = user?.emailAddresses[0]?.emailAddress;

  if (!email) {
    return <div>Please sign in</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <MobileHeader />

      {/* Desktop Header */}
      <ContactHeader />

      {/* Hero Section */}
      <ContactHero />

      {/* Main Content */}
      <div className="px-4 lg:px-0">
        {/* Mobile Layout */}
        <div className="lg:hidden bg-gray-50">
          <div className="px-4 py-6">
            <MobileContactInfo />
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:flex gap-8 max-w-screen-xl mx-auto py-12 px-16">
          {/* Left Side - Contact Info */}
          <div className="flex-1">
            <ContactInfo />
          </div>

          {/* Right Side - Contact Form */}
          <div className="w-[480px]">
            <ContactForm userEmail={email} />
          </div>
        </div>

        {/* Mobile Contact Form */}
        <div className="lg:hidden px-4 py-8 bg-white">
          <ContactForm userEmail={email} />
        </div>
      </div>
    </div>
  );
}