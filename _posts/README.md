# Markdown Blog Starter

A simple Next.js blog that works with markdown files.

## Features

- ✅ Write posts in Markdown
- ✅ Metadata support (title, date, author, tags, excerpt)
- ✅ Automatic post sorting by date
- ✅ Tag system
- ✅ Responsive design with Tailwind CSS
- ✅ Dark mode support
- ✅ Static site generation

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Development Server

```bash
npm run dev
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
├── lib/
│   └── posts.ts            # Functions to read and parse posts
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
npm run build
npm start
```

## Deployment

This blog is ready to deploy to:

- **Vercel**: `vercel deploy`
- **Netlify**: Connect your Git repository
- **GitHub Pages**: Build and deploy the `out` directory

## Customization

### Styling

The blog uses Tailwind CSS. Modify styles in:
- `tailwind.config.js` - Tailwind configuration
- `app/globals.css` - Global styles
- Component files - Inline Tailwind classes

### Layout

Edit `app/layout.tsx` to customize the header, footer, and overall layout.

### Home Page

Edit `app/page.tsx` to customize how posts are displayed on the home page.

### Post Page

Edit `app/posts/[slug]/page.tsx` to customize individual post layouts.

## License

MIT

--- 
Parts of this repository were created using Claude AI.