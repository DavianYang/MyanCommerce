import { ModuleRef } from '@nestjs/core';

import { PrismaService } from '@myancommerce/nsx-prisma';

import { Authentication, PrismaClient, User } from '@prisma/client';
import { AuthenticationStrategy } from './authentication.strategy.interface';
import { PasswordCipher } from '../helpers/password-cipher';

export const LOCAL_AUTH_STRATEGY_NAME = 'local';

export interface LocalAuthenticationData {
    emailAddress: string;
    password: string;
}

export class LocalAuthenticationStrategy
    implements AuthenticationStrategy<LocalAuthenticationData>
{
    readonly name = LOCAL_AUTH_STRATEGY_NAME;

    private prisma: PrismaClient;
    private passwordCipher: PasswordCipher;

    async init(moduleRef: ModuleRef) {
        this.prisma = moduleRef.get(PrismaService, { strict: false });
        this.passwordCipher = moduleRef.get(PasswordCipher, {
            strict: false,
        });
    }

    async authenticate(data: LocalAuthenticationData): Promise<User | false> {
        const user = await this.prisma.user.findUnique({
            where: { identifier: data.emailAddress },
            include: {
                authentication: true,
                roles: true,
            },
        });

        if (!user) return false;

        const authentication = user.authentication.find(
            (auth: Authentication) => auth.method === LOCAL_AUTH_STRATEGY_NAME,
        );

        if (
            !(await this.verifyPassword(
                authentication as Authentication,
                data.password,
            ))
        ) {
            return false;
        }

        return user;
    }

    async verifyPassword(
        authentication: Authentication,
        password: string,
    ): Promise<boolean> {
        return await this.passwordCipher.check(
            password,
            authentication?.passwordHash as string,
        );
    }
}
