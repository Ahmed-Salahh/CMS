import { Separator } from "@/components/ui/separator";

export function SideNavigation() {
  return (
    <div className="w-[264px] flex flex-col gap-[20px]">
      <div className="flex flex-col gap-[8px]">
        <h2 className="font-semibold text-lg text-[#0a0d14]">About Us</h2>
        <p className="font-normal text-sm text-[#525866]">
          Switch between sections
        </p>
      </div>
      <Separator />
      <nav className="flex flex-col gap-[8px]">
        <a
          href="#overview"
          className="bg-[#f6f8fa] px-[12px] py-[10px] rounded-[8px] font-medium text-sm text-[#0a0d14]"
        >
          Overview
        </a>
        <a
          href="#timeline"
          className="px-[12px] py-[10px] rounded-[8px] font-medium text-sm text-[#525866] hover:bg-[#f6f8fa] transition-colors"
        >
          Timeline
        </a>
        <a
          href="#mission-vision"
          className="px-[12px] py-[10px] rounded-[8px] font-medium text-sm text-[#525866] hover:bg-[#f6f8fa] transition-colors"
        >
          Mission & Vision
        </a>
        <a
          href="#values"
          className="px-[12px] py-[10px] rounded-[8px] font-medium text-sm text-[#525866] hover:bg-[#f6f8fa] transition-colors"
        >
          Values
        </a>
        <a
          href="#statistics"
          className="px-[12px] py-[10px] rounded-[8px] font-medium text-sm text-[#525866] hover:bg-[#f6f8fa] transition-colors"
        >
          Statistics
        </a>
        <a
          href="#partners"
          className="px-[12px] py-[10px] rounded-[8px] font-medium text-sm text-[#525866] hover:bg-[#f6f8fa] transition-colors"
        >
          Founding Members
        </a>
      </nav>
    </div>
  );
}
