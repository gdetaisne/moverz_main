/** @type {import('next-sitemap').IConfig} */
const siteUrl = process.env.SITE_URL;
if (!siteUrl) {
  // On évite tout fallback dangereux multi-sites: mieux vaut échouer bruyamment en build
  throw new Error('next-sitemap: SITE_URL manquant dans l\'environnement');
}

module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  exclude: ['/api/*'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/']
      }
    ],
    additionalSitemaps: []
  }
};


