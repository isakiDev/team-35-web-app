@document_upload
Feature: Carga de documentos
  Como PyME quiero subir mis documentos de respaldo
  Para completar mi solicitud de crédito de forma digital

  Background:
    Given el usuario PyME ha iniciado sesión
    And se encuentra en el paso de carga de documentos de la solicitud

  Scenario: Carga exitosa de documentos válidos
    When el usuario selecciona el archivo "balance_2024.pdf"
    And hace click en el botón subir documento
    Then el sistema debe mostrar un mensaje "Documento cargado exitosamente"
    And el archivo debe aparecer en la lista de documentos adjuntos

  Scenario: Intento de carga con archivo no permitido
    When el usuario selecciona el archivo "contrato.exe"
    And hace click en el botón subir documento
    Then se debe mostrar un mensaje de error "Formato de archivo no permitido"

  Scenario: Intento de carga con archivo demasiado grande
    When el usuario selecciona el archivo "balance_pesado.pdf" de más de 10MB
    And hace click en el botón subir documento
    Then se debe mostrar un mensaje de error "El archivo excede el tamaño máximo permitido"

  Scenario: Intento de carga con documento corrupto
    When el usuario selecciona el archivo "documento_corrupto.pdf"
    And hace click en el botón subir documento
    Then se debe mostrar un mensaje de error "El archivo no es válido o está dañado"

  Scenario: Reemplazo de documento previamente cargado
    Given el usuario ya ha cargado un documento "balance_2023.pdf"
    When el usuario selecciona un nuevo archivo "balance_2024.pdf"
    And hace click en el botón subir documento
    Then el documento anterior debe ser reemplazado
    And el sistema debe mostrar un mensaje "Documento actualizado exitosamente"

  Scenario: Eliminación de documento cargado
    Given el usuario ya ha cargado un documento "balance_2024.pdf"
    When hace click en el botón eliminar documento
    Then el documento debe desaparecer de la lista
    And el sistema debe mostrar un mensaje "Documento eliminado exitosamente"
