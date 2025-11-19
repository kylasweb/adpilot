# Database Setup Guide

## Prerequisites

1. PostgreSQL database server installed and running
2. Node.js and npm installed
3. Prisma CLI installed globally (`npm install -g prisma`)

## Database Configuration

### 1. Update Environment Variables

Update the `.env` file with your actual database connection details:

```env
# Database
DATABASE_URL="postgresql://USERNAME:PASSWORD@HOST:PORT/DATABASE_NAME?schema=public"
```

Replace the placeholders with your actual database credentials:

- `USERNAME`: Your PostgreSQL username
- `PASSWORD`: Your PostgreSQL password
- `HOST`: Database host (e.g., localhost)
- `PORT`: Database port (default is 5432)
- `DATABASE_NAME`: Name of your database

### 2. Create Database

Create a new PostgreSQL database:

```sql
CREATE DATABASE adsilo_db;
```

### 3. Run Database Migrations

Apply the database schema changes:

```bash
npx prisma migrate dev --name init
```

This will:

1. Create all the necessary tables
2. Set up foreign key relationships
3. Create indexes for better performance

### 4. Generate Prisma Client

Generate the Prisma client for database access:

```bash
npx prisma generate
```

## Database Schema Overview

The Adsilo application uses the following tables:

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

## Seeding Initial Data

To seed the database with initial data, run:

```bash
npx prisma db seed
```

## Troubleshooting

### Common Issues

1. **Connection Refused**: Ensure PostgreSQL is running and the connection details are correct
2. **Authentication Failed**: Verify the username and password in the DATABASE_URL
3. **Database Does Not Exist**: Create the database before running migrations
4. **Permission Denied**: Ensure the database user has the necessary permissions

### Reset Database (Development Only)

To reset the database (WARNING: This will delete all data):

```bash
npx prisma migrate reset
```

This will:

1. Drop the database
2. Recreate the database
3. Apply all migrations
4. Run seed scripts (if configured)

## Backup and Restore

### Backup

```bash
pg_dump -h HOST -U USERNAME DATABASE_NAME > backup.sql
```

### Restore

```bash
psql -h HOST -U USERNAME DATABASE_NAME < backup.sql
```
