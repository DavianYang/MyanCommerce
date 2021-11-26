/**
 * A type representing the type rather than instance of a class.
 */
 export interface Type<T> extends Function {
    // tslint:disable-next-line:callable-types
    new (...args: any[]): T;
}