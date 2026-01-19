import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

const imgFrame11 = "/CMS/Vector.png";
const imgLine27 = "/CMS/Line27.png";
const values = [
  {
    icon: "/CMS/integrity 1.png",
    title: "Integrity",
    description: "We uphold transparency, ethics, and responsibility",
  },
  {
    icon: "/CMS/durability 1.png",
    title: "Excellence",
    description: "We deliver a world-class learning experience",
  },
  {
    icon: "/CMS/leader 1.png",
    title: "Leadership",
    description: "We prepare participants to drive financial progress",
  },
  {
    icon: "/CMS/people-celebrating 1.png",
    title: "Collaboration",
    description: "We work with leading institutions with our journey",
  },
];

export function ValuesSection() {
  return (
    <Card id="values">
      <CardHeader>
        <CardTitle className="text-3xl text-center">
          <div className="relative mb-[16px]">
            <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[127px] h-[65px] opacity-50 pointer-events-none">
              <Image src={imgFrame11} alt="" fill className="object-contain" />
            </div>
            <h2 className="relative font-medium text-4xl text-[#0a0d14] leading-[48px]">
              Values
            </h2>
          </div>

          <div className="relative mb-[16px]">
            <div className="absolute left-1/2 -translate-x-1/2 top-[-10px] w-[50px] h-[5px]">
              <Image src={imgLine27} alt="" fill className="object-cover" />
            </div>
          </div>
        </CardTitle>
        <p className="font-normal text-lg text-[#525866] leading-[24px] text-center">
          To accelerate the development of Saudi financial talent through
          experiential learning, global content, and real-world training that
          prepares participants to lead future.
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-4 gap-[24px]">
          {values.map((value) => (
            <Card
              key={value.title}
              className="bg-[#f6f8fa] border-none text-center"
            >
              <CardContent className="pt-6">
                <div className="relative w-[48px] h-[48px] mx-auto mb-[16px]">
                  <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[127px] h-[65px] opacity-50 pointer-events-none">
                    <Image src={imgFrame11} alt="" fill className="object-contain" />
                  </div>
                  <Image
                    src={value.icon}
                    alt={value.title}
                    fill
                    className="object-contain"
                  />
                </div>
                <h4 className="font-semibold text-lg text-[#0a0d14] mb-[8px]">
                  {value.title}
                </h4>
                <p className="font-normal text-sm text-[#525866]">
                  {value.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}