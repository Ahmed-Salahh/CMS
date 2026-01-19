import ProgramsList from "@/components/programs-list";
import PageHero from "@/components/page-hero";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import { Program, ProgramFilters } from "@/types/programs";

export const metadata = {
  title: "Programs | Altamayyuz",
  description:
    "Explore our comprehensive programs designed to equip you with the skills to thrive in the financial industry.",
};

interface PageProps {
  searchParams: Promise<{
    status?: string;
    search?: string;
    sort?: string;
    start_date?: string;
    end_date?: string;
    page?: string;
    per_page?: string;
  }>;
}

async function fetchPrograms(filters: ProgramFilters) {
  try {
    const params = new URLSearchParams();

    if (filters.status && filters.status !== "all") {
      params.append("status", filters.status);
    }

    if (filters.search) {
      params.append("search", filters.search);
    }

    if (filters.sort) {
      params.append("sort", filters.sort);
    }

    if (filters.start_date) {
      params.append("start_date", filters.start_date);
    }

    if (filters.end_date) {
      params.append("end_date", filters.end_date);
    }

    if (filters.page) {
      params.append("page", filters.page.toString());
    }

    if (filters.per_page) {
      params.append("per_page", filters.per_page.toString());
    }

    const url = `${process.env.API_URL}/app/list_programs/${params.toString() ? `?${params.toString()}` : ""}`;

    const response = await fetch(url, {
      headers: { "Content-Type": "application/json" },
      cache: "no-store", // Always fetch fresh data
    });

    if (!response.ok) {
      throw new Error("Failed to fetch programs");
    }

    const data = await response.json();
    return {
      programs: data.programs || [],
      total: data.total || 0,
      page: data.page || 1,
      per_page: data.per_page || 8,
      total_pages: data.total_pages || 1,
    };
  } catch (error) {
    console.error("Error fetching programs:", error);
    return {
      programs: [],
      total: 0,
      page: 1,
      per_page: 8,
      total_pages: 1,
    };
  }
}

const ProgramsPage = async ({ searchParams }: PageProps) => {
  const user = await currentUser();

  // Check if user exists in the system
  const response = await fetch(
    `${process.env.API_URL}/reports/check_user_exists/${user?.emailAddresses[0].emailAddress}`,
    { cache: "no-store" },
  );
  const responseData = await response.json();

  if (!responseData) {
    redirect("/standalone/welcome");
  }

  // Get filter parameters from URL
  const params = await searchParams;
  const filters: ProgramFilters = {
    status: params.status || "all",
    search: params.search || "",
    sort: params.sort || "recent",
    start_date: params.start_date,
    end_date: params.end_date,
    page: params.page ? parseInt(params.page) : 1,
    per_page: params.per_page ? parseInt(params.per_page) : 8,
  };

  // Fetch programs server-side with filters
  const { programs, total, page, per_page, total_pages } =
    await fetchPrograms(filters);

  return (
    <div className="w-full">
      <PageHero title="Programs" breadcrumbs={[{ label: "Programs" }]} />
      <div className="p-6">
        <ProgramsList
          programs={programs}
          redirectLink="/details/program"
          currentFilters={filters}
          pagination={{
            currentPage: page,
            totalPages: total_pages,
            totalItems: total,
            itemsPerPage: per_page,
          }}
        />
      </div>
    </div>
  );
};

export default ProgramsPage;
