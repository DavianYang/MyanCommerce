import { Resolver, Query, Args, Mutation, Context } from '@nestjs/graphql';
import { Request as HttpRequest, Response as HttpResponse } from 'express';
import { PrismaClient } from '@prisma/client';
import { CreateAdministratorInput } from './administrator.input';
import { AdministratorDto, PaginationArgs } from './administrator.model';
import { AdministratorService } from './administrator.service';

export interface Context {
    prisma: PrismaClient;
    request: HttpRequest;
    response: HttpResponse;
}

export type ID = string;

@Resolver(() => AdministratorDto)
export class AdministratorResolver {
    constructor(readonly administratorService: AdministratorService) {}

    @Query(() => [AdministratorDto])
    administrators(
        @Context() { prisma }: Context,
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
        @Context() { prisma }: Context,
        @Args('id') userId: ID,
    ): Promise<AdministratorDto | null> {
        return this.administratorService.findOne(prisma, {
            where: { id: userId },
        });
    }

    @Mutation(() => AdministratorDto)
    createAdministrator(
        @Context() { prisma }: Context,
        @Args('input') input: CreateAdministratorInput,
    ): Promise<AdministratorDto> {
        const admin = this.administratorService.create(prisma, { data: input });
        return admin;
    }

    @Mutation(() => AdministratorDto)
    updateAdministrator(
        @Context() ctx: Context,
        // @Args('input') input: UpdateAdministratorInput,
    ) {
        console.log(ctx.request);
        // return this.administratorService.update(prisma, {where: { id: }, data: input})
    }
}
