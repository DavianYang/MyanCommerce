import { isClassInstance, isObject } from '@myanchat/common/dist/shared-utils';
import { simpleDeepClone } from '@myanchat/common/dist/simple-deep-clone';

import { MyanChatConfig, PartialMyanChatConfig } from './myanchat.config';
/**
 * @description
 * Performs a deep merge of two MyanChatConfig objects. Unlike `Object.assign()` the `target` object is
 * not mutated, instead the function returns a new object which is the result of deeply merging the
 * values of `source` into `target`.
 *
 * @example
 * ```TypeScript
 * const result = mergeConfig(defaultConfig, {
 *   assetOptions: {
 *     uploadMaxFileSize: 5000,
 *   },
 * };
 * ```
 *
 * @docsCategory configuration
 */
 export function mergeConfig<T extends MyanChatConfig>(target: T, source: PartialMyanChatConfig, depth = 0): T {
    if (!source) {
        return target;
    }

    if (depth === 0) {
        target = simpleDeepClone(target);
    }

    if (isObject(target) && isObject(source)) {
        for (const key in source) {
            if (isObject((source as any)[key])) {
                if (!(target as any)[key]) {
                    Object.assign(target as any, { [key]: {} });
                }
                if (!isClassInstance((source as any)[key])) {
                    mergeConfig((target as any)[key], (source as any)[key], depth + 1);
                } else {
                    (target as any)[key] = (source as any)[key];
                }
            } else {
                Object.assign(target, { [key]: (source as any)[key] });
            }
        }
    }
    return target;
}