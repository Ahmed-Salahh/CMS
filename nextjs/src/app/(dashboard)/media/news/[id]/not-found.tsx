import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#f6f8fa] px-4">
      <div className="text-center">
        <h1 className="font-['Montserrat'] text-6xl font-bold text-[#0a0d14]">
          404
        </h1>
        <h2 className="mt-4 font-['Montserrat'] text-2xl font-medium text-[#0a0d14]">
          News Article Not Found
        </h2>
        <p className="mt-2 font-['Montserrat'] text-base text-[#525866]">
          The news article you&apos;re looking for doesn&apos;t exist or has been removed.
        </p>
        <Link href="/media?type=news">
          <Button className="mt-8 gap-2 bg-primary font-['Montserrat'] text-white hover:bg-primary/90">
            <ArrowLeft className="h-4 w-4" />
            Back to News
          </Button>
        </Link>
      </div>
    </div>
  );
}
