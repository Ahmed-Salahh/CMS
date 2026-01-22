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

export function ContactInfo() {
  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="space-y-6 p-6 lg:p-12 bg-gradient-to-r from-gray-50 to-white rounded-tl-md relative">
        {/* Decorative Vector */}
        <div className="absolute -left-10 -top-2 w-32 h-26 opacity-20">
          <svg viewBox="0 0 127 103" className="w-full h-full fill-teal">
            <path d="M0 0h127v103H0z" opacity="0.1" />
          </svg>
        </div>

        <div className="space-y-4 relative z-10">
          <div className="space-y-2">
            <h2 className="text-[40px] font-medium leading-[48px] tracking-[-0.4px] text-foreground">
              Got a Question? Let&apos;s Talk
            </h2>
            <div className="w-12 h-1 bg-teal rounded-full" />
          </div>
          <p className="text-base leading-6 tracking-[-0.176px] text-gray-700">
            We&apos;re here to help you. Reach out and we&apos;ll get back to you with answers and support.
          </p>
        </div>

        {/* Map Image */}
        <div className="relative w-full h-[273px] rounded-2xl overflow-hidden shadow-md">
          <Image
            src="/contact-images/map.png"
            alt="Office Location Map"
            fill
            className="object-cover"
          />
          
          {/* Location Card Overlay */}
          <Card className="absolute bottom-4 left-6 right-6 bg-white shadow-lg">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-white border border-border rounded-full">
                  <MapPin className="h-6 w-6 text-muted-foreground" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-medium text-foreground text-base">
                    23 Ibn Al-Muhajir Street, Al-Rimal, Jubail
                  </p>
                </div>
              </div>
              <Button size="sm" className="bg-gray-50 hover:bg-gray-100 p-2">
                <Navigation className="h-5 w-5 text-teal" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Contact Details Cards */}
      <div className="space-y-6">
        {/* Working Hours & Holidays */}
        <Card className="bg-white shadow-md">
          <CardContent className="p-6 space-y-6">
            {/* Working Hours */}
            <div className="flex items-start gap-4">
              <div className="p-2 bg-white border border-border rounded-full">
                <Clock className="h-6 w-6 text-muted-foreground" />
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Working Hours</p>
                <p className="text-base font-medium text-foreground">
                  <span className="font-semibold">Sun–Thu |</span> 9:00 AM – 5:00 PM
                </p>
              </div>
            </div>

            {/* Holidays */}
            <div className="border-t border-border pt-6">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-white border border-border rounded-full">
                  <Calendar className="h-6 w-6 text-muted-foreground" />
                </div>
                <div className="space-y-6 flex-1">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Holidays</p>
                    <div className="space-y-6">
                      {/* National Day */}
                      <div>
                        <div className="flex items-center gap-1">
                          <span className="font-semibold text-foreground">National Day:</span>
                          <span className="font-medium text-foreground">23 September</span>
                        </div>
                        <p className="text-muted-foreground text-base">(13 Rabi&apos; al-Awwal)</p>
                      </div>

                      {/* Founding Day */}
                      <div>
                        <div className="flex items-center gap-1">
                          <span className="font-semibold text-foreground">Founding Day:</span>
                          <span className="font-medium text-foreground">22 February</span>
                        </div>
                        <p className="text-muted-foreground text-base">(12 Sha&apos;ban)</p>
                      </div>

                      {/* Eid al-Fitr */}
                      <div>
                        <div className="flex items-center gap-1">
                          <span className="font-semibold text-foreground">Eid al-Fitr:</span>
                          <span className="font-medium text-foreground">1 Shawwal</span>
                        </div>
                        <p className="text-muted-foreground text-base">(varies · based on lunar sighting)</p>
                      </div>

                      {/* Eid al-Adha */}
                      <div>
                        <div className="flex items-center gap-1">
                          <span className="font-semibold text-foreground">Eid al-Adha:</span>
                          <span className="font-medium text-foreground">10 Dhu al-Hijjah</span>
                        </div>
                        <p className="text-muted-foreground text-base">(varies · based on lunar sighting)</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="bg-white shadow-md">
          <CardContent className="p-6 space-y-4">
            {/* Phone Number */}
            <div className="flex items-center justify-between py-4 border-b border-border">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-white border border-border rounded-full">
                  <Phone className="h-6 w-6 text-muted-foreground" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Phone Number</p>
                  <p className="text-base font-medium text-foreground">(+996) 990-900-800</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Button size="sm" className="bg-gray-50 hover:bg-gray-100 p-2">
                  <Phone className="h-5 w-5 text-teal" />
                </Button>
                <Button size="sm" className="bg-gray-50 hover:bg-gray-100 p-2">
                  <MessageSquare className="h-5 w-5 text-teal" />
                </Button>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center justify-between py-4 border-b border-border">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-white border border-border rounded-full">
                  <Mail className="h-6 w-6 text-muted-foreground" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">E-mail</p>
                  <p className="text-lg font-medium text-foreground tracking-[-0.27px]">
                    info@altamayuzacademy.com
                  </p>
                </div>
              </div>
              <Button size="sm" className="bg-gray-50 hover:bg-gray-100 p-2">
                <Send className="h-5 w-5 text-teal" />
              </Button>
            </div>

            {/* Social Media */}
            <div className="flex items-center gap-4 py-4">
              <div className="p-2 bg-white border border-border rounded-full">
                <Send className="h-6 w-6 text-muted-foreground" />
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Follow Us</p>
                <div className="flex items-center gap-5">
                  <Linkedin className="h-6 w-6 text-foreground" />
                  <Twitter className="h-6 w-6 text-foreground" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}