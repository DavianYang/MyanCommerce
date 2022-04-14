import { APP_GUARD } from '@nestjs/core';
import { forwardRef, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { ConfigModule, ConfigService } from '@myancommerce/nsx-config';
import { PrismaModule } from '@myancommerce/nsx-prisma';
import { UserModule } from '@myancommerce/nsx-user';
import { SessionModule } from '@myancommerce/nsx-session';

import { AuthService } from './auth.service';
import { AdminAuthResolver } from './admin.auth.resolver';
import { JWTStrategy } from './strategy/jwt.strategy';
import { GoogleStrategy } from './strategy/google.strategy';
import { PasswordCipher } from './helpers/password-cipher';
import { VerificationTokenGeneration } from './helpers/verification-token-generation';
import { BaseAuthResolver } from './base.auth.resolver';
import { AuthGuard } from './guard/auth.guard';

@Module({
    providers: [
        {
            provide: APP_GUARD,
            useClass: AuthGuard,
        },
        AuthService,
        BaseAuthResolver,
        AdminAuthResolver,
        JWTStrategy,
        GoogleStrategy,
        PasswordCipher,
        VerificationTokenGeneration,
    ],
    imports: [
        ConfigModule,
        forwardRef(() => UserModule),
        PrismaModule,
        SessionModule,
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
    exports: [
        BaseAuthResolver,
        AuthService,
        PasswordCipher,
        VerificationTokenGeneration,
    ],
})
export class AuthModule {}
