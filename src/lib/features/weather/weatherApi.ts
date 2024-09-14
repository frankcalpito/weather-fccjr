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
  clouds: number;
  dt: number;
}

export interface DailyData {
  dt: number;
  sunrise: number;
  sunset: number;
  moonrise: number;
  moonset: number;
  moon_phase: number;
  summary: string;
  temp: {
    day: number;
    min: number;
    max: number;
    night: number;
    eve: number;
    morn: number;
  };
  feels_like: {
    day: number;
    night: number;
    eve: number;
    morn: number;
  };
  pressure: number;
  humidity: number;
  dew_point: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust: number;
  weather: { description: string; icon: string }[];
  clouds: number;
  pop: number;
  rain: number;
  uvi: number;
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
