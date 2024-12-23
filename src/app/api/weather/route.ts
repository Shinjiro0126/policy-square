import { NextResponse } from "next/server";

interface Day {
  day: string;
  icon: string;
  maxTemp: number;
  minTemp: number;
}

interface WeatherDaily {
  dt: number;
  temp: {
    max: number;
    min: number;
  }
  weather: {
    icon: string;
  }[];
}

const API_KEY = process.env.OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/3.0/onecall';

const DEFAULT_LAT = 35.4122;
const DEFAULT_LON = 139.4130;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get('lat') || DEFAULT_LAT;
  const lon = searchParams.get('lon') || DEFAULT_LON;

  try {
    // 今日の天気を取得
    const weatherRes = await fetch(`${BASE_URL}?lat=${lat}&lon=${lon}&units=metric&lang=jfa&exclude=minutely,hourly&appid=${API_KEY}`);
    if(!weatherRes.ok){
      const errorDetails = await weatherRes.json();
      return NextResponse.json({error: 'Failed to fetch weather data', details: errorDetails}, {status: 500});
    }

    const weatherData = await weatherRes.json();
    console.log(weatherData);

    const dailyForecast: Day[] = weatherData.daily.slice(0, 8).map((day: WeatherDaily) => ({
      day: new Date(day.dt * 1000).toLocaleDateString('ja-JP', {weekday: 'short'}),
      icon: `https://openweathermap.org/img/wn/${day.weather[0].icon}.png`,
      maxTemp: Math.round(day.temp.max),
      minTemp: Math.round(day.temp.min),
    }));

    return NextResponse.json({daily: dailyForecast})
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error', details: (error as Error).message }, { status: 500 });
  }
}
