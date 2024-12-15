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
}

type NewsCardListProps = {
  title: string;
  newsData: NewsData[];
  loading: boolean;
};

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
            <CardActionArea sx={{display: 'flex', width: '100%'}}>
              <CardContent sx={{flexGrow: 1, height: '100%'}}>
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