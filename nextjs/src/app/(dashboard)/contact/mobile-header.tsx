import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Search, Menu } from "lucide-react";

export function MobileHeader() {
  return (
    <div className="lg:hidden bg-white border-b border-gray-200 shadow-sm px-4 py-3">
      <div className="flex items-center justify-between h-12">
        {/* Logo */}
        <div className="h-8 w-16 relative">
          <Image
            src="/contact-images/logo.png"
            alt="Altamayyuz Academy"
            fill
            className="object-contain"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Search Button */}
          <Button variant="ghost" size="sm" className="p-2 rounded-full">
            <Search className="h-5 w-5 text-muted-foreground" />
          </Button>
          
          {/* Menu Button */}
          <Button variant="ghost" size="sm" className="p-2 rounded-lg">
            <div className="flex flex-col gap-1">
              <div className="w-4 h-0.5 bg-muted-foreground rounded" />
              <div className="w-4 h-0.5 bg-muted-foreground rounded" />
              <div className="w-4 h-0.5 bg-muted-foreground rounded" />
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
}