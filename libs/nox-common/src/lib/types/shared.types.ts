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
 */
export type ID = number | string;

/**
 * @description
 * A type describing the shape of a paginated list response.
 */
export type PaginatedList<T> = {
    items: T[];
    totalItems: number;
};

/**
 * @description
 * A type describing session token that is delivered and read
 */
export type TokenMethod =
    | 'cookie'
    | 'bearer'
    | ReadonlyArray<'cookie' | 'bearer'>;

/**
 * @description
 * A interface describing Session
 */
export interface Session {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    token: string;
    expires: Date;
    invalidated: boolean;
}

/**
 * @description
 * A type describing HttpRequest with Session entity
 */
export type HttpRequestWithSession = HttpRequest & {
    session?: Session;
    sessionOptions?: { maxAge: number | undefined };
};

/**
 * @description
 * Which of the GraphQL APIs the current request came via.
 *
 * @docsCategory request
 */
export type ApiType = 'admin' | 'shop' | 'custom';
