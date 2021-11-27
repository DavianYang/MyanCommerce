import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { Logger } from '@config/logger/myanchat.logger'
import { MyanChatConfig, RuntimeMyanChatConfig } from '@config/myanchat.config';
import { setConfig, getConfig } from '@config/config-helpers';
import { DefaultLogger } from '@config/logger/default.logger';

export type MyanChatBootstrapFunction = (config: JSON) => Promise<INestApplication>

/**
 * @description
 * Bootstraps the MyanChat server. This is the entry point to the application.
 *
 * @example
 * ```TypeScript
 * import { bootstrap } from '\@myanchat/core';
 * import { config } from './myanchat-config';
 *
 * bootstrap(config).catch(err => {
 *     console.log(err);
 * });
 * ```
 * @docsCategory
 * */

export async function bootstrap(userConfig: Partial<MyanChatConfig>): Promise<INestApplication> {
    const config = await preBootstrapConfig(userConfig);

    Logger.useLogger(config.logger);
    Logger.info(`Bootstrapping Vendure Server (pid: ${process.pid})...`)

    
    // tslint:disable-next-line:whitespace
    const { AppModule } = await import('./app.module')

    const {hostname, port} = config.apiOptions;

    DefaultLogger.hideNestBoostrapLogs()
    
    const app = await NestFactory.create(AppModule, {logger: new Logger()})
    DefaultLogger.restoreOriginalLogLevel()
    app.useLogger(new Logger())

    await app.listen(port, hostname || '')
    app.enableShutdownHooks()
    logWelcomeMessage(config)
    return app;
}

/**
 * Setting the global config must be done prior to loading the AppModule.
 */
export async function preBootstrapConfig(userConfig: Partial<MyanChatConfig>): Promise<Readonly<RuntimeMyanChatConfig>> {
    if (userConfig){
        setConfig(userConfig);
    }
    
    const config = getConfig();

    return config;
}

function logWelcomeMessage(config: RuntimeMyanChatConfig){
    let version: string;
    try {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        version = require('../package.json').version;
    } catch (err) {
        version = 'unknown'
    }

    const {hostname, port} = config.apiOptions;

    const title = `MyanChat server (v${version} now running on http://${hostname || 'localhost'}:${port})`;
    Logger.info(title.padStart(title.length));
}
