import path from 'path';
import * as dotenv from 'dotenv';
import { ConnectionOptions } from 'typeorm';
import { mergeConfig, MyanCommerceConfig } from '@myancommerce/nsx-config';
import { LogLevel, DefaultLogger } from '@myancommerce/nsx-logger';
import { registerServer, PostgresServer } from '@myancommerce/testing';

dotenv.config({ path: __dirname + `./.env.test}` });

registerServer('postgres', new PostgresServer());

export const testConfig = () => {
    return mergeConfig(defaultTestConfig, {
        dbConnectionOptions: getDbConfig(),
    });
};

const getDbConfig = (): ConnectionOptions => {
    const dbType = process.env['DATABASE_TYPE'] || 'postgres';
    switch (dbType) {
        case 'postgres':
            return {
                type: 'postgres',
                synchronize: true,
                database: process.env['DATABASE_NAME'],
                host: process.env['DATABASE_HOST'],
                port: process.env['CI']
                    ? +(process.env['E2E_POSTGRES_PORT'] || 5433)
                    : 5433,
                username: process.env['DATABASE_USER'],
                password: process.env['DATABASE_PASSWORD'],
            };

        default:
            return defaultTestConfig.dbConnectionOptions;
    }
};

const defaultTestConfig: Required<MyanCommerceConfig> = {
    apiOptions: {
        port: 3500,
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
        logging: false,
        synchronize: true,
        database: process.env['DATABASE_NAME'],
        host: process.env['DATABASE_HOST'],
        port: 5433,
        username: process.env['DATABASE_USER'],
        password: process.env['DATABASE_PASSWORD'],
        migrations: [path.join(__dirname, '../migrations/*.ts')],
    },
    logger: new DefaultLogger({ level: LogLevel.Info, timestamp: false }),
};
