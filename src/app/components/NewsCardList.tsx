import React from "react";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia, 
  Typography,
  Skeleton,
} from '@mui/material';

type NewsData = {
  title: string,
  image: string;
  url: string;
  publishedAt: string;
}

type NewsCardListProps = {
  title: string;
  newsData: NewsData[];
  loading: boolean;
};

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

const NewsCardList = ({newsData, title, loading}: NewsCardListProps) => (
  <Box>
    <Typography variant="h4" sx={{mb: 2}}>
      {title}
    </Typography>

    <Box sx={{display: 'flex', flexDirection: "column", gap: 2}}>
      {loading ? (
        [...Array(3)].map((_, index) => (
          <Card key={index} sx={{display: 'flex', height: 120}}>
            <Skeleton variant="rectangular" width={120} height="100%" sx={{flexShrink: 0}} />
            <CardContent sx={{ flexGrow: 1, height: '100%' }}>
              <Skeleton variant="text" width="80%" />
              <Skeleton variant="text" width="60%" />
            </CardContent>
          </Card>
        ))
      ) : (
        newsData.map((news, index) => (
          <Card key={index} sx={{display: 'flex', height: 120}}>
            <CardActionArea
              component="a"
              href={news.url}
              target="_blank"
              rel="noopener"
              sx={{display: 'flex', width: '100%'}}>
              <CardContent sx={{flexGrow: 1, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                <Typography
                  variant="subtitle2"
                  sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: 3
                  }}
                >
                  {news.title}
                </Typography>
                <Typography variant="caption" color="gray">{getTimeAgo(news.publishedAt)}</Typography>
              </CardContent>
              <CardMedia
                component="img"
                sx={{width: 120, height: '100%', flexShrink: 0}}
                image={news.image}
                alt={news.title}
              >
              </CardMedia>
            </CardActionArea>
          </Card>
        ))
      )}
    </Box>
  </Box>
);

export default NewsCardList;