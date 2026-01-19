"use client";

import { Button } from "./ui/button";
import { Forward } from "lucide-react";

const ProgramsHeader = () => {
  return (
    <div className="w-full bg-white rounded-2xl shadow-sm p-6 mb-6">
      <div className="flex  items-start justify-between gap-20">
        {/* Left Section - Title and Description */}
        <div className="flex-1">
          <div className="relative flex justify-between items-center mb-4">
            <div className="w-12 h-1 bg-[#00ADB5] absolute left-0 -bottom-1 rounded-full" />
            <h1 className="text-[40px] font-medium text-[#0a0d14] leading-[48px] tracking-[-0.4px] mb-4">
              Altamayyuz Programs
            </h1>
            <Button variant={"ghost"} className="bg-muted">
              <Forward />
            </Button>
          </div>
          <p className="text-base text-[#525866]  ">
            As the financial industry is liberalized, and the financial world
            changes, we aim to equip the best and brightest Saudi community with
            the skills to thrive in this new economy.
          </p>
        </div>

        {/* Right Section - CTA Card */}
        <div className="flex-[0.7] bg-gradient-to-b from-transparent to-[#f6f8fa] border border-transparent rounded-2xl p-5 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-medium text-[#3b3b3b] leading-6 tracking-[-0.27px]">
              Want to know more?
            </h3>
            <p className="text-sm text-[#3b3b3b] leading-5 tracking-[-0.084px]">
              Type your question and we'll help you with the right information.
            </p>
          </div>
          <Button
            className="w-full bg-white border border-[#e2e4e9] text-[#525866] hover:bg-[#f6f8fa] shadow-sm rounded-lg"
            variant="outline"
          >
            Ask Your Question
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProgramsHeader;
