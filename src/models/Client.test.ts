import debugFactory from 'debug';
import Client from './Client';

const debug = debugFactory('lihkg-api-node:model:Client:test');

const client = new Client();

afterAll(async () => {
  await client.close();
});

describe('Client', () => {
  it('should go to LIHKG', async () => {
    const page = await client.ready();
    const title = await page.evaluate(() => document.title);
    debug('title', title);
    expect(title).toMatch(/LIHKG/);
  });

  it('should load the API library', async () => {
    const page = await client.ready();
    const value = await page.evaluate(() => !!window.LIHKG_APIv2);
    debug('value', value);
    expect(value).toBe(true);
  });
});
