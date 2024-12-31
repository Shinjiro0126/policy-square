"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  CssBaseline,
  Breadcrumbs,
  Link,
} from "@mui/material";

import { DashboardLayout } from "./DashboardLayout";
import NewsCardList from "./components/NewsCardList";
import WeatherCard from "./components/WeatherCard";
import NewsSummary from "./components/NewsSummary";

export default function LoginPage() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchTrendNews = async () => {
        try {
          const res = await fetch(`/api/news?categoryTy=3`);

          if(!res.ok){
            throw new Error("ニュースデータの取得に失敗しました。");
          }
          const data = await res.json();
          console.log(data);
          setNews(data);
        } catch (error) {
          console.error("fetchTrendNewsのエラー:", error);
        } finally{
          setLoading(false);
        }
      }
      fetchTrendNews();
    }, []);

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
          <Box sx={{display: "flex", gap: '48px 16px', flexWrap: {xs: 'wrap', md: 'nowrap'}}}>

            {/* ニュース */}
            <Box sx={{width: {xs: '100%', md: '60%'}}}>
            {/* 本日の要約 */}
            <NewsSummary />

            {/* ニュースカードリスト */}
            <NewsCardList newsData={news} title="注目のニュース" loading={loading} />
          </Box>
            
            {/* 天気予報PC */}
            <Box sx={{ width: {xs: '100%', md: '40%'}}}>
              <WeatherCard />
            </Box>
          </Box>

        </Box>
    </DashboardLayout>
  );
}
