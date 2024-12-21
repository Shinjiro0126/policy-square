"use client";

import React, {useState, useEffect} from "react";
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
  const [loading, setLoading] = useState(true);
  const [loadingRanking, setLoadingRanking] = useState(true);
  const [news, setNews] = useState([]);
  const [newsRanking, setNewsRanking] = useState([]);

  useEffect(() => {
    const fetchCategoryNews = async () => {
      try {
        const keyword = "選挙,政策,立法,政府,議会,国会,政党,法案,首相,行政";
        const res = await fetch(`/api/news/category?keywords=${keyword}`);
        if(!res.ok){
          throw new Error("ニュースデータの取得に失敗しました。");
        }
        const data = await res.json();
        setNews(data.articles);
      } catch (error) {
        console.error(error);
      } finally{
        setLoading(false);
      }
    }
    fetchCategoryNews();
  }, []);

  useEffect(() => {
    const fetchTrendNews = async () => {
      try {
        const topics = "politics,economy";
        const max = 5;
        const res = await fetch(`/api/news/trending?topics=${topics}&max=${max}`)
        if(!res.ok){
          throw new Error("ランキングデータの取得に失敗しました。");
        }
        const data = await res.json();
        setNewsRanking(data.articles);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingRanking(false);
      }
    }
    fetchTrendNews();
  }, []);

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


        <Box sx={{display: "flex", gap: '48px 16px', flexWrap: {xs: 'wrap', md: 'nowrap'}}}>
          {/* ニュース */}
          <Box sx={{width: {xs: '100%', md: '60%'}}}>
            <NewsCardList newsData={news} title="政治・経済" loading={loading} />
          </Box>

          {/* アクセスランキング */}
          <Box sx={{width: {xs: '100%', md: '40%'}}}>
            <NewsRankingCard rankingData={newsRanking} loading={loadingRanking} />
          </Box>
        </Box>

      </Box>
    </DashboardLayout>
  );
}