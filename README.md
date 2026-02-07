# Markdown Blog Starter

A simple Next.js blog that works with markdown files.

## Features

- Write posts in Markdown
- Metadata support (title, date, author, tags, excerpt)
- Automatic post sorting by date
- Tag system
- Responsive design with Tailwind CSS
- Light/Dark mode toggle (manual control)
- Static site generation

## Getting Started

### Prerequisites

Make sure you have [pnpm](https://pnpm.io/) installed:

```bash
npm install -g pnpm
```

or remove it from `package.json` and use your prefered package manager. 

### Install and Run

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Creating Blog Posts

#### Method 1: Using the Fish Script

Make the script executable:
```bash
chmod +x new-post.fish
```

Create a new post:
```bash
./new-post.fish my-awesome-post
```

With options:
```bash
./new-post.fish --title "My Awesome Post" --author "Jane Doe" --tags "nextjs,react" --excerpt "An amazing post about web dev" my-awesome-post
```

Short flags:
```bash
./new-post.fish -t "My Post" -a "Jane" -e "A cool post" my-post
```

Skip prompts (use defaults):
```bash
./new-post.fish --no-prompt my-post
```

**Setup default values:**
Copy the example config file:
```bash
cp .post-config.example .post-config
```

Edit `.post-config` with your defaults:
```
author=Your Name
tags=blog,general
```

#### Method 2: Manual Creation

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
├── new-post.fish           # Script to create new posts
├── package.json
└── README.md
```

## Markdown Frontmatter Fields

- **title** (required): The post title
- **date** (required): Publication date in YYYY-MM-DD format
- **author** (required): Post author name
- **tags** (optional): Array of tags
- **excerpt** (optional): Short description shown on the home page

## Script Reference

The `new-post.fish` script supports the following options:

| Flag | Shorthand | Description |
|------|-----------|-------------|
| `--title` | `-t` | Post title |
| `--author` | `-a` | Post author |
| `--excerpt` | `-e` | Post excerpt/summary |
| `--tags` | - | Comma-separated list of tags |
| `--no-prompt` | - | Skip prompts for missing fields |
| `--help` | `-h` | Show help message |

**Argument order:** Flags can appear in any order, but the filename must be provided.

**Priority for field values:**
1. Command-line flags (highest priority)
2. `.post-config` file
3. Interactive prompts (if not using `--no-prompt`)
4. Default values (lowest priority)

## Theme Customization

The blog features a subtle feminine color palette with manual light/dark mode control.

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

[MIT](./LICENSE)

---

Parts of this repository were written using Claude AI.