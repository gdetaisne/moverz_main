#!/usr/bin/env python3
"""
MOVERZ - Détection automatique des 404 via BigQuery + GA4

Ce script :
1. Se connecte à BigQuery (export GA4)
2. Récupère les pages avec titre "404: This page could not be found"
3. Groupe par page_referrer
4. Exporte les patterns récurrents (>10 hits/semaine)
5. Suggère automatiquement des redirections

Installation:
pip install google-cloud-bigquery pandas python-dotenv

Configuration:
Créer un fichier .env avec:
BIGQUERY_PROJECT_ID=votre-project-id
BIGQUERY_DATASET_ID=analytics_XXXXXXXXX
GOOGLE_APPLICATION_CREDENTIALS=chemin/vers/service-account.json
"""

import os
import json
from datetime import datetime, timedelta
from google.cloud import bigquery
from dotenv import load_dotenv
import pandas as pd

# Charger les variables d'environnement
load_dotenv()

# Configuration
PROJECT_ID = os.getenv('BIGQUERY_PROJECT_ID', 'your-project-id')
DATASET_ID = os.getenv('BIGQUERY_DATASET_ID', 'analytics_XXXXXXXXX')
THRESHOLD_VIEWS = 10
OUTPUT_DIR = './scripts/reports'
OUTPUT_FILE = 'ga4-404-report-bigquery.json'

# Mapping intelligent des URLs cassées
SMART_REDIRECTS = {
    '/blog': '/actualites',
    '/estimation-rapide': '/devis',
    '/inventaire-ia': '/analyse-ia',
    '/devis-gratuit': '/devis',
    '/contact-rapide': '/contact',
    '/quartiers': '/quartiers-{city}',
}


def init_bigquery_client():
    """Initialise le client BigQuery"""
    return bigquery.Client(project=PROJECT_ID)


def build_404_query(days_ago=7):
    """
    Construit la requête BigQuery pour détecter les 404
    
    Note: GA4 exporte vers BigQuery avec une structure events_YYYYMMDD
    """
    # Calculer les dates
    end_date = datetime.now()
    start_date = end_date - timedelta(days=days_ago)
    
    # Format de table GA4: events_YYYYMMDD
    table_suffix_pattern = f"{DATASET_ID}.events_*"
    date_filter = f"_TABLE_SUFFIX BETWEEN '{start_date.strftime('%Y%m%d')}' AND '{end_date.strftime('%Y%m%d')}'"
    
    query = f"""
    WITH page_views AS (
      SELECT
        (SELECT value.string_value FROM UNNEST(event_params) WHERE key = 'page_title') AS page_title,
        (SELECT value.string_value FROM UNNEST(event_params) WHERE key = 'page_location') AS page_location,
        (SELECT value.string_value FROM UNNEST(event_params) WHERE key = 'page_referrer') AS page_referrer,
        event_timestamp,
        user_pseudo_id
      FROM
        `{PROJECT_ID}.{table_suffix_pattern}`
      WHERE
        {date_filter}
        AND event_name = 'page_view'
    )
    
    SELECT
      page_title,
      page_location,
      page_referrer,
      COUNT(*) as page_views,
      COUNT(DISTINCT user_pseudo_id) as unique_users
    FROM
      page_views
    WHERE
      page_title = '404: This page could not be found'
    GROUP BY
      page_title, page_location, page_referrer
    ORDER BY
      page_views DESC
    LIMIT 100
    """
    
    return query


def fetch_404_data(client, days_ago=7):
    """Récupère les données 404 depuis BigQuery"""
    query = build_404_query(days_ago)
    
    print(f"🔍 Requête BigQuery sur les {days_ago} derniers jours...\n")
    
    try:
        query_job = client.query(query)
        results = query_job.result()
        
        # Convertir en DataFrame pandas
        df = results.to_dataframe()
        
        return df
    except Exception as e:
        print(f"❌ Erreur BigQuery: {e}")
        print("\n💡 Vérifiez:")
        print("   1. BIGQUERY_PROJECT_ID et BIGQUERY_DATASET_ID dans .env")
        print("   2. Format du dataset: analytics_XXXXXXXXX")
        print("   3. Permissions BigQuery Data Viewer activées\n")
        raise


def extract_domain_and_path(url):
    """Extrait le domaine et le chemin d'une URL complète"""
    if not url or url == '(not set)':
        return 'unknown', '/'
    
    try:
        from urllib.parse import urlparse
        parsed = urlparse(url)
        domain = parsed.netloc or 'relative-url'
        path = parsed.path or '/'
        return domain, path
    except:
        return 'unknown', '/'


def analyze_404_patterns(df):
    """Analyse et groupe les données 404"""
    if df.empty:
        print('✅ Aucun 404 détecté dans la période !')
        return {
            'patterns': {},
            'totalViews': 0,
            'recommendations': []
        }
    
    patterns = {}
    total_views = df['page_views'].sum()
    
    for _, row in df.iterrows():
        domain, path = extract_domain_and_path(row['page_location'])
        referrer = row['page_referrer'] or '(direct)'
        views = int(row['page_views'])
        unique_users = int(row['unique_users'])
        
        key = f"{domain}|{path}"
        
        if key not in patterns:
            patterns[key] = {
                'domain': domain,
                'path': path,
                'views': 0,
                'uniqueUsers': 0,
                'referrers': []
            }
        
        patterns[key]['views'] += views
        patterns[key]['uniqueUsers'] += unique_users
        patterns[key]['referrers'].append({
            'referrer': referrer,
            'views': views
        })
    
    # Générer des recommandations
    recommendations = generate_recommendations(patterns)
    
    return {
        'patterns': patterns,
        'totalViews': int(total_views),
        'recommendations': recommendations
    }


def generate_recommendations(patterns):
    """Génère des recommandations de redirection intelligentes"""
    recommendations = []
    
    for pattern_data in patterns.values():
        if pattern_data['views'] >= THRESHOLD_VIEWS:
            source_path = pattern_data['path']
            suggested_destination = '/'
            
            # Recherche intelligente de destination
            for source, dest in SMART_REDIRECTS.items():
                if source in source_path:
                    suggested_destination = dest
                    break
            
            # Extraire la ville du domaine
            domain = pattern_data['domain']
            if 'devis-demenageur-' in domain and '{city}' in suggested_destination:
                city = domain.replace('devis-demenageur-', '').replace('.fr', '')
                suggested_destination = suggested_destination.replace('{city}', city)
            
            # Déterminer la priorité
            views = pattern_data['views']
            if views > 50:
                priority = 'HAUTE'
            elif views > 20:
                priority = 'MOYENNE'
            else:
                priority = 'BASSE'
            
            # Trier les référents par nombre de vues
            top_referrers = sorted(
                pattern_data['referrers'],
                key=lambda x: x['views'],
                reverse=True
            )[:3]
            
            recommendations.append({
                'source': source_path,
                'destination': suggested_destination,
                'views': views,
                'uniqueUsers': pattern_data['uniqueUsers'],
                'domain': domain,
                'priority': priority,
                'topReferrers': top_referrers
            })
    
    # Trier par nombre de vues décroissant
    recommendations.sort(key=lambda x: x['views'], reverse=True)
    
    return recommendations


def export_report(data, filename=OUTPUT_FILE):
    """Exporte le rapport en JSON"""
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    
    output_path = os.path.join(OUTPUT_DIR, filename)
    timestamp = datetime.now().isoformat()
    
    report = {
        'generatedAt': timestamp,
        'source': 'BigQuery + GA4',
        'period': '7 derniers jours',
        'threshold': THRESHOLD_VIEWS,
        'summary': {
            'totalViews': data['totalViews'],
            'uniquePatterns': len(data['patterns']),
            'recommendationsCount': len(data['recommendations'])
        },
        'patterns': data['patterns'],
        'recommendations': data['recommendations']
    }
    
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(report, f, indent=2, ensure_ascii=False)
    
    print(f"\n📄 Rapport exporté: {output_path}")
    
    return report


def display_summary(report):
    """Affiche un résumé dans la console"""
    print('\n' + '=' * 60)
    print('📊 MOVERZ - RAPPORT 404 BIGQUERY + GA4')
    print('=' * 60)
    print(f"📅 Période: {report['period']}")
    print(f"👁️  Total vues 404: {report['summary']['totalViews']}")
    print(f"🔗 Patterns uniques: {report['summary']['uniquePatterns']}")
    print(f"💡 Recommandations: {report['summary']['recommendationsCount']}")
    print('=' * 60)
    
    if report['recommendations']:
        print('\n🎯 TOP REDIRECTIONS RECOMMANDÉES:\n')
        for i, rec in enumerate(report['recommendations'][:10], 1):
            print(f"{i}. [{rec['priority']}] {rec['source']}")
            print(f"   → {rec['destination']}")
            print(f"   📈 {rec['views']} vues | 👥 {rec['uniqueUsers']} utilisateurs uniques")
            print(f"   🌐 {rec['domain']}")
            top_ref = rec['topReferrers'][0] if rec['topReferrers'] else {'referrer': 'N/A'}
            print(f"   🔗 Top référent: {top_ref['referrer']}\n")
    else:
        print('\n✅ Aucune redirection nécessaire pour le moment.\n')
    
    print('=' * 60)


def generate_nextjs_redirects(recommendations):
    """Génère le code de redirection Next.js"""
    redirects = [
        {
            'source': rec['source'],
            'destination': rec['destination'],
            'permanent': True
        }
        for rec in recommendations
    ]
    
    code = f"""// Généré automatiquement le {datetime.now().isoformat()}
// À intégrer dans next.config.mjs

export const autoGeneratedRedirects = {json.dumps(redirects, indent=2)};
"""
    
    output_path = os.path.join(OUTPUT_DIR, 'next-redirects-auto-bigquery.mjs')
    with open(output_path, 'w') as f:
        f.write(code)
    
    print(f"\n📝 Redirections Next.js générées: {output_path}")


def main():
    """Main"""
    try:
        print('🚀 Démarrage du monitoring 404 (BigQuery)...\n')
        
        client = init_bigquery_client()
        df = fetch_404_data(client, days_ago=7)
        analysis = analyze_404_patterns(df)
        report = export_report(analysis)
        
        display_summary(report)
        
        if report['recommendations']:
            generate_nextjs_redirects(report['recommendations'])
        
        print('\n✅ Analyse terminée avec succès!\n')
        
    except Exception as e:
        print(f'❌ Erreur: {e}')
        exit(1)


if __name__ == '__main__':
    main()

