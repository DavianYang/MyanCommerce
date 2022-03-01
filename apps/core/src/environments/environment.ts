import * as dotenv from 'dotenv';
import { ConfigModuleOptions } from '@nestjs/config';
import { DefaultLogger } from '@myancommerce/nsx-logger';
import { LogLevel } from '@myancommerce/nsx-logger';
import {
    ApiOptions,
    CometXConfig,
    GraphQLOptions,
} from './envrionment.interface';

dotenv.config({ path: __dirname + `./.env` });

const appConfig: ConfigModuleOptions = {
    isGlobal: true,
};

const apiConfig: ApiOptions = {
    hostname: process.env['DATABASE_HOST'],
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
};

export const environment: CometXConfig = {
    appConfig,
    apiConfig,
    graphqlConfig,
    logger: new DefaultLogger({
        level: LogLevel.Info,
        timestamp: true,
        defaultContext: 'CometX Server',
    }),
};
