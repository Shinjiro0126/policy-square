"use client";

import React, { useState } from "react";
import {
  Typography,
  Box,
  CssBaseline,
  Breadcrumbs,
  Link,
  Paper,
  Card,
  CardMedia,
  CardActionArea,
  CardContent
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"; // アイコン名修正

import { DashboardLayout } from "./DashboardLayout";

export default function LoginPage() {

  // ダミーデータ
const dummyNews = [
  {
    title: "ニュース記事1",
    summary: "これはニュース記事1の概要です。これはニュース記事1の概要です。",
    image: "https://via.placeholder.com/120",
  },
  {
    title: "ニュース記事2",
    summary: "これはニュース記事2の概要です。",
    image: "https://via.placeholder.com/120",
  },
  {
    title: "ニュース記事3",
    summary: "これはニュース記事3の概要です。",
    image: "https://via.placeholder.com/120",
  },
  {
    title: "ニュース記事4",
    summary: "これはニュース記事4の概要です。",
    image: "https://via.placeholder.com/120",
  },
];

const weeklyForecast = [
  { day: "火", icon: "/weather.svg", maxTemp: 28, minTemp: 19 },
  { day: "水", icon: "/weather.svg", maxTemp: 26, minTemp: 18 },
  { day: "木", icon: "/weather.svg", maxTemp: 25, minTemp: 17 },
  { day: "金", icon: "/weather.svg", maxTemp: 24, minTemp: 16 },
  { day: "土", icon: "/weather.svg", maxTemp: 23, minTemp: 15 },
  { day: "日", icon: "/weather.svg", maxTemp: 22, minTemp: 14 },
];

  return (
    <DashboardLayout>
        <Box component="main" maxWidth="xs">
          <CssBaseline />
          
          {/* パンくずリスト */}
          <Breadcrumbs aria-label="breadcrumb" sx={{mb: 2}}>
            <Link underline="hover" color="inherit" href="/">
              ホーム
            </Link>
          </Breadcrumbs>

          {/* ニュース一覧と天気予報を横並びで配置 */}
          <Box sx={{display: "flex", gap: 2}}>

            {/* ニュース */}
            <Box sx={{width: {xs: '100%', md: '60%'}}}>
            {/* 本日の要約 */}
            <Box sx={{marginBottom: '48px'}}>
              <Typography variant="h4" sx={{ mb: 2 }}>
                本日のニュースAI要約
              </Typography>
              <Box>
                <Card>
                  <CardContent>
                    1.政治<br />
                    衆            ・議院選挙後、与野党間の協力体制を模索する動きが活発化。
                    政策調整が焦点に。<br />
                    ・旧統一教会問題では新証拠が浮上し、再び対応策の議論が進行中。<br />
                    ・選択的夫婦別姓制度をめぐり、賛否が活発に交わされています<br />
                    2.経済<br />
                    ・日銀が金融政策の見直しを検討中。低金利政策の長期化が影響を
                    与える可能性あり。<br />
                    ・国内の物価高に対し、政府は追加支援策の必要性を議論しています。<br />
                    ・円安の影響で輸入品価格が上昇。家計への負担が懸念されています。
                  </CardContent>
                </Card>
              </Box>
            </Box>

            <Box>
              <Typography variant="h4" sx={{ mb: 2 }}>
                注目のニュース
              </Typography>

              {/* ニュースカードリスト */}
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {dummyNews.map((news, index) => (
                  <Card key={index} sx={{ display: "flex", height: 120 }}>
                    <CardActionArea sx={{ display: "flex", width: "100%" }}>
                      <CardContent sx={{ flexGrow: 1, height: '100%' }}>
                        <Typography variant="subtitle2" sx={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "-webkit-box",
                          WebkitBoxOrient: "vertical",
                          WebkitLineClamp: 3,
                        }}
                        >
                          {news.title}
                        </Typography>
                      </CardContent>
                      <CardMedia
                        component="img"
                        sx={{ width: 120 }}
                        image={news.image}
                        alt={news.title}
                      />
                    </CardActionArea>
                  </Card>
                ))}
              </Box>
            </Box>
          </Box>
            
            {/* 天気予報PC */}
            <Box sx={{ width: '40%', display: {xs: 'none', md: 'block'} }}>
              <Typography variant="h4" sx={{ mb: 2 }}>
                本日の天気予報
              </Typography>

              <Card>
                <CardContent>
                  <Typography variant="subtitle1" sx={{ mb: 2 }}>大阪市</Typography>
                  <Box sx={{display: 'flex', columnGap: '12px'}}>
                    <Box
                      component="img"
                      src="/weather.svg"
                      alt="Today's Weather"
                      sx={{width: 64, height: 64, mr: 2}}
                    >
                    </Box>
                    <Box sx={{display: 'flex', alignItems: 'center', flexGrow: 1, justifyContent: 'space-around'}}>
                      <Typography variant="h2" color="red">28°C</Typography>
                      <Typography variant="h3" color="secondary">18°C</Typography>
                    </Box>
                  </Box>

                  <Box>
                      <Box 
                        sx= {{
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
            </Box>

          </Box>

        </Box>
    </DashboardLayout>
  );
}
