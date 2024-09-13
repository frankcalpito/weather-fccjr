import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_KEY = process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY;

export const weatherApi = createApi({
  reducerPath: "weatherApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.openweathermap.org/data/2.5/",
  }),
  endpoints: (builder) => ({
    getWeatherByCity: builder.query({
      query: (city) => `weather?q=${city}&appid=${API_KEY}&units=metric`,
    }),
  }),
});

export const { useGetWeatherByCityQuery } = weatherApi;
