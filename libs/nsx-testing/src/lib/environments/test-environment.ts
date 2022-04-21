import * as dotenv from 'dotenv';
import { Request as HttpRequest, Response as HttpResponse } from 'express';
import { ConfigModuleOptions } from '@nestjs/config';

import { DefaultLogger } from '@myancommerce/nsx-logger';
import { LogLevel } from '@myancommerce/nsx-logger';
import {
    ApiOptions,
    AuthOptions,
    CometXConfig,
    GraphQLOptions,
    SocialAuthOptions,
} from '@myancommerce/core';
import { InMemoryCacheStrategy } from '@myancommerce/nsx-cache';
import {
    BcryptPasswordHashingStrategy,
    DefaultPasswordValidationStrategy,
    LocalAuthenticationStrategy,
} from '@myancommerce/nsx-auth';

dotenv.config({
    path: 'libs/nsx-testing/src/lib/.env.test',
});

const appConfig: ConfigModuleOptions = {
    isGlobal: true,
};

const apiConfig: ApiOptions = {
    hostname: process.env['DATABASE_HOST'],
    port: 3200,

    apiPath: 'api',
    apiPlayground: true, // turn this off for production
    apiDebug: true, // turn this off for production
};

const socialAuthConfig: SocialAuthOptions = {
    name: 'google',
    clientID: process.env['CLIENT_ID'] as string,
    clientSecret: process.env['CLIENT_SECRET'] as string,
};

const authConfig: AuthOptions = {
    jwtTokenSecret: process.env['JWT_SECRET'] as string,
    jwtTokenExpiry: process.env['JWT_EXPIRE_IN'] as string,
    jwtCookieExpiry: process.env['JWT_COOKIE_EXPIRES_IN'] as string,

    tokenMethod: 'cookie',
    cookieOptions: {
        secret: Math.random().toString(36).substring(3),
        httpOnly: true,
    },
    authTokenHeaderKey: 'cometx-auth-token',

    requireVerification: false,
    verificationTokenDuration: '7d',

    sessionCacheStrategy: new InMemoryCacheStrategy(),
    sessionDuration: '7d',
    sessionCacheTTL: 300,

    shopAuthenticationStrategy: [new LocalAuthenticationStrategy()],
    adminAuthenticationStrategy: [new LocalAuthenticationStrategy()],

    passwordHashingStrategy: new BcryptPasswordHashingStrategy(),
    passwordValidationStrategy: new DefaultPasswordValidationStrategy({
        minLength: 4,
    }),
};

const graphqlConfig: GraphQLOptions = {
    sortSchema: true,
    autoSchemaFile: 'apps/core/src/schema.gql',
    buildSchemaOptions: {
        numberScalarMode: 'integer',
    },
    cors: {
        credentials: true,
        origin: 'http://localhost:4200',
    },
    context: ({ req, res }: any) => ({
        request: req as HttpRequest,
        response: res as HttpResponse,
    }),
    formatError: (error: any) => ({
        code: error.extensions?.['code'] || 'SERVER_ERROR',
        name: error.extensions?.['exception']?.name || error.name,
        message:
            error.extensions?.['exception']?.response?.message || error.message,
        errLocations: apiConfig.apiDebug ? error.locations : undefined,
        errPath: apiConfig.apiDebug ? error.path : undefined,
        variables: apiConfig.apiDebug
            ? error.extensions?.['exception']?.variables
            : undefined,
        stacktrace: error.extensions?.['exception']?.stacktrace,
    }),
};
export const testEnvironment: CometXConfig = {
    appConfig,
    apiConfig,
    authConfig,
    socialAuthConfig,
    graphqlConfig,
    dbConnection: process.env['DATABASE_URL'] as string,
    logger: new DefaultLogger({
        level: LogLevel.Info,
        timestamp: true,
        defaultContext: 'CometX Server',
    }),
};
