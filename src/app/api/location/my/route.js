import { NextResponse } from "next/server";

const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

export async function GET() {
  const url = `https://www.googleapis.com/geolocation/v1/geolocate?key=${GOOGLE_API_KEY}`;

  try {
    const response = await fetch(url, {
      method: "POST",
    });
    const data = await response.json();
    const { location } = data;

    if (location) {
      return NextResponse.json({
        lat: location.lat,
        long: location.lng,
      });
    } else {
      return NextResponse.json(
        { error: "Failed to retrieve location" },
        { status: 500 },
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch location" },
      { status: 500 },
    );
  }
}
