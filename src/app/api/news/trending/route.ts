import { NextResponse } from "next/server";

interface Article {
  title: string;
  description: string,
  content: string;
  image: string;
  url: string;
  publishedAt: string;
}


export async function GET(){
  const API_KEY = "1fa8c0e93387410586d706a9f17e8419";
  const BASE_URL = "https://gnews.io/api/v4/top-headlines";

  try {
    const topics = ["politics", "economy", "business"];
    const response = await fetch(`${BASE_URL}?lang=ja&topic=${topics.join(",")}&max=10&token=${API_KEY}`);
    if(!response.ok){
      throw new Error("ニュースデータの取得に失敗しました。");
    }

    const data: {articles: Article[]} = await response.json();
    const articles: Article[] = data.articles.map((article) => ({
      title: article.title,
      description: article.description,
      content: article.content,
      image: article.image,
      url: article.url,
      publishedAt: article.publishedAt,
    }));

    return NextResponse.json({articles});
  } catch (error) {
    console.error(error);
    return NextResponse.json({error: "ニュースデータの取得に失敗しました。"}, {status: 500});
  }
}