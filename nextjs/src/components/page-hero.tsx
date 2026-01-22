import Link from "next/link";
import { Home } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface PageHeroProps {
  title: string;
  breadcrumbs?: { label: string; href?: string }[];
}

const PageHero: React.FC<PageHeroProps> = ({ title, breadcrumbs = [] }) => {
  const bgImage = "/header-bg.png";

  return (
    <div className="relative w-full h-[180px] overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-linear-to-r from-[#468796] to-[#3c4a78]" />

      {/* Background Images */}
      <div
        className="absolute inset-0 opacity-10 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      <div
        className="absolute inset-0 opacity-5 bg-cover bg-center blur-xs"
        style={{ backgroundImage: `url(${bgImage})` }}
      />

      {/* Content Container */}
      <div className="relative z-10 container mx-auto h-full flex flex-col items-center justify-center text-white px-4">
        {/* Title */}
        <h1
          className="text-[57px] leading-[1.2] mb-3 font-normal"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          {title}
        </h1>

        {/* Breadcrumb */}
        <Breadcrumb>
          <BreadcrumbList className="text-white">
            <BreadcrumbItem>
              <BreadcrumbLink
                href="/"
                className="flex items-center gap-1 text-white hover:text-white/80"
              >
                <Home className="h-4 w-4" />
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            {breadcrumbs.map((crumb, index) => (
              <div key={index} className="flex items-center">
                <BreadcrumbSeparator className="text-white" />
                <BreadcrumbItem>
                  {crumb.href ? (
                    <BreadcrumbLink
                      href={crumb.href}
                      className="text-white hover:text-white/80"
                    >
                      {crumb.label}
                    </BreadcrumbLink>
                  ) : (
                    <BreadcrumbPage className="text-white">
                      {crumb.label}
                    </BreadcrumbPage>
                  )}
                </BreadcrumbItem>
              </div>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  );
};

export default PageHero;
