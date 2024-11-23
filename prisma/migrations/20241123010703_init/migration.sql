-- CreateTable
CREATE TABLE "DUser" (
    "User_Id" SERIAL NOT NULL,
    "Name" TEXT NOT NULL,
    "GenderTy" INTEGER,
    "UserImage_Id" INTEGER,
    "LINE_Id" TEXT,
    "IsRelationLINE" BOOLEAN NOT NULL,
    "Email" TEXT NOT NULL,
    "Password" TEXT NOT NULL,
    "CreateDate" TIMESTAMP(3) NOT NULL,
    "UpdateDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DUser_pkey" PRIMARY KEY ("User_Id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DUser_Email_key" ON "DUser"("Email");
