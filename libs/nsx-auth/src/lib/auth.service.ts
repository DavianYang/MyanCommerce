import { JwtService } from '@nestjs/jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { UserDto, UserService } from '@myancommerce/nsx-user';
import { RedisCacheService } from '@myancommerce/nsx-redis';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private userSerivce: UserService,
        private rediService: RedisCacheService,
    ) {}

    async login(identifier: string): Promise<any> {
        // if email and password are invalid

        const user = await this.userSerivce.findOne({
            where: { identifier },
            include: {
                roles: true,
            },
        });

        console.log(user);

        // if user password doesn't match with input password

        if (!user) {
            return new UnauthorizedException();
        }

        const token = this.prepareToken(user as UserDto);

        await this.rediService.set('jwt_token', token);

        return {
            id: user.id,
            identifier: user.identifier,
            token, // remove after adding cache
        };
    }

    // async loginSocial();

    async getAuthUser(identifier: string) {
        const user = await this.userSerivce.findOne({
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
