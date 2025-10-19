@register

Feature: Registro de usuario
  Como nuevo usuario quiero registrarme en la plataforma
  Para poder iniciar sesión y solicitar un crédito

  Background:
    Given el usuario se encuentra en la página de registro

  Scenario: Registro exitoso con todos los datos válidos
    When el usuario ingresa "Pyme S.A." en el campo nombre de empresa
    And el usuario ingresa "<email>" en el campo email
    And el usuario ingresa "<password>" en el campo contraseña
    And el usuario confirma "<password>" en el campo confirmar contraseña
    And acepta los términos y condiciones
    And hace click en el botón de registrarse
    Then se debe mostrar un mensaje "Registro exitoso"
    And se debe mostrar el dashboard del sistema 

  Scenario: Intento de registro con campos vacíos
    When el usuario no ingresa ningún dato
    And hace click en el botón de registrarse
    Then se deben mostrar mensajes de error indicando campos requeridos

  Scenario: Intento de registro con email inválido
    When el usuario ingresa "correo-invalido" en el campo email
    And el usuario ingresa "<password>" en el campo contraseña
    And el usuario confirma "<password>" en el campo confirmar contraseña
    And acepta los términos y condiciones
    And hace click en el botón de registrarse
    Then se debe mostrar un mensaje de error "Formato de email inválido"

  Scenario: Intento de registro con contraseñas no coincidentes
    When el usuario ingresa "correo@correo.com" en el campo email
    And el usuario ingresa "<password>" en el campo contraseña
    And el usuario confirma "Password456!" en el campo confirmar contraseña
    And acepta los términos y condiciones
    And hace click en el botón de registrarse
    Then se debe mostrar un mensaje de error "Las contraseñas no coinciden"

  Scenario: Intento de registro sin aceptar términos
    When el usuario ingresa "Pyme S.A." en el campo nombre de empresa
    And el usuario ingresa "correo@correo.com" en el campo email
    And el usuario ingresa "<password>" en el campo contraseña
    And el usuario confirma "<password>" en el campo confirmar contraseña
    And no acepta los términos y condiciones
    And hace click en el botón de registrarse
    Then se debe mostrar un mensaje de error "Debe aceptar los términos y condiciones para continuar"

  Scenario: Intento de registro con email ya registrado
    When el usuario ingresa "Pyme S.A." en el campo nombre de empresa
    And el usuario ingresa "<email>" en el campo email
    And el usuario ingresa "<password>" en el campo contraseña
    And el usuario confirma "<password>" en el campo confirmar contraseña
    And acepta los términos y condiciones
    And hace click en el botón de registrarse
    Then se debe mostrar un mensaje de error "El email ya está registrado"