import { generateToken, verifyJWT, generateRefreshToken, verifyRefreshToken } from '../auth';

describe('Auth Utilities', () => {
    const mockUser = {
        id: 'test-user-id',
        email: 'test@example.com',
        name: 'Test User',
        role: 'USER' as const,
        organizationId: 'org-123'
    };

    describe('generateToken', () => {
        it('should generate a valid JWT token', async () => {
            const token = await generateToken(mockUser);

            expect(token).toBeDefined();
            expect(typeof token).toBe('string');
            expect(token.split('.')).toHaveLength(3); // JWT has 3 parts
        });

        it('should include user data in token payload', async () => {
            const token = await generateToken(mockUser);
            const payload = await verifyJWT(token);

            expect(payload.sub).toBe(mockUser.id);
            expect(payload.email).toBe(mockUser.email);
            expect(payload.name).toBe(mockUser.name);
            expect(payload.role).toBe(mockUser.role);
            expect(payload.organizationId).toBe(mockUser.organizationId);
        });
    });

    describe('verifyJWT', () => {
        it('should verify a valid token', async () => {
            const token = await generateToken(mockUser);
            const payload = await verifyJWT(token);

            expect(payload).toBeDefined();
            expect(payload.sub).toBe(mockUser.id);
        });

        it('should reject an invalid token', async () => {
            await expect(verifyJWT('invalid-token')).rejects.toThrow('Invalid token');
        });

        it('should reject a malformed token', async () => {
            await expect(verifyJWT('not.a.jwt')).rejects.toThrow();
        });
    });

    describe('generateRefreshToken', () => {
        it('should generate a valid refresh token', async () => {
            const token = await generateRefreshToken(mockUser.id);

            expect(token).toBeDefined();
            expect(typeof token).toBe('string');
            expect(token.split('.')).toHaveLength(3);
        });

        it('should include user ID and type in payload', async () => {
            const token = await generateRefreshToken(mockUser.id);
            const payload = await verifyRefreshToken(token);

            expect(payload.sub).toBe(mockUser.id);
            expect(payload.type).toBe('refresh');
        });
    });

    describe('verifyRefreshToken', () => {
        it('should verify a valid refresh token', async () => {
            const token = await generateRefreshToken(mockUser.id);
            const payload = await verifyRefreshToken(token);

            expect(payload).toBeDefined();
            expect(payload.sub).toBe(mockUser.id);
            expect(payload.type).toBe('refresh');
        });

        it('should reject an access token as refresh token', async () => {
            const accessToken = await generateToken(mockUser);
            await expect(verifyRefreshToken(accessToken)).rejects.toThrow();
        });

        it('should reject an invalid refresh token', async () => {
            await expect(verifyRefreshToken('invalid-token')).rejects.toThrow();
        });
    });

    describe('token expiration', () => {
        it('should have required claims', async () => {
            const token = await generateToken(mockUser);
            const payload = await verifyJWT(token);

            expect(payload.iat).toBeDefined(); // Issued at
            expect(payload.exp).toBeDefined(); // Expiration
        });
    });
});
