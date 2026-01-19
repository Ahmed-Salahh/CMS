import Link from "next/link";
import { Home } from "lucide-react";

interface PageHeroProps {
  title: string;
  breadcrumbs?: { label: string; href?: string }[];
}

const PageHero: React.FC<PageHeroProps> = ({ title, breadcrumbs = [] }) => {
  return (
    <div className="relative w-full h-[180px] bg-gradient-to-r from-[#2d5f6f] to-[#3a4d7a] overflow-hidden">
      {/* Background pattern/shapes */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-20 w-32 h-32 bg-white/10 rounded-lg rotate-12"></div>
        <div className="absolute bottom-10 right-20 w-40 h-40 bg-white/10 rounded-full"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-white">
        <h1 className="text-4xl font-bold mb-4">{title}</h1>

        {/* Breadcrumb */}
        {breadcrumbs.length > 0 && (
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="flex items-center gap-1 hover:underline">
              <Home className="w-4 h-4" />
              <span>Home</span>
            </Link>
            {breadcrumbs.map((crumb, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className="text-white/60">›</span>
                {crumb.href ? (
                  <Link href={crumb.href} className="hover:underline">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-white/90">{crumb.label}</span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PageHero;
