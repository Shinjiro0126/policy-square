import React from "react";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia, 
  Typography,
} from '@mui/material';

type NewsData = {
  title: string,
  image: string;
}

type NewsCardListProps = {
  title: string;
  newsData: NewsData[];
};

const NewsCardList = ({newsData, title}: NewsCardListProps,) => (
  <Box>
    <Typography variant="h4" sx={{mb: 2}}>
      {title}
    </Typography>

    <Box sx={{display: 'flex', flexDirection: "column", gap: 2}}>
      {newsData.map((news, index) => (
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
              sx={{width: 120}}
              image={news.image}
              alt={news.title}
            >
            </CardMedia>
          </CardActionArea>
        </Card>
      ))}
    </Box>
  </Box>
);

export default NewsCardList;