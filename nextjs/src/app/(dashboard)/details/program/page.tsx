import ProgramDetailsComponent from "@/components/program-details";
import { notFound } from "next/navigation";
import { Program } from "@/types/programs";

export const metadata = {
  title: "Program Details | Altamayyuz",
  description: "View detailed information about this program",
};

interface PageProps {
  searchParams: Promise<{ id?: string }>;
}

async function fetchProgramDetails(programId: string): Promise<Program | null> {
  try {
    const response = await fetch(
      `${process.env.API_URL}/app/get_program/${programId}/`,
      {
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
      },
    );

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data.program;
  } catch (error) {
    console.error("Error fetching program details:", error);
    return null;
  }
}

const ProgramDetailsPage = async ({ searchParams }: PageProps) => {
  // Get program ID from search params
  const params = await searchParams;
  const programId = params.id;

  if (!programId) {
    notFound();
  }

  // Fetch program details server-side
  const program: Program | null = await fetchProgramDetails(programId);

  if (!program) {
    notFound();
  }

  return (
    <div className="w-full p-6">
      <ProgramDetailsComponent program={program} />
    </div>
  );
};

export default ProgramDetailsPage;
