interface PolicySectionProps {
  id: string;
  title: string;
  content: string | React.ReactNode;
  badges?: { label: string; href?: string }[];
}

export function PolicySection({ id, title, content, badges }: PolicySectionProps) {
  return (
    <section id={id} className="flex gap-[4px] w-full scroll-mt-[120px]">
      {/* Left side - Title */}
      <div className="w-[405px] flex-shrink-0">
        <div className="flex flex-col">
          <h2 className="font-medium text-[40px] leading-[48px] text-[#0a0d14] tracking-[-0.4px] ml-[62px]">
            {title}
          </h2>
          <div className="w-[50px] h-[1px] bg-[#0a0d14] ml-[62px] mt-[12px]" />
        </div>
      </div>

      {/* Right side - Content */}
      <div className="flex-1">
        <div className="font-normal text-[16px] leading-[24px] text-[#525866] tracking-[-0.176px] text-justify">
          {typeof content === "string" ? (
            <p className="whitespace-pre-wrap">{content}</p>
          ) : (
            content
          )}
          {badges && badges.length > 0 && (
            <div className="flex flex-wrap gap-[8px] mt-[8px]">
              {badges.map((badge, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-[8px] py-[2px] bg-[#f6f8fa] text-[#525866] text-[12px] font-medium rounded-[4px]"
                >
                  {badge.href ? (
                    <a href={badge.href} target="_blank" rel="noopener noreferrer" className="hover:underline">
                      {badge.label}
                    </a>
                  ) : (
                    badge.label
                  )}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
