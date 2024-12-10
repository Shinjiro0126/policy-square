import React from 'react';
import { Box, Typography, Card, CardActionArea, CardContent } from '@mui/material';

interface NewsItem {
  id: number;
  title: string;
  link: string;
  image: string;
  date: string;
}

interface AccessRankingProps{
  rankingData: NewsItem[];
  title?: string;
}

export default function NewsRankingCard({rankingData, title = "アクセスランキング"}: AccessRankingProps){
  return(
    <>
      <Typography variant="h4" sx={{ mb: 2 }}>
        {title}
      </Typography>
      <Card>
        {rankingData.map((news, index) => (
            <CardActionArea
              key={index}
              component="a" // CardActionArea を a タグとしてレンダリング
              href={news.link}
              sx={{
                color: 'primary.main',
                textDecoration: 'none', // リンクの下線を削除
                borderBottom: index !== rankingData.length - 1 ? '1px solid #ddd' : 'none', // 最後のボーダーを非表示
              }}
            >
              <CardContent
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  columnGap: '12px',
                  padding: '16px',
                }}
              >
                <Box sx={{ display: 'flex', columnGap: '12px' }}>
                  <Typography variant="rank">{news.id}</Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      flexGrow: 1,
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 3,
                        marginBottom: '8px',
                      }}
                    >
                      {news.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {news.date}
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    width: '88px',
                    height: '72px',
                  }}
                >
                  <Box
                    component="img"
                    src={news.image}
                    alt={news.title}
                    sx={{
                      height: '100%',
                      maxWidth: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </Box>
              </CardContent>
            </CardActionArea>
        ))}
      </Card>

    </>
  );
}