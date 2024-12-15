import { NextResponse } from "next/server";

const API_KEY = 'a47c413bc3642c61cb1ec42310e68327';
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
    // const currentWeather = {
    //   temp: Math.round(weatherData.current.temp),
    //   // maxTemp: Math.round(weatherData.current.main.temp_max),
    //   // minTemp: Math.round(weatherData.current.main.temp_min),
    //   weather: weatherData.current.weather[0].description,
    //   icon: `https://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}.png`,
    // };

    const dailyForecast = weatherData.daily.slice(0, 8).map((day: any) => ({
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
