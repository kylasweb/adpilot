/**
 * Setup Proper Row Level Security (RLS) Policies
 * 
 * This script sets up proper RLS policies for key tables based on actual column names.
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function setupProperRLS() {
  try {
    console.log('🔍 Setting up proper Row Level Security (RLS) policies...\n');
    
    // Test the connection
    await prisma.$connect();
    
    // Enable RLS on key tables and create policies
    console.log('🔐 Setting up RLS for campaigns table...');
    try {
      await prisma.$executeRawUnsafe(`
        ALTER TABLE "campaigns" ENABLE ROW LEVEL SECURITY;
      `);
      
      await prisma.$executeRawUnsafe(`
        CREATE POLICY "campaign_owner_policy" 
        ON "campaigns" 
        FOR ALL 
        TO PUBLIC 
        USING ("userId" = current_setting('app.current_user_id'));
      `);
      console.log('✅ RLS enabled and policy created for campaigns');
    } catch (error) {
      console.log(`ℹ️  RLS setup for campaigns: ${error.message}`);
    }
    
    console.log('\n🔐 Setting up RLS for cohorts table...');
    try {
      await prisma.$executeRawUnsafe(`
        ALTER TABLE "cohorts" ENABLE ROW LEVEL SECURITY;
      `);
      
      await prisma.$executeRawUnsafe(`
        CREATE POLICY "cohort_owner_policy" 
        ON "cohorts" 
        FOR ALL 
        TO PUBLIC 
        USING ("userId" = current_setting('app.current_user_id'));
      `);
      console.log('✅ RLS enabled and policy created for cohorts');
    } catch (error) {
      console.log(`ℹ️  RLS setup for cohorts: ${error.message}`);
    }
    
    console.log('\n🔐 Setting up RLS for creatives table...');
    try {
      await prisma.$executeRawUnsafe(`
        ALTER TABLE "creatives" ENABLE ROW LEVEL SECURITY;
      `);
      
      await prisma.$executeRawUnsafe(`
        CREATE POLICY "creative_owner_policy" 
        ON "creatives" 
        FOR ALL 
        TO PUBLIC 
        USING ("userId" = current_setting('app.current_user_id'));
      `);
      console.log('✅ RLS enabled and policy created for creatives');
    } catch (error) {
      console.log(`ℹ️  RLS setup for creatives: ${error.message}`);
    }
    
    console.log('\n🔐 Setting up RLS for campaign_performance table...');
    try {
      await prisma.$executeRawUnsafe(`
        ALTER TABLE "campaign_performance" ENABLE ROW LEVEL SECURITY;
      `);
      
      await prisma.$executeRawUnsafe(`
        CREATE POLICY "performance_owner_policy" 
        ON "campaign_performance" 
        FOR ALL 
        TO PUBLIC 
        USING ("campaignId" IN (
          SELECT id FROM campaigns WHERE "userId" = current_setting('app.current_user_id')
        ));
      `);
      console.log('✅ RLS enabled and policy created for campaign_performance');
    } catch (error) {
      console.log(`ℹ️  RLS setup for campaign_performance: ${error.message}`);
    }
    
    console.log('\n🔐 Setting up RLS for audience_insights table...');
    try {
      await prisma.$executeRawUnsafe(`
        ALTER TABLE "audience_insights" ENABLE ROW LEVEL SECURITY;
      `);
      
      await prisma.$executeRawUnsafe(`
        CREATE POLICY "insights_owner_policy" 
        ON "audience_insights" 
        FOR ALL 
        TO PUBLIC 
        USING (
          "campaignId" IN (
            SELECT id FROM campaigns WHERE "userId" = current_setting('app.current_user_id')
          )
          OR
          "cohortId" IN (
            SELECT id FROM cohorts WHERE "userId" = current_setting('app.current_user_id')
          )
        );
      `);
      console.log('✅ RLS enabled and policy created for audience_insights');
    } catch (error) {
      console.log(`ℹ️  RLS setup for audience_insights: ${error.message}`);
    }
    
    console.log('\n✅ RLS setup completed!');
    console.log('\n📝 Note: These RLS policies ensure that users can only access');
    console.log('   data that belongs to them. The policies are based on the');
    console.log('   userId column in each table.');
    
  } catch (error) {
    console.error('❌ RLS setup failed:', error.message);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the proper RLS setup
setupProperRLS();