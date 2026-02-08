import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { nanoid } from "nanoid";
import prisma from "@/lib/db";

export async function GET() {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const cards = await prisma.card.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
    });

    // Transform to match frontend expectations
    const transformedCards = cards.map((card) => ({
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
      status: card.status,
      shareLink: card.shareLink,
      viewCount: card.viewCount,
      createdAt: card.createdAt,
    }));

    return NextResponse.json(transformedCards);
  } catch (error) {
    console.error("Error fetching cards:", error);
    return NextResponse.json(
      { error: "Failed to fetch cards" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await req.json();

    const card = await prisma.card.create({
      data: {
        userId: session.user.id as string,
        title: data.title || `Kartu ${data.category}`,
        message: data.message,
        recipientName: data.recipientName,
        senderName: data.senderName,
        category: data.category,
        templateId: data.template,
        fontFamily: data.font || "Inter",
        textColor: data.accentColor || "#f43f5e",
        envelopeStyle: data.envelopeStyle || "classic",
        envelopeColor: data.envelopeColor || "#d4a574",
        shareLink: nanoid(10),
        status: "published",
      },
    });

    return NextResponse.json(card, { status: 201 });
  } catch (error) {
    console.error("Error creating card:", error);
    return NextResponse.json(
      { error: "Failed to create card" },
      { status: 500 },
    );
  }
}
