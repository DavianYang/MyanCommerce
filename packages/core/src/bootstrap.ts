import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { Logger } from '@config/logger/myanchat.logger'
import { MyanChatConfig, RuntimeMyanChatConfig } from '@config/myanchat.config';
import { setConfig, getConfig } from '@config/config-helpers';
import { DefaultLogger } from '@/config/logger/default.logger';

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

    return app;
}

/**
 * Setting the global config must be done prior to loading the AppModule.
 */
export async function preBootstrapConfig(userConfig: Partial<MyanChatConfig>): Promise<Readonly<RuntimeMyanChatConfig>> {
    if (userConfig){
        setConfig(userConfig);
    }
    
    let config = getConfig();

    return config;
}