import { NextResponse } from "next/server";

const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

export async function GET(
  request: Request,
  { params }: { params: { placeId: string } },
) {
  const { placeId } = params;

  if (!placeId) {
    return NextResponse.json(
      { error: "Missing placeId parameter" },
      { status: 400 },
    );
  }

  const apiUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${GOOGLE_API_KEY}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch place details" },
      { status: 500 },
    );
  }
}
