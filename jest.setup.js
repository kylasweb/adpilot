import '@testing-library/jest-dom';

// Mock environment variables for tests
process.env.JWT_SECRET = 'test-jwt-secret-key-for-testing-only';
process.env.REFRESH_SECRET = 'test-refresh-secret-key-for-testing-only';
process.env.DATABASE_URL = 'postgresql://test:test@localhost:5432/test_db';

// Mock Next.js router
jest.mock('next/navigation', () => ({
    useRouter() {
        return {
            push: jest.fn(),
            replace: jest.fn(),
            prefetch: jest.fn(),
            back: jest.fn(),
            pathname: '/',
            query: {},
            asPath: '/',
        };
    },
    useSearchParams() {
        return new URLSearchParams();
    },
    usePathname() {
        return '/';
    },
}));