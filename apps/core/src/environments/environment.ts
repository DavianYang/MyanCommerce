import * as dotenv from 'dotenv';
import { ConfigModuleOptions } from '@nestjs/config';
import { DefaultLogger } from '@myancommerce/nsx-logger';
import { LogLevel } from '@myancommerce/nsx-logger';
import {
    ApiOptions,
    AuthOptions,
    CometXConfig,
    GraphQLOptions,
    SocialAuthOptions,
} from './envrionment.interface';
import { AdministratorModule } from '@myancommerce/nsx-administrator';
import { CustomerModule } from '@myancommerce/nsx-customer';
import { UserModule } from '@myancommerce/nsx-user';
import { RoleModule } from '@myancommerce/nsx-role';
import { CountryModule } from '@myancommerce/nsx-country';
import { AuthModule } from '@myancommerce/nsx-auth';

dotenv.config({
    path: `apps/core/.env.${
        process.env['NODE_ENV'] === 'development'
            ? 'dev'
            : process.env['NODE_ENV'] === 'production'
            ? 'prod'
            : 'test'
    }`,
});

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

const socialAuthConfig: SocialAuthOptions = {
    name: 'google',
    clientID: process.env['CLIENT_ID'] as string,
    clientSecret: process.env['CLIENT_SECRET'] as string,
};

const authConfig: AuthOptions = {
    jwtTokenSecret: process.env['JWT_SECRET'] as string,
    jwtTokenExpiry: process.env['JWT_EXPIRE_IN'] as string,
    jwtCookieExpiry: process.env['JWT_COOKIE_EXPIRES_IN'] as string,
};

const graphqlConfig: GraphQLOptions = {
    sortSchema: true,
    autoSchemaFile: 'apps/core/src/schema.gql',
    buildSchemaOptions: {
        numberScalarMode: 'integer',
    },
    include: [
        AuthModule,
        AdministratorModule,
        CustomerModule,
        UserModule,
        RoleModule,
        CountryModule,
    ],
    cors: {
        credentials: true,
        origin: 'http://localhost:4200',
    },
};

export const environment: CometXConfig = {
    appConfig,
    apiConfig,
    authConfig,
    graphqlConfig,
    socialAuthConfig,
    dbConnection: process.env['DATABASE_URL'] as string,
    logger: new DefaultLogger({
        level: LogLevel.Info,
        timestamp: true,
        defaultContext: 'CometX Server',
    }),
};
