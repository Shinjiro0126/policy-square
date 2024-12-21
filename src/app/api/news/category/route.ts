import { NextResponse } from "next/server";

interface Article {
  title: string;
  description: string;
  content: string;
  image: string;
  url: string;
  publishedAt: string;
}

export async function GET(request: Request){
  const API_KEY = process.env.GNEWS_API_KEY;
  const BASE_URL = "https://gnews.io/api/v4/search";

  console.log("API Key:", API_KEY);

  if(!API_KEY){
    return NextResponse.json({error: "API key is missing"}, {status: 500});
  }

  const {searchParams} = new URL(request.url);
  const keywords = searchParams.get('keywords') || 'politics';

  const query = keywords.split(",").join(" OR ");
  console.log(query);

  try {
    const res = await fetch(`${BASE_URL}?q=${encodeURIComponent(query)}&country=ja&apikey=${API_KEY}`);
    if(!res.ok){
      throw new Error("Failed to fetch data from GNews API");
    }

    const data = await res.json();

    console.log(data);

    const articles: Article[] = data.articles.map((article: Article) => ({
      title: article.title,
      description: article.description,
      content: article.content,
      image: article.image,
      url: article.url,
      publishedAt: article.publishedAt,
    }));

    return NextResponse.json({articles});
  } catch (error) {
    console.error("Error fetching news data:", error);
    return NextResponse.json({error: "ニュースデータの取得に失敗しました。"}, {status: 500});
  }
}