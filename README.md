# 🛒 বাজার দর (BazarDor)

> প্রয়োজনীয় পণ্যের দাম এক নজরে — চাল, ডাল, সবজি, মাছ-মাংসসহ নিত্যপ্রয়োজনীয় পণ্যের আজকের বাজার দর, দাম বাড়া-কমার হার এবং বাজারভিত্তিক তুলনা।

**Live Link:** _(deploy করার পর এখানে দিন)_
**GitHub Repository:** https://github.com/ai-engineer-rakib/Assignment-7

---

## 📖 Description

BazarDor হলো একটি Next.js ভিত্তিক বাজার-দর ট্র্যাকার। হোম পেজে দাম বাড়া/কমা পণ্য, সব পণ্যের গ্রিড এবং লাইভ প্রাইস টিকার দেখা যায়। লগইন করা ব্যবহারকারীরা প্রতিটি পণ্যের বিস্তারিত (সর্বনিম্ন, সর্বোচ্চ, গড় দাম এবং বাজারভিত্তিক দাম) দেখতে পারেন।

## ✨ Key Features

1. 📈 **Live price ticker** — নেভবারের নিচে অসীম স্ক্রলিং মারকি (emoji + নাম + দাম + ▲/▼ %)
2. 🔺🔻 **আজ দাম বেড়েছে / কমেছে** — শীর্ষ ৬টি করে পণ্য, সবুজ/লাল/ধূসর পরিবর্তন ব্যাজ
3. 🔐 **Better Auth** — Email/Password + Google + GitHub লগইন, toast নোটিফিকেশন, protected route
4. 🧾 **Product details** — সর্বনিম্ন/সর্বোচ্চ/গড় দাম ও বাজারভিত্তিক দামের তালিকা
5. 🔃 **Sort** — বাংলা সংখ্যা সঠিকভাবে বুঝে (সংখ্যামান অনুযায়ী) দাম অনুযায়ী সাজানো
6. 💀 **Skeleton loading**, 404 পেজ ও empty state, সম্পূর্ণ responsive ডিজাইন
7. ✏️ **Profile update** — Better Auth `updateUser` দিয়ে নাম আপডেট

## 🛠️ Technologies Used

| Technology                    | Purpose                                             |
| ----------------------------- | --------------------------------------------------- |
| Next.js 14 (App Router)       | UI + routing + API proxy                            |
| Tailwind CSS 3 + DaisyUI 4    | Styling & responsiveness                            |
| Better Auth                   | Authentication (email/password, Google, GitHub)     |
| MongoDB (Atlas)               | Better Auth database                                |
| Programming Hero Bazardor API | `https://openapi.programming-hero.com/api/bazardor` |
| react-hot-toast               | Toast notifications                                 |

## 🚀 Getting Started

```bash
npm install
cp .env.example .env.local   # then fill the values
npm run dev
```

Open http://localhost:3000

### Environment variables

See `.env.example`. `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `MONGODB_URI` are required. Google / GitHub keys are needed for social login.

OAuth callback URLs:

- Google: `{BETTER_AUTH_URL}/api/auth/callback/google`
- GitHub: `{BETTER_AUTH_URL}/api/auth/callback/github`

## ☁️ Deploy (Vercel)

1. Push to GitHub → Import project in Vercel
2. Add all env variables (set `BETTER_AUTH_URL` to your Vercel URL)
3. Add the Vercel URL's callback links in Google / GitHub OAuth app settings
4. Deploy — dynamic routes (`/category/[slug]`, `/product/[slug]`) work on refresh.
