import type { v2 } from '@kitce/lihkg-api-core';

declare global {
  interface Window {
    LIHKG_APIv2: typeof v2;
  }
}
