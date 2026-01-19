"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DateRangePickerProps {
  date?: DateRange;
  onDateChange: (date: DateRange | undefined) => void;
  disabled?: boolean;
  placeholder?: string;
}

export function DateRangePicker({
  date,
  onDateChange,
  disabled,
  placeholder = "Filter by Date",
}: DateRangePickerProps) {
  return (
    <div
      className={cn("grid gap-2", disabled && "opacity-50 cursor-not-allowed")}
    >
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            disabled={disabled}
            className={cn(
              "w-[216px] justify-start text-left font-normal bg-white border-[#e2e4e9] rounded-lg shadow-sm h-10 text-sm text-[#868c98]",
              !date && "text-[#868c98]",
            )}
          >
            <CalendarIcon className="mr-2 h-5 w-5 text-[#868c98]" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>{placeholder}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="center">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={onDateChange}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
