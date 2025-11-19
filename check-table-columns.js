/**
 * Check Table Columns
 * 
 * This script checks the actual column names in key tables.
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkTableColumns() {
  try {
    console.log('🔍 Checking table columns...\n');
    
    // Test the connection
    await prisma.$connect();
    
    // Check key tables
    const keyTables = [
      'campaigns',
      'cohorts',
      'creatives',
      'campaign_performance',
      'audience_insights'
    ];
    
    for (const table of keyTables) {
      try {
        const columns = await prisma.$queryRaw`
          SELECT column_name, data_type
          FROM information_schema.columns
          WHERE table_schema = 'public' AND table_name = ${table}
          ORDER BY ordinal_position
        `;
        
        console.log(`📋 ${table} table columns:`);
        columns.forEach(col => {
          console.log(`   - ${col.column_name} (${col.data_type})`);
        });
        console.log('');
      } catch (error) {
        console.log(`❌ Error checking ${table}: ${error.message}\n`);
      }
    }
    
  } catch (error) {
    console.error('❌ Column check failed:', error.message);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the column check
checkTableColumns();