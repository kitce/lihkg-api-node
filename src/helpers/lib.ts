import type Client from '../models/Client';

/**
 * Inject the API library with the browser client, so that the
 * library functions can be evaluated in the page's context
 * @param name - the name of the API library variable exposed to the `window` object
 * @param client - the browser client
 * @param api - the original API library
 * @returns the injected API library
 */
export const injectLibraryWithClient = <F extends (...args: any[]) => any, L extends Record<string, F>> (name: string, client: Client, api: L) => {
  return Object.keys(api).reduce((value, functionName) => {
    const _functionName = functionName as keyof L;
    const injectedFunction = async (...args: any[]) => {
      const page = await client.ready();
      return page.evaluate((name, functionName, ...args) => {
        const api = window[name as keyof Window] as L;
        return api[functionName](...args);
      }, name, _functionName, ...args);
    };
    value[_functionName] = injectedFunction as L[keyof L];
    return value;
  }, {} as L);
};
