import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest){
  const { searchParams } = req.nextUrl;
  console.log(searchParams.get('categoryTy'));
  const categoryTy = parseInt(searchParams.get('categoryTy') || "1", 10);
  const maxResults = parseInt(searchParams.get('maxResults') || "25", 10);
  const desc = searchParams.get('desc');

  const orderBy: { [key: string]: "asc" | "desc" }[] = 
  desc === "pv"
    ? [{ pv: "desc" }, { publishedAt: "desc" }]
    : [{ publishedAt: "desc" }];

  try {
    const news = await prisma.tNews.findMany({
      orderBy,
    });

    const filteredNews: typeof news = [];
    let count = 0;

    for (const item of news) {
      if (item.categoryTy !== null && (item.categoryTy & categoryTy) > 0) {
        filteredNews.push(item);
        count++;
        if (count >= maxResults){
          break;
        }
      }
    }

    const newsData = filteredNews.map((item) => ({
      id: item.newsId,
      title: item.title,
      image: item.urlToImage,
      url: item.url,
      publishedAt: item.publishedAt,
      pv: item.pv,
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
