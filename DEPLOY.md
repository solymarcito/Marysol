# Deploy to GitHub Pages

Your site is ready. Run these commands in your terminal from the **website** folder.

## 1. Create a new repo on GitHub

- Go to [github.com/new](https://github.com/new)
- Name it (e.g. `goodthing` or `username.github.io` for your main site)
- **Do not** add a README, .gitignore, or license
- Click **Create repository**

## 2. Push your site from the website folder

In Terminal:

```bash
cd /Users/solecito/website

git init
git add .
git commit -m "Initial commit: iMessage-style chat intro"

# Replace YOUR_USERNAME and YOUR_REPO with your GitHub username and repo name
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

## 3. Turn on GitHub Pages

- Open your repo on GitHub
- Go to **Settings** → **Pages**
- Under **Source**, choose **Deploy from a branch**
- Branch: **main**, folder: **/ (root)**
- Click **Save**

After a minute or two your site will be live at:

- **Project site:** `https://YOUR_USERNAME.github.io/YOUR_REPO/`
- **User site** (if repo is `YOUR_USERNAME.github.io`): `https://YOUR_USERNAME.github.io/`
