export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const apiUrl = process.env.API_URL || "http://localhost:8000";
    console.log(`Fetching from Django: ${apiUrl}/app/success-stories/${id}/`);

    const response = await fetch(`${apiUrl}/app/success-stories/${id}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      console.error(
        `Django API error: ${response.status} ${response.statusText}`,
      );

      // Try to parse error as JSON, but handle if it's HTML
      let errorMessage = "Failed to fetch story details";
      const contentType = response.headers.get("content-type");

      if (contentType?.includes("application/json")) {
        const errorData = await response.json();
        errorMessage = errorData.error || errorMessage;
      } else {
        errorMessage = `Backend returned ${response.status}: ${response.statusText}`;
      }

      return Response.json(
        {
          success: false,
          error: errorMessage,
        },
        { status: response.status },
      );
    }

    const data = await response.json();
    return Response.json(data, { status: 200 });
  } catch (error) {
    console.error("Error fetching story details:", error);
    return Response.json(
      {
        success: false,
        error:
          "Backend connection failed. Please ensure Docker containers are running.",
      },
      { status: 500 },
    );
  }
}
