"use client";

import Image from "next/image";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Calendar, MapPin, Languages, Clock, Users } from "lucide-react";
import { Program } from "@/types/programs";

interface ProgramDetailsProps {
  program: Program;
}

const ProgramDetailsComponent: React.FC<ProgramDetailsProps> = ({
  program,
}) => {
  const statusConfig = {
    open: {
      color: "bg-teal-500",
      text: "Open for Applications",
      bgClass: "bg-teal-50 text-teal-700",
    },
    upcoming: {
      color: "bg-yellow-500",
      text: "Opening Soon",
      bgClass: "bg-yellow-50 text-yellow-700",
    },
    closed: {
      color: "bg-gray-500",
      text: "Applications Closed",
      bgClass: "bg-gray-50 text-gray-700",
    },
  };

  const currentStatus = statusConfig[program.Status];

  return (
    <div className="w-full">
      {/* Header Image */}
      <div className="relative w-full h-[400px] rounded-2xl overflow-hidden mb-6">
        <Image
          src={program.ProgramImage || "/default.jpg"}
          alt={program.ProgramName}
          fill
          className="object-cover"
        />

        {/* Status Badge */}
        <div
          className={`absolute top-6 right-6 ${currentStatus.bgClass} backdrop-blur-sm rounded-lg px-4 py-2 font-medium`}
        >
          {currentStatus.text}
        </div>

        {/* Countdown Timer */}
        {(program.DaysLeft !== undefined ||
          program.HoursLeft !== undefined) && (
          <div className="absolute bottom-6 left-6 bg-white rounded-lg px-4 py-2 flex items-center gap-3 shadow-lg">
            <Clock className="w-5 h-5 text-[#525866]" />
            <div className="flex items-center gap-2">
              <div className="text-center">
                <div className="text-2xl font-bold text-[#0a0d14]">
                  {String(program.DaysLeft || 0).padStart(2, "0")}
                </div>
                <div className="text-xs text-[#525866]">Days</div>
              </div>
              <span className="text-2xl font-bold text-[#525866]">:</span>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#0a0d14]">
                  {String(program.HoursLeft || 0).padStart(2, "0")}
                </div>
                <div className="text-xs text-[#525866]">Hours</div>
              </div>
            </div>
            <span className="text-sm text-[#525866] ml-2">Remaining</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <h1 className="text-4xl font-semibold text-[#0a0d14] mb-4">
            {program.ProgramName}
          </h1>

          <div className="flex flex-wrap gap-3 mb-6">
            <Badge
              variant="outline"
              className="bg-white border-[#e2e4e9] text-[#525866] px-3 py-1.5 text-sm flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              {program.Duration}
            </Badge>
            <Badge
              variant="outline"
              className="bg-white border-[#e2e4e9] text-[#525866] px-3 py-1.5 text-sm flex items-center gap-2"
            >
              <Languages className="w-4 h-4" />
              {program.Language}
            </Badge>
            <Badge
              variant="outline"
              className="bg-white border-[#e2e4e9] text-[#525866] px-3 py-1.5 text-sm flex items-center gap-2"
            >
              <MapPin className="w-4 h-4" />
              {program.Location}
            </Badge>
            <Badge
              variant="outline"
              className="bg-white border-[#e2e4e9] text-[#525866] px-3 py-1.5 text-sm flex items-center gap-2"
            >
              <Users className="w-4 h-4" />
              {program.TargetAudience}
            </Badge>
          </div>

          <div className="bg-white border border-[#e2e4e9] rounded-2xl p-6 mb-6">
            <h2 className="text-2xl font-semibold text-[#0a0d14] mb-4">
              About the Program
            </h2>
            <p className="text-base text-[#525866] leading-7 whitespace-pre-line">
              {program.ProgramDescription}
            </p>
          </div>

          {program.Requirements && (
            <div className="bg-white border border-[#e2e4e9] rounded-2xl p-6 mb-6">
              <h2 className="text-2xl font-semibold text-[#0a0d14] mb-4">
                Requirements
              </h2>
              <p className="text-base text-[#525866] leading-7 whitespace-pre-line">
                {program.Requirements}
              </p>
            </div>
          )}

          {program.Benefits && (
            <div className="bg-white border border-[#e2e4e9] rounded-2xl p-6 mb-6">
              <h2 className="text-2xl font-semibold text-[#0a0d14] mb-4">
                What You'll Gain
              </h2>
              <p className="text-base text-[#525866] leading-7 whitespace-pre-line">
                {program.Benefits}
              </p>
            </div>
          )}

          {program.Curriculum && (
            <div className="bg-white border border-[#e2e4e9] rounded-2xl p-6 mb-6">
              <h2 className="text-2xl font-semibold text-[#0a0d14] mb-4">
                Curriculum
              </h2>
              <p className="text-base text-[#525866] leading-7 whitespace-pre-line">
                {program.Curriculum}
              </p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-[#e2e4e9] rounded-2xl p-6 sticky top-6">
            <h3 className="text-xl font-semibold text-[#0a0d14] mb-4">
              Program Details
            </h3>

            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-[#868c98] mt-0.5" />
                <div>
                  <div className="text-sm font-medium text-[#0a0d14]">
                    Duration
                  </div>
                  <div className="text-sm text-[#525866]">
                    {program.Duration}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#868c98] mt-0.5" />
                <div>
                  <div className="text-sm font-medium text-[#0a0d14]">
                    Location
                  </div>
                  <div className="text-sm text-[#525866]">
                    {program.Location}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Languages className="w-5 h-5 text-[#868c98] mt-0.5" />
                <div>
                  <div className="text-sm font-medium text-[#0a0d14]">
                    Language
                  </div>
                  <div className="text-sm text-[#525866]">
                    {program.Language}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Users className="w-5 h-5 text-[#868c98] mt-0.5" />
                <div>
                  <div className="text-sm font-medium text-[#0a0d14]">
                    Target Audience
                  </div>
                  <div className="text-sm text-[#525866]">
                    {program.TargetAudience}
                  </div>
                </div>
              </div>

              {program.StartDate && (
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-[#868c98] mt-0.5" />
                  <div>
                    <div className="text-sm font-medium text-[#0a0d14]">
                      Start Date
                    </div>
                    <div className="text-sm text-[#525866]">
                      {new Date(program.StartDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                  </div>
                </div>
              )}

              {program.EndDate && (
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-[#868c98] mt-0.5" />
                  <div>
                    <div className="text-sm font-medium text-[#0a0d14]">
                      End Date
                    </div>
                    <div className="text-sm text-[#525866]">
                      {new Date(program.EndDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {program.Status === "open" && (
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                Apply Now
              </Button>
            )}

            {program.Status === "upcoming" && (
              <Button className="w-full bg-yellow-600 hover:bg-yellow-700 text-white">
                Get Notified
              </Button>
            )}

            {program.Status === "closed" && (
              <Button
                className="w-full bg-gray-400 text-white cursor-not-allowed"
                disabled
              >
                Applications Closed
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramDetailsComponent;
