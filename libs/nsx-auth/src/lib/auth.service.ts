import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

import { UserService } from '@myancommerce/nsx-user';
import { ConfigService } from '@myancommerce/nsx-config';
import {
    InternalServerError,
    InvalidCredentialsError,
    NotVerifiedError,
} from '@myancommerce/nsx-error';

import { SessionService } from '@myancommerce/nsx-session';

@Injectable()
export class AuthService {
    constructor(
        private configService: ConfigService,
        @Inject(forwardRef(() => UserService))
        private userSerivce: UserService,
        private sessionService: SessionService,
    ) {}

    async authenticate(apiType: string, method: string, data: any) {
        const authenticationStrategy = this.getAuthStrategy(apiType, method);
        const result = await authenticationStrategy.authenticate(data);

        if (!result) return new InvalidCredentialsError();

        return await this.createAuthenticatedSessionForUser(
            result,
            result.authentication[0].method,
        );
    }

    async createAuthenticatedSessionForUser(
        user: User,
        authenticatedStrategyName: string,
    ) {
        if (
            this.configService.get('authConfig.requireVerification') &&
            !user.verified
        ) {
            throw new NotVerifiedError(); // return since i don't wanna error check in resolver
        }

        const updatedUser = await this.userSerivce.updateUser({
            where: { id: user.id },
            data: { lastLogin: new Date() },
        });

        const session = await this.sessionService.createNewAuthenticatedSession(
            updatedUser,
            authenticatedStrategyName,
        );

        return session;
    }

    getAuthStrategy(apiType: string, method: string) {
        const strategies =
            apiType === 'admin'
                ? this.configService.get(
                      'authConfig.adminAuthenticationStrategy',
                  )
                : this.configService.get(
                      'authConfig.shopAuthenticationStrategy',
                  );

        const match = strategies.find((s: any) => s.name === method);

        if (!match) {
            throw new InternalServerError({
                errorCode: 'error.unrecognized-authentication-strategy',
                variables: { name: method },
                message: 'Unrecognized Authentication Strategy',
            });
        }

        return match;
    }

    // async login(
    //     identifier: string,
    // ): Promise<
    //     | { user: User & { roles: Role[] }; token: string }
    //     | UnauthorizedException
    // > {
    //     // if email and password are invalid

    //     const roleInclude = Prisma.validator<Prisma.UserInclude>()({
    //         roles: true,
    //     });

    //     const user = await this.userSerivce.findOne({
    //         where: { identifier },
    //         include: roleInclude,
    //     });

    //     // Compare Password and password hash

    //     if (!user) {
    //         return new UnauthorizedException();
    //     }

    //     const token = this.signJWTToken(user as unknown as UserDto);

    //     await this.rediService.set('jwt_token', token);

    //     return {
    //         user,
    //         token,
    //     };
    // }

    // signJWTToken(user: UserDto): string {
    //     const { identifier, roles } = user;

    //     const rolesCode = roles.map(role => role.code);

    //     // setCookies for jwt Token

    //     return this.jwtService.sign({ identifier, rolesCode });
    // }
}
