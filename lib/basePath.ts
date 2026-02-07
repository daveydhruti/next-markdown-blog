// Get the base path depending on environment
// Development: '' (empty)
// Production: '/next-markdown-blog'
export const basePath = process.env.NODE_ENV === 'production' ? '/next-markdown-blog' : '';