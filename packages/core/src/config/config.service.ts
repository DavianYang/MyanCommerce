import { Injectable } from '@nestjs/common';
import { getConfig } from './config-helpers';
import { MyanChatLogger } from './logger/myanchat.logger';
import {
    ApiOptions,
    MyanChatConfig,
    RuntimeMyanChatConfig,
} from './myanchat.config';

@Injectable()
export class ConfigService implements MyanChatConfig {
    private activeConfig: RuntimeMyanChatConfig;

    constructor() {
        this.activeConfig = getConfig();
    }

    get apiOptions(): Required<ApiOptions> {
        return this.activeConfig.apiOptions;
    }

    get logger(): MyanChatLogger {
        return this.activeConfig.logger;
    }
}
