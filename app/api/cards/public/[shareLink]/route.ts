import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ shareLink: string }> },
) {
  try {
    const { shareLink } = await params;

    const card = await prisma.card.findFirst({
      where: {
        shareLink: shareLink,
        status: "published",
      },
    });

    if (!card) {
      return NextResponse.json({ error: "Card not found" }, { status: 404 });
    }

    // Increment view count
    await prisma.card.update({
      where: { id: card.id },
      data: { viewCount: card.viewCount + 1 },
    });

    // Transform to match frontend expectations
    return NextResponse.json({
      id: card.id,
      title: card.title,
      message: card.message,
      recipientName: card.recipientName,
      senderName: card.senderName,
      category: card.category,
      template: card.templateId,
      font: card.fontFamily,
      accentColor: card.textColor,
      envelopeStyle: card.envelopeStyle,
    });
  } catch (error) {
    console.error("Error fetching public card:", error);
    return NextResponse.json(
      { error: "Failed to fetch card" },
      { status: 500 },
    );
  }
}
