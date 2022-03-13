import { Args, Mutation, Resolver, Query, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { UserDto, UserEntity, UserService } from '@myancommerce/nsx-user';
import { RequestContext } from '@myancommerce/nox-common';

import { AuthService } from './auth.service';
import { GqlAuthGuard } from './guard/gql-auth.guard';
import { AuthenticationResult } from './result/authentication.result';
import { AuthUserResponse } from './response/auth-user.response';

@Resolver()
export class AdminAuthResolver {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
    ) {}

    @Query(() => UserDto)
    @UseGuards(GqlAuthGuard)
    async me(
        @Context() { prisma }: RequestContext,
        @UserEntity() user: UserDto,
    ) {
        return this.userService.findOne(prisma, {
            where: { identifier: user.identifier },
        });
    }

    @Mutation(() => AuthenticationResult)
    async login(
        @Args('identifier', { type: () => String }) identifier: any,
    ): Promise<typeof AuthenticationResult> {
        const result = await this.authService.login(identifier);
        return new AuthUserResponse(result);
    }
}
