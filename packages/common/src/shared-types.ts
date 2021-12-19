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

/**
 * @description
 * An entity ID. Depending on the configured {@link EntityIdStrategy}, it will be either
 * a `string` or a `number`;
 *
 * @docsCategory common
 */
export type ID = string | number;
