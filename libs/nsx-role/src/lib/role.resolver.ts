import { ID, RequestContext } from '@myancommerce/nox-common';
import { PaginationArgs } from '@myancommerce/nsx-common';
import { Resolver, Args, Mutation, Context, Query, Int } from '@nestjs/graphql';
import { CreateRoleInput, UpdateRoleInput } from './role.input';
import { RoleDto } from './role.model';
import { RoleService } from './role.service';

@Resolver(() => RoleDto)
export class RoleResolver {
    constructor(readonly roleService: RoleService) {}

    @Query(() => [RoleDto])
    roles(
        @Context() { prisma }: RequestContext,
        @Args() { cursor, take, skip }: PaginationArgs,
    ): Promise<RoleDto[] | null> {
        const filterBy = Object.assign(
            {},
            take && { take },
            (skip && { skip }) || (cursor && { skip: 1 }),
        );
        return this.roleService.roles(prisma, filterBy);
    }

    @Query(() => RoleDto)
    role(
        @Context() { prisma }: RequestContext,
        @Args('id', { type: () => Int }) id: ID,
    ): Promise<RoleDto | null> {
        return this.roleService.role(prisma, {
            where: {
                id: id as number,
            },
        });
    }

    @Mutation(() => RoleDto)
    createRole(
        @Context() { prisma }: RequestContext,
        @Args('input') input: CreateRoleInput,
    ): Promise<RoleDto> {
        return this.roleService.createRole(prisma, { data: input });
    }

    @Mutation(() => RoleDto)
    updateRole(
        @Context() { prisma }: RequestContext,
        @Args('id', { type: () => Int }) id: number, // for test case
        @Args('input') input: UpdateRoleInput,
    ): Promise<RoleDto> {
        return this.roleService.updateRole(prisma, {
            where: { id: id },
            data: input,
        });
    }

    @Mutation(() => RoleDto)
    deleteRole(
        @Context() { prisma }: RequestContext,
        @Args('id', { type: () => Int }) id: ID,
    ) {
        return this.roleService.deleteRole(prisma, {
            where: { id: id as number },
        });
    }
}
