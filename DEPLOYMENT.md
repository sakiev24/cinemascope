# GitHub Pages Deployment Guide for CinemaScope

Follow these steps to deploy your CinemaScope app to GitHub Pages.

## 📋 Prerequisites

- Git installed on your computer
- GitHub account
- Your TMDB API key

## 🚀 Step-by-Step Deployment

### Step 1: Install gh-pages Package

```bash
npm install --save-dev gh-pages
```

### Step 2: Update vite.config.ts

The `base` path in `vite.config.ts` should match your GitHub repository name:

```typescript
base: '/your-repo-name/',
```

**Replace `your-repo-name` with your actual GitHub repository name!**

### Step 3: Create GitHub Repository

1. Go to [GitHub](https://github.com)
2. Click the **"+"** icon → **"New repository"**
3. Name your repository (e.g., `cinemascope` or `letterboxd`)
4. Choose **Public** (required for free GitHub Pages)
5. **DO NOT** initialize with README (you already have one)
6. Click **"Create repository"**

### Step 4: Initialize Git and Push to GitHub

Open your terminal in the project folder and run:

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - CinemaScope app"

# Add GitHub remote (replace with your actual repository URL)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 5: Deploy to GitHub Pages

```bash
npm run deploy
```

This will:
- Build your project
- Create a `gh-pages` branch
- Push the built files to that branch

### Step 6: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages** (in the left sidebar)
3. Under **Source**, select:
   - Branch: `gh-pages`
   - Folder: `/ (root)`
4. Click **Save**

### Step 7: Wait for Deployment

- GitHub will take 1-3 minutes to deploy
- Your site will be available at: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`

## ⚠️ Important Notes

### API Key Security

**CRITICAL:** Your TMDB API key is in `.env` and should NOT be pushed to GitHub!

The `.env` file is already in `.gitignore`, but double-check:

```bash
# Check if .env is ignored
git status
```

If `.env` appears, add it to `.gitignore`:

```
# .gitignore
.env
```

### Environment Variables on GitHub Pages

Since GitHub Pages is static hosting, you need to:

**Option 1: Hardcode API Key (Not Recommended for Public Repos)**
- Replace `import.meta.env.VITE_TMDB_API_KEY` with your actual key in `tmdbApi.ts`
- **Only do this if your repo is private!**

**Option 2: Use GitHub Secrets (Recommended)**
- This requires GitHub Actions workflow
- More complex but more secure

**Option 3: Client-Side Prompt (Simple)**
- Ask users to enter their own TMDB API key
- Store it in localStorage

### Mock API Limitation

**Important:** The mock API (`json-server`) won't work on GitHub Pages because it's a static host.

**Solutions:**
1. **Remove review functionality** for the deployed version
2. **Use a free backend service** like:
   - [JSONBin.io](https://jsonbin.io/) - Free JSON storage
   - [Supabase](https://supabase.com/) - Free PostgreSQL database
   - [Firebase](https://firebase.google.com/) - Free Firestore database

## 🔄 Updating Your Deployed Site

Whenever you make changes:

```bash
# Make your changes
git add .
git commit -m "Description of changes"
git push

# Deploy updated version
npm run deploy
```

## 🐛 Troubleshooting

### Site shows 404
- Check that `base` in `vite.config.ts` matches your repo name exactly
- Make sure GitHub Pages is enabled in repository settings

### Blank page
- Open browser console (F12) to check for errors
- Verify the `base` path is correct
- Check that all assets are loading from the correct path

### API not working
- Verify your TMDB API key is included in the build
- Check browser console for CORS or API errors

## 📝 Example Repository URL

If your GitHub username is `johndoe` and repo is `cinemascope`:
- Repository: `https://github.com/johndoe/cinemascope`
- Deployed site: `https://johndoe.github.io/cinemascope/`

## ✅ Checklist

- [ ] Installed `gh-pages` package
- [ ] Updated `base` in `vite.config.ts` with repo name
- [ ] Created GitHub repository
- [ ] Pushed code to GitHub
- [ ] Ran `npm run deploy`
- [ ] Enabled GitHub Pages in settings
- [ ] Verified site is live
- [ ] Tested all features work

---

**Need help?** Check the [Vite deployment docs](https://vitejs.dev/guide/static-deploy.html#github-pages) or [GitHub Pages docs](https://docs.github.com/en/pages).
