import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { ConfigModuleOptions } from '@nestjs/config';
import { BuildSchemaOptions } from '@nestjs/graphql';

import {
    PasswordHashingStrategy,
    PasswordValidationStrategy,
} from '@myancommerce/nsx-auth';
import { NSXLogger } from '@myancommerce/nsx-logger';

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
