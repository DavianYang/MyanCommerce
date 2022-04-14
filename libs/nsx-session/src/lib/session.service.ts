import ms from 'ms';
import crypto from 'crypto';
import { Injectable } from '@nestjs/common';
import {
    AnonymousSession,
    AuthenticatedSession,
    Prisma,
    User,
} from '@prisma/client';

import { CachedSession, CacheStrategy } from '@myancommerce/nsx-cache';
import { ConfigService } from '@myancommerce/nsx-config';
import { InternalServerError } from '@myancommerce/nsx-error';
import { PrismaService } from '@myancommerce/nsx-prisma';
import { Session } from '@myancommerce/nox-common';

@Injectable()
export class SessionService {
    private sessionCacheStrategy: CacheStrategy;
    private sessionDurationInMs: number;

    constructor(
        private readonly configService: ConfigService,
        private readonly prisma: PrismaService,
    ) {
        let cacheStrategy = this.configService.get(
            'authConfig.sessionCacheStrategy',
        );

        let cacheDuraton = this.configService.get('authConfig.sessionDuration');

        if (!cacheStrategy) {
            throw new InternalServerError({
                message: 'Please define Session Cache Strategy',
            });
        }

        if (!cacheDuraton) {
            throw new InternalServerError({
                message: 'Please define Session Duration',
            });
        }

        this.sessionCacheStrategy = cacheStrategy;
        this.sessionDurationInMs = ms(cacheDuraton as string);
    }

    async createNewAuthenticatedSession(
        user: User,
        authenticatedStrategyName: string,
    ): Promise<AuthenticatedSession & { user: User }> {
        const token = await this.generateSessionToken();

        const userInclude =
            Prisma.validator<Prisma.AuthenticatedSessionInclude>()({
                user: true,
            });

        const authenticatedSession =
            await this.prisma.authenticatedSession.create({
                data: {
                    token,
                    expires: this.getExpiryDate(this.sessionDurationInMs),
                    authenticatedStrategy: authenticatedStrategyName,
                    invalidated: false,
                    user: {
                        connect: {
                            id: user.id,
                        },
                    },
                },
                include: userInclude,
            });

        await this.sessionCacheStrategy.set(
            this.serializeSession(authenticatedSession),
        );

        return authenticatedSession;
    }

    async getSessionFromToken(
        sessionToken: string,
    ): Promise<CachedSession | undefined> {
        let serializedSession = await this.sessionCacheStrategy.get(
            sessionToken,
        );

        const stale = !!(
            serializedSession &&
            serializedSession.cachedExpiry < new Date().getTime() / 1000
        );

        const expired = !!(
            serializedSession && serializedSession.expires < new Date()
        );

        if (!serializedSession || stale || expired) {
            // Assuming this is AuthenticatedSession
            const session = await this.prisma.authenticatedSession.findUnique({
                where: { token: sessionToken },
            });

            if (session && session.expires > new Date()) {
                serializedSession = this.serializeSession(session);

                await this.sessionCacheStrategy.set(serializedSession);
            } else {
                return;
            }
        }

        return serializedSession;
    }

    serializeSession(
        session: AuthenticatedSession | AnonymousSession,
    ): CachedSession {
        const sessionCacheTTL = this.configService.get(
            'authConfig.sessionCacheTTL',
        );
        if (!sessionCacheTTL) {
            throw new InternalServerError({
                message: 'Please define Session Cache TTL',
            });
        }

        const expiry =
            Math.floor(new Date().getTime() / 1000) + sessionCacheTTL;

        const serializedSession: CachedSession = {
            cachedExpiry: expiry,
            id: session.id,
            token: session.token,
            expires: session.expires,
        };

        if (this.isAuthenticatedSession(session)) {
            const { user } = session;

            serializedSession.user = {
                id: user.id,
                identifier: user.identifier,
                verified: user.verified,
            };
        }

        return serializedSession;
    }

    private generateSessionToken(): Promise<string> {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(32, (err, buffer) => {
                if (err) reject(err);

                resolve(buffer.toString('hex'));
            });
        });
    }

    private getExpiryDate(timeToExpireInMs: number): Date {
        return new Date(Date.now() + timeToExpireInMs);
    }

    private isAuthenticatedSession(
        session: Session,
    ): session is AuthenticatedSession & { user: User } {
        return session.hasOwnProperty('user');
    }
}
