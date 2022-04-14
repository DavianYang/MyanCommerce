import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { ConfigModuleOptions } from '@nestjs/config';
import { BuildSchemaOptions } from '@nestjs/graphql';

import {
    AuthenticationStrategy,
    PasswordHashingStrategy,
    PasswordValidationStrategy,
} from '@myancommerce/nsx-auth';
import { NSXLogger } from '@myancommerce/nsx-logger';
import { CacheStrategy } from '@myancommerce/nsx-cache';
import { TokenMethod } from '@myancommerce/nox-common';

/**
 * @description
 * Options for the handling of the cookies used to track sessions (only applicable if
 * `authOptions.tokenMethod` is set to `'cookie'`). These options are passed directly
 * to the Express [cookie-session middleware](https://github.com/expressjs/cookie-session).
 *
 * @docsCategory auth
 */
export interface CookieOptions {
    /**
     * @description
     * The name of the cookie to set.
     *
     * @default 'session'
     */
    name?: string;

    /**
     * @description
     * The secret used for signing the session cookies for authenticated users. Only applies
     * tokenMethod is set to 'cookie'.
     *
     * In production applications, this should not be stored as a string in
     * source control for security reasons, but may be loaded from an external
     * file not under source control, or from an environment variable, for example.
     *
     * @default (random character string)
     */
    secret?: string;

    /**
     * @description
     * a string indicating the path of the cookie.
     *
     * @default '/'
     */
    path?: string;

    /**
     * @description
     * a string indicating the domain of the cookie (no default).
     */
    domain?: string;

    /**
     * @description
     * a boolean or string indicating whether the cookie is a "same site" cookie (false by default). This can be set to 'strict',
     * 'lax', 'none', or true (which maps to 'strict').
     *
     * @default false
     */
    sameSite?: 'strict' | 'lax' | 'none' | boolean;

    /**
     * @description
     * a boolean indicating whether the cookie is only to be sent over HTTPS (false by default for HTTP, true by default for HTTPS).
     */
    secure?: boolean;

    /**
     * @description
     * a boolean indicating whether the cookie is only to be sent over HTTPS (use this if you handle SSL not in your node process).
     */
    secureProxy?: boolean;

    /**
     * @description
     * a boolean indicating whether the cookie is only to be sent over HTTP(S), and not made available to client JavaScript (true by default).
     *
     * @default true
     */
    httpOnly?: boolean;

    /**
     * @description
     * a boolean indicating whether the cookie is to be signed (true by default). If this is true, another cookie of the same name with the .sig
     * suffix appended will also be sent, with a 27-byte url-safe base64 SHA1 value representing the hash of cookie-name=cookie-value against the
     * first Keygrip key. This signature key is used to detect tampering the next time a cookie is received.
     */
    signed?: boolean;

    /**
     * @description
     * a boolean indicating whether to overwrite previously set cookies of the same name (true by default). If this is true, all cookies set during
     * the same request with the same name (regardless of path or domain) are filtered out of the Set-Cookie header when setting this cookie.
     */
    overwrite?: boolean;
}

export interface ApiOptions {
    /**
     * @description
     * Set the hostname of the server. If not set, the server will be available on localhost.
     *
     * @default ''
     */
    hostname?: string;
    /**
     * @description
     * Which port the CometX server should listen on.
     *
     * @default 3000
     */
    port: number;
    /**
     * @description
     * The path to the GraphQL API.
     *
     * @default 'api'
     */
    apiPath?: string;
    /**
     * @description
     * The playground config to the GraphQL API.
     *
     * @default false
     */
    apiPlayground?: boolean | any;
    /**
     * @description
     * The debug config to the GraphQL API.
     *
     * @default false
     */
    apiDebug?: boolean;
}

export interface SocialAuthOptions {
    name: string;
    clientID: string;
    clientSecret: string;
}

export interface AuthOptions {
    /**
     * @description
     * JWT(Json Web Token) made up of three parts, the header, the payload and the signature.
     * During the signing process, the algorithm take the header, the payload and the secret to create a unique signature
     * Since secret token play an important role for singature since third party don't have access for it.
     */
    jwtTokenSecret: string;
    /**
     * @description
     * Set Token Expiration
     */
    jwtTokenExpiry: string;
    /**
     * @description
     * Set Cookie Expiration for JWT token
     */
    jwtCookieExpiry: string;
    /**
     * @description
     * Sets the method by which the session token is delivered and read.
     *
     * * 'cookie': Upon login, a 'Set-Cookie' header will be returned to the client, setting a
     *   cookie containing the session token. A browser-based client (making requests with credentials)
     *   should automatically send the session cookie with each request.
     * * 'bearer': Upon login, the token is returned in the response and should be then stored by the
     *   client app. Each request should include the header `Authorization: Bearer <token>`.
     *
     * Note that if the bearer method is used, Cometx will automatically expose the configured
     * `authTokenHeaderKey` in the server's CORS configuration (adding `Access-Control-Expose-Headers: cometx-auth-token`
     * by default).
     *
     * it is possible to specify both methods as a tuple: `['cookie', 'bearer']`.
     *
     * @default 'cookie'
     */
    tokenMethod?: TokenMethod;
    /**
     * @description
     * Options related to the handling of cookies when using the 'cookie' tokenMethod.
     */
    cookieOptions?: CookieOptions;
    /**
     * @description
     * Sets the header property which will be used to send the auth token when using the 'bearer' method.
     *
     * @default 'cometx-auth-token'
     */
    authTokenHeaderKey?: string;
    /**
     * @description
     * Session duration, i.e. the time which must elapse from the last authenticated request
     * after which the user must re-authenticate.
     *
     * Expressed as a string describing a time span per
     * [zeit/ms](https://github.com/zeit/ms.js).  Eg: `60`, `'2 days'`, `'10h'`, `'7d'`
     *
     * @default '1y'
     */
    sessionDuration?: string | number;
    /**
     * @description
     * This strategy defines how sessions will be cached. By default, sessions are cached using a simple
     * in-memory caching strategy which is suitable for development and low-traffic, single-instance
     * deployments.
     *
     * @default InMemorySessionCacheStrategy
     */
    sessionCacheStrategy?: CacheStrategy;
    /**
     * @description
     * The "time to live" of a given item in the session cache. This determines the length of time (in seconds)
     * that a cache entry is kept before being considered "stale" and being replaced with fresh data
     * taken from the database.
     *
     * @default 300
     */
    sessionCacheTTL?: number;
    /**
     * @description
     * Determines whether new User accounts require verification of their email address.
     *
     * If set to "true", when registering via the `registerCustomerAccount` mutation, one should *not* set the
     * `password` property - doing so will result in an error. Instead, the password is set at a later stage
     * (once the email with the verification token has been opened) via the `verifyCustomerAccount` mutation.
     *
     * @default true
     */
    requireVerification?: boolean;
    /**
     * @description
     * Allows you to customize the way passwords are hashed when using the {@link NativeAuthenticationStrategy}.
     *
     * @default BcryptPasswordHashingStrategy
     * @since 1.3.0
     */
    passwordHashingStrategy?: PasswordHashingStrategy;
    /**
     * @description
     * Allows you to set a custom policy for passwords when using the {@link NativeAuthenticationStrategy}.
     * By default, it uses the {@link DefaultPasswordValidationStrategy}, which will impose a minimum length
     * of four characters. To improve security for production, you are encouraged to specify a more strict
     * policy, which you can do like this:
     *
     * @example
     * ```ts
     * {
     *   passwordValidationStrategy: new DefaultPasswordValidationStrategy({
     *     // Minimum eight characters, at least one letter and one number
     *     regexp: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
     *   }),
     * }
     */
    passwordValidationStrategy?: PasswordValidationStrategy;
}

export interface GraphQLOptions {
    /**
     * @description
     * To sort the schema lexicographically.
     *
     * @default false
     */
    sortSchema: boolean;
    /**
     * @description
     * The path where generated schema will be created.
     *
     * @default false
     */
    autoSchemaFile: string | boolean;
    /**
     * @description
     * Set buildSchemaOptions to resolve scalar type concrete data.
     *
     * @default false
     */
    buildSchemaOptions: BuildSchemaOptions;
    /**
     * @description
     * Set the CORS handling for the server. See the [express CORS docs](https://github.com/expressjs/cors#configuration-options).
     *
     * @default { origin: true, credentials: true }
     */
    cors: CorsOptions | boolean;

    context?: any;
    formatError?: any;
}

export interface CometXConfig {
    /**
     * @description
     * Nestjs Build-in Config Options including cache, validation, etc.
     */
    appConfig: ConfigModuleOptions;

    /**
     * @description
     * Configuration for Graphql APIs, including hostname, port, Graphql paths.
     */
    apiConfig: ApiOptions;

    /**
     * @description
     * Configuration for authorization.
     */
    authConfig: AuthOptions;

    /**
     * @description
     * Configures SocalAuthStrategy which defines how authentication is handled in the Shop API
     */
    socialAuthConfig: SocialAuthOptions;

    /**
     * @description
     * Configuration for the GraphQLModule Optons, including autoSchemaFile, buildSchemaOptions,
     * CORS settings.
     */
    graphqlConfig: GraphQLOptions;

    /**
     * @description
     * The connection used by Prisma to connect to the database.
     */
    dbConnection: string;

    /**
     * @description
     * Provide a logging service which implements the {@link CometX} interface.
     * Note that the logging of SQL queries is controlled separately by the
     * `dbConnectionOptions.logging` property.
     *
     * @default DefaultLogger
     */
    logger?: NSXLogger;
}
