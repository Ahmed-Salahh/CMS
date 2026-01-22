import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ArrowRight } from "lucide-react";

export function ContactHeader() {
  return (
    <div className="bg-white border-b border-border px-11 py-5 hidden lg:flex items-center justify-between w-full max-w-screen-xl mx-auto">
      {/* Left Section */}
      <div className="flex items-center gap-6">
        {/* Logo */}
        <div className="h-10 w-20 relative">
          <Image
            src="/contact-images/logo.png"
            alt="Altamayyuz Academy"
            fill
            className="object-contain"
          />
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-1">
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
            Home
          </Button>
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
            About Us
          </Button>
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
            Programs
          </Button>
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
            Media
          </Button>
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
            Success Stories
          </Button>
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
            FAQs
          </Button>
          <Button 
            variant="secondary" 
            size="sm" 
            className="bg-gray-50 text-foreground font-medium"
          >
            Contact Us
          </Button>
        </nav>
      </div>

      {/* Search Bar */}
      <div className="w-60 relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
          <Input
            placeholder="Search..."
            className="pl-10 bg-white border-border shadow-sm"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Language Toggle */}
        <Button variant="ghost" size="sm" className="flex items-center gap-2">
          <span>العربية</span>
        </Button>

        {/* Login Button */}
        <Button className="bg-teal text-white flex items-center gap-1 px-4 py-2 shadow-sm">
          <span>Login</span>
          <ArrowRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}