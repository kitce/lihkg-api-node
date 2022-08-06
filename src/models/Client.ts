import debugFactory from 'debug';
import { Browser, Page, PuppeteerLaunchOptions } from 'puppeteer';
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import config from '../config/config';
import { pages } from '../constants/lihkg';

puppeteer.use(StealthPlugin());

const debug = debugFactory('lihkg-api-node:model:Client');

const ready = Symbol('ready');

class Client {
  private [ready]: Promise<void>;
  private browser!: Browser;
  private page!: Page;

  constructor (options?: PuppeteerLaunchOptions) {
    this[ready] = this.bootstrap(options);
  }

  async ready () {
    await this[ready];
    return this.page;
  }

  private async bootstrap (options?: PuppeteerLaunchOptions) {
    const defaults: PuppeteerLaunchOptions = {
      headless: false,
      devtools: !!config.debug,
    };
    const browser = await puppeteer.launch({ ...defaults, ...options });
    const [page] = await browser.pages();
    await page.goto(pages.homepage, { waitUntil: 'networkidle0' });
    await page.addScriptTag({ path: config.paths.library });
    this.browser = browser;
    this.page = page;
  }

  close () {
    const { browser } = this;
    return browser.close();
  }
}

export default Client;
