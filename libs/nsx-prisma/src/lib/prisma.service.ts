// @ts-nocheck
import {
    INestApplication,
    Injectable,
    OnModuleDestroy,
    OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
import { environment } from '@myancommerce/core';

@Injectable()
export class PrismaService
    extends PrismaClient
    implements OnModuleInit, OnModuleDestroy
{
    constructor(config: ConfigService) {
        super({
            datasources: {
                db: {
                    url: config.get('dbConnection'),
                },
            },
        });
    }

    async onModuleInit() {
        await this['$connect']();
    }

    async onModuleDestroy() {
        await this['$disconnect']();
    }

    async enableShutdownHooks(app: INestApplication) {
        this['$on']('beforeExit', async () => {
            await app.close();
        });
    }

    async cleanDatabase() {
        if (process.env['NODE_ENV'] === 'production') return;
        const models = Reflect.ownKeys(this).filter(key => key[0] !== '_');

        return Promise.all(models.map(modelKey => this[modelKey].deleteMany()));
    }
}
