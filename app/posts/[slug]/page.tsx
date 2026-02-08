import { getPostData, getAllPostSlugs } from '@/lib/posts';
import { basePath } from '@/lib/basePath';
import Link from 'next/link';

export async function generateStaticParams() {
  const posts = getAllPostSlugs();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function Post({ params }: { params: { slug: string } }) {
  const post = await getPostData(params.slug);

  return (
    <div className="max-w-3xl mx-auto">
      <a 
        href={`${basePath}/`}
        className="inline-block mb-8 text-blush-500 dark:text-blush-400 hover:text-blush-600 dark:hover:text-blush-300 transition-colors"
      >
        ← Back to all posts
      </a>
      
      <article className="bg-white/80 dark:bg-plum-950/60 rounded-lg shadow-sm border border-blush-100 dark:border-mauve-900/30 p-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4 text-mauve-600 dark:text-blush-300">
            {post.title}
          </h1>
          
          <div className="flex items-center gap-4 text-gray-600 dark:text-mauve-300 mb-4">
            <time dateTime={post.date}>{post.date}</time>
            <span>•</span>
            <span>{post.author}</span>
          </div>
          
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-blush-50 dark:bg-mauve-900/40 text-blush-600 dark:text-mauve-200 text-sm rounded-full border border-blush-200 dark:border-mauve-800/50"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>
        
        <div 
          className="prose prose-lg max-w-none
            prose-headings:text-mauve-600 dark:prose-headings:text-blush-300
            prose-p:text-gray-700 dark:prose-p:text-mauve-200
            prose-a:text-blush-500 dark:prose-a:text-blush-400 prose-a:no-underline hover:prose-a:underline
            prose-strong:text-gray-900 dark:prose-strong:text-mauve-100
            prose-code:text-mauve-600 dark:prose-code:text-blush-300
            prose-pre:bg-slate-900 dark:prose-pre:bg-black/40
            prose-blockquote:border-blush-300 dark:prose-blockquote:border-blush-500
            prose-blockquote:text-gray-700 dark:prose-blockquote:text-mauve-200"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </div>
  );
}