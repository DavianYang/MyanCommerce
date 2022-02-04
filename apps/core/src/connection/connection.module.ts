import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@myancommerce/nsx-config';
import { TransactionalConnection } from './transactional-connection';

let defaultTypeOrmModule: DynamicModule;

@Module({
    imports: [ConfigModule],
    providers: [TransactionalConnection],
    exports: [TransactionalConnection],
})
export class ConnectionModule {
    static forRoot(): DynamicModule {
        if (!defaultTypeOrmModule) {
            defaultTypeOrmModule = TypeOrmModule.forRootAsync({
                imports: [ConfigModule],
                useFactory: (configService: ConfigService) => {
                    const { dbConnectionOptions } = configService;

                    return {
                        ...dbConnectionOptions,
                    };
                },
                inject: [ConfigService],
            });
        }

        return {
            module: ConnectionModule,
            imports: [defaultTypeOrmModule],
        };
    }
}
