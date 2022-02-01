import {
    logWelcomeMessage,
    MyanCommerceConfig,
    preBootstrapConfig,
} from '@myancommerce/core';
import { INestApplication, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Client } from 'pg';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { populateForTesting } from '../population/populate-for-testing';
import { TestDBServer, TestServerOptions } from './server.interface';

export class PostgresServer implements TestDBServer<PostgresConnectionOptions> {
    private app: INestApplication;
    private client: Client;

    async init(
        testConfig: Partial<MyanCommerceConfig>,
        connectionOptions: PostgresConnectionOptions,
    ) {
        const dbName = 'testcommerce';
        (connectionOptions as any).database = dbName;
        (connectionOptions as any).synchronize = true;

        this.client = await this.initConnection(connectionOptions);

        await this.renewDatabase(dbName);

        this.app = await this.bootstrapForTesting(testConfig);
    }

    async populate(options: TestServerOptions) {
        await populateForTesting(this.app, options);

        this.client.end();
    }

    async destroy() {
        await new Promise(resolve => global.setTimeout(resolve, 500));
        await this.app.close();
    }

    private async initConnection(connectionOptions: PostgresConnectionOptions) {
        const client = new Client({
            host: connectionOptions.host,
            port: connectionOptions.port,
            user: connectionOptions.username,
            password: connectionOptions.password,
            database: 'postgres',
        });
        await client.connect();

        return client;
    }

    private async renewDatabase(dbName: string) {
        await this.client.query(
            `REVOKE CONNECT ON DATABASE ${dbName} FROM public;`,
        );
        await this.client
            .query(`SELECT pg_terminate_backend(pg_stat_activity.pid)
        FROM pg_stat_activity
        WHERE pg_stat_activity.datname = '${dbName}';`);
        await this.client.query(`DROP DATABASE IF EXISTS ${dbName};`);
        await this.client.query(`CREATE DATABASE ${dbName};`);
    }

    private async bootstrapForTesting(
        testConfig: Partial<MyanCommerceConfig>,
    ): Promise<INestApplication> {
        const config = await preBootstrapConfig(testConfig);

        const { AppModule } = await import('@myancommerce/core');
        const { hostname, port, cors } = config.apiOptions;

        try {
            const app = await NestFactory.create(AppModule, {
                cors: cors,
                logger: new Logger(),
            });

            await app.listen(port, hostname || '');

            logWelcomeMessage(config);

            return app;
        } catch (e) {
            Logger.warn(e);
            throw e;
        }
    }
}
