import { Given, When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import { PlaywrightWorld } from '../support/world'

Given(
  'el usuario esta previamente registrado y en la página de login',
  async function (this: PlaywrightWorld) {
    await this.loginPage.navigate(this.baseURL + '/login')
  }
)

When(
  'el usuario ingresa {string} en el campo email',
  async function (this: PlaywrightWorld, email: string) {
    if (email === '<email>') email = this.email
    await this.loginPage.fillEmail(email)
  }
)

When(
  'ingresa {string} en el campo de contraseña',
  async function (this: PlaywrightWorld, password: string) {
    if (password === '<password>') password = this.password
    await this.loginPage.fillPassword(password)
  }
)

When(
  'hace click en el boton de iniciar sesión',
  async function (this: PlaywrightWorld) {
    await this.loginPage.submitForm()
  }
)

Then(
  'se debe mostrar el dashboard del sistema',
  async function (this: PlaywrightWorld) {
    await expect(this.page).toHaveURL(/.*\/dashboard/)
    await expect(this.page.locator('h1')).toHaveText('Dashboard')
  }
)

Then(
  'se debe mostrar un mensaje de que se requiere llenado de {string}',
  async function (this: PlaywrightWorld, campo: string) {
    await expect(
      this.page.locator(`text=El campo ${campo} es obligatorio`)
    ).toBeVisible()
  }
)

Then(
  'se debe mostrar una alerta de {string}',
  async function (this: PlaywrightWorld, mensaje: string) {
    await expect(this.page.locator(`text=${mensaje}`)).toBeVisible()
  }
)
