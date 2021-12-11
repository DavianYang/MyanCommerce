import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { Middleware } from '@common/types/common.types';
import { MyanCommerceLogger } from './logger/myancommerce.logger';
import { Type } from '@myancommerce/common/dist/shared-types';

/**
 * @description
 * The ApiOptions define how the MyanCommerce GraphQL APIs are exposed, as well as allowing the API layer
 * to be extended with middleware.
 *
 * @docsCategory configuration
 */
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
     * Which port the MyanCommerce server should listen on.
     *
     * @default 3000
     */
    port: number;
    /**
     * @description
     * The name of the property which contains the token of the
     * active channel. This property can be included either in
     * the request header or as a query string.
     *
     * @default 'myancommerce-token'
     */
    channelTokenKey?: string;
    /**
     * @description
     * Set the CORS handling for the server. See the [express CORS docs](https://github.com/expressjs/cors#configuration-options).
     *
     * @default { origin: true, credentials: true }
     */
    cors?: boolean | CorsOptions;
    /**
     * @description
     * Custom Express or NestJS middleware for the server.
     *
     * @default []
     */
    middleware?: Middleware[];
}

/**
 * @description
 * All possible configuration options are defined by the
 *
 * @docsCategory configuration
 * */
export interface MyanCommerceConfig {
    /**
     * @description
     * Configuration for the GraphQL APIs, including hostname, port, CORS settings,
     * middleware etc.
     */
    apiOptions: ApiOptions;
    /**
     * @description
     * Provide a logging service which implements the {@link MyanCommerceLogger} interface.
     * Note that the logging of SQL queries is controlled separately by the
     * `dbConnectionOptions.logging` property.
     *
     * @default DefaultLogger
     */
    logger?: MyanCommerceLogger;
}

export interface RuntimeMyanCommerceConfig
    extends Required<MyanCommerceConfig> {
    apiOptions: Required<ApiOptions>;
}

type DeepPartialSimple<T> = {
    [P in keyof T]?:
        | null
        | (T[P] extends Array<infer U>
              ? Array<DeepPartialSimple<U>>
              : T[P] extends ReadonlyArray<infer X>
              ? ReadonlyArray<DeepPartialSimple<X>>
              : T[P] extends Type<any>
              ? T[P]
              : DeepPartialSimple<T[P]>);
};

export type PartialMyanCommerceConfig = DeepPartialSimple<MyanCommerceConfig>;