import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { RequestContext } from '../../common/request-context';
import { Ctx } from '../../decorators/request-context.decorator';
import { CustomerService } from '../../../service/services/customer.service';

@Resolver('Customer')
export class CustomerResolver {
    constructor(private customerService: CustomerService) {}

    @Mutation()
    async createCustomer(
        @Ctx() ctx: RequestContext,
        @Args('input') input: any,
    ): Promise<any> {
        return this.customerService.create(ctx, input);
    }
}
