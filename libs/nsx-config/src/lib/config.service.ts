import { Injectable } from '@nestjs/common';
import { ConnectionOptions } from 'typeorm';
import { getConfig } from './config.helpers';
import { NSXLogger } from '@myancommerce/nsx-logger';
import {
    ApiOptions,
    MyanCommerceConfig,
    RuntimeMyanCommerceConfig,
} from './config.interface';

@Injectable()
export class ConfigService implements MyanCommerceConfig {
    private activeConfig: RuntimeMyanCommerceConfig;

    constructor() {
        this.activeConfig = getConfig();
    }

    get apiOptions(): Required<ApiOptions> {
        return this.activeConfig.apiOptions;
    }

    get logger(): NSXLogger {
        return this.activeConfig.logger;
    }

    get dbConnectionOptions(): ConnectionOptions {
        return this.activeConfig.dbConnectionOptions;
    }
}
