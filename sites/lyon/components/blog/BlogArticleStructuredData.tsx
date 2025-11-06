'use client';

import { BlogPost } from '@/lib/blog';

interface BlogArticleStructuredDataProps {
  post: BlogPost;
  canonicalUrl: string;
}

/**
 * Génère JSON-LD Article avec searchIntent selon type (transactionnel vs informatif)
 */
export default function BlogArticleStructuredData({ post, canonicalUrl }: BlogArticleStructuredDataProps) {
  // Détecter intent : Transactionnel UNIQUEMENT si prix déménagement local T2/T3/T4/maison (particuliers)
  // Utiliser cleanSlug pour correspondre à la logique du script d'optimisation
  const slug = post.cleanSlug || post.slug;
  const text = `${slug} ${post.title} ${post.category || post.cleanCategory || ''}`.toLowerCase();

  const isTransactional =
    text.includes('prix') &&
    (text.includes('t2') || text.includes('t3') || text.includes('t4') ||
     text.includes('maison') || text.includes('grand') || text.includes('moyen')) &&
    !text.includes('studio') && !text.includes('petit') &&
    !text.includes('entreprise') && !text.includes('international');
  
  const searchIntent = isTransactional ? 'transactional' : 'informational';
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.meta_title || post.title,
    "description": post.meta_description,
    "image": canonicalUrl.replace(/\/blog\/.*$/, '/og-image.jpg'), // Image par défaut
    "datePublished": post.publish_date,
    "dateModified": post.publish_date,
    "author": {
      "@type": "Organization",
      "name": post.author || "Équipe Moverz"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Moverz",
      "logo": {
        "@type": "ImageObject",
        "url": canonicalUrl.replace(/\/blog\/.*$/, '/icons/android-chrome-512x512.png')
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": canonicalUrl
    },
    "searchIntent": searchIntent,
    "articleSection": post.category,
    "keywords": post.keywords?.join(', ') || '',
    "wordCount": post.word_count || 0
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

