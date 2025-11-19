/**
 * Database Setup Script
 * 
 * This script helps set up the PostgreSQL database for the Adsilo application.
 * 
 * Instructions:
 * 1. Make sure PostgreSQL is installed and running
 * 2. Update the database credentials in this script
 * 3. Run: node setup-database.js
 */

const { Client } = require('pg');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Database configuration - UPDATE THESE VALUES WITH YOUR ACTUAL CREDENTIALS
const dbConfig = {
  user: 'your_postgres_username',        // Replace with your PostgreSQL username
  password: 'your_postgres_password',    // Replace with your PostgreSQL password
  host: 'localhost',                     // Database host
  port: 5432,                            // Database port
  database: 'postgres'                   // Default database to connect to
};

// New database name for the application
const newDatabaseName = 'adsilo_db';

async function setupDatabase() {
  let client;
  
  try {
    // Connect to PostgreSQL server
    client = new Client(dbConfig);
    await client.connect();
    console.log('Connected to PostgreSQL server');
    
    // Check if database already exists
    const dbCheck = await client.query(
      `SELECT 1 FROM pg_database WHERE datname = $1`, 
      [newDatabaseName]
    );
    
    if (dbCheck.rowCount === 0) {
      // Create new database
      await client.query(`CREATE DATABASE ${newDatabaseName}`);
      console.log(`Database '${newDatabaseName}' created successfully`);
    } else {
      console.log(`Database '${newDatabaseName}' already exists`);
    }
    
    // Close connection
    await client.end();
    
    // Now connect to the new database to create tables
    const appDbConfig = {
      ...dbConfig,
      database: newDatabaseName
    };
    
    console.log('\nNext steps:');
    console.log('1. Update your .env file with the new database URL:');
    console.log(`   DATABASE_URL="postgresql://${dbConfig.user}:${dbConfig.password}@${dbConfig.host}:${dbConfig.port}/${newDatabaseName}?schema=public"`);
    console.log('2. Run the Prisma migrations:');
    console.log('   npx prisma migrate dev --name init');
    console.log('3. Generate the Prisma client:');
    console.log('   npx prisma generate');
    
  } catch (err) {
    console.error('Error setting up database:', err.message);
    
    if (client) {
      await client.end();
    }
    
    process.exit(1);
  }
}

// Run the setup
setupDatabase();