import { MyanChatConfig } from '@config/myanchat.config';
import { DefaultLogger } from '@config/logger/default.logger';
import { LogLevel } from '@config/logger/myanchat.logger';

export const config: MyanChatConfig = {
    apiOptions: {
        port: 3000,
    },
    logger: new DefaultLogger({ level: LogLevel.Info, timestamp: false }),
};
