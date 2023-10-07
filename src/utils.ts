/**
 * Trim string and replaces spaces with underscore
 * Used for making tags
 */
export const sanitizeString = (str: string) => str.trim().replace(/\s/g, "_");

/**
 * Trim array from end
 */
export const trimArrayEnd = (array: any[]) => {
  const trimmedArray: any[] = [];
  let added = false;

  for (let i = array.length - 1; i >= 0; i -= 1) {
    if (array[i] || added) {
      trimmedArray.unshift(array[i]);
      added = true;
    }
  }

  return trimmedArray;
};

/**
 * Trim array from start
 */
export const trimArrayStart = (array: any[]) => {
  const trimmedArray = [];
  let added = false;

  for (let i = 0; i < array.length; i += 1) {
    if (array[i] || added) {
      trimmedArray.push(array[i]);
      added = true;
    }
  }

  return trimmedArray;
};

/**
 * Trim array
 */
export const trimArray = (array: any[]) => trimArrayEnd(trimArrayStart(array));

/**
 * Check whether the link is a http link
 * @param link
 */
export const isRemoteLink = (link: string) => /^(https?)?:\/\//.test(link);

/**
 * 数组去重
 * @param array
 * @returns
 */
export function uniqueArray<T>(array: T[]) {
  return array.filter((value, index, self) => {
    return self.indexOf(value) === index;
  });
}

export async function asyncPool(poolLimit: number, array: unknown[], iteratorFn: any) {
  const ret = [];
  const executing: Promise<unknown>[] = [];
  for (const item of array) {
    const p = Promise.resolve().then(() => iteratorFn(item));
    ret.push(p);
    if (poolLimit <= array.length) {
      const e: Promise<unknown> = p.then(() => executing.splice(executing.indexOf(e), 1));
      executing.push(e);
      if (executing.length >= poolLimit) {
        await Promise.race(executing);
      }
    }
  }
  return Promise.all(ret);
}
