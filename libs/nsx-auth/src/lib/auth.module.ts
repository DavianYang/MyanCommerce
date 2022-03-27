import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { PrismaModule } from '@myancommerce/nsx-prisma';
import { UserModule } from '@myancommerce/nsx-user';

import { AuthService } from './auth.service';
import { AdminAuthResolver } from './auth.admin.resolver';
import { ShopAuthResolver } from './auth.shop.resolver';
import { JWTStrategy } from './strategy/jwt.strategy';
import { GoogleStrategy } from './strategy/google.strategy';
import { RedisCacheModule } from '@myancommerce/nsx-redis';

@Module({
    providers: [
        AuthService,
        AdminAuthResolver,
        ShopAuthResolver,
        JWTStrategy,
        GoogleStrategy,
    ],
    imports: [
        ConfigModule,
        UserModule,
        PrismaModule,
        RedisCacheModule,
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => {
                const secret = configService.get('authConfig.jwtTokenSecret');

                const expiresIn = configService.get(
                    'authConfig.jwtTokenExpiry',
                );

                return {
                    secret: secret,
                    signOptions: { expiresIn },
                };
            },
            inject: [ConfigService],
        }),
    ],
    exports: [AuthService],
})
export class AuthModule {}
