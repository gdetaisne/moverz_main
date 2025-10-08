import { notFound } from 'next/navigation'
import { getBlogPostByCleanSlug, getAllBlogPosts } from '@/lib/blog'
import Breadcrumbs from '@/components/Breadcrumbs'
import type { Metadata } from 'next'

export async function generateStaticParams() {
  const posts = getAllBlogPosts()
  return posts.map((post) => ({
    category: post.cleanCategory,
    slug: post.cleanSlug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: { category: string; slug: string }
}): Promise<Metadata> {
  const post = getBlogPostByCleanSlug(params.category, params.slug)

  if (!post) {
    return {
      title: 'Article non trouvé',
    }
  }

  return {
    title: post.meta_title || post.title,
    description: post.meta_description,
    alternates: {
      canonical: `https://www.devis-demenageur-bordeaux.fr/blog/${params.category}/${params.slug}`,
    },
    openGraph: {
      title: post.meta_title || post.title,
      description: post.meta_description,
      type: 'article',
      publishedTime: post.publish_date,
      authors: ['Déménageurs Bordeaux (IA)'],
    },
  }
}

export default function BlogPostPage({
  params,
}: {
  params: { category: string; slug: string }
}) {
  const post = getBlogPostByCleanSlug(params.category, params.slug)

  if (!post) {
    notFound()
  }

  // Structured Data pour l'article
  const articleStructuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.meta_description,
    "datePublished": post.publish_date,
    "author": {
      "@type": "Organization",
      "name": "Déménageurs Bordeaux (IA)"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Déménageurs Bordeaux (IA)",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.devis-demenageur-bordeaux.fr/logo.svg"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.devis-demenageur-bordeaux.fr/blog/${params.category}/${params.slug}`
    },
    "wordCount": post.word_count,
    "keywords": post.keywords.join(', ')
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleStructuredData) }}
      />
      <main className="bg-hero min-h-screen">
        <div className="halo" />
        
        {/* Hero Section */}
        <section className="relative overflow-hidden text-white py-16">
          <div className="absolute inset-0 bg-gradient-to-br from-[#04163a]/95 via-[#2b7a78]/88 to-[#04163a]/90"></div>
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Breadcrumbs 
              items={[
                { label: "Accueil", href: "/" },
                { label: "Blog", href: "/blog" },
                { label: post.category.replace(/-/g, ' '), href: `/blog/${params.category}` },
                { label: post.title, href: `/blog/${params.category}/${params.slug}` }
              ]}
            />
            
            <div className="mt-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-4">
                <span className="text-sm font-medium">{post.type === 'pilier' ? '📚 Guide Complet' : '📝 Article'}</span>
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
                {post.h1 || post.title}
              </h1>
              
              <div className="flex items-center gap-4 text-sm text-white/70">
                <span>{post.word_count} mots</span>
                <span>•</span>
                <span>{new Date(post.publish_date).toLocaleDateString('fr-FR')}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="section">
          <div className="container max-w-4xl">
            <article className="prose prose-invert prose-lg max-w-none">
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </article>

            {/* CTA */}
            <div className="mt-12 p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl text-center">
              <h2 className="text-2xl font-bold text-white mb-4">Prêt à déménager ?</h2>
              <p className="text-white/80 mb-6">Obtenez votre estimation volumétrique en 2 minutes</p>
              <a
                href="/inventaire-ia"
                className="inline-flex h-12 items-center justify-center rounded-2xl bg-[#6bcfcf] px-8 text-lg font-semibold text-[#04163a] shadow-lg hover:bg-[#6bcfcf]/90 transition duration-300"
              >
                Obtenez vos devis précis gratuitement
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
