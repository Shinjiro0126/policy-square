"use client";

import React from "react";
import {
  Box,
  CssBaseline,
  Breadcrumbs,
  Link,
} from '@mui/material';

import { DashboardLayout } from "@/app/DashboardLayout";
import NewsCardList from "@/app/components/NewsCardList";
import NewsRankingCard from "@/app/components/NewsRankingCard";

export default function PoliticlaPage(){

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

  // ダミーデータ
  const rankingData = [
    {
      id: 1,
      title: '中国「対トランプ」で日本に接近 米中対立の拍車に備え',
      date: '11/16（土）',
      image: '/next.svg',
      link: '/news/1',
    },
    {
      id: 2,
      title: '米国株が急落、FRBの利上げ観測で投資家警戒',
      date: '11/15（金）',
      image: '/next.svg',
      link: '/news/2',
    },
  ];

  return(
    <DashboardLayout>
      <Box component="main" maxWidth="xs">
        <CssBaseline />

        {/* パンくずリスト */}
        <Breadcrumbs aria-label="breadcrumb" sx={{mb: 2}}>
          <Link underline="none" color="inherit">
            ニュース
          </Link>
          <Link underline="hover" color="inherit" href="/news/political">
            政治・経済
          </Link>
        </Breadcrumbs>


        <Box sx={{display: "flex", gap: 2}}>
          {/* ニュース */}
          <Box sx={{width: {xs: '100%', md: '60%'}}}>
            <NewsCardList newsData={dummyNews} title="政治・経済" />
          </Box>

          {/* アクセスランキング */}
          <Box sx={{width: {xs: '100%', md: '40%'}}}>
            <NewsRankingCard rankingData={rankingData} />
          </Box>
        </Box>

      </Box>
    </DashboardLayout>
  );
}