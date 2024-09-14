import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const locationApi = createApi({
  reducerPath: "locationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/location",
  }),
  endpoints: (builder) => ({
    getLocationSuggestions: builder.query<
      google.maps.places.AutocompletePrediction[],
      string
    >({
      query: (input) => `search?q=${input}`,
    }),
    getLocation: builder.query<
      { result: google.maps.places.PlaceResult },
      string
    >({
      query: (placeId) => `${placeId}`,
    }),
  }),
});

export const { useGetLocationSuggestionsQuery, useGetLocationQuery } =
  locationApi;
