import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { User, Prisma } from '@prisma/client';

import { ConfigService } from '@myancommerce/nsx-config';
import { RoleService, RoleDto } from '@myancommerce/nsx-role';
import { PrismaService } from '@myancommerce/nsx-prisma';
import { ID } from '@myancommerce/nox-common';
import {
    PasswordCipher,
    VerificationTokenGeneration,
} from '@myancommerce/nsx-auth';
import {
    isGraphQlErrorResult,
    PasswordValidationError,
    VerificationTokenInvalidError,
    VerificationTokenExpired,
    PasswordAlreadySetError,
    MissingPasswordError,
} from '@myancommerce/nsx-error';

@Injectable()
export class UserService {
    constructor(
        private readonly configService: ConfigService,
        private readonly prisma: PrismaService,
        private roleService: RoleService,
        @Inject(forwardRef(() => PasswordCipher))
        private passwordCipher: PasswordCipher,
        @Inject(forwardRef(() => VerificationTokenGeneration))
        private verificationTokenGeneration: VerificationTokenGeneration,
    ) {}

    async findOne(args: Prisma.UserFindUniqueArgs) {
        return this.prisma.user.findUnique(args);
    }

    async findMany(args: Prisma.UserFindManyArgs): Promise<User[]> {
        return this.prisma.user.findMany(args);
    }

    async create(identifier: string, role: RoleDto) {
        return await this.prisma.user.create({
            data: {
                identifier,
                verified: this.configService.get(
                    'authConfig.requireVerification',
                )
                    ? false
                    : true,
                roles: {
                    connect: {
                        id: role.id,
                    },
                },
            },
        });
    }

    async createCustomerUser(
        identifier: string,
        password: string | null,
    ): Promise<User | PasswordValidationError> {
        const customerRole = await this.roleService.getCustomerRole();

        const user = await this.create(identifier, customerRole);

        const result = await this.addAuthentication(
            identifier,
            password,
            user.id,
        );

        if (isGraphQlErrorResult(result)) {
            return result;
        }

        return user;
    }

    async createAdminUser(
        identifier: string,
        password: string | null,
    ): Promise<User | PasswordValidationError> {
        const adminRole = await this.roleService.getAdminRole();

        const user = await this.create(identifier, adminRole);

        const result = await this.addAuthentication(
            identifier,
            password,
            user.id,
        );

        if (isGraphQlErrorResult(result)) {
            return result;
        }

        return user;
    }

    async updateUser(args: Prisma.UserUpdateArgs): Promise<User> {
        return this.prisma.user.update(args);
    }

    async deleteUser(args: Prisma.UserDeleteArgs): Promise<User> {
        return this.prisma.user.delete(args);
    }

    async softDelete(userId: ID) {
        await this.prisma.user.update({
            where: { id: userId as string },
            data: {
                deletedAt: new Date(),
            },
        });
    }
}
