import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { is_helpful } = body;

    const response = await fetch(
      `${process.env.API_URL}/app/faqs/${id}/helpful/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ is_helpful }),
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { success: false, error: "Failed to update FAQ helpful status" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error updating FAQ helpful status:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
