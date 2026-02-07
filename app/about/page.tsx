export default function About() {
  return (
    <div className="max-w-3xl mx-auto">
      <article className="bg-white/80 dark:bg-plum-950/60 rounded-lg shadow-sm border border-blush-100 dark:border-mauve-900/30 p-8">
        <h1 className="text-4xl font-bold mb-6 text-mauve-600 dark:text-blush-300">
          About
        </h1>
        
        <div className="prose prose-lg max-w-none
          prose-headings:text-mauve-600 dark:prose-headings:text-blush-300
          prose-p:text-gray-700 dark:prose-p:text-mauve-200
          prose-a:text-blush-500 dark:prose-a:text-blush-400 prose-a:no-underline hover:prose-a:underline
          prose-strong:text-gray-900 dark:prose-strong:text-mauve-100">
          <p>
            Welcome to my blog.
          </p>
        </div>
      </article>
    </div>
  );
}