"use client";

import ProgramsHeader from "./programs-header";
import ProgramsFilter from "./programs-filter";
import ProgramCard from "./program-card";
import SharedPagination from "./programs-pagination";
import { Program, ProgramFilters } from "@/types/programs";
import Image from "next/image";
import Link from "next/link";

interface ProgramsListProps {
  programs: Program[];
  redirectLink?: string;
  currentFilters: ProgramFilters;
  pagination?: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

const ProgramsList: React.FC<ProgramsListProps> = ({
  programs,
  redirectLink = "/details/program",
  currentFilters,
  pagination,
}) => {
  return (
    <div className="w-full">
      <ProgramsHeader />
      <ProgramsFilter currentFilters={currentFilters} />

      {programs.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No programs found
            </h3>
            <p className="text-gray-600">
              {currentFilters.search || currentFilters.status !== "all"
                ? "Try adjusting your filters to see more results."
                : "There are no programs available at the moment."}
            </p>
          </div>
        </div>
      ) : (
        <>
          {/* First Row: Main Card + One Card */}
          {programs.length >= 2 && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              {/* Main Featured Card */}
              <div className="lg:col-span-2 bg-white border border-[#e2e4e9] rounded-[18px] shadow-sm">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-4 h-full">
                  {/* Image Section */}
                  <div className="relative ">
                    <Image
                      src={programs[0].ProgramImage || "/default.jpg"}
                      alt={programs[0].ProgramName}
                      className="w-full h-full object-cover rounded-lg"
                      width={600}
                      height={400}
                    />

                    {/* Countdown Timer */}
                    {(programs[0].DaysLeft !== undefined ||
                      programs[0].HoursLeft !== undefined) && (
                      <div className="absolute -top-2 -left-2 bg-white rounded-lg px-3 py-1 flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <div className="bg-[#f6f8fa] rounded-lg px-2 py-1">
                            <span className="text-sm font-medium text-[#0a0d14]">
                              {String(programs[0].DaysLeft || 0).padStart(
                                2,
                                "0",
                              )}
                            </span>
                          </div>
                          <span className="text-[11px] text-[#525866]/60">
                            Days
                          </span>
                        </div>
                        <span className="text-sm font-semibold text-[#525866]/60">
                          :
                        </span>
                        <div className="flex items-center gap-1">
                          <div className="bg-[#f6f8fa] rounded-lg px-2 py-1">
                            <span className="text-sm font-medium text-[#0a0d14]">
                              {String(programs[0].HoursLeft || 0).padStart(
                                2,
                                "0",
                              )}
                            </span>
                          </div>
                          <span className="text-[11px] text-[#525866]/60">
                            Hrs
                          </span>
                        </div>
                        <span className="text-[13px] text-[#525866]">Left</span>
                      </div>
                    )}

                    {/* Badges at bottom */}
                    <div className="absolute bottom-4 left-4 flex">
                      <div className="bg-[#f6f8fa] rounded-l-md px-3 py-1">
                        <span className="text-xs font-medium text-[#525866]">
                          {programs[0].TargetAudience}
                        </span>
                      </div>
                      <div className="backdrop-blur-sm bg-black/40 rounded-r-md px-3 py-1 flex items-center gap-1">
                        <div className="w-4 h-4 relative">
                          <div className="absolute inset-[18.75%] rounded-full border-2 border-white" />
                          <div
                            className={`absolute inset-[31.25%] rounded-full ${
                              programs[0].Status === "open"
                                ? "bg-teal-500"
                                : programs[0].Status === "upcoming"
                                  ? "bg-yellow-500"
                                  : "bg-gray-500"
                            }`}
                          />
                        </div>
                        <span className="text-xs font-medium text-white capitalize">
                          {programs[0].Status}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="flex flex-col justify-between">
                    <div className="flex-1">
                      <h2 className="text-lg font-semibold text-[#0a0d14] leading-6 mb-3">
                        {programs[0].ProgramName}
                      </h2>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className="bg-white border border-[#e2e4e9] text-[#525866] text-xs font-medium px-2 py-1 rounded-md inline-flex items-center gap-1">
                          📅 {programs[0].Duration}
                        </span>
                        <span className="bg-white border border-[#e2e4e9] text-[#525866] text-xs font-medium px-2 py-1 rounded-md inline-flex items-center gap-1">
                          🌐 {programs[0].Language}
                        </span>
                        <span className="bg-white border border-[#e2e4e9] text-[#525866] text-xs font-medium px-2 py-1 rounded-md inline-flex items-center gap-1">
                          📍 {programs[0].Location}
                        </span>
                      </div>

                      {/* Description with opacity overlay */}
                      <div className="relative mb-4">
                        <p className="text-sm text-[#525866] leading-5 line-clamp-[13] text-justify">
                          {programs[0].ProgramDescription}
                        </p>
                        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
                      </div>
                    </div>

                    {/* Read More Button */}
                    <Link
                      href={`${redirectLink}?id=${programs[0].ProgramID}`}
                      className="w-full bg-[#f6f8fa] text-[#525866] hover:bg-[#e2e4e9] rounded-lg flex items-center justify-center gap-1 py-2 px-4 text-sm font-medium transition-colors mt-auto"
                    >
                      Read More
                      <span>→</span>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Second Card */}
              <ProgramCard
                key={programs[1].ProgramID}
                id={programs[1].ProgramID}
                title={programs[1].ProgramName}
                description={programs[1].ProgramDescription}
                image={programs[1].ProgramImage || "/default.jpg"}
                duration={programs[1].Duration}
                language={programs[1].Language}
                location={programs[1].Location}
                targetAudience={programs[1].TargetAudience}
                status={programs[1].Status}
                daysLeft={programs[1].DaysLeft}
                hoursLeft={programs[1].HoursLeft}
                redirectLink={redirectLink}
              />
            </div>
          )}

          {/* Only one program - show it full width */}
          {programs.length === 1 && (
            <div className="mb-6">
              <ProgramCard
                key={programs[0].ProgramID}
                id={programs[0].ProgramID}
                title={programs[0].ProgramName}
                description={programs[0].ProgramDescription}
                image={programs[0].ProgramImage || "/default.jpg"}
                duration={programs[0].Duration}
                language={programs[0].Language}
                location={programs[0].Location}
                targetAudience={programs[0].TargetAudience}
                status={programs[0].Status}
                daysLeft={programs[0].DaysLeft}
                hoursLeft={programs[0].HoursLeft}
                redirectLink={redirectLink}
              />
            </div>
          )}

          {/* Grid of Remaining Program Cards */}
          {programs.length > 2 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {programs.slice(2).map((program) => (
                <ProgramCard
                  key={program.ProgramID}
                  id={program.ProgramID}
                  title={program.ProgramName}
                  description={program.ProgramDescription}
                  image={program.ProgramImage || "/default.jpg"}
                  duration={program.Duration}
                  language={program.Language}
                  location={program.Location}
                  targetAudience={program.TargetAudience}
                  status={program.Status}
                  daysLeft={program.DaysLeft}
                  hoursLeft={program.HoursLeft}
                  redirectLink={redirectLink}
                />
              ))}
            </div>
          )}
        </>
      )}

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <SharedPagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          totalItems={pagination.totalItems}
          itemsPerPage={pagination.itemsPerPage}
          basePath="/programs"
        />
      )}
    </div>
  );
};

export default ProgramsList;
