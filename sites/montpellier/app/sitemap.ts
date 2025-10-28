import { MetadataRoute } from 'next'
import { getAllBlogPosts } from '@/lib/blog'
import { env } from '@/lib/env'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

// Fonction locale pour lire SEULEMENT les articles de Montpellier
function getMontpellierBlogPosts() {
  const blogDirectory = path.join(process.cwd(), 'content/blog')
  
  if (!fs.existsSync(blogDirectory)) {
    console.warn('Blog directory not found:', blogDirectory)
    return []
  }
  
  const categories = fs.readdirSync(blogDirectory, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)

  const allPosts: any[] = []

  categories.forEach(category => {
    const categoryPath = path.join(blogDirectory, category)
    const files = fs.readdirSync(categoryPath)
      .filter(file => file.endsWith('.md') && file !== 'README.md')

    files.forEach(file => {
      const filePath = path.join(categoryPath, file)
      const fileContents = fs.readFileSync(filePath, 'utf8')
      const { data } = matter(fileContents)

      allPosts.push({
        slug: data.slug || file.replace('.md', ''),
        title: data.title,
        category: category,
        type: data.type || 'satellite',
        publish_date: data.publish_date || data.date || new Date().toISOString().split('T')[0],
        cleanCategory: category.replace('-montpellier', ''),
        cleanSlug: file.replace('.md', '').replace('-montpellier', '')
      })
    })
  })

  return allPosts.sort((a, b) => new Date(b.publish_date).getTime() - new Date(a.publish_date).getTime())
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = env.SITE_URL
  
  // Récupérer SEULEMENT les articles de blog de Montpellier
  const blogPosts = getMontpellierBlogPosts()
  
  // Pages statiques
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services/demenagement-economique-montpellier`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/services/demenagement-standard-montpellier`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/services/demenagement-premium-montpellier`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/montpellier`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/montpellier/chartrons`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/montpellier/cauderan`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/montpellier/bastide`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/montpellier/merignac`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/montpellier/pessac`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/partenaires`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/inventaire-ia`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    // Pages corridors
    {
      url: `${baseUrl}/montpellier-vers-paris`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/montpellier-vers-lyon`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/montpellier-vers-toulouse`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/montpellier-vers-nantes`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/montpellier-vers-montpellier`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/montpellier-vers-espagne`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]

  // Page principale du blog
  const blogMainPage: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ]

  // Pages de catégories du blog
  const blogCategories = [
    'etudiant', 'entreprise', 'prix', 'devis', 'pas-cher', 
    'urgent', 'longue-distance', 'garde-meuble', 'international', 'piano'
  ]
  
  const blogCategoryPages: MetadataRoute.Sitemap = blogCategories.map(category => ({
    url: `${baseUrl}/blog/${category}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }))

  // Articles de blog
  const blogPages: MetadataRoute.Sitemap = blogPosts.map(post => ({
    url: `${baseUrl}/blog/${post.cleanCategory}/${post.cleanSlug}`,
    lastModified: new Date(post.publish_date || new Date()),
    changeFrequency: 'monthly' as const,
    priority: post.type === 'pilier' ? 0.9 : 0.7,
  }))

  return [...staticPages, ...blogMainPage, ...blogCategoryPages, ...blogPages]
}
