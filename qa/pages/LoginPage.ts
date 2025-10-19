import { BasePage } from './BasePage'

export class LoginPage extends BasePage {
  emailInput = 'input[name="email"]'
  passwordInput = 'input[name="password"]'
  submitButton = 'button[type="submit"]'

  async fillEmail(email: string) {
    await this.fillInput(this.emailInput, email)
  }

  async fillPassword(password: string) {
    await this.fillInput(this.passwordInput, password)
  }

  async submitForm() {
    await this.clickButton(this.submitButton)
  }
}
