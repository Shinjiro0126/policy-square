import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function PUT(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const news_id = pathname.split('/').pop();

  if (!news_id) {
    return NextResponse.json({ error: "ニュースIDが提供されていません。" }, { status: 400 });
  }

  try {
    const id = parseInt(news_id, 10);

    if (isNaN(id)) {
      return NextResponse.json({ error: "無効なニュースIDです。" }, { status: 400 });
    }

    const existingNews = await prisma.tNews.findUnique({
      where: {newsId: id}
    })

    if(!existingNews){
      return NextResponse.json({error: "記事が見つかりませんでした。"}, {status: 404});
    }


    const updatedNews = await prisma.tNews.update({
      where: { newsId: id },
      data: {
        pv: {
          increment: 1,
        },
      },
    });

    return NextResponse.json(updatedNews);
  } catch (error) {
    console.error("Error updating pv:", error);
    return NextResponse.json({ error: "Failed to update pv" }, { status: 500 });
  }
}