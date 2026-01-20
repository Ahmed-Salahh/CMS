export async function GET() {
  try {
    const response = await fetch(
      `${process.env.API_URL}/app/success-stories/categories/`,
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
          error: errorData.error || "Failed to fetch categories",
        },
        { status: response.status },
      );
    }

    const data = await response.json();
    return Response.json(data, { status: 200 });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return Response.json(
      { success: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}
