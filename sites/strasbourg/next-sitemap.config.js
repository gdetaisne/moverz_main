/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://www.strasbourg-demenageur.fr',
  generateRobotsTxt: true,
  exclude: ['/api/*'], // Exclure les routes API du sitemap
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/']
      }
    ]
  }
};


