import { Query, Mutation, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { Input, SocialProfile } from '@myancommerce/nsx-common';

import {
    AuthenticationResult,
    AuthUserResponse,
    SocialAuthGuard,
    GqlJwtAuthGuard,
    ProfileEntity,
} from '@myancommerce/nsx-auth';
import { UserDto, UserService } from '@myancommerce/nsx-user';
import { Profile } from 'passport';
import {
    CustomerService,
    RegisterCustomerInput,
    RegisterCustomerResult,
} from '@myancommerce/nsx-customer';

@Resolver()
export class ShopAuthResolver {
    constructor(
        private readonly userService: UserService,
        private readonly customerService: CustomerService,
    ) {}

    @UseGuards(GqlJwtAuthGuard)
    @Query(() => UserDto)
    async me(@ProfileEntity() user: UserDto) {
        return await this.userService.findOne({
            where: { identifier: user.identifier },
        });
    }

    @UseGuards(SocialAuthGuard)
    @Mutation(() => AuthenticationResult)
    async loginSocial(@SocialProfile() profile: Profile) {
        console.log('Profile', profile);
        return new AuthUserResponse();
    }

    @Mutation(() => RegisterCustomerResult)
    async registerCustomerAccount(
        @Input() input: RegisterCustomerInput,
    ): Promise<typeof RegisterCustomerResult> {
        return await this.customerService.registerCustomerAccount(input);
    }
}
