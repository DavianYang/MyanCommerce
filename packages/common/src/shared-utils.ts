export function isObject(item: any): item is object {
    return item && typeof item === 'object' && !Array.isArray(item);
}


export function isClassInstance(item: any): boolean {
    return isObject(item) && item.constructor.name !== 'Object';
}