export * from '@kitce/lihkg-api-core/v2';
import v2 from '@kitce/lihkg-api-core/v2';
import { injectLibraryWithClient } from '../helpers/lib';
import Client from '../models/Client';

export const client = new Client();

const api: typeof v2 = injectLibraryWithClient('LIHKG_APIv2', client, v2);

export default api;
