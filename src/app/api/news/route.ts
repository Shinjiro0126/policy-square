import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest){
  const { searchParams } = req.nextUrl; // req.nextUrlを使用
  console.log(searchParams.get('categoryTy'));
  const categoryTy = parseInt(searchParams.get('categoryTy') || "1", 10);
  const maxResults = parseInt(searchParams.get('maxResults') || "25", 10);

  try {
    const news = await prisma.tNews.findMany({
      orderBy: {
        publishedAt: "desc",
      },
      take: maxResults,
    });

    const filteredNews = news.filter((item) => {
      if (item.categoryTy !== null) {
        return (item.categoryTy & categoryTy) > 0;
      }
      return false;
    });

    const newsData = filteredNews.map((item) => ({
      title: item.title,
      image: item.urlToImage,
      url: item.url,
      publishedAt: item.publishedAt,
    }));

    return NextResponse.json(newsData);

  } catch (error) {
    console.error("Error fetching news:", error);
    return NextResponse.json(
      { error: "ニュースデータの取得に失敗しました。" },
      { status: 500 }
    );
  }
}
