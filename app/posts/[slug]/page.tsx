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
      <Link 
        href={`${basePath}/`}
        className="inline-block mb-8 text-blush-500 dark:text-blush-400 hover:text-blush-600 dark:hover:text-blush-300 transition-colors"
      >
        ← Back to all posts
      </Link>
      
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
            prose-h1:text-4xl prose-h1:font-bold prose-h1:mb-4
            prose-h2:text-3xl prose-h2:font-semibold prose-h2:mt-8 prose-h2:mb-4
            prose-h3:text-2xl prose-h3:font-semibold prose-h3:mt-6 prose-h3:mb-3
            prose-h4:text-xl prose-h4:font-semibold prose-h4:mt-4 prose-h4:mb-2
            prose-p:text-gray-700 dark:prose-p:text-mauve-200 prose-p:mb-4 prose-p:leading-relaxed
            prose-a:text-blush-500 dark:prose-a:text-blush-400 prose-a:no-underline hover:prose-a:underline
            prose-strong:text-gray-900 dark:prose-strong:text-mauve-100 prose-strong:font-semibold
            prose-em:text-gray-800 dark:prose-em:text-mauve-200 prose-em:italic
            prose-code:text-mauve-600 dark:prose-code:text-blush-300 prose-code:bg-cream-100 dark:prose-code:bg-mauve-900/40 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
            prose-pre:bg-slate-900 dark:prose-pre:bg-black/40 prose-pre:text-gray-100 prose-pre:p-4 prose-pre:rounded-lg prose-pre:overflow-x-auto
            prose-ul:list-disc prose-ul:ml-6 prose-ul:mb-4 prose-ul:text-gray-700 dark:prose-ul:text-mauve-200
            prose-ol:list-decimal prose-ol:ml-6 prose-ol:mb-4 prose-ol:text-gray-700 dark:prose-ol:text-mauve-200
            prose-li:mb-2
            prose-blockquote:border-l-4 prose-blockquote:border-blush-300 dark:prose-blockquote:border-blush-500 prose-blockquote:pl-4 prose-blockquote:italic
            prose-blockquote:text-gray-700 dark:prose-blockquote:text-mauve-200
            prose-hr:border-blush-200 dark:prose-hr:border-mauve-800 prose-hr:my-8"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </div>
  );
}