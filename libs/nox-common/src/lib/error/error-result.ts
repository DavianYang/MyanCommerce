export type GraphQLErrorResult = {
    errorCode: string;
    message: string;
};

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
export type JustErrorResults<
    T extends GraphQLErrorResult | U,
    U = any,
> = Exclude<T, T extends GraphQLErrorResult ? never : T>;
