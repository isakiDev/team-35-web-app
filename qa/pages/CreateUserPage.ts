import { BasePage } from './BasePage'

export class CreateUserPage extends BasePage {
  nameInput = 'input[name="name"]'
  emailInput = 'input[name="email"]'
  passwordInput = 'input[name="password"]'
  confirmPaswwordInput = 'input[name="confirmPassword"]'
  termsCheck = 'input[name="terms"]'
  submitButton = 'button[type="submit"]'

  async fillName(name: string) {
    await this.fillInput(this.nameInput, name)
  }

  async fillEmail(email: string) {
    await this.fillInput(this.emailInput, email)
  }

  async fillPassword(password: string) {
    await this.fillInput(this.passwordInput, password)
  }

  async fillConfirmedPassword(password: string) {
    await this.fillInput(this.confirmPaswwordInput, password)
  }

  async checkTerms() {
    await this.checkCheckbox(this.termsCheck)
  }

  async submitForm() {
    await this.clickButton(this.submitButton)
  }
}
