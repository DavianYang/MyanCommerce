import { NSXLogger } from '@myancommerce/nsx-logger';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { ConfigModuleOptions } from '@nestjs/config';
import { BuildSchemaOptions } from '@nestjs/graphql';

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
     * The path to the admin GraphQL API.
     *
     * @default 'admin-api'
     */
    adminApiPath?: string;
    /**
     * @description
     * The path to the shop GraphQL API.
     *
     * @default 'shop-api'
     */
    shopApiPath?: string;
    /**
     * @description
     * The playground config to the admin GraphQL API.
     *
     * @default false
     */
    adminApiPlayground?: boolean | any;
    /**
     * @description
     * The playground config to the shop GraphQL API.
     *
     * @default false
     */
    shopApiPlayground?: boolean | any;
    /**
     * @description
     * The debug config to the admin GraphQL API.
     *
     * @default false
     */
    adminApiDebug?: boolean;
    /**
     * @description
     * The debug config to the shop GraphQL API.
     *
     * @default false
     */
    shopApiDebug?: boolean;
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
     * Configuration for the GraphQLModule Optons, including autoSchemaFile, buildSchemaOptions,
     * CORS settings.
     */
    graphqlConfig: GraphQLOptions;

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
