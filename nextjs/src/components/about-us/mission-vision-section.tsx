import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

const imgFrame11 = "/CMS/Vector.png";
const imgLine27 = "/CMS/Line27.png";
const imgRectangle17 = "https://www.figma.com/api/mcp/asset/61c74ed1-1122-40d2-ae6c-b635894fd942";

export function MissionVisionSection() {
  return (

    <Card id="mission-vision">
      <CardContent className="pt-6">
        <div className="flex flex-col gap-[32px]">
        <div className="flex items-start gap-[32px]">
          <div className="flex-1">
            <div className="relative mb-[16px]">
              <div className="absolute left-[-22px] top-0 w-[127px] h-[65px] opacity-50 pointer-events-none">
                <Image
                  src={imgFrame11}
                  alt=""
                  fill
                  className="object-contain"
                />
              </div>
              <h2 className="relative font-medium text-4xl text-[#0a0d14] leading-[48px]">
                Mission
              </h2>
            </div>

            <div className="relative mb-[16px]">
              <div className="absolute left-0 top-[-10px] w-[50px] h-[5px]">
                <Image
                  src={imgLine27}
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <p className="font-normal text-base text-[#525866] leading-[24px]">
          To accelerate the development of Saudi financial talent through experiential learning, global content, and real-world training that prepares participants to lead future.
            </p>
          </div>
          <div className="relative w-[520px] h-[179px] rounded-[8px] overflow-hidden shadow-[0px_1px_2px_0px_rgba(228,229,231,0.24)]">
            <Image
              src={imgRectangle17}
              alt="Overview Image"
              fill
              className="object-cover"
            />
          </div>
        </div>
          <div className="flex items-start gap-[32px]">
             <div className="relative w-[520px] h-[179px] rounded-[8px] overflow-hidden shadow-[0px_1px_2px_0px_rgba(228,229,231,0.24)]">
            <Image
              src={imgRectangle17}
              alt="Overview Image"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1">
            <div className="relative mb-[16px]">
              <div className="absolute left-[-22px] top-0 w-[127px] h-[65px] opacity-50 pointer-events-none">
                <Image
                  src={imgFrame11}
                  alt=""
                  fill
                  className="object-contain"
                />
              </div>
              <h2 className="relative font-medium text-4xl text-[#0a0d14] leading-[48px]">
                Vision
              </h2>
            </div>

            <div className="relative mb-[16px]">
              <div className="absolute left-0 top-[-10px] w-[50px] h-[5px]">
                <Image
                  src={imgLine27}
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <p className="font-normal text-base text-[#525866] leading-[24px]">
          To become the leading financial academy in Saudi Arabia, shaping the next generation of leaders driving Vision 2030’s economic transformation.
            </p>
          </div>
         
        </div>
        </div>
      </CardContent>
    </Card>
  );
}
