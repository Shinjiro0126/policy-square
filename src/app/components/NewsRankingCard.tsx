import React from 'react';
import { Box, Typography, Card, CardActionArea, CardContent, Skeleton } from '@mui/material';

interface NewsItem {
  title: string;
  image: string;
  url: string;
  publishedAt: string;
}

interface AccessRankingProps{
  rankingData: NewsItem[];
  title?: string;
  loading: boolean;
}

const getTimeAgo = (publishedAt: string): string => {
  const publishedDate = new Date(publishedAt);
  const now = new Date();
  const diffInMs = now.getTime() - publishedDate.getTime();

  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMinutes / 60);

  if (diffInMinutes < 60) {
    return `${diffInMinutes}分前`;
  } else if (diffInHours < 24) {
    return `${diffInHours}時間前`;
  } else {
    return publishedDate.toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  }
}

export default function NewsRankingCard({rankingData, title = "アクセスランキング", loading}: AccessRankingProps){
  return(
    <>
      <Typography variant="h4" sx={{ mb: 2 }}>
        {title}
      </Typography>
      <Card>
        {loading
          ? Array.from({ length: 5 }).map((_, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                columnGap: "12px",
                padding: "16px",
                borderBottom: index != 4 ? "1px solid #ddd" : "none",
              }}
            >
              <Box sx={{ display: "flex", columnGap: "12px", flexGrow: 1 }}>
                <Skeleton variant='text' width={24} height={24} sx={{ flexShrink: 0 }} />
                <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
                  <Skeleton variant='text' width="80%" height={20} />
                  <Skeleton variant='text' width="60%" height={16} />
                </Box>
              </Box>
              <Skeleton variant="rectangular" width={88} height={72} sx={{ flexShrink: 0 }} />
            </Box>
          ))
          :
          rankingData.map((news, index) => (
            <CardActionArea
              key={index}
              component="a"
              href={news.url}
              target='_blank'
              rel="noopener"
              sx={{
                color: 'primary.main',
                textDecoration: 'none',
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
                  <Typography variant="rank">{index + 1}</Typography>
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
                      {getTimeAgo(news.publishedAt)}
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    flexShrink: 0,
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
          ))
        }
      </Card>

    </>
  );
}