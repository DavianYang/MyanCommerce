import { RuntimeMyanCommerceConfig } from './config.interface';
import { DefaultLogger } from '../logger/default.logger';

/**
 * @description
 * The default configuration settings which are used if not explicitly overridden in the bootstrap() call.
 *
 * @docsCategory configuration
 */
export const defaultConfig: RuntimeMyanCommerceConfig = {
    logger: new DefaultLogger(),
    apiOptions: {
        hostname: '',
        port: 3000,
        adminApiPath: 'admin-api',
        adminApiPlayground: false,
        adminApiDebug: false,
        adminListQueryLimit: 1000,
        shopApiPath: 'shop-api',
        shopApiPlayground: false,
        shopApiDebug: false,
        shopListQueryLimit: 100,
        channelTokenKey: 'myancommerce-token',
        cors: {
            origin: true,
            credentials: true,
        },
        middleware: [],
    },
    dbConnectionOptions: {
        type: 'postgres',
    },
};
