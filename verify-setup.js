/**
 * Setup Verification Script
 * 
 * This script verifies that all components of the Adsilo application are properly set up:
 * 1. Database connection
 * 2. Prisma Client generation
 * 3. API endpoints accessibility
 * 
 * Run this script after completing the setup:
 * node verify-setup.js
 */

import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Prisma Client
const prisma = new PrismaClient();

async function verifyDatabaseConnection() {
  try {
    console.log('🔍 Verifying database connection...');

    // Test the connection
    await prisma.$connect();
    console.log('✅ Database connection successful!');

    // Get database version
    const version = await prisma.$queryRaw`SELECT version()`;
    console.log(`📊 Database version: ${version[0].version}`);

    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    return false;
  }
}

async function verifyPrismaClient() {
  try {
    console.log('\n🔍 Verifying Prisma Client...');

    // Check if Prisma Client files exist
    const clientPath = path.join(__dirname, 'node_modules', '@prisma', 'client');
    if (fs.existsSync(clientPath)) {
      console.log('✅ Prisma Client is installed!');
      return true;
    } else {
      console.error('❌ Prisma Client not found. Run "npx prisma generate" to generate it.');
      return false;
    }
  } catch (error) {
    console.error('❌ Prisma Client verification failed:', error.message);
    return false;
  }
}

async function verifyDatabaseSchema() {
  try {
    console.log('\n🔍 Verifying database schema...');

    // List all tables in the database
    const tables = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `;

    if (tables.length > 0) {
      console.log('✅ Database schema is properly set up!');
      console.log('📋 Tables found:');
      tables.forEach((table, index) => {
        console.log(`   ${index + 1}. ${table.table_name}`);
      });
      return true;
    } else {
      console.error('❌ No tables found in the database. Run migrations to create the schema.');
      return false;
    }
  } catch (error) {
    console.error('❌ Database schema verification failed:', error.message);
    return false;
  }
}

async function verifyEnvFile() {
  try {
    console.log('\n🔍 Verifying environment configuration...');

    // Check if .env file exists
    const envPath = path.join(__dirname, '.env');
    if (fs.existsSync(envPath)) {
      const envContent = fs.readFileSync(envPath, 'utf8');

      // Check if DATABASE_URL is present and not the default
      if (envContent.includes('DATABASE_URL=') && !envContent.includes('your_database_name')) {
        console.log('✅ Environment file is properly configured!');
        return true;
      } else {
        console.error('❌ Environment file needs to be updated with actual database credentials.');
        return false;
      }
    } else {
      console.error('❌ .env file not found.');
      return false;
    }
  } catch (error) {
    console.error('❌ Environment file verification failed:', error.message);
    return false;
  }
  const routePath = path.join(__dirname, 'src', 'routes', `${route}.ts`);
  if (!fs.existsSync(routePath)) {
    console.error(`❌ Route file missing: ${route}.ts`);
    allRoutesExist = false;
  }
}

if (allRoutesExist) {
  console.log('✅ All API route files are present!');
}

return allRoutesExist;
    } else {
  console.error('❌ Express app file not found.');
  return false;
}
  } catch (error) {
  console.error('❌ API endpoints verification failed:', error.message);
  return false;
}
}

async function main() {
  console.log('🚀 Starting Adsilo setup verification...\n');

  // Run all verification steps
  const databaseOk = await verifyDatabaseConnection();
  const prismaOk = await verifyPrismaClient();
  const schemaOk = await verifyDatabaseSchema();
  const envOk = await verifyEnvFile();
  const apiOk = await verifyApiEndpoints();

  // Close Prisma connection
  await prisma.$disconnect();

  console.log('\n' + '='.repeat(50));
  console.log('📋 SETUP VERIFICATION SUMMARY');
  console.log('='.repeat(50));

  console.log(`Database Connection:     ${databaseOk ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`Prisma Client:           ${prismaOk ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`Database Schema:         ${schemaOk ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`Environment Config:      ${envOk ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`API Endpoints:           ${apiOk ? '✅ PASS' : '❌ FAIL'}`);

  const allPassed = databaseOk && prismaOk && schemaOk && envOk && apiOk;

  if (allPassed) {
    console.log('\n🎉 All verification checks passed!');
    console.log('\n🚀 You\'re ready to start the development server:');
    console.log('   npm run dev');
    console.log('\n🌐 Then visit http://localhost:3000 to see the application');
    console.log('🧪 Test the API endpoints at http://localhost:3000/api-test');
  } else {
    console.log('\n❌ Some verification checks failed.');
    console.log('\nPlease check the errors above and fix them before starting the development server.');
    console.log('Refer to COMPLETE_SETUP_INSTRUCTIONS.md for detailed troubleshooting steps.');
  }

  console.log('\n' + '='.repeat(50));
}

// Run the verification
main();