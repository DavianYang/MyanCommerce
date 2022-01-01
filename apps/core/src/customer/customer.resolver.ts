import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { RequestContext } from '../api/common/request-context';
import { Ctx } from '../api/decorators/request-context.decorator';
import { CustomerService } from './customer.service';

@Resolver('Customer')
export class CustomerResolver {
    constructor(private customerService: CustomerService) {}

    @Mutation()
    async createCustomer(
        @Ctx() ctx: RequestContext,
        @Args('input') input: any,
    ): Promise<any> {
        console.log(input);
        return this.customerService.create(ctx, input);
    }
}
