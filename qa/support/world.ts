import dotenv from 'dotenv'
import { setWorldConstructor, World } from '@cucumber/cucumber'
import {
  chromium,
  firefox,
  webkit,
  Browser,
  BrowserContext,
  Page,
} from 'playwright'
import { LoginPage } from '../pages/LoginPage'
import { CreateUserPage } from '../pages/CreateUserPage'
// import { CreditApplicationPage } from '../pages/CreditApplicationPage'
// import { DocumentUploadPage } from '../pages/DocumentUploadPage'
// import { DigitalSignaturePage } from '../pages/DigitalSignaturePage'

dotenv.config()

export class PlaywrightWorld extends World {
  browser!: Browser
  context!: BrowserContext
  page!: Page

  // Page Objects
  loginPage!: LoginPage
  createUserPage!: CreateUserPage
  // creditApplicationPage!: CreditApplicationPage
  // documentUploadPage!: DocumentUploadPage
  // digitalSignaturePage!: DigitalSignaturePage

  // Configuración desde variables de entorno
  browserName = process.env.BROWSER || 'chromium'
  headless = process.env.HEADLESS !== 'false'
  baseURL = process.env.BASE_URL || 'http://localhost:3000' // Validar URL ⚠️
  email = process.env.TEST_USER_EMAIL || 'default_user@qa.com'
  password = process.env.TEST_USER_PASSWORD || 'Default123!'

  async init() {
    const browsers: any = { chromium, firefox, webkit }
    const browserType = browsers[this.browserName]

    this.browser = await browserType.launch({
      headless: this.headless,
    })

    this.context = await this.browser.newContext({
      baseURL: this.baseURL,
      viewport: { width: 1280, height: 720 },
    })

    this.page = await this.context.newPage()
    this.page.setDefaultTimeout(30000)
    this.page.setDefaultNavigationTimeout(30000)

    // Instanciar Page Objects
    this.loginPage = new LoginPage(this.page)
    this.createUserPage = new CreateUserPage(this.page)
    // this.creditApplicationPage = new CreditApplicationPage(this.page)
    // this.documentUploadPage = new DocumentUploadPage(this.page)
    // this.digitalSignaturePage = new DigitalSignaturePage(this.page)
  }

  async cleanup() {
    if (this.page) await this.page.close()
    if (this.context) await this.context.close()
    if (this.browser) await this.browser.close()
  }
}

setWorldConstructor(PlaywrightWorld)
