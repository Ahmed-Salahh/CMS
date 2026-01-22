import Image from "next/image";
import { Home, ChevronRight } from "lucide-react";

export function ContactHero() {
  return (
    <div className="relative h-[244px] lg:h-[244px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/contact-images/header-bg.jpg"
          alt="Contact Us Header"
          fill
          className="object-cover"
          priority
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#468796] to-[#3c4a78] opacity-90" />
      </div>

      {/* Background Elements */}
      <div className="absolute left-0 top-[60px] w-[640px] h-[640px] blur-none lg:blur-none">
        <Image
          src="/contact-images/contact-hero.png"
          alt="Background Element"
          fill
          className="object-cover opacity-40"
        />
      </div>
      <div className="absolute right-0 top-[-222px] w-[640px] h-[640px] blur-md">
        <Image
          src="/contact-images/contact-hero.png"
          alt="Background Element"
          fill
          className="object-cover opacity-30"
        />
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
        {/* Page Title */}
        <h1 className="text-[30px] lg:text-[57px] font-medium leading-[37.5px] lg:leading-[64px] tracking-[-0.25px] mb-4">
          Contact Us
        </h1>

        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-white">
          <div className="flex items-center gap-2">
            <Home className="h-4 w-4 lg:h-5 lg:w-5" />
            <span className="text-sm lg:text-base font-medium">Home</span>
          </div>
          <ChevronRight className="h-4 w-4 lg:h-5 lg:w-5 text-gray-300" />
          <span className="text-sm lg:text-base font-medium">Contact Us</span>
        </div>
      </div>
    </div>
  );
}