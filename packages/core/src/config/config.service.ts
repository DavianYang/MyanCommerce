import { Injectable } from '@nestjs/common';
import { getConfig } from './config-helpers';
import { MyanCommerceLogger } from './logger/myancommerce.logger';
import {
    ApiOptions,
    MyanCommerceConfig,
    RuntimeMyanCommerceConfig,
} from './myancommerce';

@Injectable()
export class ConfigService implements MyanCommerceConfig {
    private activeConfig: RuntimeMyanCommerceConfig;

    constructor() {
        this.activeConfig = getConfig();
    }

    get apiOptions(): Required<ApiOptions> {
        return this.activeConfig.apiOptions;
    }

    get logger(): MyanCommerceLogger {
        return this.activeConfig.logger;
    }
}
