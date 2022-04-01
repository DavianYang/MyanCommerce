import { forwardRef, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { PrismaModule } from '@myancommerce/nsx-prisma';
import { UserModule } from '@myancommerce/nsx-user';
import { RedisCacheModule } from '@myancommerce/nsx-redis';

import { AuthService } from './auth.service';
import { AdminAuthResolver } from './auth.admin.resolver';
import { JWTStrategy } from './strategy/jwt.strategy';
import { GoogleStrategy } from './strategy/google.strategy';
import { PasswordCipher } from './helpers/password-cipher';

@Module({
    providers: [
        AuthService,
        PasswordCipher,
        AdminAuthResolver,
        JWTStrategy,
        GoogleStrategy,
    ],
    imports: [
        ConfigModule,
        forwardRef(() => UserModule),
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
    exports: [AuthService, PasswordCipher],
})
export class AuthModule {}
