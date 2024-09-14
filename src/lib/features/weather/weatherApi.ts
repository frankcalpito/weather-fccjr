import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const weatherApi = createApi({
  reducerPath: "weatherApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.openweathermap.org/data/2.5",
  }),
  endpoints: (builder) => ({
    getWeatherByCoords: builder.query({
      query: ({ lat, long }) =>
        `weather?lat=${lat}&lon=${long}&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY}&units=metric`,
    }),
  }),
});

export const { useGetWeatherByCoordsQuery } = weatherApi;
