@credit_application
Feature: Solicitud de crédito
  Como PyME quiero completar un formulario de crédito
  Para solicitar financiamiento de manera digital y rápida

  Background:
    Given el usuario PyME ha iniciado sesión
    And se encuentra en el formulario de solicitud de crédito

  Scenario: Solicitud de crédito exitosa con datos válidos
    When el usuario ingresa "5000000" en el campo monto solicitado
    And el usuario selecciona "12 meses" en el campo plazo
    And el usuario ingresa "15000000" en el campo ingresos anuales
    And el usuario ingresa "5000000" en el campo gastos anuales
    And el usuario selecciona "Compra de inventario" en el campo destino del crédito
    And hace click en el botón enviar solicitud
    Then el sistema debe registrar la solicitud
    And mostrar el estado "En revisión"
    And mostrar un mensaje "Solicitud registrada con éxito"

  Scenario: Intento de solicitud con campos vacíos
    When el usuario no ingresa ningún dato en el formulario
    And hace click en el botón enviar solicitud
    Then se deben mostrar mensajes de error indicando los campos requeridos

  Scenario: Intento de solicitud con monto mayor al permitido
    When el usuario ingresa "1000000000" en el campo monto solicitado
    And el usuario completa el resto de los campos con datos válidos
    And hace click en el botón enviar solicitud
    Then se debe mostrar un mensaje de error "El monto solicitado excede el máximo permitido"

  Scenario: Intento de solicitud con plazo inválido
    When el usuario ingresa "3 días" en el campo plazo
    And el usuario completa el resto de los campos con datos válidos
    And hace click en el botón enviar solicitud
    Then se debe mostrar un mensaje de error "El plazo seleccionado no es válido"

  Scenario: Intento de solicitud con ingresos menores a gastos
    When el usuario ingresa "2000000" en el campo ingresos anuales
    And el usuario ingresa "5000000" en el campo gastos anuales
    And el usuario completa el resto de los campos con datos válidos
    And hace click en el botón enviar solicitud
    Then se debe mostrar un mensaje de error "Los ingresos deben ser mayores que los gastos"

  Scenario: Guardado automático del formulario
    When el usuario completa parcialmente el formulario de crédito
    And se desconecta de la sesión
    Then al iniciar sesión nuevamente
    And acceder al formulario de crédito
    Then los datos previamente ingresados deben estar guardados
