import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface WeatherCurrent {
  temp: number;
  feels_like: number;
  humidity: number;
  sunrise: number;
  sunset: number;
  weather: { description: string; icon: string }[];
}

export interface HourlyData {
  temp: number;
  feels_like: number;
  humidity: number;
}

export const weatherApi = createApi({
  reducerPath: "weatherApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.openweathermap.org/data/3.0",
  }),
  endpoints: (builder) => ({
    getWeatherByCoords: builder.query({
      query: ({ lat, long }) =>
        `onecall?lat=${lat}&lon=${long}&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY}&units=metric&exclude=minutely`,
    }),
  }),
});

export const { useGetWeatherByCoordsQuery } = weatherApi;
