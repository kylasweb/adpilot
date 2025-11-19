# Adsilo Application Setup

## Prerequisites

1. **PostgreSQL** (version 12 or higher)
2. **Node.js** (version 14 or higher)
3. **npm** (comes with Node.js)

## Quick Setup

1. **Install PostgreSQL** if you haven't already:

   - Download from https://www.postgresql.org/download/
   - Remember your username and password during installation

2. **Update database credentials** in `setup.js`:

   ```javascript
   const dbCredentials = {
     user: "your_actual_username", // Your PostgreSQL username
     password: "your_actual_password", // Your PostgreSQL password
     host: "localhost",
     port: 5432,
     database: "adsilo_db",
   };
   ```

3. **Run the setup script**:

   ```bash
   node setup.js
   ```

4. **Start the development server**:

   ```bash
   npm run dev
   ```

5. **Visit the application**:
   - Open http://localhost:3000 in your browser

## Manual Setup Steps

If you prefer to run the setup steps manually:

1. **Update .env file**:

   ```bash
   node update-env.js
   ```

2. **Create database**:

   ```bash
   node setup-database.js
   ```

3. **Initialize database schema**:

   ```bash
   node init-database.js
   ```

4. **Test database connection**:
   ```bash
   node test-db-connection.js
   ```

## Testing the Application

After setup, you can test the API endpoints:

1. Visit http://localhost:3000/api-test
2. Run the API tests to verify all endpoints are working

## Troubleshooting

### Common Issues

1. **Connection Refused**:

   - Ensure PostgreSQL is running
   - Check that the host and port are correct

2. **Authentication Failed**:

   - Double-check the username and password
   - Ensure the user has permissions to create databases

3. **Prisma Migration Errors**:
   - Verify the DATABASE_URL in .env is correct
   - Check that you can connect to the database with a database client

### Getting Help

If you encounter issues:

1. Check the error messages carefully
2. Refer to SETUP_GUIDE.md for detailed instructions
3. Ensure all prerequisites are installed and running
