export function isObject(item: any): item is object {
    return item && typeof item === 'object' && !Array.isArray(item);
}

export function isClassInstance(item: any): boolean {
    return isObject(item) && item.constructor.name !== 'Object';
}

/**
 * Identity function which asserts to the type system that a promise which can resolve to T or undefined
 * does in fact resolve to T.
 * Used when performing a "find" operation on an entity which we are sure exists, as in the case that we
 * just successfully created or updated it.
 */
export function assertFound<T>(promise: Promise<T | undefined>): Promise<T> {
    return promise as Promise<T>;
}
