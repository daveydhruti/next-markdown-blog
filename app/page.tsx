import { getSortedPostsData } from '@/lib/posts';
import Link from 'next/link';

export default function Home() {
  const posts = getSortedPostsData();

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-mauve-600 dark:text-blush-300">
        Posts
      </h1>
      
      <div className="space-y-8">
        {posts.map((post) => (
          <article key={post.slug} className="bg-white/80 dark:bg-plum-950/60 rounded-lg shadow-sm hover:shadow-md transition-all border border-blush-100 dark:border-mauve-900/30 p-6">
            <Link href={`/posts/${post.slug}`}>
              <h2 className="text-2xl font-semibold mb-2 text-gray-800 dark:text-mauve-100 hover:text-blush-500 dark:hover:text-blush-400 transition-colors">
                {post.title}
              </h2>
            </Link>
            
            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-mauve-300 mb-3">
              <time dateTime={post.date}>{post.date}</time>
              <span>•</span>
              <span>{post.author}</span>
            </div>
            
            {post.excerpt && (
              <p className="text-gray-700 dark:text-mauve-200 mb-4">
                {post.excerpt}
              </p>
            )}
            
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
          </article>
        ))}
        
        {posts.length === 0 && (
          <p className="text-center text-gray-600 dark:text-mauve-300 py-12">
            No posts yet.
          </p>
        )}
      </div>
    </div>
  );
}