"use client";

import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  CssBaseline,
  Breadcrumbs,
  Link,
  Card,
  CardContent
} from "@mui/material";

import { DashboardLayout } from "./DashboardLayout";
import NewsCardList from "./components/NewsCardList";
import WeatherCard from "./components/WeatherCard";

export default function LoginPage() {
  const [news, setNews] = useState([]);

    useEffect(() => {
      const fetchTrendNews = async () => {
        try {
          const res = await fetch(`/api/news/trending`);
          if(!res.ok){
            throw new Error("ニュースデータの取得に失敗しました。");
          }
          const data = await res.json();
          setNews(data.articles);
        } catch (error) {
          console.error(error);
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

            {/* ニュースカードリスト */}
            <NewsCardList newsData={news} title="注目のニュース" />
          </Box>
            
            {/* 天気予報PC */}
            <Box sx={{ width: '40%', display: {xs: 'none', md: 'block'} }}>
              <WeatherCard />
            </Box>
          </Box>

        </Box>
    </DashboardLayout>
  );
}
