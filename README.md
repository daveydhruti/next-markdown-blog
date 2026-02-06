# Markdown Blog Starter

A simple Next.js blog that works with markdown files.

## Features

- ✅ Write posts in Markdown
- ✅ Metadata support (title, date, author, tags, excerpt)
- ✅ Automatic post sorting by date
- ✅ Tag system
- ✅ Responsive design with Tailwind CSS
- ✅ Light/Dark mode toggle (manual control)
- ✅ Static site generation
- ✅ GitHub Pages deployment ready

## Getting Started

### Prerequisites

Make sure you have [pnpm](https://pnpm.io/) installed:

```bash
npm install -g pnpm
```

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Run Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Create Blog Posts

Add markdown files to the `_posts` directory with the following frontmatter format:

```markdown
---
title: "Your Post Title"
date: "2024-01-20"
author: "Your Name"
tags: ["tag1", "tag2", "tag3"]
excerpt: "A brief summary of your post"
---

# Your content here

Write your blog post content using markdown...
```

## File Structure

```
blog-starter/
├── _posts/                  # Your blog posts (markdown files)
│   ├── post-1.md
│   └── post-2.md
├── app/
│   ├── layout.tsx          # Root layout with header/footer
│   ├── page.tsx            # Home page (lists all posts)
│   ├── globals.css         # Global styles
│   └── posts/
│       └── [slug]/
│           └── page.tsx    # Individual post page
├── components/
│   └── ThemeToggle.tsx     # Light/dark mode toggle button
├── lib/
│   └── posts.ts            # Functions to read and parse posts
├── .github/
│   └── workflows/
│       └── nextjs.yml      # GitHub Actions workflow for deployment
├── package.json
└── README.md
```

## Markdown Frontmatter Fields

- **title** (required): The post title
- **date** (required): Publication date in YYYY-MM-DD format
- **author** (required): Post author name
- **tags** (optional): Array of tags
- **excerpt** (optional): Short description shown on the home page

## Building for Production

```bash
pnpm build
pnpm start
```

## Deployment to GitHub Pages

This blog is configured to automatically deploy to GitHub Pages using GitHub Actions.

### Setup Instructions:

1. **Push your code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/your-repo.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**
   - Go to your repository settings
   - Navigate to Pages (under Code and automation)
   - Source: Select "GitHub Actions"

3. **The workflow will automatically:**
   - Trigger on every push to the `main` branch
   - Build your Next.js site
   - Deploy to GitHub Pages

4. **Access your site at:**
   ```
   https://yourusername.github.io/your-repo-name/
   ```

### Manual Deployment

You can also trigger deployment manually:
- Go to Actions tab in your repository
- Select "Deploy Next.js site to Pages"
- Click "Run workflow"

## Theme Customization

The blog features a subtle feminine color palette with manual light/dark mode control:

### Light Mode
- Warm cream backgrounds
- Soft blush accents
- Muted mauve for headings

### Dark Mode
- Deep plum/aubergine backgrounds
- Warm mauve and blush accents

Toggle between modes using the button in the top right corner.

### Customizing Colors

Modify the color palette in:
- `tailwind.config.js` - Color definitions
- `app/globals.css` - CSS variables
- Component files - Update Tailwind classes

## License

MIT

--- 
Parts of this repository were created using Claude AI.