import { MyanCommerceConfig } from '@myancommerce/core';
import { BaseConnectionOptions } from 'typeorm/connection/BaseConnectionOptions';

export interface TestDBServer<T extends BaseConnectionOptions> {
    init(testConfig: Partial<MyanCommerceConfig>, ConnectionOptions: T): void;

    populate(options: TestServerOptions): Promise<void>;

    destroy(): void | Promise<void>;
}

export interface TestServerOptions {
    customerCount?: number;
    adminCount?: number;
}
