"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, SortAsc, Grid3x3, Calendar } from "lucide-react";
import Image from "next/image";
import type { Category, CategoriesResponse } from "@/types/success-story";

const imgFrame11 = "/CMS/Vector.png";

interface StoriesHeaderProps {
  onSearchChange: (search: string) => void;
  onCategoryChange: (category: string) => void;
  onSortChange: (sort: string) => void;
  onDateChange: (date: string) => void;
}

export function StoriesHeader({
  onSearchChange,
  onCategoryChange,
  onSortChange,
  onDateChange,
}: StoriesHeaderProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const dateInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/success-stories/categories");
      const data: CategoriesResponse = await response.json();
      if (data.success) {
        setCategories(data.data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    // Debounce search
    const timer = setTimeout(() => {
      onSearchChange(value);
    }, 500);
    return () => clearTimeout(timer);
  };

  return (
    <div className="w-full bg-white px-[60px] py-[24px]">
      {/* Main Header Content */}
      <div className="mb-[24px] flex items-start justify-between">
        {/* Left Content */}
        <div className="flex-1 max-w-[682px]">
          <div className="mb-[15px]">
            <div className="relative mb-[10px]">
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
                  Altamayyuz Success Stories
                </h2>
              </div>

              <div className="absolute left-0 bottom-[-10px] h-[2px] w-[50px] bg-gradient-to-r from-[#468796] to-[#3c4a78]" />
            </div>
          </div>
          <p className="text-base font-normal text-[#525866] leading-[24px]">
            As the financial industry is liberalized, and the financial world
            changes, we aim to equip the best and brightest Saudi community with
            the skills to thrive in this new economy.
          </p>
        </div>

        {/* Right Content - Info Card */}
        <div className="ml-[102px] w-[536px] rounded-[12px] bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef] p-[20px] shadow-sm">
          <div className="mb-[16px]">
            <h3 className="text-xl font-semibold text-[#0a0d14] mb-[8px]">
              Want to know more?
            </h3>
            <p className="text-sm text-[#525866]">
              Type your question and we'll help you with the right information.
            </p>
          </div>
          <Button className="w-full bg-white hover:bg-gray-200 text-[#525866] border  shadow-sm">
            Ask a Question
          </Button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex items-center gap-[42px]">
        {/* Search Input */}
        <div className="relative flex-1 max-w-[554px]">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search stories..."
            className="pl-10 h-[40px] border-gray-200"
            value={searchValue}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
        </div>

        {/* Date Filter */}
        <div className="relative w-[241px]">
          <Calendar 
            className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 cursor-pointer z-10" 
            onClick={() => dateInputRef.current?.showPicker()}
          />
          <Input
            ref={dateInputRef}
            type="date"
            className="pl-10 h-[40px] border-gray-200 [&::-webkit-calendar-picker-indicator]:hidden"
            onChange={(e) => onDateChange(e.target.value)}
          />
        </div>

        {/* Sort Dropdown */}
        <Select defaultValue="recent" onValueChange={onSortChange}>
          <SelectTrigger className="w-[241px] h-[40px] border-gray-200">
            <div className="flex items-center gap-2">
              <SortAsc className="h-5 w-5 text-gray-400" />
              <SelectValue placeholder="Sort by" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recent">Most Recent</SelectItem>
            <SelectItem value="oldest">Oldest First</SelectItem>
            <SelectItem value="popular">Most Popular</SelectItem>
            <SelectItem value="rating">Highest Rated</SelectItem>
          </SelectContent>
        </Select>

        {/* Category Dropdown */}
        <Select defaultValue="all" onValueChange={onCategoryChange}>
          <SelectTrigger className="w-[241px] h-[40px] border-gray-200">
            <div className="flex items-center gap-2">
              <Grid3x3 className="h-5 w-5 text-gray-400" />
              <SelectValue placeholder="Category" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat.value} value={cat.value}>
                {cat.label} ({cat.count})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}