import type { Request } from 'express';
import type { ParsedQs } from 'qs';

export type AuthUser = {
    id: string;
    email: string;
    name?: string;
    role: string;
    staffRole?: 'ADMIN' | 'STAFF' | 'C_LEVEL' | 'MANAGER';
};

export type AuthRequest<
    P = import('express-serve-static-core').ParamsDictionary,
    ResBody = any,
    ReqBody = any,
    ReqQuery = ParsedQs
> = Request<P, ResBody, ReqBody, ReqQuery> & { user?: AuthUser; projectRole?: string };
