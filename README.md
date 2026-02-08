# Dearly

Platform kartu ucapan digital interaktif yang dibuat dengan Next.js 16, memungkinkan pengguna membuat dan mengirim momen spesial secara personal dengan animasi yang memukau.

## Fitur

- **Template Interaktif**: Beragam pilihan template seperti Amplop Klasik, Kue Ulang Tahun (bisa tiup lilin!), Bouquet Bunga, Kotak Harta Karun, dan banyak lagi.
- **AI Magic Writer**: Tidak jago merangkai kata? Biarkan AI (Groq) menuliskan pesan puitis untukmu.
- **Kustomisasi Penuh**: Ubah font, warna, dan gaya amplop sesuai selera.
- **Preview Real-time**: Lihat hasil kartumu secara langsung sebelum dikirim.
- **Dashboard Pengguna**: Kelola semua kartu yang pernah dibuat, lihat statistik view, dan edit kapan saja.
- **Responsif**: Tampil cantik di mobile maupun desktop.

## 🛠 Teknologi

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Database**: [Prisma](https://www.prisma.io/) (SQLite)
- **Auth**: [NextAuth.js](https://next-auth.js.org/)
- **Animasi**: [Framer Motion](https://www.framer.com/motion/)
- **AI**: [Groq SDK](https://groq.com/) (Llama 3)
- **Icons**: [Lucide React](https://lucide.dev/)

## Jalankan Project

1. **Clone**
   ```bash
   git clone https://github.com/username/dearly.git
   cd dearly
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Setup Env**
   Salin file `.env.example` ke `.env` dan sesuaikan isinya:
   ```bash
   cp .env.example .env
   ```
   > Pastikan kamu memiliki API Key dari Groq untuk fitur AI Writer.

4. **Siapkan Database**
   ```bash
   npx prisma db push
   ```

5. **Jalankan Development Server**
   ```bash
   pnpm run dev
   ```

Buka [http://localhost:3000](http://localhost:3000).

