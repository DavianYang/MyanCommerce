import { ErrorResult } from './base.graphql.error';

/**
 * @description
 * Takes an ErrorResult union type (i.e. a generated union type consisting of some query/mutation result
 * plus one or more ErrorResult types) and returns a union of _just_ the ErrorResult types.
 *
 * @example
 * ```TypeScript
 * type UpdateOrderItemsResult = Order | OrderModificationError | OrderLimitError | NegativeQuantityError;
 *
 * type T1 = JustErrorResults<UpdateOrderItemsResult>;
 * // T1 = OrderModificationError | OrderLimitError | NegativeQuantityError
 * ```
 */
export type JustErrorResults<T extends ErrorResult | U, U = any> = Exclude<
    T,
    T extends ErrorResult ? never : T
>;

/**
 * @description
 * Used to construct a TypeScript return type for a query or mutation which, in the GraphQL schema,
 * returns a union type composed of a success result (e.g. Order) plus one or more ErrorResult
 * types.
 *
 * Since the TypeScript entities do not correspond 1-to-1 with their GraphQL type counterparts,
 * we use this type to substitute them.
 *
 * @example
 * ```TypeScript
 * type UpdateOrderItemsResult = Order | OrderModificationError | OrderLimitError | NegativeQuantityError;
 * type T1 = ErrorResultUnion<UpdateOrderItemsResult, VendureEntityOrder>;
 * // T1 = VendureEntityOrder | OrderModificationError | OrderLimitError | NegativeQuantityError;
 */
export type ErrorResultUnion<T extends ErrorResult | U, E, U = any> =
    | JustErrorResults<T>
    | E;

/**
 * @description
 * Returns true if the ErrorResultUnion is actually an ErrorResult type.
 */
export function isGraphQlErrorResult<T extends ErrorResult | U, U = any>(
    input: T,
): input is JustErrorResults<T>;
export function isGraphQlErrorResult<T, E>(
    input: ErrorResultUnion<T, E>,
): input is JustErrorResults<ErrorResultUnion<T, E>> {
    return input && input instanceof ErrorResult;
}
