import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { Logger } from '@/config/logger/myancommerce.logger';
import {
    MyanCommerceConfig,
    RuntimeMyanCommerceConfig,
} from '@config/myancommerce';
import { setConfig, getConfig } from '@config/config-helpers';

export type MyanCommerceBootstrapFunction = (
    config: JSON,
) => Promise<INestApplication>;

/**
 * @description
 * Bootstraps the MyanCommerce server. This is the entry point to the application.
 *
 * @example
 * ```TypeScript
 * import { bootstrap } from '@myancommerce/core';
 * import { config } from './myancommerce-config';
 *
 * bootstrap(config).catch(err => {
 *     console.log(err);
 * });
 * ```
 * @docsCategory
 * */

export async function bootstrap(
    userConfig: Partial<MyanCommerceConfig>,
): Promise<INestApplication> {
    const config = await preBootstrapConfig(userConfig);

    Logger.useLogger(config.logger);
    Logger.info(`Bootstrapping Vendure Server (pid: ${process.pid})...`);

    // tslint:disable-next-line:whitespace
    const { AppModule } = await import('./app.module');

    const { hostname, port } = config.apiOptions;

    const app = await NestFactory.create(AppModule, { logger: new Logger() });

    app.useLogger(new Logger());

    await app.listen(port, hostname || '');
    app.enableShutdownHooks();
    logWelcomeMessage(config);
    return app;
}

/**
 * Setting the global config must be done prior to loading the AppModule.
 */
export async function preBootstrapConfig(
    userConfig: Partial<MyanCommerceConfig>,
): Promise<Readonly<RuntimeMyanCommerceConfig>> {
    if (userConfig) {
        setConfig(userConfig);
    }

    const config = getConfig();

    return config;
}

function logWelcomeMessage(config: RuntimeMyanCommerceConfig) {
    let version: string;
    try {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        version = require('../package.json').version;
    } catch (err) {
        version = 'unknown';
    }

    const { hostname, port } = config.apiOptions;

    const title = `MyanCommerce server (v${version} now running on http://${
        hostname || 'localhost'
    }:${port})`;
    Logger.info(title.padStart(title.length));
}
