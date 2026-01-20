"use client";

interface ArticleBodyProps {
  content: string;
}

export function ArticleBody({ content }: ArticleBodyProps) {
  return (
    <div
      className="font-['Montserrat'] font-normal text-[16px] leading-[20px] tracking-[-0.096px] text-[#525866] text-justify whitespace-pre-wrap w-full"
      style={{ fontFeatureSettings: "'calt' 0, 'liga' 0" }}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
