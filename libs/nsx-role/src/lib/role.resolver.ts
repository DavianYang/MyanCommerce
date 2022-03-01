import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { RoleWhereInput } from './role.input';
import { Role } from './role.model';
import { RoleService } from './role.service';

@Resolver(() => Role)
export class RoleResolver {
    constructor(readonly roleService: RoleService) {}

    @Mutation(() => Role)
    createRole(@Args('input') input: RoleWhereInput): Promise<Role> {
        return this.roleService.createRole(input);
    }
}
