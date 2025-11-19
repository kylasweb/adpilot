import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import projectRoutes from './routes/projects';
import campaignRoutes from './routes/campaigns';
import cohortRoutes from './routes/cohorts';
import dashboardRoutes from './routes/dashboard';
import analyticsRoutes from './routes/analytics';
import creativeRoutes from './routes/creative';
import settingsRoutes from './routes/settings';
import testDbRoutes from './routes/test-db';
import schemaCheckRoutes from './routes/schema-check';
import { errorHandler } from './middleware/errorHandler';

const app = express();

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ALLOWED_ORIGINS?.split(',') || '*',
  methods: process.env.CORS_ALLOWED_METHODS?.split(',') || ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: process.env.CORS_ALLOWED_HEADERS?.split(',') || ['Content-Type', 'Authorization'],
  exposedHeaders: process.env.CORS_EXPOSE_HEADERS?.split(',') || ['X-Total-Count'],
  credentials: true
}));
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

// API routes
app.use('/api/projects', projectRoutes);
app.use('/api/campaigns', campaignRoutes);
app.use('/api/cohorts', cohortRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/creative', creativeRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/test-db', testDbRoutes);
app.use('/api/schema-check', schemaCheckRoutes);

// Error handling
app.use(errorHandler);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: {
      code: 'NOT_FOUND',
      message: 'Requested resource not found'
    }
  });
});

export default app;