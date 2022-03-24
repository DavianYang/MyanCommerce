import { ID } from '@myancommerce/nox-common';
import { PaginationArgs } from '@myancommerce/nsx-common';
import { Resolver, Args, Mutation, Query, Int } from '@nestjs/graphql';
import { CreateRoleInput, UpdateRoleInput } from './role.input';
import { RoleDto } from './role.model';
import { RoleService } from './role.service';

@Resolver(() => RoleDto)
export class RoleResolver {
    constructor(readonly roleService: RoleService) {}

    @Query(() => [RoleDto])
    roles(
        @Args() { cursor, take, skip }: PaginationArgs,
    ): Promise<RoleDto[] | null> {
        const filterBy = Object.assign(
            {},
            take && { take },
            (skip && { skip }) || (cursor && { skip: 1 }),
        );
        return this.roleService.roles(filterBy);
    }

    @Query(() => RoleDto)
    role(@Args('id', { type: () => Int }) id: ID): Promise<RoleDto | null> {
        return this.roleService.role({
            where: {
                id: id as number,
            },
        });
    }

    @Mutation(() => RoleDto)
    createRole(@Args('input') input: CreateRoleInput): Promise<RoleDto> {
        return this.roleService.createRole({ data: input });
    }

    @Mutation(() => RoleDto)
    updateRole(
        @Args('id', { type: () => Int }) id: number, // for test case
        @Args('input') input: UpdateRoleInput,
    ): Promise<RoleDto> {
        return this.roleService.updateRole({
            where: { id: id },
            data: input,
        });
    }

    @Mutation(() => RoleDto)
    deleteRole(@Args('id', { type: () => Int }) id: ID) {
        return this.roleService.deleteRole({
            where: { id: id as number },
        });
    }
}
