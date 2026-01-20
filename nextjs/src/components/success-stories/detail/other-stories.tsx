"use client";

import { StoryCard } from "../story-card";
import { SuccessStory } from "@/types/success-story";

interface OtherStoriesProps {
  stories: SuccessStory[];
}

export function OtherStories({ stories }: OtherStoriesProps) {
  if (!stories || stories.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-[32px] items-start w-full ">
      {/* Header */}
      <div className="relative">
        <h2
          className="font-['Montserrat'] font-medium text-[40px] leading-[48px] tracking-[-0.4px] text-[#0a0d14] whitespace-pre-wrap"
          style={{ fontFeatureSettings: "'calt' 0, 'liga' 0" }}
        >
          Other Stories
        </h2>
        <div className="h-0 w-[50px] relative mt-3">
          <div className="absolute h-[1px] bg-[#00adb5] w-full" />
        </div>
      </div>

      {/* Stories Grid */}
      <div className="flex gap-[24px] items-center w-full">
        {stories.slice(0, 3).map((story) => (
          <StoryCard
            key={story.id}
            id={story.id}
            title={story.title}
            description={story.description}
            authorName={story.author_name}
            authorImage={story.author_image || "/images/default-avatar.png"}
            image={story.story_image || "/images/placeholder.jpg"}
            rating={Number(story.rating)}
          />
        ))}
      </div>
    </div>
  );
}
