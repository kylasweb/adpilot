# Complete Adsilo Setup Instructions

## Overview

This document provides step-by-step instructions to complete the setup of the Adsilo application with a real database backend. The application has been fully implemented with real API endpoints, but requires database configuration to function properly.

## Prerequisites

Before starting, ensure you have:

1. **PostgreSQL** installed and running (version 12 or higher)
2. **Node.js** installed (version 14 or higher)
3. **npm** installed (comes with Node.js)

## Step 1: Database Installation

If you haven't installed PostgreSQL yet:

### Windows

1. Download PostgreSQL from https://www.postgresql.org/download/windows/
2. Run the installer and follow the setup wizard
3. Remember the username and password you set during installation
4. Note the port number (default is 5432)

### macOS

```bash
brew install postgresql
brew services start postgresql
```

### Linux (Ubuntu/Debian)

```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql.service
```

## Step 2: Update Database Credentials

Edit the `setup.js` file and update the database credentials:

```javascript
const dbCredentials = {
  user: "your_actual_username", // Replace with your PostgreSQL username
  password: "your_actual_password", // Replace with your PostgreSQL password
  host: "localhost", // Database host (usually localhost)
  port: 5432, // Database port (usually 5432 for PostgreSQL)
  database: "adsilo_db", // Database name
};
```

## Step 3: Run the Complete Setup

Run the setup script which will perform all necessary steps:

```bash
npm run setup
```

This command will:

1. Update the .env file with your database credentials
2. Create the `adsilo_db` database
3. Run Prisma migrations to create all tables
4. Generate the Prisma Client

## Alternative: Manual Setup Steps

If you prefer to run each step manually:

### 1. Update Environment File

```bash
npm run setup:env
```

### 2. Create Database

```bash
npm run setup:db
```

### 3. Initialize Database Schema

```bash
npm run setup:init
```

### 4. Test Database Connection

```bash
npm run setup:test
```

## Step 4: Start the Development Server

After setup is complete, start the development server:

```bash
npm run dev
```

Visit http://localhost:3000 to see the application.

## Testing the Implementation

The application includes several pages that now use real API data:

1. **Dashboard** - Shows real campaign and cohort statistics
2. **Campaigns** - Displays real campaign data with CRUD operations
3. **Cohorts** - Shows real audience segments
4. **Analytics** - Displays real performance metrics and audience insights
5. **Creative Library** - Shows real creative assets
6. **Settings** - Updates real user profile and organization data

You can also test the API endpoints directly at http://localhost:3000/api-test

## Troubleshooting

### Common Issues and Solutions

1. **Connection Refused**

   - Ensure PostgreSQL is running
   - Check that the host and port are correct
   - Verify firewall settings

2. **Authentication Failed**

   - Double-check the username and password
   - Ensure the user has permissions to create databases

3. **Prisma Migration Errors**

   - Verify the DATABASE_URL in .env is correct
   - Check that you can connect to the database with a database client

4. **Port Already in Use**
   - The application uses port 8080 for the backend API
   - If this port is in use, update the PORT variable in .env

### Manual Database Creation

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

## Database Schema

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

## API Endpoints

All API endpoints are now functional:

### Campaigns

- `GET /api/campaigns` - Get all campaigns
- `POST /api/campaigns` - Create a new campaign
- `GET /api/campaigns/:id` - Get a specific campaign
- `PUT /api/campaigns/:id` - Update a campaign
- `DELETE /api/campaigns/:id` - Delete a campaign

### Cohorts

- `GET /api/cohorts` - Get all cohorts
- `POST /api/cohorts` - Create a new cohort
- `GET /api/cohorts/:id` - Get a specific cohort
- `PUT /api/cohorts/:id` - Update a cohort
- `DELETE /api/cohorts/:id` - Delete a cohort

### Dashboard

- `GET /api/dashboard/stats` - Get dashboard statistics
- `GET /api/dashboard/activity/recent` - Get recent activity

### Analytics

- `GET /api/analytics/performance` - Get performance overview
- `GET /api/analytics/campaigns` - Get campaign metrics
- `GET /api/analytics/audience` - Get audience insights

### Creative

- `GET /api/creative` - Get all creative assets
- `POST /api/creative` - Create a new creative asset
- `GET /api/creative/:id` - Get a specific creative asset
- `PUT /api/creative/:id` - Update a creative asset
- `DELETE /api/creative/:id` - Delete a creative asset

### Settings

- `GET /api/settings` - Get user settings
- `PUT /api/settings/profile` - Update user profile
- `PUT /api/settings/password` - Update password
- `PUT /api/settings/organization` - Update organization settings
- `DELETE /api/settings/account` - Delete account

## Next Steps

After completing the setup:

1. **Implement Authentication**

   - The application currently works without authentication for testing
   - Implement JWT-based authentication for production use

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
