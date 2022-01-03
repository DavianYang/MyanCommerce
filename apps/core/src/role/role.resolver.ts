import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { RequestContext } from '../api/common/request-context';
import { Ctx } from '../api/decorators/request-context.decorator';
import { RoleService } from './role.service';
import { Role } from './entities/role.entity';
import { ID, PaginatedList } from '@myancommerce/shared';

@Resolver('Role')
export class RoleResolver {
    constructor(private roleService: RoleService) {}

    @Query()
    roles(@Ctx() ctx: RequestContext): Promise<PaginatedList<Role>> {
        return this.roleService.findAll(ctx);
    }

    @Query()
    role(
        @Ctx() ctx: RequestContext,
        @Args() args: any,
    ): Promise<Role | undefined> {
        return this.roleService.findOne(ctx, args.id);
    }

    @Mutation()
    createRole(
        @Ctx() ctx: RequestContext,
        @Args('input') input: any,
    ): Promise<Role> {
        return this.roleService.create(ctx, input);
    }

    @Mutation()
    updateRole(
        @Ctx() ctx: RequestContext,
        @Args('input') input: any,
    ): Promise<Role> {
        return this.roleService.update(ctx, input);
    }

    @Mutation()
    deleteRole(@Ctx() ctx: RequestContext, @Args('id') id: ID): Promise<any> {
        return this.roleService.delete(ctx, id);
    }
}
