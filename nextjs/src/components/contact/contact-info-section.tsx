"use client";

import {
  MapPin,
  Clock,
  Phone,
  Mail,
  Linkedin,
  Twitter,
  Calendar,
  ArrowUpLeft,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function ContactInfoSection() {
  return (
    <div
      className="flex flex-col rounded-tl-[3px]"
      style={{
        width: "868px",
        paddingBottom: "40px",
        paddingLeft: "60px",
        paddingRight: "48px",
        paddingTop: "32px",
        gap: "32px",
        backgroundImage:
          "linear-gradient(90deg, rgba(246, 248, 250, 1) 0%, rgba(246, 248, 250, 1) 100%), linear-gradient(90deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 1) 100%)",
      }}
    >
      {/* Heading and Description */}
      <div className="flex flex-col gap-2 relative" style={{ width: "674px" }}>
        {/* Decorative background shape behind "Question" */}
        <div
          className="absolute"
          style={{
            left: "-38px",
            top: "-7px",
            width: "127px",
            height: "103px",
          }}
        >
          <img
            src="/CMS/Vector.png"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative flex flex-col gap-2.5">
          <h2
            className="font-medium"
            style={{
              fontFamily: "Montserrat",
              fontSize: "40px",
              lineHeight: "48px",
              color: "#0A0D14",
              letterSpacing: "-0.4px",
            }}
          >
            Got a Question? Let's Talk
          </h2>

          {/* Accent underline below heading */}
          <div className="h-0 relative" style={{ width: "50px" }}>
            <div
              className="absolute"
              style={{
                top: "-5px",
                left: "0",
                right: "0",
                height: "3px",
                backgroundColor: "#00ADB5",
                borderRadius: "2px",
              }}
            />
          </div>
        </div>

        <p
          className="font-normal"
          style={{
            fontFamily: "Montserrat",
            fontSize: "16px",
            lineHeight: "24px",
            color: "#7B7B7B",
            letterSpacing: "-0.176px",
          }}
        >
          We're here to help you. Reach out and we'll get back to you with
          answers and support.
        </p>
      </div>

      {/* Map with Location Card Overlay */}
      <div className="relative" style={{ width: "760px", height: "273px" }}>
        {/* Google Maps Embed */}
        <div className="absolute inset-0 overflow-hidden rounded-[16px]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3624.9486774!2d49.632!3d27.011!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDAwJzM5LjYiTiA0OcKwMzcnNTUuMiJF!5e0!3m2!1sen!2ssa!4v1234567890!5m2!1sen!2ssa"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        {/* Location Card Overlay */}
        <div
          className="absolute bg-white rounded-[16px] px-6 flex items-center gap-4"
          style={{
            bottom: 0,
            left: "21.45px",
            width: "717.104px",
            height: "80px",
            boxShadow: "0px 4px 14px 0px rgba(0, 0, 0, 0.05)",
          }}
        >
          <div
            className="flex items-center justify-center w-11 h-11 rounded-full border border-[#E2E4E9]"
            style={{ backgroundColor: "white" }}
          >
            <MapPin className="w-6 h-6" style={{ color: "#525866" }} />
          </div>
          <div className="flex flex-col gap-1 flex-1">
            <p
              className="font-normal"
              style={{
                fontFamily: "Montserrat",
                fontSize: "14px",
                lineHeight: "20px",
                color: "#525866",
                letterSpacing: "-0.084px",
              }}
            >
              Location
            </p>
            <p
              className="font-medium"
              style={{
                fontFamily: "Montserrat",
                fontSize: "16px",
                lineHeight: "24px",
                color: "#0A0D14",
                letterSpacing: "-0.176px",
              }}
            >
              23 Ibn Al-Muhajir Street, Al-Rimal, Jubail
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="bg-[#F6F8FA] rounded-lg hover:bg-[#E8F5F6]"
            style={{ width: "36px", height: "36px", padding: "8px" }}
          >
            <MapPin className="w-5 h-5" style={{ color: "#00ADB5" }} />
          </Button>
        </div>
      </div>

      {/* Working Hours & Holidays Card */}
      <Card
        className="rounded-[16px] border-0"
        style={{
          width: "760px",
          backgroundColor: "white",
          boxShadow: "0px 4px 14px 0px rgba(0, 0, 0, 0.05)",
        }}
      >
        {/* Working Hours Section */}
        <div className="flex items-start gap-4 px-6 py-4 border-b border-[rgba(226,228,233,0.1)]">
          <div
            className="flex items-center justify-center w-11 h-11 rounded-full border border-[#E2E4E9]"
            style={{ backgroundColor: "white" }}
          >
            <Clock className="w-6 h-6" style={{ color: "#525866" }} />
          </div>
          <div className="flex flex-col gap-1">
            <p
              className="font-normal"
              style={{
                fontFamily: "Montserrat",
                fontSize: "14px",
                lineHeight: "20px",
                color: "#525866",
                letterSpacing: "-0.084px",
              }}
            >
              Working Hours
            </p>
            <p
              className="font-medium"
              style={{
                fontFamily: "Montserrat",
                fontSize: "16px",
                lineHeight: "24px",
                color: "#0A0D14",
                letterSpacing: "-0.176px",
              }}
            >
              <span className="font-semibold">Sun–Thu |</span> 9:00 AM – 5:00 PM
            </p>
          </div>
        </div>

        {/* Holidays Section */}
        <div className="flex items-start gap-4 px-6 py-4">
          <div
            className="flex items-center justify-center w-11 h-11 rounded-full border border-[#E2E4E9]"
            style={{ backgroundColor: "white" }}
          >
            <Calendar className="w-6 h-6" style={{ color: "#525866" }} />
          </div>
          <div className="flex flex-col gap-1">
            <p
              className="font-normal"
              style={{
                fontFamily: "Montserrat",
                fontSize: "14px",
                lineHeight: "20px",
                color: "#525866",
                letterSpacing: "-0.084px",
              }}
            >
              Holidays
            </p>
            <ul
              className="font-medium text-[#0A0D14] list-disc pl-6"
              style={{
                fontFamily: "Montserrat",
                fontSize: "16px",
                lineHeight: "24px",
                letterSpacing: "-0.176px",
              }}
            >
              <li>
                <span className="font-semibold">National Day: </span>23
                September{" "}
                <span className="text-[#868C98]">(13 Rabi' al-Awwal)</span>
              </li>
              <li>
                <span className="font-semibold">Founding Day:</span> 22 February{" "}
                <span className="text-[#868C98]">(12 Sha'ban)</span>
              </li>
              <li>
                <span className="font-semibold">Eid al-Fitr:</span> 1 Shawwal{" "}
                <span className="text-[#868C98]">
                  (varies · based on lunar sighting)
                </span>
              </li>
              <li>
                <span className="font-semibold">Eid al-Adha: </span> 10 Dhu
                al-Hijjah{" "}
                <span className="text-[#868C98]">
                  (varies · based on lunar sighting)
                </span>
              </li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Contact Info: Phone, Email, Follow Us - SINGLE CARD */}
      <Card
        className="rounded-[16px] border-0 pb-1 px-6"
        style={{
          width: "760px",
          backgroundColor: "white",
          boxShadow: "0px 4px 14px 0px rgba(0, 0, 0, 0.05)",
        }}
      >
        {/* Phone Section */}
        <div className="flex items-center justify-between py-4 border-b border-[rgba(226,228,233,0.1)]">
          <div className="flex items-start gap-4">
            <div
              className="flex items-center justify-center w-11 h-11 rounded-full border border-[#E2E4E9]"
              style={{ backgroundColor: "white" }}
            >
              <Phone className="w-6 h-6" style={{ color: "#525866" }} />
            </div>
            <div className="flex flex-col gap-1">
              <p
                className="font-normal"
                style={{
                  fontFamily: "Montserrat",
                  fontSize: "14px",
                  lineHeight: "20px",
                  color: "#525866",
                  letterSpacing: "-0.084px",
                }}
              >
                Phone Number
              </p>
              <p
                className="font-medium"
                style={{
                  fontFamily: "Montserrat",
                  fontSize: "16px",
                  lineHeight: "24px",
                  color: "#0A0D14",
                  letterSpacing: "-0.176px",
                }}
              >
                (+996) 990-900-800
              </p>
            </div>
          </div>
          <div className="flex gap-3.5">
            <Button
              variant="ghost"
              size="icon"
              className="bg-[#F6F8FA] rounded-lg hover:bg-[#E8F5F6]"
              style={{ width: "36px", height: "36px", padding: "8px" }}
            >
              <Phone className="w-5 h-5" style={{ color: "#00ADB5" }} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="bg-[#F6F8FA] rounded-lg hover:bg-[#E8F5F6]"
              style={{ width: "36px", height: "36px", padding: "8px" }}
            >
              <Image
                src="/CMS/whatsapp-icon.svg"
                alt="WhatsApp"
                width={20}
                height={20}
                style={{ objectFit: "contain" }}
              />
            </Button>
          </div>
        </div>

        {/* Email Section */}
        <div className="flex items-center justify-between py-4 border-b border-[rgba(226,228,233,0.1)]">
          <div className="flex items-start gap-4">
            <div
              className="flex items-center justify-center w-11 h-11 rounded-full border border-[#E2E4E9]"
              style={{ backgroundColor: "white" }}
            >
              <Mail className="w-6 h-6" style={{ color: "#525866" }} />
            </div>
            <div className="flex flex-col gap-1">
              <p
                className="font-normal"
                style={{
                  fontFamily: "Montserrat",
                  fontSize: "14px",
                  lineHeight: "20px",
                  color: "#525866",
                  letterSpacing: "-0.084px",
                }}
              >
                E-mail
              </p>
              <p
                className="font-medium"
                style={{
                  fontFamily: "Montserrat",
                  fontSize: "18px",
                  lineHeight: "24px",
                  color: "#0A0D14",
                  letterSpacing: "-0.27px",
                }}
              >
                info@altamayuzacademy.com
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="bg-[#F6F8FA] rounded-lg hover:bg-[#E8F5F6]"
            style={{ width: "36px", height: "36px", padding: "8px" }}
          >
            <Mail className="w-5 h-5" style={{ color: "#00ADB5" }} />
          </Button>
        </div>

        {/* Follow Us Section */}
        <div className="flex items-center py-4 border-b border-[#EDEDED]">
          <div className="flex items-start gap-4">
            <div
              className="flex items-center justify-center w-11 h-11 rounded-full border border-[#E2E4E9]"
              style={{ backgroundColor: "white" }}
            >
              <ArrowUpLeft className="w-6 h-6" style={{ color: "#525866" }} />
            </div>
            <div className="flex flex-col gap-1.5">
              <p
                className="font-normal"
                style={{
                  fontFamily: "Montserrat",
                  fontSize: "14px",
                  lineHeight: "20px",
                  color: "#525866",
                  letterSpacing: "-0.084px",
                }}
              >
                Follow Us
              </p>
              <div className="flex gap-5">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="w-6 h-6" style={{ color: "#04080D" }} />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Twitter className="w-6 h-6" style={{ color: "#04080D" }} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
