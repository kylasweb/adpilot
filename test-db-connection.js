/**
 * Simple Database Connection Test
 * 
 * This script tests the database connection using the Prisma client.
 */

// Import the Prisma client
import { PrismaClient } from '@prisma/client';

// Create a new Prisma client instance
const prisma = new PrismaClient();

async function testConnection() {
  try {
    console.log('Testing database connection...');
    
    // Test the connection
    await prisma.$connect();
    console.log('✅ Successfully connected to the database!');
    
    // Get database version
    const version = await prisma.$queryRaw`SELECT version()`;
    console.log('Database version:', version[0].version);
    
    // List all tables in the database
    console.log('\nChecking database schema...');
    const tables = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `;
    
    if (tables.length > 0) {
      console.log('Tables found in database:');
      tables.forEach((table, index) => {
        console.log(`  ${index + 1}. ${table.table_name}`);
      });
    } else {
      console.log('No tables found in the database.');
    }
    
    // Close the connection
    await prisma.$disconnect();
    console.log('\n✅ Database connection test completed successfully!');
    
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    
    // Close the connection if it was opened
    try {
      await prisma.$disconnect();
    } catch (disconnectError) {
      // Ignore disconnect errors
    }
    
    process.exit(1);
  }
}

// Run the test
testConnection();