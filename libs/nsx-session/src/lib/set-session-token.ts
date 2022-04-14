import ms from 'ms';
import { Response as HttpResponse } from 'express';

import { HttpRequestWithSession, TokenMethod } from '@myancommerce/nox-common';
import { InternalServerError } from '@myancommerce/nsx-error';

interface SetSessionOption {
    sessionToken: string;
    rememberMe: boolean;
    authTokenHeaderKey?: string | undefined;
    tokenMethod?: TokenMethod | undefined;
    req: HttpRequestWithSession;
    res: HttpResponse;
}

export function setSessionToken(options: SetSessionOption) {
    const {
        sessionToken,
        rememberMe,
        authTokenHeaderKey,
        tokenMethod,
        req,
        res,
    } = options;

    if (!tokenMethod) {
        throw new InternalServerError({ message: 'Please define tokenMethod' });
    }

    if (!authTokenHeaderKey) {
        throw new InternalServerError({
            message: 'Please define authTokenHeaderKey',
        });
    }

    const usingCookie =
        tokenMethod === 'cookie' ||
        (Array.isArray(tokenMethod) && tokenMethod.includes('cookie'));

    const usingBearer =
        tokenMethod === 'bearer' ||
        (Array.isArray(tokenMethod) && tokenMethod.includes('bearer'));

    if (usingCookie) {
        if (req.session) {
            req.sessionOptions!.maxAge = rememberMe ? ms('1y') : undefined;
        }

        req.session!.token = sessionToken;
    }

    if (usingBearer) {
        res.set(authTokenHeaderKey, sessionToken);
    }
}
