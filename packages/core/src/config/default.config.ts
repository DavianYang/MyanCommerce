import { RuntimeMyanChatConfig } from "./myanchat.config";
import { DefaultLogger } from "./logger/default.logger";

/**
 * @description
 * The default configuration settings which are used if not explicitly overridden in the bootstrap() call.
 *
 * @docsCategory configuration
 */
 export const defaultConfig: RuntimeMyanChatConfig = {
    logger: new DefaultLogger(),
    apiOptions: {
        hostname: '',
        port: 3000,
        channelTokenKey: 'myanchat-token',
        cors: {
            origin: true,
            credentials: true,
        },
        middleware: [],
    }
};