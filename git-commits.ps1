# Run in C:\Projects\ASSIGNMENT\a07 (PowerShell) AFTER copying all files and running `npm install`
git init
git branch -M main
git add package.json next.config.mjs postcss.config.js tailwind.config.js jsconfig.json .gitignore .env.example
git commit -m "chore: initialize Next.js project with Tailwind CSS and DaisyUI"
git add src/app/globals.css src/app/layout.js src/lib/format.js src/lib/normalize.js src/lib/api.js src/app/api/bazar
git commit -m "feat: add global styles, layout, data helpers and API proxy"
git add src/components/DataProvider.jsx src/components/Providers.jsx src/components/Navbar.jsx src/components/Ticker.jsx src/components/Footer.jsx public
git commit -m "feat: add navbar, price ticker marquee and footer"
git add src/components/Hero.jsx src/app/page.js
git commit -m "feat: add hero banner section with anchor CTA"
git add src/components/ProductCard.jsx src/components/Skeletons.jsx src/components/SortSelect.jsx src/components/ProductSections.jsx
git commit -m "feat: add product cards, skeleton loaders and home sections"
git add src/components/CategoryView.jsx src/app/category src/components/EmptyState.jsx src/app/not-found.js
git commit -m "feat: add category page with sorting, empty state and 404 page"
git add src/lib/mongodb.js src/lib/auth.js src/lib/auth-client.js src/app/api/auth src/components/SocialButtons.jsx src/components/AuthShell.jsx src/components/SignInForm.jsx src/components/SignUpForm.jsx src/app/signin src/app/signup
git commit -m "feat: add Better Auth with email, Google and GitHub login"
git add src/components/ProtectedRoute.jsx src/components/ProductDetail.jsx src/components/CompareView.jsx src/app/product src/app/compare
git commit -m "feat: add protected product details page"
git add src/components/ProfileView.jsx src/components/UpdateProfileForm.jsx src/app/profile
git commit -m "feat: add profile page and update information feature"
git add README.md
git commit -m "docs: add project README"
git add -A
git commit -m "chore: final polish" --allow-empty
# git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
# git push -u origin main
