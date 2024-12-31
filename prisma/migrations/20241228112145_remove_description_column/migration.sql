-- AlterTable
ALTER TABLE "DUser" ALTER COLUMN "IsRelationLINE" SET DEFAULT false,
ALTER COLUMN "CreateDate" DROP NOT NULL,
ALTER COLUMN "UpdateDate" DROP NOT NULL;

-- CreateTable
CREATE TABLE "DUserImage" (
    "UserImage_Id" SERIAL NOT NULL,
    "User_Id" INTEGER NOT NULL,
    "ImageUrl" TEXT,
    "CreateDate" TIMESTAMP(3),
    "UpdateDate" TIMESTAMP(3),

    CONSTRAINT "DUserImage_pkey" PRIMARY KEY ("UserImage_Id")
);

-- CreateTable
CREATE TABLE "MGenderTy" (
    "GenderTy" INTEGER NOT NULL,
    "Descr" TEXT,
    "SortOrder" SERIAL NOT NULL,
    "CreateDate" TIMESTAMP(3),
    "UpdateDate" TIMESTAMP(3),

    CONSTRAINT "MGenderTy_pkey" PRIMARY KEY ("GenderTy")
);

-- CreateTable
CREATE TABLE "TVote" (
    "Vote_Id" SERIAL NOT NULL,
    "User_Id" INTEGER NOT NULL,
    "politicalPatyTy" INTEGER,
    "Comment" TEXT,
    "CreateDate" TIMESTAMP(3),
    "UpdateDate" TIMESTAMP(3),

    CONSTRAINT "TVote_pkey" PRIMARY KEY ("Vote_Id")
);

-- CreateTable
CREATE TABLE "TVoteSupport" (
    "Vote_Id" INTEGER NOT NULL,
    "SupportUser_Id" INTEGER NOT NULL,
    "CreateDate" TIMESTAMP(3),
    "UpdateDate" TIMESTAMP(3),

    CONSTRAINT "TVoteSupport_pkey" PRIMARY KEY ("Vote_Id","SupportUser_Id")
);

-- CreateTable
CREATE TABLE "MPoliticalPartyTy" (
    "PoliticalPartyTy" INTEGER NOT NULL,
    "Descr" TEXT,
    "SortOrder" SERIAL NOT NULL,
    "CreateDate" TIMESTAMP(3),
    "UpdateDate" TIMESTAMP(3),

    CONSTRAINT "MPoliticalPartyTy_pkey" PRIMARY KEY ("PoliticalPartyTy")
);

-- CreateTable
CREATE TABLE "TNews" (
    "News_Id" SERIAL NOT NULL,
    "CategoryTy" INTEGER,
    "Author" TEXT,
    "Title" TEXT,
    "Url" TEXT,
    "UrlToImage" TEXT,
    "PublishedAt" TEXT,
    "Content" TEXT,
    "CreateDate" TIMESTAMP(3),
    "UpdateDate" TIMESTAMP(3),

    CONSTRAINT "TNews_pkey" PRIMARY KEY ("News_Id")
);

-- CreateTable
CREATE TABLE "TNewsRequest" (
    "NewsRequest_Id" SERIAL NOT NULL,
    "News_Id" INTEGER NOT NULL,
    "RequestUrl" TEXT,
    "Request" TEXT,
    "Response" TEXT,
    "CreateDate" TIMESTAMP(3),
    "UpdateDate" TIMESTAMP(3),

    CONSTRAINT "TNewsRequest_pkey" PRIMARY KEY ("NewsRequest_Id")
);

-- CreateTable
CREATE TABLE "MNewsCategoryTy" (
    "NewsCategoryTy" INTEGER NOT NULL,
    "Descr" TEXT,
    "SortOrder" SERIAL NOT NULL,
    "CreateDate" TIMESTAMP(3),
    "UpdateDate" TIMESTAMP(3),

    CONSTRAINT "MNewsCategoryTy_pkey" PRIMARY KEY ("NewsCategoryTy")
);
