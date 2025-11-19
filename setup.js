/**
 * Complete Setup Script
 * 
 * This script runs all the necessary steps to set up the Adsilo application:
 * 1. Updates .env file with database credentials
 * 2. Creates the database
 * 3. Runs Prisma migrations
 * 4. Generates Prisma Client
 * 
 * Before running this script:
 * 1. Install PostgreSQL and ensure it's running
 * 2. Update the database credentials in this file
 * 3. Run: node setup.js
 */

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const util = require('util');

// Convert exec to promise-based function
const execAsync = util.promisify(exec);

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

async function updateEnvFile() {
  try {
    console.log('Updating .env file with database credentials...');
    
    // Read the current .env file
    let envContent = fs.readFileSync(envPath, 'utf8');
    
    // Replace the DATABASE_URL line
    const updatedEnvContent = envContent.replace(
      /DATABASE_URL="[^"]*"/,
      `DATABASE_URL="${newDatabaseUrl}"`
    );
    
    // Write the updated content back to the file
    fs.writeFileSync(envPath, updatedEnvContent);
    
    console.log('✅ .env file updated successfully!');
    return true;
  } catch (error) {
    console.error('❌ Error updating .env file:', error.message);
    return false;
  }
}

async function createDatabase() {
  try {
    console.log('Creating database...');
    
    // Use the Prisma CLI to create the database
    const { stdout, stderr } = await execAsync(
      `npx prisma migrate dev --name init --skip-generate`,
      {
        cwd: process.cwd(),
        env: {
          ...process.env,
          DATABASE_URL: newDatabaseUrl
        }
      }
    );
    
    if (stderr) {
      console.error('stderr:', stderr);
    }
    
    console.log('Database creation output:', stdout);
    console.log('✅ Database created successfully!');
    return true;
  } catch (error) {
    // If the error is about the database already existing, that's fine
    if (error.message.includes('already exists') || error.message.includes('already been applied')) {
      console.log('✅ Database already exists, continuing...');
      return true;
    }
    
    console.error('❌ Error creating database:', error.message);
    
    if (error.stdout) {
      console.error('stdout:', error.stdout);
    }
    
    if (error.stderr) {
      console.error('stderr:', error.stderr);
    }
    
    return false;
  }
}

async function runMigrations() {
  try {
    console.log('Running database migrations...');
    
    // Run Prisma migrations
    const { stdout, stderr } = await execAsync('npx prisma migrate dev --name init', {
      cwd: process.cwd()
    });
    
    if (stderr) {
      console.error('stderr:', stderr);
    }
    
    console.log('Migration output:', stdout);
    console.log('✅ Database migrations completed successfully!');
    return true;
  } catch (error) {
    console.error('❌ Error running migrations:', error.message);
    
    if (error.stdout) {
      console.error('stdout:', error.stdout);
    }
    
    if (error.stderr) {
      console.error('stderr:', error.stderr);
    }
    
    return false;
  }
}

async function generatePrismaClient() {
  try {
    console.log('Generating Prisma Client...');
    
    // Generate Prisma Client
    const { stdout, stderr } = await execAsync('npx prisma generate', {
      cwd: process.cwd()
    });
    
    if (stderr) {
      console.error('stderr:', stderr);
    }
    
    console.log('Generate output:', stdout);
    console.log('✅ Prisma Client generated successfully!');
    return true;
  } catch (error) {
    console.error('❌ Error generating Prisma Client:', error.message);
    
    if (error.stdout) {
      console.error('stdout:', error.stdout);
    }
    
    if (error.stderr) {
      console.error('stderr:', error.stderr);
    }
    
    return false;
  }
}

async function main() {
  console.log('🚀 Starting Adsilo setup process...\n');
  
  // Step 1: Update .env file
  const envUpdated = await updateEnvFile();
  if (!envUpdated) {
    console.error('❌ Setup failed at step 1: Updating .env file');
    process.exit(1);
  }
  
  // Step 2: Create database
  const dbCreated = await createDatabase();
  if (!dbCreated) {
    console.error('❌ Setup failed at step 2: Creating database');
    process.exit(1);
  }
  
  // Step 3: Run migrations
  const migrationsRan = await runMigrations();
  if (!migrationsRan) {
    console.error('❌ Setup failed at step 3: Running migrations');
    process.exit(1);
  }
  
  // Step 4: Generate Prisma Client
  const clientGenerated = await generatePrismaClient();
  if (!clientGenerated) {
    console.error('❌ Setup failed at step 4: Generating Prisma Client');
    process.exit(1);
  }
  
  console.log('\n🎉 Setup completed successfully!');
  console.log('\nNext steps:');
  console.log('1. Start the development server:');
  console.log('   npm run dev');
  console.log('2. Visit http://localhost:3000 to see the application');
  console.log('3. Test the API endpoints at http://localhost:3000/api-test');
}

// Run the setup
main();