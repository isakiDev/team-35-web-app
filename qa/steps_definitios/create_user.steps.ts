import { Given, When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import { PlaywrightWorld } from '../support/world'

Given(
  'el usuario se encuentra en la página de registro',
  async function (this: PlaywrightWorld) {
    await this.createUserPage.navigate(`${this.baseURL}/register`)
  }
)

When(
  'el usuario ingresa {string} en el campo nombre de empresa',
  async function (this: PlaywrightWorld, name: string) {
    await this.createUserPage.fillName(name)
  }
)

When(
  'el usuario ingresa {string} en el campo email',
  async function (this: PlaywrightWorld, email: string) {
    if (email === '<email>') email = this.email
    await this.createUserPage.fillEmail(email)
  }
)

When(
  'el usuario ingresa {string} en el campo contraseña',
  async function (this: PlaywrightWorld, password: string) {
    if (password === '<password>') password = this.password
    await this.createUserPage.fillPassword(password)
  }
)

When(
  'el usuario confirma {string} en el campo confirmar contraseña',
  async function (this: PlaywrightWorld, password: string) {
    if (password === '<password>') password = this.password
    await this.createUserPage.fillConfirmedPassword(password)
  }
)

When(
  'acepta los términos y condiciones',
  async function (this: PlaywrightWorld) {
    await this.createUserPage.checkCheckbox(this.createUserPage.termsCheck)
  }
)

When(
  'no acepta los términos y condiciones',
  async function (this: PlaywrightWorld) {
    await this.page.uncheck(this.createUserPage.termsCheck)
  }
)

When(
  'hace click en el botón de registrarse',
  async function (this: PlaywrightWorld) {
    await this.createUserPage.submitForm()
  }
)

When(
  'el usuario no ingresa ningún dato',
  async function (this: PlaywrightWorld) {
    // No hace nada: simula formulario vacío
  }
)

Then(
  'se deben mostrar mensajes de error indicando campos requeridos',
  async function (this: PlaywrightWorld) {
    const requiredMessages = this.page.locator('.error, .validation-message')
    await expect(requiredMessages.first()).toBeVisible()
    await expect(requiredMessages).toContainText(['requerido', 'obligatorio'])
  }
)

Then(
  'se debe mostrar un mensaje de error {string}',
  async function (this: PlaywrightWorld, message: string) {
    const errorAlert = this.page.locator(
      '.error, .alert-danger, .notification-error'
    )
    await expect(errorAlert).toBeVisible()
    await expect(errorAlert).toContainText(message)
  }
)

Then(
  'se debe mostrar un mensaje {string}',
  async function (this: PlaywrightWorld, message: string) {
    const successAlert = this.page.locator(
      '.alert-success, .notification, .toast'
    )
    await expect(successAlert).toBeVisible()
    await expect(successAlert).toContainText(message)
  }
)

Then(
  'se debe mostrar el dashboard del sistema',
  async function (this: PlaywrightWorld) {
    await expect(this.page).toHaveURL(/.*dashboard/)
    await expect(this.page.locator('h1')).toContainText('Dashboard')
  }
)
