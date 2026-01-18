/* eslint-disable @typescript-eslint/no-explicit-any */
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const user = await currentUser();
    const meetingLink = await generateGoogleMeetLink(
      user?.emailAddresses[0].emailAddress || ""
    );
    console.log(meetingLink);

    await fetch(`${process.env.API_URL}/app/update_reservation`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...body,
        MeetLink: meetingLink,
        UserID: user?.emailAddresses[0].emailAddress,
        isReserved: true,
      }),
    });

    return NextResponse.json(
      { message: "Meeting link created successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

async function generateGoogleMeetLink(userEmail: string) {
  try {
    console.log(userEmail);
    const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS || "{}");
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: [
        "https://www.googleapis.com/auth/calendar",
        "https://www.googleapis.com/auth/calendar.events",
      ],
    });

    const calendar = google.calendar({ version: "v3", auth });

    const now = new Date();
    const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000);

    // Define the calendar event with Google Meet details
    const event = {
      summary: "Meeting with Team",
      description: "Discussing project updates and next steps.",
      start: { dateTime: now.toISOString(), timeZone: "UTC" },
      end: { dateTime: oneHourLater.toISOString(), timeZone: "UTC" },
      visibility: "default",
      reminders: { useDefault: true },
      conferenceData: {
        createRequest: {
          requestId: Math.random().toString(36).substring(7), // Unique ID for the request
          conferenceSolutionKey: {
            type: "hangoutsMeet", // Correct type for Google Meet
          },
        },
      },
    };

    // Insert the event into the calendar with conference data
    const response = await calendar.events.insert({
      calendarId: "marinasamir15102001@gmail.com", // Use "primary" for the authenticated user's primary calendar
      requestBody: event,
      // conferenceDataVersion: 1, // Enable conference creation
    });

    // Log the Google Meet link
    const meetLink = response.data.conferenceData?.entryPoints?.find(
      (entry) => entry.entryPointType === "video"
    )?.uri;

    if (meetLink) {
      console.log("Google Meet link created successfully:", meetLink);
    } else {
      console.log(
        "Event created but no Meet link found:",
        response.data.htmlLink
      );
    }

    return meetLink || response.data.htmlLink;
  } catch (error: any) {
    console.error("Error creating calendar event with Google Meet:", {
      message: error.message,
      code: error.code,
      errors: error.errors,
    });
    throw new Error("Unable to create calendar event with Google Meet");
  }
}
