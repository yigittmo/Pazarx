# PazarX V1

Çok satıcılı e-ticaret pazaryeri başlangıç projesi.

## Teknoloji
- Next.js App Router
- TypeScript
- Tailwind CSS
- Supabase Auth + PostgreSQL
- Vercel deployment

## Kurulum
1. Node.js kurulu olduğundan emin ol.
2. `npm install`
3. `.env.example` dosyasını `.env.local` olarak kopyala.
4. Supabase projesi oluştur ve `supabase/schema.sql` içeriğini SQL Editor'da çalıştır.
5. Supabase URL ve Publishable Key değerlerini `.env.local` içine yaz.
6. `npm run dev`
7. Tarayıcıda `http://localhost:3000` aç.

## Yayınlama
GitHub'a yükle ve Vercel'de New Project ile repository'yi seç. Environment Variables bölümüne `.env.local` içindeki değerleri ekle.

Not: Bu V1 arayüz + temel veri modeli iskeletidir. Gerçek ödeme, kargo, e-fatura, satıcı doğrulama ve üretim güvenliği ayrıca tamamlanmalıdır.
