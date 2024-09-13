import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { q: query } = req.query;
  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${query}&types=(cities)&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data.predictions);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
}
