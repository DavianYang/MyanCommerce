import path from 'path';
import * as dotenv from 'dotenv';
import { DefaultLogger } from '@myancommerce/nsx-logger';
import { LogLevel } from '@myancommerce/nsx-logger';
import { MyanCommerceConfig } from '@myancommerce/nsx-config';

dotenv.config({ path: __dirname + `./.env` });

export const config: MyanCommerceConfig = {
    apiOptions: {
        port: 3000,
        adminApiPath: 'admin-api',
        adminApiPlayground: true, // turn this off for production
        adminApiDebug: true, // turn this off for production
        shopApiPath: 'shop-api',
        shopApiPlayground: {
            settings: {
                'request.credentials': 'include',
            } as any,
        }, // turn this off for production
        shopApiDebug: true, // turn this off for production
    },
    dbConnectionOptions: {
        type: 'postgres',
        synchronize: true, // turn off for production
        logging: false,
        database: process.env['DATABASE_NAME'],
        host: process.env['DATABASE_HOST'],
        port: 5433,
        username: process.env['DATABASE_USER'],
        password: process.env['DATABASE_PASSWORD'],
        migrations: [path.join(__dirname, '../migrations/*.ts')],
    },
    logger: new DefaultLogger({
        level: LogLevel.Info,
        timestamp: true,
        defaultContext: 'MyanCommerce Server',
    }),
};
