/**
 * Environment Update Script
 * 
 * This script updates the .env file with proper database credentials.
 * 
 * Instructions:
 * 1. Update the credentials below with your actual database information
 * 2. Run: node update-env.js
 */

const fs = require('fs');
const path = require('path');

// Update these with your actual database credentials
const dbCredentials = {
  user: 'your_actual_username',      // Replace with your PostgreSQL username
  password: 'your_actual_password',  // Replace with your PostgreSQL password
  host: 'localhost',                 // Database host (usually localhost)
  port: 5432,                        // Database port (usually 5432 for PostgreSQL)
  database: 'adsilo_db'              // Database name
};

// Construct the new DATABASE_URL
const newDatabaseUrl = `postgresql://${dbCredentials.user}:${dbCredentials.password}@${dbCredentials.host}:${dbCredentials.port}/${dbCredentials.database}?schema=public`;

// Path to the .env file
const envPath = path.join(__dirname, '.env');

try {
  // Read the current .env file
  let envContent = fs.readFileSync(envPath, 'utf8');
  
  // Replace the DATABASE_URL line
  const updatedEnvContent = envContent.replace(
    /DATABASE_URL="[^"]*"/,
    `DATABASE_URL="${newDatabaseUrl}"`
  );
  
  // Write the updated content back to the file
  fs.writeFileSync(envPath, updatedEnvContent);
  
  console.log('Successfully updated .env file with new database credentials.');
  console.log('New DATABASE_URL:', newDatabaseUrl);
  
  console.log('\nNext steps:');
  console.log('1. Run the database migrations:');
  console.log('   npx prisma migrate dev --name init');
  console.log('2. Generate the Prisma client:');
  console.log('   npx prisma generate');
  console.log('3. Start the development server:');
  console.log('   npm run dev');
  
} catch (error) {
  console.error('Error updating .env file:', error.message);
  process.exit(1);
}