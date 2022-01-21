import { MyanCommerceConfig } from '@myancommerce/core';
import { getServer } from './server/servers';
import { TestDBServer, TestServerOptions } from './server/server.interface';
import { BaseConnectionOptions } from 'typeorm/connection/BaseConnectionOptions';

/**
 * @description
 * MyanCommerce Test server for e2e testing
 *
 * @docsCategory testing
 */
export class TestServer {
    public server: TestDBServer<BaseConnectionOptions>;

    constructor(private myancommerceConfig: Required<MyanCommerceConfig>) {}

    async init(options: TestServerOptions) {
        const { type } = this.myancommerceConfig.dbConnectionOptions;
        const { dbConnectionOptions } = this.myancommerceConfig;

        this.server = getServer(type);

        try {
            await this.server.init(
                this.myancommerceConfig,
                dbConnectionOptions,
            );
            await this.server.populate(options);
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    async destroy() {
        await this.server.destroy();
    }
}
