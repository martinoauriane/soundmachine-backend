-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "pseudo" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Track" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "duration" INTEGER NOT NULL,
    "music_genre" TEXT NOT NULL,
    "filepath" TEXT NOT NULL,
    "authorId" INTEGER NOT NULL,

    CONSTRAINT "Track_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_UserFollows" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_UserFollows_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_UserDownloadedTracks" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_UserDownloadedTracks_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_UserFavoriteTracks" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_UserFavoriteTracks_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_pseudo_key" ON "User"("pseudo");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "_UserFollows_B_index" ON "_UserFollows"("B");

-- CreateIndex
CREATE INDEX "_UserDownloadedTracks_B_index" ON "_UserDownloadedTracks"("B");

-- CreateIndex
CREATE INDEX "_UserFavoriteTracks_B_index" ON "_UserFavoriteTracks"("B");

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserFollows" ADD CONSTRAINT "_UserFollows_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserFollows" ADD CONSTRAINT "_UserFollows_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserDownloadedTracks" ADD CONSTRAINT "_UserDownloadedTracks_A_fkey" FOREIGN KEY ("A") REFERENCES "Track"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserDownloadedTracks" ADD CONSTRAINT "_UserDownloadedTracks_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserFavoriteTracks" ADD CONSTRAINT "_UserFavoriteTracks_A_fkey" FOREIGN KEY ("A") REFERENCES "Track"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserFavoriteTracks" ADD CONSTRAINT "_UserFavoriteTracks_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
