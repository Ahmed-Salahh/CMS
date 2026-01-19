import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

const imgFrame11 = "/CMS/Vector.png";
const imgLine27 = "/CMS/Line27.png";
const statistics = [
  { value: "+200", label: "Graduates" },
  { value: "+15", label: "Programs Delivered" },
  { value: "12", label: "Founding Members" },
  { value: "1", label: "Global Partnerships" },
];

export function StatisticsSection() {
  return (
    <Card id="statistics" className="bg-white border-none">
      <CardHeader>
        <CardTitle className="text-3xl text-white text-center">
          <div className="relative mb-[16px]">
            <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[127px] h-[65px] opacity-50 pointer-events-none">
              <Image src={imgFrame11} alt="" fill className="object-contain" />
            </div>
            <h2 className="relative font-medium text-4xl text-[#0a0d14] leading-[48px]">
              Statistics
            </h2>
          </div>

          <div className="relative mb-[16px]">
            <div className="absolute left-1/2 -translate-x-1/2 top-[-10px] w-[50px] h-[5px]">
              <Image src={imgLine27} alt="" fill className="object-cover" />
            </div>
          </div>
        </CardTitle>
        <p className="font-normal text-[#525866] text-base leading-[24px] text-center">
          Key numbers that reflect our impact and growth
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-4 gap-[24px]">
          {statistics.map((stat) => (
            <Card key={stat.label} className="text-center">
              <CardContent className="pt-8 relative">
                <div className="absolute left-1/2 -translate-x-1/2 top-8 w-[127px] h-[65px] opacity-50 pointer-events-none">
                  <Image
                    src={imgFrame11}
                    alt=""
                    fill
                    className="object-contain "
                  />
                </div>
                <p className="font-bold text-3xl mb-[8px] relative">
                  <span className="text-[#00adb5]">
                    {stat.value.startsWith('+') ? '+' : ''}
                  </span>
                  <span className="text-black">
                    {stat.value.replace('+', '')}
                  </span>
                </p>
                <p className="font-medium text-sm text-[#525866] pb-4 relative">
                  {stat.label}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}