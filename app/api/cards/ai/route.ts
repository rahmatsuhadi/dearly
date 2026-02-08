import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import Groq from "groq-sdk";

// Initialize Groq client
// Pastikan GROQ_API_KEY sudah diset di .env
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || "dummy_key_if_not_set",
});

export async function POST(req: Request) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { category, recipientName, senderName, userPrompt, tone } = await req.json();

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        { error: "Kunci API Groq belum dikonfigurasi. Hubungi admin." },
        { status: 500 }
      );
    }

    // Bangun prompt yang efektif
    const systemPrompt = `Kamu adalah penulis kartu ucapan profesional yang puitis dan kreatif. 
    Tugasmu adalah membuat pesan kartu ucapan yang menyentuh hati dalam Bahasa Indonesia.
    Buatlah pesan yang personal, hangat, dan sesuai dengan konteks. 
    Panjang pesan sekitar 2-4 kalimat saja, jangan terlalu panjang. 
    Gunakan emoji yang relevan.
    Jangan gunakan tanda kutip di awal dan akhir output.
    Langsung berikan isi pesannya saja.`;

    const userMessage = `
    Konteks Kartu:
    - Kategori: ${category || "Umum"}
    - Penerima: ${recipientName || "Seseorang"}
    - Pengirim: ${senderName || "Aku"}
    - Gaya Bahasa: ${tone || "Puitis & Romantis"}
    
    Instruksi Tambahan dari User: ${userPrompt || "Buatkan ucapan yang menyentuh hati."}
    
    Buatkan pesan kartu ucapan berdasarkan konteks di atas.`;

    const completion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userMessage },
      ],
      model: "llama-3.1-8b-instant", // Model cepat dan performa tinggi
      temperature: 0.7,
      max_tokens: 300,
    });

    const generatedText = completion.choices[0]?.message?.content || "";

    return NextResponse.json({ message: generatedText });
  } catch (error) {
    console.error("Error generating text:", error);
    return NextResponse.json(
      { error: "Gagal membuat pesan dengan AI." },
      { status: 500 }
    );
  }
}
