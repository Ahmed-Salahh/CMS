import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  MapPin, 
  Clock, 
  Calendar, 
  Phone, 
  Mail, 
  Send,
  Navigation,
  MessageSquare,
  Linkedin,
  Twitter
} from "lucide-react";

export function MobileContactInfo() {
  return (
    <div className="space-y-7">
      {/* Section Header */}
      <div className="space-y-4 relative">
        {/* Decorative Vector */}
        <div className="absolute -left-9 -top-1 w-22 h-18 opacity-20">
          <svg viewBox="0 0 86 70" className="w-full h-full fill-teal">
            <path d="M0 0h86v70H0z" opacity="0.1" />
          </svg>
        </div>

        <div className="space-y-3 relative z-10">
          <div className="space-y-3">
            <h2 className="text-2xl font-medium leading-[30px] text-foreground">
              Got a Question? Let&apos;s Talk
            </h2>
            <div className="w-12 h-1 bg-teal rounded-full" />
          </div>
          <p className="text-base leading-6 tracking-[-0.176px] text-gray-700 text-justify">
            We&apos;re here to help you. Reach out and we&apos;ll get back to you with answers and support.
          </p>
        </div>

        {/* Map Image */}
        <div className="relative w-full h-[200px] rounded-2xl overflow-hidden shadow-md">
          <Image
            src="/contact-images/map.png"
            alt="Office Location Map"
            fill
            className="object-cover"
          />
          
          {/* Location Card Overlay */}
          <Card className="absolute bottom-3 left-7 right-7 bg-white shadow-lg border border-border">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="p-2 bg-white border border-border rounded-full shrink-0">
                <MapPin className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="space-y-1 flex-1 min-w-0">
                <p className="text-xs text-muted-foreground">Location</p>
                <p className="text-sm font-normal text-foreground line-clamp-1">
                  123 dummy street, King abdullah financial district, Riyadh, KSA
                </p>
              </div>
              <Button size="sm" className="p-2 shrink-0">
                <Navigation className="h-4 w-4 text-teal" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Contact Details Cards */}
      <div className="space-y-6 w-full max-w-[327px]">
        {/* Working Hours & Holidays */}
        <Card className="bg-white shadow-md">
          <CardContent className="p-6 space-y-6">
            {/* Working Hours */}
            <div className="flex items-start gap-4">
              <div className="p-2 bg-white border border-border rounded-full shrink-0">
                <Clock className="h-6 w-6 text-muted-foreground" />
              </div>
              <div className="space-y-1 flex-1">
                <p className="text-sm text-muted-foreground">Working Hours</p>
                <div className="flex items-center gap-1">
                  <span className="font-semibold text-sm text-foreground tracking-[-0.176px]">Sun–Thu |</span>
                  <span className="font-medium text-sm text-foreground tracking-[-0.176px]">9:00 AM – 5:00 PM</span>
                </div>
              </div>
            </div>

            {/* Holidays */}
            <div className="border-t border-border pt-6">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-white border border-border rounded-full shrink-0">
                  <Calendar className="h-6 w-6 text-muted-foreground" />
                </div>
                <div className="space-y-6 flex-1">
                  {/* National Day */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-1">
                      <span className="font-semibold text-sm text-foreground tracking-[-0.176px]">National Day :</span>
                      <span className="font-medium text-sm text-foreground tracking-[-0.176px]">23 September</span>
                    </div>
                    <p className="text-sm text-muted-foreground tracking-[-0.176px]">(13 Rabi&apos; al-Awwal)</p>
                  </div>

                  {/* Founding Day */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-1">
                      <span className="font-semibold text-sm text-foreground tracking-[-0.176px]">Founding Day :</span>
                      <span className="font-medium text-sm text-foreground tracking-[-0.176px]">22 February</span>
                    </div>
                    <p className="text-base text-muted-foreground tracking-[-0.176px]">(12 Sha&apos;ban)</p>
                  </div>

                  {/* Eid al-Fitr */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-1">
                      <span className="font-semibold text-sm text-foreground tracking-[-0.176px]">Eid al-Fitr :</span>
                      <span className="font-medium text-sm text-foreground tracking-[-0.176px]">1 Shawwal</span>
                    </div>
                    <p className="text-base text-muted-foreground tracking-[-0.176px]">(varies · based on lunar sighting)</p>
                  </div>

                  {/* Eid al-Adha */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-1">
                      <span className="font-semibold text-sm text-foreground tracking-[-0.176px]">Eid al-Adha :</span>
                      <span className="font-medium text-sm text-foreground tracking-[-0.176px]">10 Dhu al-Hijjah</span>
                    </div>
                    <p className="text-base text-muted-foreground tracking-[-0.176px]">(varies · based on lunar sighting)</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="bg-white shadow-md">
          <CardContent className="p-5 space-y-6">
            {/* Phone Number */}
            <div className="border-b border-border pb-1">
              <div className="flex items-center justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className="p-2 bg-white border border-border rounded-full shrink-0">
                    <Phone className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div className="space-y-1 flex-1">
                    <p className="text-sm text-muted-foreground tracking-[-0.084px]">Phone Number</p>
                    <p className="text-sm font-medium text-foreground tracking-[-0.176px]">(+996) 990-900-800</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Button size="sm" className="bg-gray-50 hover:bg-gray-100 p-2 w-8 h-8">
                    <Phone className="h-3 w-3 text-teal" />
                  </Button>
                  <Button size="sm" className="bg-gray-50 hover:bg-gray-100 p-2 w-8 h-8">
                    <MessageSquare className="h-4 w-4 text-teal" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="border-t border-border pt-3">
              <div className="flex items-center justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className="p-2 bg-white border border-border rounded-full shrink-0">
                    <Mail className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div className="space-y-1 flex-1">
                    <p className="text-sm text-muted-foreground tracking-[-0.084px]">E-mail</p>
                    <p className="text-sm font-medium text-foreground tracking-[-0.27px]">
                      info@altamayuzacademy.com
                    </p>
                  </div>
                </div>
                <Button size="sm" className="bg-gray-50 hover:bg-gray-100 p-2 w-8 h-8">
                  <Send className="h-4 w-4 text-teal" />
                </Button>
              </div>
            </div>

            {/* Social Media */}
            <div className="border-t border-border pt-3">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-white border border-border rounded-full shrink-0">
                  <Send className="h-6 w-6 text-muted-foreground" />
                </div>
                <div className="space-y-1 flex-1">
                  <p className="text-sm text-muted-foreground tracking-[-0.084px]">Follow Us</p>
                  <div className="flex items-center gap-5">
                    <Linkedin className="h-5 w-5 text-foreground" />
                    <Twitter className="h-[18px] w-[18px] text-foreground" />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}