import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";


const prisma = new PrismaClient();

interface Article {
  title: string;
  category: string;
  description: string;
  content: string;
  image_url: string;
  link: string;
  pubDate: string;
}

export async function GET(){
  const API_KEY = process.env.NEWS_DATA_API_KEY;
  const BASE_URL = "https://newsdata.io/api/1/latest";

  try {
    const categories = ["business"];
    const country = "jp";
    const language = "jp";

    const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&country=${country}&category=${categories.join(
      ","
    )}&language=${language}`);

    if(!response.ok){
      throw new Error("ニュースデータの取得に失敗しました。");
    }

    const data = await response.json();

    console.log(data.results);

    const articles: Article[] = data.results.map((article:Article) => ({
      title: article.title,
      category: article.category,
      description: article.description,
      content: article.content,
      image_url: article.image_url,
      link: article.link,
      pubDate: article.pubDate 
    }))

    const existingArticle = new Set(
      (
        await prisma.tNews.findMany({
          select: {title: true},
        })
      ).map((record) => record.title)
    );

    const insertArticles = articles.filter((article) => !existingArticle.has(article.title));
    const insertDate = new Date();

    if(insertArticles.length > 0){
      await prisma.tNews.createMany({
        data: insertArticles.map((article) => ({
          categoryTy: mapCategoryToType(article.category),
          title: article.title,
          description: article.description,
          content: article.content,
          urlToImage: article.image_url,
          url: article.link,
          publishedAt: article.pubDate,
          pv: 0,
          createDate: insertDate,
          updateDate: insertDate,
        })),
        skipDuplicates: true,
      })

      console.log(`${insertArticles.length}件のニュースをinsertしました。`);
    } else {
      console.log("新しいニュースがありませんでした。");
    }
    return NextResponse.json({ message: "News data processed successfully", newRecords: insertArticles.length });
  } catch (error) {
    console.log("エラーが発生しました。:", error);
    return NextResponse.json(
      {
        message: "Error processing news data",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

function mapCategoryToType(category: string): number {
  console.log(category);  // ログでどんな文字列が渡されているか確認
  if (category.includes("politics")) {
    return 1;
  } else if (category.includes("business")) {
    return 2;
  }
  return 0;  // "politics" や "business" を含まない場合は未分類
}