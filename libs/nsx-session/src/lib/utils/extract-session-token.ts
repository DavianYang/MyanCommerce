import { HttpRequestWithSession, TokenMethod } from '@myancommerce/nox-common';

export function extractSessionToken(
    req: HttpRequestWithSession,
    tokenMethod: TokenMethod,
): string | undefined {
    const tokenFromCookie = getFromCookie(req);
    const tokenFromHeader = getFromHeader(req);

    if (tokenMethod === 'cookie') {
        return tokenFromCookie;
    } else if (tokenMethod === 'bearer') {
        return tokenFromHeader;
    }

    if (tokenMethod.includes('cookie') && tokenFromCookie) {
        return tokenFromCookie;
    }

    if (tokenMethod.includes('bearer') && tokenFromHeader) {
        return tokenFromHeader;
    }

    return;
}

function getFromHeader(req: HttpRequestWithSession): string | undefined {
    const authHeader = req.get('Authorization');

    if (authHeader) {
        const matches = authHeader.trim().match(/^bearer\s(.+)$/i);

        if (matches) {
            return matches[1];
        }
    }
    return;
}

function getFromCookie(req: HttpRequestWithSession): string | undefined {
    if (req.session && req.session.token) {
        return req.session.token;
    }
    return;
}
