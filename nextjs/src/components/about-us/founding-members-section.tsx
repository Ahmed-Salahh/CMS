import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

const imgFrame11 = "/CMS/Vector.png";
const imgLine27 = "/CMS/Line27.png";
const foundingMembers = [
  ["/CMS/member1.png", "/CMS/member2.png", "/CMS/member3.png", "/CMS/member4.png"],
  ["/CMS/member5.png", "/CMS/member6.png", "/CMS/member7.png", "/CMS/member8.png"],
];

export function FoundingMembersSection() {
  return (
    <Card id="partners" className="bg-white border-none mt-5">
      <CardHeader>
        <CardTitle className="text-3xl text-center">
          <div className="relative mb-4">
            <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[127px] h-[65px] opacity-50 pointer-events-none">
              <Image 
                src={imgFrame11} 
                alt="" 
                fill 
                className="object-contain"
                sizes="127px"
                priority={false}
              />
            </div>
            <h2 className="relative font-medium text-4xl text-[#0a0d14] leading-[48px]">
              Founding Members
            </h2>
          </div>

          <div className="relative mb-4">
            <div className="absolute left-1/2 -translate-x-1/2 top-[-10px] w-[50px] h-[5px]">
              <Image 
                src={imgLine27} 
                alt="" 
                fill 
                className="object-cover"
                sizes="50px"
                priority={false}
              />
            </div>
          </div>
        </CardTitle>
        <p className="font-normal text-base text-[#525866] leading-6 text-center">
          Key numbers that reflect our impact and growth
        </p>
      </CardHeader>
      <CardContent>
        {foundingMembers.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className={`grid grid-cols-4 gap-6 ${rowIndex === 0 ? "mb-6" : ""}`}
          >
            {row.map((member, colIndex) => (
              <Card
                key={colIndex}
                className="bg-[#f6f8fa] border-none flex items-center justify-center h-[179px] relative overflow-hidden"
              >
                <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[127px] h-[65px] opacity-50 pointer-events-none z-0">
                  <Image 
                    src={imgFrame11} 
                    alt="" 
                    fill 
                    className="object-contain"
                    sizes="127px"
                    priority={false}
                  />
                </div>
                <div className="relative w-[60%] h-[60%] z-10">
                  <Image
                    src={member}
                    alt={`Founding Member ${rowIndex * 4 + colIndex + 1}`}
                    fill
                    className="object-contain"
                    sizes="(max-width: 640px) 80vw, (max-width: 1000px) 40vw, 20vw"
                    loading="lazy"
                    quality={85}
                  />
                </div>
              </Card>
            ))}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}