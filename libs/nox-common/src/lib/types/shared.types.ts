import { Request as HttpRequest, Response as HttpResponse } from 'express';
import { PrismaClient } from '@prisma/client';

/**
 * A type representing the type rather than instance of a class.
 */
export interface Type<T> extends Function {
    // tslint:disable-next-line:callable-types
    new (...args: any[]): T;
}

/**
 * A recursive implementation of the Partial<T> type.
 * Source: https://stackoverflow.com/a/49936686/772859
 */
export type DeepPartial<T> = {
    [P in keyof T]?:
        | null
        | (T[P] extends Array<infer U>
              ? Array<DeepPartial<U>>
              : T[P] extends ReadonlyArray<infer U>
              ? ReadonlyArray<DeepPartial<U>>
              : DeepPartial<T[P]>);
};

export interface RequestContext {
    prisma: PrismaClient;
    request: HttpRequest;
    response: HttpResponse;
}

/**
 * @description
 * An entity ID. Depending on the configured {@link EntityIdStrategy}, it will be either
 * a `string` or a `number`;
 *
 * @docsCategory shared
 */
export type ID = number | string;

/**
 * @description
 * A type describing the shape of a paginated list response.
 *
 * @docsCategory shared
 */
export type PaginatedList<T> = {
    items: T[];
    totalItems: number;
};
