@digital_signature
Feature: Firma digital de solicitud
  Como PyME quiero firmar digitalmente mi solicitud
  Para validar la autenticidad del proceso de crédito

  Background:
    Given el usuario PyME ha iniciado sesión
    And tiene una solicitud de crédito lista para firmar

  Scenario: Firma digital exitosa
    When el usuario inicia el proceso de firma digital
    And ingresa el token válido "123456"
    Then el sistema debe confirmar la firma
    And mostrar un mensaje "Solicitud firmada exitosamente"
    And cambiar el estado de la solicitud a "Firmada"

  Scenario: Firma digital fallida por token inválido
    When el usuario inicia el proceso de firma digital
    And ingresa el token inválido "999999"
    Then se debe mostrar un mensaje de error "Token inválido, intente nuevamente"

  Scenario: Firma digital fallida por token expirado
    When el usuario inicia el proceso de firma digital
    And ingresa un token expirado
    Then se debe mostrar un mensaje de error "El token ha expirado"

  Scenario: Usuario cancela la firma digital
    When el usuario inicia el proceso de firma digital
    And cancela la operación antes de finalizar
    Then el sistema debe mostrar un mensaje "Firma cancelada"
    And la solicitud debe permanecer en estado "Pendiente de firma"

  Scenario: Reintento de firma digital después de error
    When el usuario inicia el proceso de firma digital
    And ingresa un token inválido
    Then se debe mostrar un mensaje de error "Token inválido, intente nuevamente"
    When el usuario ingresa un token válido "123456"
    Then el sistema debe confirmar la firmañ
    And mostrar un mensaje "Solicitud firmada exitosamente"
