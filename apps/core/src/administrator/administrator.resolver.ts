import {
    CreateAdministratorInput,
    DeletionResponse,
    UpdateAdministratorInput,
} from '@myancommerce/generated';
import { ID, PaginatedList } from '@myancommerce/shared';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { RequestContext } from '../api/common/request-context';
import { Ctx } from '../api/decorators/request-context.decorator';
import { AdministratorService } from './administrator.service';
import { Administrator } from './entities/administrator.entity';

@Resolver('Administrator')
export class AdministratorResolver {
    constructor(private administratorService: AdministratorService) {}

    @Query()
    administrators(
        @Ctx() ctx: RequestContext,
    ): Promise<PaginatedList<Administrator>> {
        return this.administratorService.findAll(ctx);
    }

    @Query()
    administrator(
        @Ctx() ctx: RequestContext,
        @Args('id') id: ID,
    ): Promise<Administrator | undefined> {
        return this.administratorService.findOne(ctx, id);
    }

    @Mutation()
    createAdministrator(
        @Ctx() ctx: RequestContext,
        @Args('input') input: CreateAdministratorInput,
    ): Promise<Administrator> {
        return this.administratorService.create(ctx, input);
    }

    @Mutation()
    updateAdministrator(
        @Ctx() ctx: RequestContext,
        @Args('id') id: ID,
        @Args('input') input: UpdateAdministratorInput,
    ): Promise<Administrator> {
        return this.administratorService.update(ctx, id, input);
    }

    @Mutation()
    deleteAdministrator(
        @Ctx() ctx: RequestContext,
        @Args('id') id: ID,
    ): Promise<DeletionResponse> {
        return this.administratorService.delete(ctx, id);
    }
}
