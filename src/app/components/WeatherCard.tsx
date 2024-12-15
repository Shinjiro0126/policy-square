'use client';

import { useState, useEffect } from 'react';
import {Box, Card, CardContent, Typography} from '@mui/material';

interface ForcecastDay {
  day: string;
  icon: string;
  maxTemp: number;
  minTemp: number;
}

export default function WeatherCard(){
  const [weeklyForecast, setWeeklyForecast] = useState<ForcecastDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const lat = 35.4122;
  const lon = 139.4130;

  useEffect(() => {
    if(lat && lon){
      const fetchWeather = async () => {
        try {
          const res = await fetch(`/api/weather/?lat=${lat}&lon=${lon}`);
          if(!res.ok){
            throw new Error('天気データの取得に失敗しました');
          }
          const data = await res.json();

          setWeeklyForecast(data.daily);
        } catch (error: unknown) {
          if(error instanceof Error){
            console.error(error.message);
            setError(error.message || '天気データの取得に失敗しました。');
          } else {
            console.error('Unknown error occurred');
            setError('天気データの取得に失敗しました。');
          }
        } finally {
          setLoading(false);
        }
      };
      fetchWeather();
    }
  }, [lat, lon]);


  if (loading) {
    return (
      <>
        <Typography variant="h4" sx={{ mb: 2 }}>
          本日の天気予報
        </Typography>
        <Card>
          <CardContent>
          <Typography>Loading...</Typography>
          </CardContent>
        </Card>
      </>
    ); 
  }

  if (weeklyForecast.length == 0) {
    return (
      <>
        <Typography variant="h4" sx={{ mb: 2 }}>
          本日の天気予報
        </Typography>
        <Card>
          <CardContent>
          <Typography>{error}</Typography>;
          </CardContent>
        </Card>
      </>
    ); 
  }

  return(
    <>
      <Typography variant="h4" sx={{ mb: 2 }}>
        本日の天気予報
      </Typography>

      <Card>
        <CardContent>
          <Typography variant="subtitle1" sx={{ mb: 2 }}>東京</Typography>
          <Box sx={{ display: 'flex', columnGap: '12px' }}>
            <Box
              component="img"
              src={weeklyForecast[0].icon}
              alt="Today's Weather"
              sx={{ width: 64, height: 64, mr: 2 }}
            >
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, justifyContent: 'space-around' }}>
              <Typography variant="h2" color="red">
                {weeklyForecast[0].maxTemp}
                </Typography>
              <Typography variant="h3" color="secondary">
                {weeklyForecast[0].minTemp}
                </Typography>
            </Box>
          </Box>

          <Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 1,
                p: 1,
              }}
            >
              {weeklyForecast.map((day, index) => (
                <Box component="div" key={index} sx={{
                  width: 'calc(100% / 6)',
                  textAlign: 'center',
                  marginBottom: '0px',
                }}>
                  {/* 曜日 */}
                  <Box>
                    <Typography variant="overline">{day.day}</Typography>
                  </Box>
                  {/* 天気画像 */}
                  <Box
                    component="img"
                    src={day.icon}
                    alt={`${day.day} Weather`}
                    sx={{ width: 24, height: 24 }}
                  />
                  {/* 気温 */}
                  <Box>
                    <Typography variant="overline">{day.maxTemp}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="overline" color="gray">{day.minTemp}</Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </CardContent>
      </Card>
    </>
  );
}