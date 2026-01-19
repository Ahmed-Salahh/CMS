import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const testimonials = [
  {
    name: "Mohamed Alghamdi",
    title: "Marketing Team Lead",
    quote:
      '"Our goal is to build a new generation of financial leaders capable of driving the Kingdom\'s economic transformation. Through experiential learning and global exposure, we prepare participants to excel."',
    image: "/CMS/mohamed.png",
  },
  {
    name: "Mohamed Alghamdi",
    title: "Marketing Team Lead",
    quote:
      '"Our goal is to build a new generation of financial leaders capable of driving the Kingdom\'s economic transformation. Through experiential learning and global exposure, we prepare participants to excel."',
    image: "/CMS/mohamed.png",
  },
  {
    name: "Mohamed Alghamdi",
    title: "Marketing Team Lead",
    quote:
      '"Our goal is to build a new generation of financial leaders capable of driving the Kingdom\'s economic transformation. Through experiential learning and global exposure, we prepare participants to excel."',
    image: "/CMS/mohamed.png",
  },
];

const clients = [
  {
    name: "Mohamed Alghamdi",
    image: "/CMS/mohamed.png",
  },
  {
    name: "Mohamed Alghamdi",
    image: "/CMS/mohamed.png",
  },
];

export function ClientsSection() {
  return (
    <Card className="border-none shadow-none overflow-hidden ">
      <CardContent className="pt-6 w-[1000px] ">
        <Carousel className=" ">
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="basis-full">
                <div className="flex gap-[32px] items-stretch max-w-full">
                  {/* LEFT – Main Testimonial */}
                  <Card className="flex-1 border border-[#e4e5e7] rounded-[16px] shadow-sm min-w-0">
                    <CardContent className="p-6">
                      <div className="flex gap-[24px] items-center">
                        <div className="relative w-[140px] h-[160px] bg-[#f6f8fa] rounded-[12px] overflow-hidden shrink-0">
                          <Image
                            src={testimonial.image}
                            alt={testimonial.name}
                            fill
                            className="object-cover"
                          />
                        </div>

                        <div className="min-w-0">
                          <h3 className="font-semibold text-[18px] text-[#0a0d14]">
                            {testimonial.name}
                          </h3>
                          <p className="text-[14px] text-[#6b7280] mb-[12px]">
                            {testimonial.title}
                          </p>
                          <p className="text-[15px] leading-[24px] text-[#4b5563] italic">
                            {testimonial.quote}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* RIGHT – Small Cards (VERTICAL) */}
                  <div className="flex  gap-[24px] shrink-0">
                    {clients.map((client, clientIndex) => (
                      <div key={clientIndex} className="text-center">
                        <Card className="w-[190px] h-[210px] bg-white border border-[#e4e5e7] rounded-[16px] overflow-hidden shadow-sm">
                          <div className="relative w-full h-full">
                            <Image
                              src={client.image}
                              alt={client.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                        </Card>
                        <p className="mt-[12px] font-medium text-[15px] text-[#0a0d14]">
                          {client.name}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Navigation – bottom left like image */}
          <div className="flex gap-[12px] mt-[20px]">
            <CarouselPrevious className="static" />
            <CarouselNext className="static" />
          </div>
        </Carousel>
      </CardContent>
    </Card>
  );
}
