import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Type } from '@myancommerce/common/dist/shared-types';
import { Logger } from './config/logger/myancommerce.logger';
import {
    MyanCommerceConfig,
    RuntimeMyanCommerceConfig,
} from './config/myancommerce';
import { setConfig, getConfig } from './config/config-helpers';
import { coreEntitiesMap } from './entity/entity';

export type MyanCommerceBootstrapFunction = (
    config: JSON,
) => Promise<INestApplication>;

declare const module: any;

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

    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }

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

    const entities = await getAllEntities();

    setConfig({
        dbConnectionOptions: {
            entities,
        },
    });

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

    const { hostname, port, shopApiPath, adminApiPath } = config.apiOptions;

    const title = `MyanCommerce server (v${version} now running on http://${
        hostname || 'localhost'
    }:${port})`;

    const apiCliGreetings: Array<readonly [string, string]> = [];
    const pathToUrl = (path: string) =>
        `http://${hostname || 'localhost'}:${port}/${path}`;
    apiCliGreetings.push(['Shop API', pathToUrl(shopApiPath)]);
    apiCliGreetings.push(['Admin API', pathToUrl(adminApiPath)]);

    const columnGreetings = arrageCliGreetingInColumns(apiCliGreetings);

    const maxLineLength = Math.max(
        title.length,
        ...columnGreetings.map(l => l.length),
    );
    const titlePadLength =
        title.length < maxLineLength
            ? Math.floor((maxLineLength - title.length) / 2)
            : 0;

    Logger.info(`=`.repeat(maxLineLength));
    Logger.info(title.padStart(title.length + titlePadLength));
    Logger.info('-'.repeat(maxLineLength).padStart(titlePadLength));
    columnGreetings.forEach(line => Logger.info(line));
    Logger.info(`=`.repeat(maxLineLength));
}

function arrageCliGreetingInColumns(
    lines: Array<readonly [string, string]>,
): string[] {
    const columnWidth = Math.max(...lines.map(l => l[0].length)) + 2;
    return lines.map(l => `${(l[0] + ':').padEnd(columnWidth)}${l[1]}`);
}

/**
 * Returns an array of core entities and any additional entities defined in plugins.
 */
export async function getAllEntities(): Promise<Array<Type<any>>> {
    const coreEntities = Object.values(coreEntitiesMap) as Array<Type<any>>;

    const allEntities: Array<Type<any>> = coreEntities;

    return allEntities;
}
