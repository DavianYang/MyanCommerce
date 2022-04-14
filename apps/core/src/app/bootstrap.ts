import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
const cookieSession = require('cookie-session');

import { Logger, NSXLogger } from '@myancommerce/nsx-logger';
import { AppModule } from './app.module';
import { environment } from '../environments/environment';

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
 *
 * bootstrap().catch(err => {
 *     console.log(err);
 * });
 * ```
 * @docsCategory
 * */

export async function bootstrap(): Promise<INestApplication> {
    Logger.useLogger(environment.logger as NSXLogger);
    Logger.info(`Bootstrapping MyanCommerce Server (pid: ${process.pid})...`);

    const { hostname, port } = environment.apiConfig;

    const app = await NestFactory.create(AppModule, { bufferLogs: true });

    app.useLogger(new Logger());

    const { tokenMethod } = environment.authConfig;

    if (
        tokenMethod === 'cookie' ||
        (Array.isArray(tokenMethod) && tokenMethod.includes('cookie'))
    ) {
        app.use(cookieSession(environment.authConfig.cookieOptions));
    }

    await app.listen(port, hostname || '');

    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }

    app.enableShutdownHooks();
    logWelcomeMessage();

    return app;
}

export function logWelcomeMessage() {
    let version: string;
    try {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        version = require('../../project.json').version;
    } catch (err) {
        version = 'unknown';
    }

    const { hostname, port, apiPath } = environment.apiConfig;

    const title = `MyanCommerce server (v${version} now running on http://${
        hostname || 'localhost'
    }:${port})`;

    const apiCliGreetings: Array<readonly [string, string]> = [];
    const pathToUrl = (path: string) =>
        `http://${hostname || 'localhost'}:${port}/${path}`;

    apiCliGreetings.push(['API', pathToUrl(apiPath as string)]);

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
