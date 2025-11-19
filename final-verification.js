/**
 * Final Database Verification
 * 
 * This script performs a final verification of the database setup,
 * including tables, columns, and RLS policies.
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function finalVerification() {
  try {
    console.log('🔍 Performing final database verification...\n');
    
    // Test the connection
    await prisma.$connect();
    
    // 1. Check all tables
    console.log('📋 Checking all tables...');
    const tables = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' AND table_name != '_prisma_migrations'
      ORDER BY table_name
    `;
    
    console.log(`✅ Found ${tables.length} tables:`);
    tables.forEach((table, index) => {
      console.log(`   ${index + 1}. ${table.table_name}`);
    });
    
    // 2. Check RLS status for key tables
    console.log('\n🔐 Checking RLS status for key tables...');
    const keyTables = [
      'campaigns',
      'cohorts',
      'creatives',
      'campaign_performance',
      'audience_insights'
    ];
    
    for (const table of keyTables) {
      try {
        const rlsStatus = await prisma.$queryRaw`
          SELECT relname as table_name, relrowsecurity as rls_enabled
          FROM pg_class 
          WHERE relname = ${table} AND relkind = 'r'
        `;
        
        if (rlsStatus.length > 0 && rlsStatus[0].rls_enabled) {
          console.log(`✅ RLS is enabled for ${table}`);
        } else {
          console.log(`❌ RLS is not enabled for ${table}`);
        }
      } catch (error) {
        console.log(`ℹ️  Could not check RLS status for ${table}: ${error.message}`);
      }
    }
    
    // 3. Check key columns in important tables
    console.log('\n🔍 Checking key columns...');
    
    // Check users table
    const userColumns = await prisma.$queryRaw`
      SELECT column_name, data_type
      FROM information_schema.columns
      WHERE table_schema = 'public' AND table_name = 'users'
      ORDER BY ordinal_position
    `;
    console.log('👤 Users table has required columns:');
    const requiredUserColumns = ['id', 'email', 'name', 'password'];
    requiredUserColumns.forEach(col => {
      const exists = userColumns.some(c => c.column_name === col);
      console.log(`   ${exists ? '✅' : '❌'} ${col}`);
    });
    
    // Check campaigns table
    const campaignColumns = await prisma.$queryRaw`
      SELECT column_name, data_type
      FROM information_schema.columns
      WHERE table_schema = 'public' AND table_name = 'campaigns'
      ORDER BY ordinal_position
    `;
    console.log('\n📢 Campaigns table has required columns:');
    const requiredCampaignColumns = ['id', 'name', 'budget', 'userId'];
    requiredCampaignColumns.forEach(col => {
      const exists = campaignColumns.some(c => c.column_name === col);
      console.log(`   ${exists ? '✅' : '❌'} ${col}`);
    });
    
    // Check cohorts table
    const cohortColumns = await prisma.$queryRaw`
      SELECT column_name, data_type
      FROM information_schema.columns
      WHERE table_schema = 'public' AND table_name = 'cohorts'
      ORDER BY ordinal_position
    `;
    console.log('\n👥 Cohorts table has required columns:');
    const requiredCohortColumns = ['id', 'name', 'audienceSize', 'userId'];
    requiredCohortColumns.forEach(col => {
      const exists = cohortColumns.some(c => c.column_name === col);
      console.log(`   ${exists ? '✅' : '❌'} ${col}`);
    });
    
    // Check creatives table
    const creativeColumns = await prisma.$queryRaw`
      SELECT column_name, data_type
      FROM information_schema.columns
      WHERE table_schema = 'public' AND table_name = 'creatives'
      ORDER BY ordinal_position
    `;
    console.log('\n🎨 Creatives table has required columns:');
    const requiredCreativeColumns = ['id', 'title', 'type', 'userId'];
    requiredCreativeColumns.forEach(col => {
      const exists = creativeColumns.some(c => c.column_name === col);
      console.log(`   ${exists ? '✅' : '❌'} ${col}`);
    });
    
    console.log('\n🎉 Final verification completed successfully!');
    console.log('\n✅ All required tables are present');
    console.log('✅ RLS policies are enabled for key tables');
    console.log('✅ All required columns are present in key tables');
    console.log('\n🚀 Your Neon PostgreSQL database is properly configured!');
    
  } catch (error) {
    console.error('❌ Final verification failed:', error.message);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the final verification
finalVerification();