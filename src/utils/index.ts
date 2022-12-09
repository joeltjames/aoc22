/**
 * Root for your util libraries.
 *
 * You can import them in the src/template/index.ts,
 * or in the specific file.
 *
 * Note that this repo uses ES Modules, so you have to explicitly specify
 * .js extension (yes, .js not .ts - even for TypeScript files)
 * for imports that are not imported from node_modules.
 *
 * For example:
 *
 *   correct:
 *
 *     import _ from 'lodash'
 *     import myLib from '../utils/myLib.js'
 *     import { myUtil } from '../utils/index.js'
 *
 *   incorrect:
 *
 *     import _ from 'lodash'
 *     import myLib from '../utils/myLib.ts'
 *     import { myUtil } from '../utils/index.ts'
 *
 *   also incorrect:
 *
 *     import _ from 'lodash'
 *     import myLib from '../utils/myLib'
 *     import { myUtil } from '../utils'
 *
 */

/*
 * Reducers
 */
export const sum = (arr: number[]) =>
  arr.reduce((a: number, b: number) => a + b, 0);

/*
 * Set math
 */

export const hasAnyIntersection = (set1: Set<any>, set2: Set<any>): boolean => {
  return Array.from(set1).some((element) => {
    return set2.has(element);
  });
};

export const intersection = <T>(set1: Set<T>, set2: Set<T>): Set<T> => {
  return new Set([...set1].filter((x) => set2.has(x)));
};

export const isSubset = <T>(set1: Set<T>, set2: Set<T>): boolean => {
  return Array.from(set1).every((element) => {
    return set2.has(element);
  });
};

/*
 * END Set math
 */
