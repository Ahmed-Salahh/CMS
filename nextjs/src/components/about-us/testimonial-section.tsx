import { Card, CardContent } from "@/components/ui/card";

export function TestimonialSection() {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex gap-[32px] items-start">
          <div className="w-[166px] h-[187px] bg-[#f6f8fa] rounded-[16px]" />
          <div className="flex-1">
            <p className="font-semibold text-lg text-[#0a0d14] mb-[4px]">
              Mohamed Alghamdi
            </p>
            <p className="font-normal text-base text-[#525866] mb-[16px]">
              Marketing Team Lead
            </p>
            <p className="font-normal text-base text-[#525866] leading-[24px] italic">
              "Our goal is to build a new generation of financial leaders
              capable of driving the Kingdom's economic transformation. Through
              experiential learning and global exposure, we prepare participants
              to excel."
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
