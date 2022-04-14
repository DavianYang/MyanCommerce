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

    async createCustomerUser(identifier: string): Promise<User> {
        const customerRole = await this.roleService.getCustomerRole();
        return this.prisma.user.create({
            data: {
                identifier,
                roles: {
                    connect: {
                        id: customerRole.id,
                    },
                },
            },
        });
    }

    async createAdminUser(identifier: string): Promise<User> {
        const adminRole = await this.roleService.getAdminRole();

        return this.prisma.user.create({
            data: {
                identifier,
                roles: {
                    connect: {
                        id: adminRole.id,
                    },
                },
            },
        });
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
