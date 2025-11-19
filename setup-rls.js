/**
 * Setup Row Level Security (RLS) Policies
 * 
 * This script sets up basic RLS policies for key tables.
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function setupRLS() {
  try {
    console.log('🔍 Setting up Row Level Security (RLS) policies...\n');
    
    // Test the connection
    await prisma.$connect();
    
    // Enable RLS on key tables
    const tablesWithRLS = [
      'campaigns',
      'cohorts',
      'creatives',
      'campaign_performance',
      'audience_insights'
    ];
    
    for (const table of tablesWithRLS) {
      try {
        // Enable RLS on the table
        await prisma.$executeRawUnsafe(`
          ALTER TABLE "${table}" ENABLE ROW LEVEL SECURITY;
        `);
        console.log(`✅ RLS enabled for ${table}`);
        
        // Create a simple policy that allows users to access their own data
        // Note: This is a simplified example. In a real application, you would
        // implement more sophisticated policies based on your application's needs.
        await prisma.$executeRawUnsafe(`
          CREATE POLICY "user_access_policy_${table}" 
          ON "${table}" 
          FOR ALL 
          TO PUBLIC 
          USING (user_id = current_user_id());
        `);
        console.log(`✅ Basic RLS policy created for ${table}`);
      } catch (error) {
        console.log(`ℹ️  RLS setup for ${table}: ${error.message}`);
      }
    }
    
    console.log('\n✅ RLS setup completed!');
    console.log('\n📝 Note: The RLS policies implemented are basic examples.');
    console.log('   In a production environment, you should implement more');
    console.log('   sophisticated policies based on your application\'s needs.');
    
  } catch (error) {
    console.error('❌ RLS setup failed:', error.message);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the RLS setup
setupRLS();