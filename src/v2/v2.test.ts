import debugFactory from 'debug';
import APIv2, { client } from './v2';

const debug = debugFactory('lihkg-api-node:v2:test');

afterAll(async () => {
  await client.close();
});

describe('fetchLatestThreadList', () => {
  it('should fetch the latest thread list', async () => {
    try {
      const response = await APIv2.fetchLatestThreadList();
      const { data } = response;
      const { success } = response.data;
      expect(success).toBe(1);
      expect('response' in data).toBe(true);
      if ('response' in data) {
        const { items } = data.response;
        debug('items', items.length);
        expect(items.length).toBeGreaterThan(0);
      }
    } catch (err) {
      debug(err);
    }
  });
});
