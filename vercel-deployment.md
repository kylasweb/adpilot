# Vercel Deployment Instructions

## Environment Variables Setup

Configure the following environment variables in your Vercel project dashboard under Settings > Environment Variables:

```bash
# Required - Production API URL (replace with your production API endpoint)
NEXT_PUBLIC_API_URL=https://your-api-domain.com/api

# Required - Environment setting
NODE_ENV=production

# Required - JWT Secret (use a strong, unique key)
JWT_SECRET=your-secure-production-jwt-secret
```

> ⚠️ **Security Note**: Never reuse development JWT secrets in production. Generate a secure random string for production use.

## Build and Development Settings

Configure the following in your Vercel project settings:

1. **Framework Preset**: Next.js
2. **Build Command**: `next build`
3. **Output Directory**: `.next`
4. **Install Command**: `npm install`
5. **Node.js Version**: 18.x (or latest LTS)

### Prisma note

If you're using Prisma with Next.js API routes, make sure Prisma Client is generated during the install step. This repository uses the `postinstall` script in `package.json` to run `npx prisma generate`. This runs automatically during Vercel's install step.

If you have a separate Express server or CLI utilities that compile to `/dist`, those are only required for local or non-Vercel deployments — Vercel uses Next.js serverless functions, not the compiled Express server.

## Deployment Configuration

1. **Root Directory**: `./` (default)
2. **Environment**: Production (default)
3. **Automatically deployed branches**:
   - Production branch: `main`
   - Preview branches: `dev/*`, `feature/*`

## Authentication Verification Steps

After deployment, verify the authentication system using these steps:

1. **Public Access Check**:
   - Visit the landing page
   - Verify public routes are accessible
   - Confirm login/register pages load correctly

2. **Authentication Flow**:
   - Register a new test account
   - Verify login functionality
   - Confirm auth token is set in cookies
   - Test logout functionality

3. **Admin Route Protection**:
   - Attempt to access `/admin/*` routes while logged out
   - Verify redirect to login page
   - Login with admin credentials
   - Confirm admin routes are now accessible

4. **Security Headers**:
   - Verify secure cookie settings in production
   - Check HTTPS enforcement
   - Validate authentication persistence

## Troubleshooting Common Issues

1. **API Connection Errors**:
   - Verify `NEXT_PUBLIC_API_URL` is correctly set
   - Confirm API is accessible from Vercel's servers
   - Check for CORS configuration if needed

2. **Authentication Issues**:
   - Validate JWT_SECRET is properly set
   - Ensure cookies are configured for the correct domain
   - Check for secure and httpOnly cookie flags

3. **Redirect Problems**:
   - Verify Next.js middleware is working
   - Confirm all admin routes are properly protected
   - Check login redirect URLs are correct

## Monitoring and Maintenance

1. **Error Tracking**:
   - Set up error monitoring in Vercel dashboard
   - Configure alerts for authentication failures
   - Monitor failed login attempts

2. **Performance Metrics**:
   - Track authentication API response times
   - Monitor session management
   - Watch for unusual traffic patterns

## Support and Resources

- Vercel Documentation: https://vercel.com/docs
- Next.js Authentication Docs: https://nextjs.org/docs/authentication
- Project Repository: [Your Repository URL]

For additional support:
- Create an issue in the project repository
- Contact the development team
- Consult Vercel's support if deployment-specific issues arise