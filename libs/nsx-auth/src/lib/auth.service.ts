import { PrismaService } from '@myancommerce/nsx-prisma';
import { UserDto, UserService } from '@myancommerce/nsx-user';

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private prismaService: PrismaService,
        private jwtService: JwtService,
        private userSerivce: UserService,
    ) {}

    async login(identifier: string): Promise<any> {
        // if email and password are invalid

        const user = await this.userSerivce.findOne(this.prismaService, {
            where: { identifier },
            include: {
                roles: true,
            },
        });

        // if user password doesn't match with input password

        if (!user) {
            return new UnauthorizedException();
        }

        const token = this.prepareToken(user as UserDto);

        return {
            id: user.id,
            identifier: user.identifier,
            token, // remove after adding chache
        };
    }

    // async loginSocial();

    async getAuthUser(identifier: string) {
        const user = await this.userSerivce.findOne(this.prismaService, {
            where: { identifier },
            include: {
                roles: true,
            },
        });

        return user;
    }

    prepareToken(user: UserDto): string {
        const { identifier, roles } = user;

        const rolesCode = roles.map(role => role.code);

        return this.jwtService.sign({ identifier, rolesCode });
    }
}
