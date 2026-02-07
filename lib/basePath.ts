// Get the base path depending on environment
// Development: '' (empty)
// Production: '/blog'
export const basePath = process.env.NODE_ENV === 'production' ? '/blog' : '';