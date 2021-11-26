import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ConfigModule } from "@config/config.module";
import { ConfigService } from "@config/config.service";

@Module({
    imports: [
        ConfigModule
    ]
})
export class AppModule implements NestModule {
    constructor(private configService: ConfigService){}

    configure(consumer: MiddlewareConsumer) {
        
    }
}