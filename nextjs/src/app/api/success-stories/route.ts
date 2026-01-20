import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    // Build query string from search params
    const queryParams = new URLSearchParams();

    if (searchParams.get("search"))
      queryParams.set("search", searchParams.get("search")!);
    if (searchParams.get("category"))
      queryParams.set("category", searchParams.get("category")!);
    if (searchParams.get("is_featured"))
      queryParams.set("is_featured", searchParams.get("is_featured")!);
    if (searchParams.get("sort"))
      queryParams.set("sort", searchParams.get("sort")!);
    if (searchParams.get("page"))
      queryParams.set("page", searchParams.get("page")!);
    if (searchParams.get("page_size"))
      queryParams.set("page_size", searchParams.get("page_size")!);
    if (searchParams.get("start_date"))
      queryParams.set("start_date", searchParams.get("start_date")!);
    if (searchParams.get("end_date"))
      queryParams.set("end_date", searchParams.get("end_date")!);

    const response = await fetch(
      `${process.env.API_URL}/app/success-stories/?${queryParams.toString()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      return Response.json(
        {
          success: false,
          error: errorData.error || "Failed to fetch success stories",
        },
        { status: response.status },
      );
    }

    const data = await response.json();
    return Response.json(data, { status: 200 });
  } catch (error) {
    console.error("Error fetching success stories:", error);
    return Response.json(
      { success: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}
