# Adsilo Database Setup Guide

## Prerequisites

1. **PostgreSQL** - Install PostgreSQL database server (version 12 or higher)
2. **Node.js** - Install Node.js (version 14 or higher)
3. **npm** - Comes with Node.js

## Step-by-Step Setup

### 1. Install PostgreSQL

If you haven't installed PostgreSQL yet, download and install it from:

- Windows: https://www.postgresql.org/download/windows/
- macOS: https://www.postgresql.org/download/macosx/
- Linux: https://www.postgresql.org/download/linux/

During installation:

- Remember the username and password you set (typically `postgres` for username)
- Note the port number (default is 5432)

### 2. Start PostgreSQL Server

Make sure the PostgreSQL server is running:

- **Windows**: PostgreSQL service should start automatically
- **macOS**: Use `brew services start postgresql`
- **Linux**: Use `sudo systemctl start postgresql`

### 3. Update Database Credentials

Edit the `update-env.js` file and replace the placeholder values with your actual database credentials:

```javascript
const dbCredentials = {
  user: "your_actual_username", // Replace with your PostgreSQL username
  password: "your_actual_password", // Replace with your PostgreSQL password
  host: "localhost", // Database host (usually localhost)
  port: 5432, // Database port (usually 5432 for PostgreSQL)
  database: "adsilo_db", // Database name
};
```

### 4. Run the Environment Update Script

```bash
node update-env.js
```

This will update your `.env` file with the correct database connection string.

### 5. Run Database Setup Script

```bash
node setup-database.js
```

This script will:

- Connect to your PostgreSQL server
- Create the `adsilo_db` database if it doesn't exist

### 6. Initialize Database Schema

```bash
node init-database.js
```

This script will:

- Run Prisma migrations to create all necessary tables
- Generate the Prisma Client for database access

### 7. Start the Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see the application.

## Troubleshooting

### Common Issues

1. **Connection Refused**

   - Ensure PostgreSQL is running
   - Check that the host and port are correct
   - Verify firewall settings

2. **Authentication Failed**

   - Double-check the username and password
   - Ensure the user has permissions to create databases

3. **Database Already Exists**

   - The setup script handles this automatically
   - If you need a fresh start, you can drop the database manually

4. **Prisma Migration Errors**
   - Ensure the DATABASE_URL in .env is correct
   - Check that you can connect to the database with a database client

### Manual Database Creation (If Needed)

If the setup script fails, you can manually create the database:

1. Connect to PostgreSQL:

   ```bash
   psql -U your_username -h localhost -p 5432
   ```

2. Create the database:

   ```sql
   CREATE DATABASE adsilo_db;
   ```

3. Exit psql:
   ```sql
   \q
   ```

## Database Schema Overview

The application uses the following tables:

### Core Tables

- `users` - User accounts and authentication
- `organizations` - Organization information
- `campaigns` - Marketing campaigns
- `cohorts` - Audience segments
- `creatives` - Creative assets

### Analytics Tables

- `campaign_performance` - Campaign performance metrics
- `audience_insights` - Audience demographic data

### Project Management Tables

- `projects` - Projects
- `project_members` - Project team members
- `tasks` - Tasks within projects
- `time_entries` - Time tracking entries
- `comments` - Comments on tasks
- `attachments` - File attachments
- `roadmaps` - Project roadmaps
- `bugs` - Bug reports

### System Tables

- `webhook_configs` - Webhook configurations

## Testing the Setup

After completing the setup, you can test the API endpoints:

1. Visit `http://localhost:3000/api-test` to run API tests
2. Check that all endpoints return successful responses
3. Verify that the database connections are working

## Next Steps

1. **Configure Authentication**

   - Implement JWT-based authentication
   - Set up login/logout functionality

2. **Add Seed Data**

   - Create sample campaigns, cohorts, and analytics data
   - Populate the database with initial content

3. **Implement File Uploads**

   - Add support for uploading creative assets
   - Configure storage solution (local, AWS S3, etc.)

4. **Deploy to Production**
   - Set up production database
   - Configure environment variables for production
   - Deploy the application to your hosting platform

## Useful Commands

- **Run database migrations**: `npx prisma migrate dev`
- **Generate Prisma Client**: `npx prisma generate`
- **View database schema**: `npx prisma studio`
- **Reset database** (development only): `npx prisma migrate reset`

## Support

If you encounter any issues during setup:

1. Check the error messages carefully
2. Verify all credentials and connection details
3. Ensure all prerequisites are installed and running
4. Consult the PostgreSQL and Prisma documentation
