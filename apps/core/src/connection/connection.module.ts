import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';

let defaultTypeOrmModule: DynamicModule;

@Module({
    imports: [ConfigModule],
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
