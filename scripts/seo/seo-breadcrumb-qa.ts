#!/usr/bin/env tsx
/**
 * SEO BreadcrumbList QA - Vérification JSON-LD BreadcrumbList dans composants Breadcrumbs
 * 
 * Checks:
 * - Import buildBreadcrumbListSchema présent
 * - Appel buildBreadcrumbListSchema(items) dans composant
 * - Injection <script type="application/ld+json">
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join, relative } from 'path';

interface BreadcrumbResult {
  file: string;
  hasImport: boolean;
  hasCall: boolean;
  hasScript: boolean;
  warnings: string[];
}

const WORKSPACE_ROOT = process.cwd();

function scanBreadcrumbs(): string[] {
  const breadcrumbs: string[] = [];
  
  // Breadcrumbs racine
  const rootBreadcrumb = join(WORKSPACE_ROOT, 'components/Breadcrumbs.tsx');
  if (statSync(rootBreadcrumb, { throwIfNoEntry: false })) {
    breadcrumbs.push(rootBreadcrumb);
  }

  // Breadcrumbs villes
  const sitesDir = join(WORKSPACE_ROOT, 'sites');
  if (statSync(sitesDir, { throwIfNoEntry: false })?.isDirectory()) {
    const cities = readdirSync(sitesDir).filter(f => {
      const stat = statSync(join(sitesDir, f), { throwIfNoEntry: false });
      return stat?.isDirectory();
    });

    cities.forEach(city => {
      const cityBreadcrumb = join(sitesDir, city, 'components/Breadcrumbs.tsx');
      if (statSync(cityBreadcrumb, { throwIfNoEntry: false })) {
        breadcrumbs.push(cityBreadcrumb);
      }
    });
  }

  return breadcrumbs;
}

function analyzeBreadcrumb(filePath: string): BreadcrumbResult {
  const content = readFileSync(filePath, 'utf-8');
  const relativePath = relative(WORKSPACE_ROOT, filePath);
  
  const result: BreadcrumbResult = {
    file: relativePath,
    hasImport: false,
    hasCall: false,
    hasScript: false,
    warnings: [],
  };

  // 1. Check import
  if (content.includes('buildBreadcrumbListSchema')) {
    result.hasImport = true;
  } else {
    result.warnings.push('Import buildBreadcrumbListSchema manquant');
  }

  // 2. Check appel fonction
  if (content.includes('buildBreadcrumbListSchema(')) {
    result.hasCall = true;
  } else {
    result.warnings.push('Appel buildBreadcrumbListSchema() manquant');
  }

  // 3. Check injection script
  if (content.includes('type="application/ld+json"')) {
    result.hasScript = true;
  } else {
    result.warnings.push('Injection <script type="application/ld+json"> manquante');
  }

  return result;
}

function main() {
  console.log('🔍 BreadcrumbList JSON-LD - Vérification composants\n');

  const breadcrumbs = scanBreadcrumbs();
  console.log(`📁 ${breadcrumbs.length} composants Breadcrumbs détectés\n`);

  const results: BreadcrumbResult[] = breadcrumbs.map(analyzeBreadcrumb);
  
  let totalWarnings = 0;
  const conformCount = results.filter(r => r.hasImport && r.hasCall && r.hasScript).length;

  results.forEach(r => {
    if (r.warnings.length > 0) {
      console.log(`⚠️  ${r.file}`);
      r.warnings.forEach(warn => console.log(`   → ${warn}`));
      totalWarnings += r.warnings.length;
    } else {
      console.log(`✅ ${r.file}`);
    }
  });

  console.log('\n' + '─'.repeat(60));
  console.log(`\n📊 Résumé:`);
  console.log(`   Conformes: ${conformCount}/${results.length}`);
  console.log(`   Warnings: ${totalWarnings}`);

  if (totalWarnings > 0) {
    console.log('\n⚠️  BreadcrumbList QA: PASSED (avec warnings)');
    console.log('→ Certains composants Breadcrumbs n\'injectent pas BreadcrumbList JSON-LD\n');
  } else {
    console.log('\n✅ BreadcrumbList QA: PASSED\n');
  }

  // Non bloquant, juste informatif
  process.exit(0);
}

main();

