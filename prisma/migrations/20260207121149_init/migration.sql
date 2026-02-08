-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Card" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "recipientName" TEXT,
    "senderName" TEXT,
    "templateId" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "fontFamily" TEXT NOT NULL DEFAULT 'Inter',
    "fontSize" INTEGER NOT NULL DEFAULT 16,
    "textColor" TEXT NOT NULL DEFAULT '#1a1a1a',
    "bgColor" TEXT NOT NULL DEFAULT '#ffffff',
    "bgGradient" TEXT,
    "layout" TEXT NOT NULL DEFAULT 'centered',
    "imageUrl" TEXT,
    "musicUrl" TEXT,
    "stickers" TEXT,
    "envelopeStyle" TEXT NOT NULL DEFAULT 'classic',
    "envelopeColor" TEXT NOT NULL DEFAULT '#d4a574',
    "status" TEXT NOT NULL DEFAULT 'draft',
    "shareLink" TEXT NOT NULL,
    "password" TEXT,
    "isPublic" BOOLEAN NOT NULL DEFAULT true,
    "viewCount" INTEGER NOT NULL DEFAULT 0,
    "scheduledAt" TIMESTAMP(3),
    "publishedAt" TIMESTAMP(3),
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Card_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Template" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "previewImage" TEXT,
    "bgColor" TEXT NOT NULL DEFAULT '#ffffff',
    "bgGradient" TEXT,
    "fontFamily" TEXT NOT NULL DEFAULT 'Inter',
    "textColor" TEXT NOT NULL DEFAULT '#1a1a1a',
    "layout" TEXT NOT NULL DEFAULT 'centered',
    "envelopeStyle" TEXT NOT NULL DEFAULT 'classic',
    "envelopeColor" TEXT NOT NULL DEFAULT '#d4a574',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isPremium" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Template_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Card_shareLink_key" ON "Card"("shareLink");

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
