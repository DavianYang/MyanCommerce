import { MyanCommerceConfig } from '@myancommerce/core';
import { INestApplication, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { preBootstrapConfig } from 'apps/core/src/app/bootstrap';
import { DefaultLogger } from 'apps/core/src/config/logger/default.logger';

/**
 * @description
 * MyanCommerce Test server for e2e testing
 *
 * @docsCategory testing
 */
export class TestServer {
    public app: INestApplication;

    constructor(private myancommerceConfig: Required<MyanCommerceConfig>) {}

    async init() {
        await this.bootstrapForTesting(this.myancommerceConfig);
    }

    async destroy() {
        await new Promise(resolve => global.setTimeout(resolve, 500));
        await this.app.close();
    }

    async bootstrapForTesting(
        userConfig: Partial<MyanCommerceConfig>,
    ): Promise<INestApplication> {
        const config = await preBootstrapConfig(userConfig);

        const { AppModule } = await import('@myancommerce/core');

        try {
            DefaultLogger.hideNestBoostrapLogs();
            const app = await NestFactory.create(AppModule, {
                cors: config.apiOptions.cors,
                logger: new Logger(),
            });

            await app.listen(config.apiOptions.port);
            DefaultLogger.restoreOriginalLogLevel();

            return app;
        } catch (e) {
            Logger.warn(e);
            throw e;
        }
    }
}
