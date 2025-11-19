/**
 * Database Initialization Script
 * 
 * This script runs the Prisma migrations to set up the database schema.
 * 
 * Prerequisites:
 * 1. PostgreSQL database server running
 * 2. .env file updated with correct DATABASE_URL
 * 3. Node.js and npm installed
 * 
 * Run this script after updating your .env file:
 * node init-database.js
 */

const { exec } = require('child_process');
const util = require('util');

// Convert exec to promise-based function
const execAsync = util.promisify(exec);

async function initializeDatabase() {
  try {
    console.log('Checking Prisma installation...');
    
    // Check if Prisma CLI is installed
    await execAsync('npx prisma --version');
    console.log('Prisma CLI is available');
    
    console.log('Running Prisma migrations...');
    
    // Run Prisma migrations
    const { stdout, stderr } = await execAsync('npx prisma migrate dev --name init', {
      cwd: process.cwd()
    });
    
    if (stderr) {
      console.error('Migration stderr:', stderr);
    }
    
    console.log('Migration output:', stdout);
    console.log('Database schema applied successfully!');
    
    console.log('Generating Prisma Client...');
    
    // Generate Prisma Client
    const generateResult = await execAsync('npx prisma generate', {
      cwd: process.cwd()
    });
    
    if (generateResult.stderr) {
      console.error('Generate stderr:', generateResult.stderr);
    }
    
    console.log('Generate output:', generateResult.stdout);
    console.log('Prisma Client generated successfully!');
    
    console.log('\nDatabase initialization completed!');
    console.log('\nNext steps:');
    console.log('1. Start the development server:');
    console.log('   npm run dev');
    console.log('2. Visit http://localhost:3000 to see the application');
    
  } catch (error) {
    console.error('Error initializing database:', error.message);
    
    if (error.stdout) {
      console.error('stdout:', error.stdout);
    }
    
    if (error.stderr) {
      console.error('stderr:', error.stderr);
    }
    
    process.exit(1);
  }
}

// Run the initialization
initializeDatabase();