import { notFound } from 'next/navigation';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';

// Temporary placeholder until blog posts are added
export default function BlogPostPage({ 
  params 
}: { 
  params: { category: string; slug: string } 
}) {
  return (
    <main className="bg-hero min-h-screen">
      <div className="halo" />
      
      <section className="section">
        <div className="container max-w-4xl">
          <Breadcrumbs 
            items={[
              { label: "Accueil", href: "/" },
              { label: "Blog", href: "/blog" },
              { label: params.category, href: `/blog/${params.category}` },
              { label: params.slug, href: `/blog/${params.category}/${params.slug}` }
            ]}
          />
          
          <article className="prose prose-invert prose-lg max-w-none">
            <div className="text-center py-20">
              <div className="text-6xl mb-6">📄</div>
              <h1 className="text-3xl font-bold text-white mb-4">
                Article : {params.slug}
              </h1>
              <p className="text-white/80 mb-8">
                Le contenu de cet article sera bientôt disponible.
              </p>
              <Link 
                href="/blog"
                className="inline-flex h-11 items-center justify-center rounded-2xl bg-[#2b7a78] px-6 text-sm font-medium text-white hover:bg-[#2b7a78]/90 transition-colors"
              >
                Retour au blog
              </Link>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}




