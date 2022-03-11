import { Resolver, Query, Args, Mutation, Context } from '@nestjs/graphql';
import { ID, RequestContext } from '@myancommerce/nox-common';
import { PaginationArgs } from '@myancommerce/nsx-common';

import { CreateAdministratorInput } from './administrator.input';
import { AdministratorDto } from './administrator.model';
import { AdministratorService } from './administrator.service';

@Resolver(() => AdministratorDto)
export class AdministratorResolver {
    constructor(readonly administratorService: AdministratorService) {}

    @Query(() => [AdministratorDto])
    administrators(
        @Context() { prisma }: RequestContext,
        @Args() { cursor, take, skip }: PaginationArgs,
    ): Promise<AdministratorDto[]> {
        const filterBy = Object.assign(
            {},
            cursor && { cursor: { id: cursor } },
            take && { take },
            (skip && { skip }) || (cursor && { skip: 1 }),
        );
        return this.administratorService.findAll(prisma, filterBy);
    }

    @Query(() => AdministratorDto)
    administrator(
        @Context() { prisma }: RequestContext,
        @Args('id', { type: () => String }) userId: ID,
    ): Promise<AdministratorDto | null> {
        return this.administratorService.findOne(prisma, {
            where: { id: userId as string },
        });
    }

    @Mutation(() => AdministratorDto)
    createAdministrator(
        @Context() { prisma }: RequestContext,
        @Args('input') input: CreateAdministratorInput,
    ): Promise<AdministratorDto> {
        const admin = this.administratorService.create(prisma, { data: input });
        return admin;
    }

    @Mutation(() => AdministratorDto)
    updateAdministrator(
        @Context() ctx: RequestContext,
        // @Args('input') input: UpdateAdministratorInput,
    ) {
        console.log(ctx.request);
        // return this.administratorService.update(prisma, {where: { id: }, data: input})
    }
}
