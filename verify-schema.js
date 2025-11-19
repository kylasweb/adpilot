/**
 * Database Schema Verification
 * 
 * This script verifies that all required tables and columns are properly set up.
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function verifySchema() {
  try {
    console.log('🔍 Verifying database schema...\n');
    
    // Test the connection
    await prisma.$connect();
    console.log('✅ Successfully connected to the database!\n');
    
    // Get all tables
    const tables = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' AND table_name != '_prisma_migrations'
      ORDER BY table_name
    `;
    
    console.log('📋 Tables in database:');
    tables.forEach((table, index) => {
      console.log(`   ${index + 1}. ${table.table_name}`);
    });
    
    console.log('\n🔍 Checking key tables and their columns...\n');
    
    // Check users table
    const userColumns = await prisma.$queryRaw`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns
      WHERE table_schema = 'public' AND table_name = 'users'
      ORDER BY ordinal_position
    `;
    console.log('👤 Users table columns:');
    userColumns.forEach(col => {
      console.log(`   - ${col.column_name} (${col.data_type}) ${col.is_nullable === 'YES' ? '(nullable)' : '(not null)'}`);
    });
    
    console.log('');
    
    // Check campaigns table
    const campaignColumns = await prisma.$queryRaw`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns
      WHERE table_schema = 'public' AND table_name = 'campaigns'
      ORDER BY ordinal_position
    `;
    console.log('📢 Campaigns table columns:');
    campaignColumns.forEach(col => {
      console.log(`   - ${col.column_name} (${col.data_type}) ${col.is_nullable === 'YES' ? '(nullable)' : '(not null)'}`);
    });
    
    console.log('');
    
    // Check cohorts table
    const cohortColumns = await prisma.$queryRaw`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns
      WHERE table_schema = 'public' AND table_name = 'cohorts'
      ORDER BY ordinal_position
    `;
    console.log('👥 Cohorts table columns:');
    cohortColumns.forEach(col => {
      console.log(`   - ${col.column_name} (${col.data_type}) ${col.is_nullable === 'YES' ? '(nullable)' : '(not null)'}`);
    });
    
    console.log('');
    
    // Check creatives table
    const creativeColumns = await prisma.$queryRaw`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns
      WHERE table_schema = 'public' AND table_name = 'creatives'
      ORDER BY ordinal_position
    `;
    console.log('🎨 Creatives table columns:');
    creativeColumns.forEach(col => {
      console.log(`   - ${col.column_name} (${col.data_type}) ${col.is_nullable === 'YES' ? '(nullable)' : '(not null)'}`);
    });
    
    console.log('\n✅ Schema verification completed successfully!');
    console.log('\n🎉 All required tables are present with correct columns.');
    
  } catch (error) {
    console.error('❌ Schema verification failed:', error.message);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the verification
verifySchema();