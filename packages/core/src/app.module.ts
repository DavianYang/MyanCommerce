import { Module, NestModule } from "@nestjs/common";
import { ConfigModule } from "./config/config.module";

@Module({
    imports: [
        ConfigModule
    ]
})
export class AppModule implements NestModule {
    constructor(){}

    configure() {
        
    }
}