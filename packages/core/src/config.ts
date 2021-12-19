import path from 'path';
import * as dotenv from 'dotenv';
import { MyanCommerceConfig } from './config/myancommerce';
import { DefaultLogger } from './config/logger/default.logger';
import { LogLevel } from './config/logger/myancommerce.logger';

dotenv.config({ path: __dirname + `./.env.${process.env.NODE_ENV}` });

export const config: MyanCommerceConfig = {
    apiOptions: {
        port: 3000,
    },
    dbConnectionOptions: {
        type: 'postgres',
        synchronize: true, // turn off for production
        logging: false,
        database: process.env.DATABASE_NAME,
        host: process.env.DATABASE_HOST,
        port: 5433,
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        migrations: [path.join(__dirname, '../migrations/*.ts')],
    },
    logger: new DefaultLogger({ level: LogLevel.Info, timestamp: false }),
};
