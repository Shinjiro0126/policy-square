import { NextResponse } from "next/server";

interface Article {
  title: string;
  description: string,
  content: string;
  image: string;
  url: string;
  publishedAt: string;
}


export async function GET(request: Request){
  const API_KEY = process.env.GNEWS_API_KEY;
  const BASE_URL = "https://gnews.io/api/v4/top-headlines";

  const {searchParams} = new URL(request.url);

  //topicsを処理
  const topicsParam = searchParams.get('topic');
  const topics = topicsParam ? topicsParam.split(",") : ["politics", "economy", "business"];
  const max = parseInt(searchParams.get('max') || "10", 10);

  try {
    // const topics = ["politics", "economy", "business"];
    const response = await fetch(`${BASE_URL}?lang=ja&topic=${topics.join(",")}&max=${max}&token=${API_KEY}`);
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