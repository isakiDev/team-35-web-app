import { Page } from 'playwright'

export class BasePage {
  protected page: Page

  constructor(page: Page) {
    this.page = page
  }

  async navigate(url: string) {
    await this.page.goto(url)
  }

  async fillInput(selector: string, value: string) {
    await this.page.fill(selector, value)
  }

  async clickButton(selector: string) {
    await this.page.click(selector)
  }

  async checkCheckbox(selector: string) {
    await this.page.check(selector)
  }

  async uploadFile(selector: string, path: string) {
    await this.page.setInputFiles(selector, path)
  }
}
