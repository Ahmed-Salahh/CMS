import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

const imgRectangle17 =
  "https://www.figma.com/api/mcp/asset/1fbb2945-cd45-4461-8376-2cbbbb5b2f3b";

const timelineEvents = [
  {
    year: "2017",
    title: "Foundation Concept",
    description:
      "Initial concept developed with founding financial institutions.",
    position: "left",
  },
  {
    year: "2020",
    title: "Framework Development",
    description: "Development of the experiential learning framework.",
    position: "right",
  },
  {
    year: "2022",
    title: "First Cohort Launch",
    description: "Launch of the first cohort and IE University partnership.",
    position: "left",
  },
  {
    year: "2023",
    title: "Expansion",
    description: "Program expansion and strengthened partnerships.",
    position: "right",
  },
];

export function TimelineSection() {
  return (
    <Card id="timeline">
      <CardHeader></CardHeader>
      <CardContent>
        <div className="relative">
          {/* Timeline center line */}
          <div className="absolute left-1/2 top-0 h-full w-[2px] bg-gray-200 -translate-x-1/2" />
          <div className="space-y-[64px]">
            {timelineEvents.map((event, index) => (
              <div key={event.year} className="relative">
                <div
                  className={`flex gap-[64px] items-start ${event.position === "right" ? "flex-row-reverse" : ""}`}
                >
                  {/* Timeline card with background image */}
                  <div className="w-[443px] flex-shrink-0">
                    <Card
                      className={`relative overflow-hidden border-none shadow-[0px_1px_2px_0px_rgba(228,229,231,0.24)] h-[161px] `}
                    >
                      <div className="absolute inset-0">
                        <Image
                          src={imgRectangle17}
                          alt=""
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-black/20" />
                      </div>
                      <div className="relative h-full flex flex-col items-center justify-center">
                        <p className="font-bold text-[40px] text-white leading-[48px] text-shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
                          {event.year}
                        </p>
                        <p className="font-bold text-[80px] text-white/40 leading-[48px] absolute bottom-[20px]">
                          {event.year}
                        </p>
                      </div>
                    </Card>
                  </div>

                  {/* Description text */}
                  <div className="flex-1 pt-[20px] ml-12">
                    <p className="font-bold text-[20px] mb-[8px]  leading-[24px]">
                      <span className="text-[#00adb5]">{event.year} — </span>
                      <span className="text-[#0a0d14]">{event.title}</span>
                    </p>
                    <p className="font-normal text-[16px] text-[#525866] leading-[24px]">
                      {event.description}
                    </p>
                  </div>
                </div>

                {/* Timeline dot */}
                <div className="absolute left-[50%] top-[80px] w-[32px] h-[32px] -translate-x-1/2 bg-white border-4 border-[#00adb5] rounded-full z-10" />
              </div>
            ))}{" "}
          </div>{" "}
        </div>
      </CardContent>
    </Card>
  );
}
