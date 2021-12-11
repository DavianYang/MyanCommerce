import { MyanCommerceConfig } from '@/config/myancommerce';
import { DefaultLogger } from '@config/logger/default.logger';
import { LogLevel } from '@/config/logger/myancommerce.logger';

export const config: MyanCommerceConfig = {
    apiOptions: {
        port: 3000,
    },
    logger: new DefaultLogger({ level: LogLevel.Info, timestamp: false }),
};
