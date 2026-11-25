// Datos oficiales extraídos de las Radiografías CEFP (CONSAR)
export const CENSO_CONFIG = {
  pdfGeneral: 'radiografias_censo_2025/CENSO_RESULTADOS_2026.pdf',
  nombreDescargaGeneral: 'CENSO_RESULTADOS_2025.pdf',
  totalAccionesSistema: 3099,
  seccionesIndice: [
    { pagina: 1, titulo: 'Portada' },
    { pagina: 2, titulo: 'Contenido' },
    { pagina: 4, titulo: '1. Panorama 2025' },
    { pagina: 6, titulo: '2. Tópicos de evaluación' },
    { pagina: 8, titulo: '3. Cumplimiento de acciones' },
    { pagina: 10, titulo: '4. Crecimiento interanual: 2024 vs. 2025' },
    { pagina: 12, titulo: '5. Mapa de acciones por subtema' },
    { pagina: 14, titulo: '6. Segmentos y perspectivas transversales' },
    { pagina: 16, titulo: '7. Evolución de la evaluación 2016-2025' },
    { pagina: 18, titulo: '8. Consulta abierta' },
    { pagina: 20, titulo: '9. Acciones destacadas por Afore' },
    { pagina: 22, titulo: '10. Una década impulsando el ahorro' },
    { pagina: 24, titulo: 'Contraportada' }
  ]
};

export const PERSPECTIVAS_LISTA = [
  "Adultos Mayores",
  "Infancias",
  "Juventudes",
  "Mexicanos en el Exterior",
  "Perspectiva de Género",
  "Pueblos Originarios"
];

export const AFORES_DATA = [
  {
    "id": "azteca",
    "nombre": "Afore Azteca",
    "nombreCorto": "Azteca",
    "logo": "img/logos_afores/afore_azteca.jpg",
    "pdf": "radiografias_censo_2025/radiografia_azteca.pdf",
    "ficha": {
      "totalAcciones": 390,
      "ranking": 4,
      "participacion": 13,
      "subtemasAtendidos": 30,
      "totalSubtemas": 31,
      "cumplimiento": 97
    },
    "perspectivas": {
      "Adultos Mayores": true,
      "Infancias": false,
      "Juventudes": true,
      "Mexicanos en el Exterior": true,
      "Perspectiva de Género": true,
      "Pueblos Originarios": true
    },
    "ejes": [
      {
        "id": "bienestar",
        "nombre": "Bienestar financiero en el presente y futuro",
        "nombreCorto": "Bienestar financiero",
        "total": 155,
        "subtemas": [
          {
            "nombre": "Control financiero",
            "acciones": 80
          },
          {
            "nombre": "Flexibilidad financiera",
            "acciones": 12
          },
          {
            "nombre": "Metas financieras",
            "acciones": 17
          },
          {
            "nombre": "Resiliencia financiera",
            "acciones": 14
          },
          {
            "nombre": "Seguridad financiera",
            "acciones": 32
          }
        ]
      },
      {
        "id": "funcionamiento",
        "nombre": "Funcionamiento del Sistema de Ahorro para el Retiro",
        "nombreCorto": "Funcionamiento del SAR",
        "total": 76,
        "subtemas": [
          {
            "nombre": "Asesor Previsional",
            "acciones": 9
          },
          {
            "nombre": "Asignación y reasignación",
            "acciones": 6
          },
          {
            "nombre": "Cuenta Afore",
            "acciones": 26
          },
          {
            "nombre": "Cuenta Afore Niños",
            "acciones": 2
          },
          {
            "nombre": "Densidad de cotización",
            "acciones": 0
          },
          {
            "nombre": "Equidad en el retiro",
            "acciones": 7
          },
          {
            "nombre": "Fondo de Pensiones para el Bienestar",
            "acciones": 3
          },
          {
            "nombre": "Modalidades de pensión y requisitos",
            "acciones": 2
          },
          {
            "nombre": "Plusvalía y minusvalía",
            "acciones": 4
          },
          {
            "nombre": "Siefores Generacionales",
            "acciones": 6
          },
          {
            "nombre": "Sistema de Ahorro para el Retiro",
            "acciones": 2
          },
          {
            "nombre": "Tasa de reemplazo",
            "acciones": 1
          },
          {
            "nombre": "Trabajadores Independientes",
            "acciones": 8
          }
        ]
      },
      {
        "id": "tramites",
        "nombre": "Trámites y servicios del Sistema de Ahorro para el Retiro",
        "nombreCorto": "Trámites y servicios",
        "total": 159,
        "subtemas": [
          {
            "nombre": "Ahorro voluntario",
            "acciones": 10
          },
          {
            "nombre": "Beneficiarios",
            "acciones": 3
          },
          {
            "nombre": "Continuación voluntaria",
            "acciones": 2
          },
          {
            "nombre": "Estado de cuenta Afore",
            "acciones": 7
          },
          {
            "nombre": "Expediente de Identificación",
            "acciones": 118
          },
          {
            "nombre": "Localización de cuenta Afore",
            "acciones": 3
          },
          {
            "nombre": "Portabilidad de derechos",
            "acciones": 3
          },
          {
            "nombre": "Registro",
            "acciones": 3
          },
          {
            "nombre": "Retiros parciales",
            "acciones": 3
          },
          {
            "nombre": "Retiros totales",
            "acciones": 2
          },
          {
            "nombre": "Separación de cuentas",
            "acciones": 2
          },
          {
            "nombre": "Unificación de cuentas",
            "acciones": 2
          },
          {
            "nombre": "Evita fraudes en los trámites de retiro",
            "acciones": 1
          }
        ]
      }
    ]
  },
  {
    "id": "banamex",
    "nombre": "Afore Banamex",
    "nombreCorto": "Banamex",
    "logo": "img/logos_afores/afore_banamex.jpg",
    "pdf": "radiografias_censo_2025/radiografia_banamex.pdf",
    "ficha": {
      "totalAcciones": 204,
      "ranking": 7,
      "participacion": 7,
      "subtemasAtendidos": 31,
      "totalSubtemas": 31,
      "cumplimiento": 100
    },
    "perspectivas": {
      "Adultos Mayores": false,
      "Infancias": false,
      "Juventudes": false,
      "Mexicanos en el Exterior": false,
      "Perspectiva de Género": false,
      "Pueblos Originarios": false
    },
    "ejes": [
      {
        "id": "bienestar",
        "nombre": "Bienestar financiero en el presente y futuro",
        "nombreCorto": "Bienestar financiero",
        "total": 83,
        "subtemas": [
          {
            "nombre": "Control financiero",
            "acciones": 33
          },
          {
            "nombre": "Flexibilidad financiera",
            "acciones": 10
          },
          {
            "nombre": "Metas financieras",
            "acciones": 12
          },
          {
            "nombre": "Resiliencia financiera",
            "acciones": 15
          },
          {
            "nombre": "Seguridad financiera",
            "acciones": 13
          }
        ]
      },
      {
        "id": "funcionamiento",
        "nombre": "Funcionamiento del Sistema de Ahorro para el Retiro",
        "nombreCorto": "Funcionamiento del SAR",
        "total": 61,
        "subtemas": [
          {
            "nombre": "Asesor Previsional",
            "acciones": 3
          },
          {
            "nombre": "Asignación y reasignación",
            "acciones": 3
          },
          {
            "nombre": "Cuenta Afore",
            "acciones": 15
          },
          {
            "nombre": "Cuenta Afore Niños",
            "acciones": 3
          },
          {
            "nombre": "Densidad de cotización",
            "acciones": 5
          },
          {
            "nombre": "Equidad en el retiro",
            "acciones": 2
          },
          {
            "nombre": "Fondo de Pensiones para el Bienestar",
            "acciones": 2
          },
          {
            "nombre": "Modalidades de pensión y requisitos",
            "acciones": 3
          },
          {
            "nombre": "Plusvalía y minusvalía",
            "acciones": 5
          },
          {
            "nombre": "Siefores Generacionales",
            "acciones": 6
          },
          {
            "nombre": "Sistema de Ahorro para el Retiro",
            "acciones": 5
          },
          {
            "nombre": "Tasa de reemplazo",
            "acciones": 4
          },
          {
            "nombre": "Trabajadores Independientes",
            "acciones": 5
          }
        ]
      },
      {
        "id": "tramites",
        "nombre": "Trámites y servicios del Sistema de Ahorro para el Retiro",
        "nombreCorto": "Trámites y servicios",
        "total": 60,
        "subtemas": [
          {
            "nombre": "Ahorro voluntario",
            "acciones": 13
          },
          {
            "nombre": "Beneficiarios",
            "acciones": 4
          },
          {
            "nombre": "Continuación voluntaria",
            "acciones": 4
          },
          {
            "nombre": "Estado de cuenta Afore",
            "acciones": 7
          },
          {
            "nombre": "Expediente de Identificación",
            "acciones": 3
          },
          {
            "nombre": "Localización de cuenta Afore",
            "acciones": 3
          },
          {
            "nombre": "Portabilidad de derechos",
            "acciones": 3
          },
          {
            "nombre": "Registro",
            "acciones": 5
          },
          {
            "nombre": "Retiros parciales",
            "acciones": 4
          },
          {
            "nombre": "Retiros totales",
            "acciones": 4
          },
          {
            "nombre": "Separación de cuentas",
            "acciones": 3
          },
          {
            "nombre": "Unificación de cuentas",
            "acciones": 3
          },
          {
            "nombre": "Evita fraudes en los trámites de retiro",
            "acciones": 4
          }
        ]
      }
    ]
  },
  {
    "id": "coppel",
    "nombre": "Afore Coppel",
    "nombreCorto": "Coppel",
    "logo": "img/logos_afores/afore_coppel.jpg",
    "pdf": "radiografias_censo_2025/radiografia_coppel.pdf",
    "ficha": {
      "totalAcciones": 302,
      "ranking": 5,
      "participacion": 10,
      "subtemasAtendidos": 31,
      "totalSubtemas": 31,
      "cumplimiento": 100
    },
    "perspectivas": {
      "Adultos Mayores": true,
      "Infancias": true,
      "Juventudes": true,
      "Mexicanos en el Exterior": false,
      "Perspectiva de Género": true,
      "Pueblos Originarios": false
    },
    "ejes": [
      {
        "id": "bienestar",
        "nombre": "Bienestar financiero en el presente y futuro",
        "nombreCorto": "Bienestar financiero",
        "total": 142,
        "subtemas": [
          {
            "nombre": "Control financiero",
            "acciones": 62
          },
          {
            "nombre": "Flexibilidad financiera",
            "acciones": 12
          },
          {
            "nombre": "Metas financieras",
            "acciones": 46
          },
          {
            "nombre": "Resiliencia financiera",
            "acciones": 8
          },
          {
            "nombre": "Seguridad financiera",
            "acciones": 14
          }
        ]
      },
      {
        "id": "funcionamiento",
        "nombre": "Funcionamiento del Sistema de Ahorro para el Retiro",
        "nombreCorto": "Funcionamiento del SAR",
        "total": 59,
        "subtemas": [
          {
            "nombre": "Asesor Previsional",
            "acciones": 2
          },
          {
            "nombre": "Asignación y reasignación",
            "acciones": 2
          },
          {
            "nombre": "Cuenta Afore",
            "acciones": 12
          },
          {
            "nombre": "Cuenta Afore Niños",
            "acciones": 5
          },
          {
            "nombre": "Densidad de cotización",
            "acciones": 9
          },
          {
            "nombre": "Equidad en el retiro",
            "acciones": 3
          },
          {
            "nombre": "Fondo de Pensiones para el Bienestar",
            "acciones": 3
          },
          {
            "nombre": "Modalidades de pensión y requisitos",
            "acciones": 6
          },
          {
            "nombre": "Plusvalía y minusvalía",
            "acciones": 3
          },
          {
            "nombre": "Siefores Generacionales",
            "acciones": 2
          },
          {
            "nombre": "Sistema de Ahorro para el Retiro",
            "acciones": 5
          },
          {
            "nombre": "Tasa de reemplazo",
            "acciones": 4
          },
          {
            "nombre": "Trabajadores Independientes",
            "acciones": 3
          }
        ]
      },
      {
        "id": "tramites",
        "nombre": "Trámites y servicios del Sistema de Ahorro para el Retiro",
        "nombreCorto": "Trámites y servicios",
        "total": 101,
        "subtemas": [
          {
            "nombre": "Ahorro voluntario",
            "acciones": 38
          },
          {
            "nombre": "Beneficiarios",
            "acciones": 6
          },
          {
            "nombre": "Continuación voluntaria",
            "acciones": 2
          },
          {
            "nombre": "Estado de cuenta Afore",
            "acciones": 10
          },
          {
            "nombre": "Expediente de Identificación",
            "acciones": 6
          },
          {
            "nombre": "Localización de cuenta Afore",
            "acciones": 5
          },
          {
            "nombre": "Portabilidad de derechos",
            "acciones": 3
          },
          {
            "nombre": "Registro",
            "acciones": 4
          },
          {
            "nombre": "Retiros parciales",
            "acciones": 13
          },
          {
            "nombre": "Retiros totales",
            "acciones": 6
          },
          {
            "nombre": "Separación de cuentas",
            "acciones": 2
          },
          {
            "nombre": "Unificación de cuentas",
            "acciones": 4
          },
          {
            "nombre": "Evita fraudes en los trámites de retiro",
            "acciones": 2
          }
        ]
      }
    ]
  },
  {
    "id": "inbursa",
    "nombre": "Afore Inbursa",
    "nombreCorto": "Inbursa",
    "logo": "img/logos_afores/afore_inbursa.jpg",
    "pdf": "radiografias_censo_2025/radiografia_inbursa.pdf",
    "ficha": {
      "totalAcciones": 59,
      "ranking": 10,
      "participacion": 2,
      "subtemasAtendidos": 31,
      "totalSubtemas": 31,
      "cumplimiento": 100
    },
    "perspectivas": {
      "Adultos Mayores": false,
      "Infancias": true,
      "Juventudes": false,
      "Mexicanos en el Exterior": false,
      "Perspectiva de Género": true,
      "Pueblos Originarios": false
    },
    "ejes": [
      {
        "id": "bienestar",
        "nombre": "Bienestar financiero en el presente y futuro",
        "nombreCorto": "Bienestar financiero",
        "total": 9,
        "subtemas": [
          {
            "nombre": "Control financiero",
            "acciones": 3
          },
          {
            "nombre": "Flexibilidad financiera",
            "acciones": 1
          },
          {
            "nombre": "Metas financieras",
            "acciones": 2
          },
          {
            "nombre": "Resiliencia financiera",
            "acciones": 1
          },
          {
            "nombre": "Seguridad financiera",
            "acciones": 2
          }
        ]
      },
      {
        "id": "funcionamiento",
        "nombre": "Funcionamiento del Sistema de Ahorro para el Retiro",
        "nombreCorto": "Funcionamiento del SAR",
        "total": 22,
        "subtemas": [
          {
            "nombre": "Asesor Previsional",
            "acciones": 1
          },
          {
            "nombre": "Asignación y reasignación",
            "acciones": 1
          },
          {
            "nombre": "Cuenta Afore",
            "acciones": 2
          },
          {
            "nombre": "Cuenta Afore Niños",
            "acciones": 2
          },
          {
            "nombre": "Densidad de cotización",
            "acciones": 2
          },
          {
            "nombre": "Equidad en el retiro",
            "acciones": 2
          },
          {
            "nombre": "Fondo de Pensiones para el Bienestar",
            "acciones": 1
          },
          {
            "nombre": "Modalidades de pensión y requisitos",
            "acciones": 3
          },
          {
            "nombre": "Plusvalía y minusvalía",
            "acciones": 1
          },
          {
            "nombre": "Siefores Generacionales",
            "acciones": 2
          },
          {
            "nombre": "Sistema de Ahorro para el Retiro",
            "acciones": 1
          },
          {
            "nombre": "Tasa de reemplazo",
            "acciones": 2
          },
          {
            "nombre": "Trabajadores Independientes",
            "acciones": 2
          }
        ]
      },
      {
        "id": "tramites",
        "nombre": "Trámites y servicios del Sistema de Ahorro para el Retiro",
        "nombreCorto": "Trámites y servicios",
        "total": 28,
        "subtemas": [
          {
            "nombre": "Ahorro voluntario",
            "acciones": 4
          },
          {
            "nombre": "Beneficiarios",
            "acciones": 1
          },
          {
            "nombre": "Continuación voluntaria",
            "acciones": 1
          },
          {
            "nombre": "Estado de cuenta Afore",
            "acciones": 2
          },
          {
            "nombre": "Expediente de Identificación",
            "acciones": 3
          },
          {
            "nombre": "Localización de cuenta Afore",
            "acciones": 1
          },
          {
            "nombre": "Portabilidad de derechos",
            "acciones": 1
          },
          {
            "nombre": "Registro",
            "acciones": 2
          },
          {
            "nombre": "Retiros parciales",
            "acciones": 3
          },
          {
            "nombre": "Retiros totales",
            "acciones": 3
          },
          {
            "nombre": "Separación de cuentas",
            "acciones": 1
          },
          {
            "nombre": "Unificación de cuentas",
            "acciones": 3
          },
          {
            "nombre": "Evita fraudes en los trámites de retiro",
            "acciones": 3
          }
        ]
      }
    ]
  },
  {
    "id": "invercap",
    "nombre": "Afore InverCap",
    "nombreCorto": "InverCap",
    "logo": "img/logos_afores/afore_invercap.jpg",
    "pdf": "radiografias_censo_2025/radiografia_invercap.pdf",
    "ficha": {
      "totalAcciones": 100,
      "ranking": 9,
      "participacion": 3,
      "subtemasAtendidos": 30,
      "totalSubtemas": 31,
      "cumplimiento": 97
    },
    "perspectivas": {
      "Adultos Mayores": true,
      "Infancias": true,
      "Juventudes": true,
      "Mexicanos en el Exterior": false,
      "Perspectiva de Género": true,
      "Pueblos Originarios": false
    },
    "ejes": [
      {
        "id": "bienestar",
        "nombre": "Bienestar financiero en el presente y futuro",
        "nombreCorto": "Bienestar financiero",
        "total": 23,
        "subtemas": [
          {
            "nombre": "Control financiero",
            "acciones": 8
          },
          {
            "nombre": "Flexibilidad financiera",
            "acciones": 1
          },
          {
            "nombre": "Metas financieras",
            "acciones": 6
          },
          {
            "nombre": "Resiliencia financiera",
            "acciones": 2
          },
          {
            "nombre": "Seguridad financiera",
            "acciones": 6
          }
        ]
      },
      {
        "id": "funcionamiento",
        "nombre": "Funcionamiento del Sistema de Ahorro para el Retiro",
        "nombreCorto": "Funcionamiento del SAR",
        "total": 34,
        "subtemas": [
          {
            "nombre": "Asesor Previsional",
            "acciones": 3
          },
          {
            "nombre": "Asignación y reasignación",
            "acciones": 2
          },
          {
            "nombre": "Cuenta Afore",
            "acciones": 4
          },
          {
            "nombre": "Cuenta Afore Niños",
            "acciones": 6
          },
          {
            "nombre": "Densidad de cotización",
            "acciones": 2
          },
          {
            "nombre": "Equidad en el retiro",
            "acciones": 2
          },
          {
            "nombre": "Fondo de Pensiones para el Bienestar",
            "acciones": 2
          },
          {
            "nombre": "Modalidades de pensión y requisitos",
            "acciones": 2
          },
          {
            "nombre": "Plusvalía y minusvalía",
            "acciones": 1
          },
          {
            "nombre": "Siefores Generacionales",
            "acciones": 2
          },
          {
            "nombre": "Sistema de Ahorro para el Retiro",
            "acciones": 2
          },
          {
            "nombre": "Tasa de reemplazo",
            "acciones": 2
          },
          {
            "nombre": "Trabajadores Independientes",
            "acciones": 4
          }
        ]
      },
      {
        "id": "tramites",
        "nombre": "Trámites y servicios del Sistema de Ahorro para el Retiro",
        "nombreCorto": "Trámites y servicios",
        "total": 43,
        "subtemas": [
          {
            "nombre": "Ahorro voluntario",
            "acciones": 9
          },
          {
            "nombre": "Beneficiarios",
            "acciones": 3
          },
          {
            "nombre": "Continuación voluntaria",
            "acciones": 3
          },
          {
            "nombre": "Estado de cuenta Afore",
            "acciones": 7
          },
          {
            "nombre": "Expediente de Identificación",
            "acciones": 2
          },
          {
            "nombre": "Localización de cuenta Afore",
            "acciones": 3
          },
          {
            "nombre": "Portabilidad de derechos",
            "acciones": 1
          },
          {
            "nombre": "Registro",
            "acciones": 4
          },
          {
            "nombre": "Retiros parciales",
            "acciones": 5
          },
          {
            "nombre": "Retiros totales",
            "acciones": 4
          },
          {
            "nombre": "Separación de cuentas",
            "acciones": 1
          },
          {
            "nombre": "Unificación de cuentas",
            "acciones": 1
          },
          {
            "nombre": "Evita fraudes en los trámites de retiro",
            "acciones": 0
          }
        ]
      }
    ]
  },
  {
    "id": "pensionissste",
    "nombre": "Afore PENSIONISSSTE",
    "nombreCorto": "PENSIONISSSTE",
    "logo": "img/logos_afores/afore_pensionissste.jpg",
    "pdf": "radiografias_censo_2025/radiografia_pensionissste.pdf",
    "ficha": {
      "totalAcciones": 531,
      "ranking": 2,
      "participacion": 17,
      "subtemasAtendidos": 31,
      "totalSubtemas": 31,
      "cumplimiento": 100
    },
    "perspectivas": {
      "Adultos Mayores": false,
      "Infancias": false,
      "Juventudes": false,
      "Mexicanos en el Exterior": false,
      "Perspectiva de Género": true,
      "Pueblos Originarios": false
    },
    "ejes": [
      {
        "id": "bienestar",
        "nombre": "Bienestar financiero en el presente y futuro",
        "nombreCorto": "Bienestar financiero",
        "total": 87,
        "subtemas": [
          {
            "nombre": "Control financiero",
            "acciones": 38
          },
          {
            "nombre": "Flexibilidad financiera",
            "acciones": 6
          },
          {
            "nombre": "Metas financieras",
            "acciones": 12
          },
          {
            "nombre": "Resiliencia financiera",
            "acciones": 17
          },
          {
            "nombre": "Seguridad financiera",
            "acciones": 14
          }
        ]
      },
      {
        "id": "funcionamiento",
        "nombre": "Funcionamiento del Sistema de Ahorro para el Retiro",
        "nombreCorto": "Funcionamiento del SAR",
        "total": 211,
        "subtemas": [
          {
            "nombre": "Asesor Previsional",
            "acciones": 12
          },
          {
            "nombre": "Asignación y reasignación",
            "acciones": 9
          },
          {
            "nombre": "Cuenta Afore",
            "acciones": 45
          },
          {
            "nombre": "Cuenta Afore Niños",
            "acciones": 8
          },
          {
            "nombre": "Densidad de cotización",
            "acciones": 6
          },
          {
            "nombre": "Equidad en el retiro",
            "acciones": 24
          },
          {
            "nombre": "Fondo de Pensiones para el Bienestar",
            "acciones": 13
          },
          {
            "nombre": "Modalidades de pensión y requisitos",
            "acciones": 45
          },
          {
            "nombre": "Plusvalía y minusvalía",
            "acciones": 8
          },
          {
            "nombre": "Siefores Generacionales",
            "acciones": 7
          },
          {
            "nombre": "Sistema de Ahorro para el Retiro",
            "acciones": 19
          },
          {
            "nombre": "Tasa de reemplazo",
            "acciones": 5
          },
          {
            "nombre": "Trabajadores Independientes",
            "acciones": 10
          }
        ]
      },
      {
        "id": "tramites",
        "nombre": "Trámites y servicios del Sistema de Ahorro para el Retiro",
        "nombreCorto": "Trámites y servicios",
        "total": 233,
        "subtemas": [
          {
            "nombre": "Ahorro voluntario",
            "acciones": 63
          },
          {
            "nombre": "Beneficiarios",
            "acciones": 19
          },
          {
            "nombre": "Continuación voluntaria",
            "acciones": 7
          },
          {
            "nombre": "Estado de cuenta Afore",
            "acciones": 27
          },
          {
            "nombre": "Expediente de Identificación",
            "acciones": 36
          },
          {
            "nombre": "Localización de cuenta Afore",
            "acciones": 11
          },
          {
            "nombre": "Portabilidad de derechos",
            "acciones": 6
          },
          {
            "nombre": "Registro",
            "acciones": 18
          },
          {
            "nombre": "Retiros parciales",
            "acciones": 9
          },
          {
            "nombre": "Retiros totales",
            "acciones": 14
          },
          {
            "nombre": "Separación de cuentas",
            "acciones": 6
          },
          {
            "nombre": "Unificación de cuentas",
            "acciones": 10
          },
          {
            "nombre": "Evita fraudes en los trámites de retiro",
            "acciones": 7
          }
        ]
      }
    ]
  },
  {
    "id": "principal",
    "nombre": "Afore Principal",
    "nombreCorto": "Principal",
    "logo": "img/logos_afores/afore_principal.jpg",
    "pdf": "radiografias_censo_2025/radiografia_principal.pdf",
    "ficha": {
      "totalAcciones": 119,
      "ranking": 8,
      "participacion": 4,
      "subtemasAtendidos": 31,
      "totalSubtemas": 31,
      "cumplimiento": 100
    },
    "perspectivas": {
      "Adultos Mayores": false,
      "Infancias": true,
      "Juventudes": true,
      "Mexicanos en el Exterior": false,
      "Perspectiva de Género": true,
      "Pueblos Originarios": false
    },
    "ejes": [
      {
        "id": "bienestar",
        "nombre": "Bienestar financiero en el presente y futuro",
        "nombreCorto": "Bienestar financiero",
        "total": 21,
        "subtemas": [
          {
            "nombre": "Control financiero",
            "acciones": 4
          },
          {
            "nombre": "Flexibilidad financiera",
            "acciones": 3
          },
          {
            "nombre": "Metas financieras",
            "acciones": 7
          },
          {
            "nombre": "Resiliencia financiera",
            "acciones": 3
          },
          {
            "nombre": "Seguridad financiera",
            "acciones": 4
          }
        ]
      },
      {
        "id": "funcionamiento",
        "nombre": "Funcionamiento del Sistema de Ahorro para el Retiro",
        "nombreCorto": "Funcionamiento del SAR",
        "total": 47,
        "subtemas": [
          {
            "nombre": "Asesor Previsional",
            "acciones": 3
          },
          {
            "nombre": "Asignación y reasignación",
            "acciones": 2
          },
          {
            "nombre": "Cuenta Afore",
            "acciones": 8
          },
          {
            "nombre": "Cuenta Afore Niños",
            "acciones": 2
          },
          {
            "nombre": "Densidad de cotización",
            "acciones": 3
          },
          {
            "nombre": "Equidad en el retiro",
            "acciones": 1
          },
          {
            "nombre": "Fondo de Pensiones para el Bienestar",
            "acciones": 2
          },
          {
            "nombre": "Modalidades de pensión y requisitos",
            "acciones": 11
          },
          {
            "nombre": "Plusvalía y minusvalía",
            "acciones": 5
          },
          {
            "nombre": "Siefores Generacionales",
            "acciones": 3
          },
          {
            "nombre": "Sistema de Ahorro para el Retiro",
            "acciones": 3
          },
          {
            "nombre": "Tasa de reemplazo",
            "acciones": 2
          },
          {
            "nombre": "Trabajadores Independientes",
            "acciones": 2
          }
        ]
      },
      {
        "id": "tramites",
        "nombre": "Trámites y servicios del Sistema de Ahorro para el Retiro",
        "nombreCorto": "Trámites y servicios",
        "total": 51,
        "subtemas": [
          {
            "nombre": "Ahorro voluntario",
            "acciones": 11
          },
          {
            "nombre": "Beneficiarios",
            "acciones": 4
          },
          {
            "nombre": "Continuación voluntaria",
            "acciones": 5
          },
          {
            "nombre": "Estado de cuenta Afore",
            "acciones": 4
          },
          {
            "nombre": "Expediente de Identificación",
            "acciones": 3
          },
          {
            "nombre": "Localización de cuenta Afore",
            "acciones": 2
          },
          {
            "nombre": "Portabilidad de derechos",
            "acciones": 4
          },
          {
            "nombre": "Registro",
            "acciones": 2
          },
          {
            "nombre": "Retiros parciales",
            "acciones": 5
          },
          {
            "nombre": "Retiros totales",
            "acciones": 2
          },
          {
            "nombre": "Separación de cuentas",
            "acciones": 3
          },
          {
            "nombre": "Unificación de cuentas",
            "acciones": 2
          },
          {
            "nombre": "Evita fraudes en los trámites de retiro",
            "acciones": 4
          }
        ]
      }
    ]
  },
  {
    "id": "profuturo",
    "nombre": "Afore Profuturo",
    "nombreCorto": "Profuturo",
    "logo": "img/logos_afores/afore_profuturo.jpg",
    "pdf": "radiografias_censo_2025/radiografia_profuturo.pdf",
    "ficha": {
      "totalAcciones": 477,
      "ranking": 3,
      "participacion": 15,
      "subtemasAtendidos": 31,
      "totalSubtemas": 31,
      "cumplimiento": 100
    },
    "perspectivas": {
      "Adultos Mayores": true,
      "Infancias": true,
      "Juventudes": true,
      "Mexicanos en el Exterior": false,
      "Perspectiva de Género": true,
      "Pueblos Originarios": false
    },
    "ejes": [
      {
        "id": "bienestar",
        "nombre": "Bienestar financiero en el presente y futuro",
        "nombreCorto": "Bienestar financiero",
        "total": 255,
        "subtemas": [
          {
            "nombre": "Control financiero",
            "acciones": 103
          },
          {
            "nombre": "Flexibilidad financiera",
            "acciones": 34
          },
          {
            "nombre": "Metas financieras",
            "acciones": 36
          },
          {
            "nombre": "Resiliencia financiera",
            "acciones": 19
          },
          {
            "nombre": "Seguridad financiera",
            "acciones": 63
          }
        ]
      },
      {
        "id": "funcionamiento",
        "nombre": "Funcionamiento del Sistema de Ahorro para el Retiro",
        "nombreCorto": "Funcionamiento del SAR",
        "total": 125,
        "subtemas": [
          {
            "nombre": "Asesor Previsional",
            "acciones": 3
          },
          {
            "nombre": "Asignación y reasignación",
            "acciones": 4
          },
          {
            "nombre": "Cuenta Afore",
            "acciones": 38
          },
          {
            "nombre": "Cuenta Afore Niños",
            "acciones": 14
          },
          {
            "nombre": "Densidad de cotización",
            "acciones": 5
          },
          {
            "nombre": "Equidad en el retiro",
            "acciones": 16
          },
          {
            "nombre": "Fondo de Pensiones para el Bienestar",
            "acciones": 7
          },
          {
            "nombre": "Modalidades de pensión y requisitos",
            "acciones": 16
          },
          {
            "nombre": "Plusvalía y minusvalía",
            "acciones": 4
          },
          {
            "nombre": "Siefores Generacionales",
            "acciones": 3
          },
          {
            "nombre": "Sistema de Ahorro para el Retiro",
            "acciones": 8
          },
          {
            "nombre": "Tasa de reemplazo",
            "acciones": 3
          },
          {
            "nombre": "Trabajadores Independientes",
            "acciones": 4
          }
        ]
      },
      {
        "id": "tramites",
        "nombre": "Trámites y servicios del Sistema de Ahorro para el Retiro",
        "nombreCorto": "Trámites y servicios",
        "total": 97,
        "subtemas": [
          {
            "nombre": "Ahorro voluntario",
            "acciones": 22
          },
          {
            "nombre": "Beneficiarios",
            "acciones": 5
          },
          {
            "nombre": "Continuación voluntaria",
            "acciones": 3
          },
          {
            "nombre": "Estado de cuenta Afore",
            "acciones": 11
          },
          {
            "nombre": "Expediente de Identificación",
            "acciones": 20
          },
          {
            "nombre": "Localización de cuenta Afore",
            "acciones": 2
          },
          {
            "nombre": "Portabilidad de derechos",
            "acciones": 1
          },
          {
            "nombre": "Registro",
            "acciones": 5
          },
          {
            "nombre": "Retiros parciales",
            "acciones": 11
          },
          {
            "nombre": "Retiros totales",
            "acciones": 4
          },
          {
            "nombre": "Separación de cuentas",
            "acciones": 1
          },
          {
            "nombre": "Unificación de cuentas",
            "acciones": 2
          },
          {
            "nombre": "Evita fraudes en los trámites de retiro",
            "acciones": 10
          }
        ]
      }
    ]
  },
  {
    "id": "sura",
    "nombre": "Afore SURA",
    "nombreCorto": "SURA",
    "logo": "img/logos_afores/afore_sura.jpg",
    "pdf": "radiografias_censo_2025/radiografia_sura.pdf",
    "ficha": {
      "totalAcciones": 270,
      "ranking": 6,
      "participacion": 9,
      "subtemasAtendidos": 31,
      "totalSubtemas": 31,
      "cumplimiento": 100
    },
    "perspectivas": {
      "Adultos Mayores": false,
      "Infancias": true,
      "Juventudes": true,
      "Mexicanos en el Exterior": false,
      "Perspectiva de Género": true,
      "Pueblos Originarios": false
    },
    "ejes": [
      {
        "id": "bienestar",
        "nombre": "Bienestar financiero en el presente y futuro",
        "nombreCorto": "Bienestar financiero",
        "total": 44,
        "subtemas": [
          {
            "nombre": "Control financiero",
            "acciones": 16
          },
          {
            "nombre": "Flexibilidad financiera",
            "acciones": 6
          },
          {
            "nombre": "Metas financieras",
            "acciones": 9
          },
          {
            "nombre": "Resiliencia financiera",
            "acciones": 5
          },
          {
            "nombre": "Seguridad financiera",
            "acciones": 8
          }
        ]
      },
      {
        "id": "funcionamiento",
        "nombre": "Funcionamiento del Sistema de Ahorro para el Retiro",
        "nombreCorto": "Funcionamiento del SAR",
        "total": 132,
        "subtemas": [
          {
            "nombre": "Asesor Previsional",
            "acciones": 5
          },
          {
            "nombre": "Asignación y reasignación",
            "acciones": 5
          },
          {
            "nombre": "Cuenta Afore",
            "acciones": 24
          },
          {
            "nombre": "Cuenta Afore Niños",
            "acciones": 10
          },
          {
            "nombre": "Densidad de cotización",
            "acciones": 5
          },
          {
            "nombre": "Equidad en el retiro",
            "acciones": 27
          },
          {
            "nombre": "Fondo de Pensiones para el Bienestar",
            "acciones": 7
          },
          {
            "nombre": "Modalidades de pensión y requisitos",
            "acciones": 13
          },
          {
            "nombre": "Plusvalía y minusvalía",
            "acciones": 9
          },
          {
            "nombre": "Siefores Generacionales",
            "acciones": 6
          },
          {
            "nombre": "Sistema de Ahorro para el Retiro",
            "acciones": 8
          },
          {
            "nombre": "Tasa de reemplazo",
            "acciones": 6
          },
          {
            "nombre": "Trabajadores Independientes",
            "acciones": 7
          }
        ]
      },
      {
        "id": "tramites",
        "nombre": "Trámites y servicios del Sistema de Ahorro para el Retiro",
        "nombreCorto": "Trámites y servicios",
        "total": 94,
        "subtemas": [
          {
            "nombre": "Ahorro voluntario",
            "acciones": 13
          },
          {
            "nombre": "Beneficiarios",
            "acciones": 10
          },
          {
            "nombre": "Continuación voluntaria",
            "acciones": 5
          },
          {
            "nombre": "Estado de cuenta Afore",
            "acciones": 9
          },
          {
            "nombre": "Expediente de Identificación",
            "acciones": 5
          },
          {
            "nombre": "Localización de cuenta Afore",
            "acciones": 6
          },
          {
            "nombre": "Portabilidad de derechos",
            "acciones": 3
          },
          {
            "nombre": "Registro",
            "acciones": 8
          },
          {
            "nombre": "Retiros parciales",
            "acciones": 11
          },
          {
            "nombre": "Retiros totales",
            "acciones": 10
          },
          {
            "nombre": "Separación de cuentas",
            "acciones": 3
          },
          {
            "nombre": "Unificación de cuentas",
            "acciones": 3
          },
          {
            "nombre": "Evita fraudes en los trámites de retiro",
            "acciones": 8
          }
        ]
      }
    ]
  },
  {
    "id": "xxi-banorte",
    "nombre": "Afore XXI Banorte",
    "nombreCorto": "XXI Banorte",
    "logo": "img/logos_afores/afore_21banorte.jpg",
    "pdf": "radiografias_censo_2025/radiografia_21_banorte.pdf",
    "ficha": {
      "totalAcciones": 647,
      "ranking": 1,
      "participacion": 20,
      "subtemasAtendidos": 31,
      "totalSubtemas": 31,
      "cumplimiento": 100
    },
    "perspectivas": {
      "Adultos Mayores": false,
      "Infancias": false,
      "Juventudes": false,
      "Mexicanos en el Exterior": false,
      "Perspectiva de Género": false,
      "Pueblos Originarios": false
    },
    "ejes": [
      {
        "id": "bienestar",
        "nombre": "Bienestar financiero en el presente y futuro",
        "nombreCorto": "Bienestar financiero",
        "total": 182,
        "subtemas": [
          {
            "nombre": "Control financiero",
            "acciones": 66
          },
          {
            "nombre": "Flexibilidad financiera",
            "acciones": 37
          },
          {
            "nombre": "Metas financieras",
            "acciones": 24
          },
          {
            "nombre": "Resiliencia financiera",
            "acciones": 20
          },
          {
            "nombre": "Seguridad financiera",
            "acciones": 35
          }
        ]
      },
      {
        "id": "funcionamiento",
        "nombre": "Funcionamiento del Sistema de Ahorro para el Retiro",
        "nombreCorto": "Funcionamiento del SAR",
        "total": 254,
        "subtemas": [
          {
            "nombre": "Asesor Previsional",
            "acciones": 18
          },
          {
            "nombre": "Asignación y reasignación",
            "acciones": 17
          },
          {
            "nombre": "Cuenta Afore",
            "acciones": 41
          },
          {
            "nombre": "Cuenta Afore Niños",
            "acciones": 19
          },
          {
            "nombre": "Densidad de cotización",
            "acciones": 15
          },
          {
            "nombre": "Equidad en el retiro",
            "acciones": 24
          },
          {
            "nombre": "Fondo de Pensiones para el Bienestar",
            "acciones": 9
          },
          {
            "nombre": "Modalidades de pensión y requisitos",
            "acciones": 30
          },
          {
            "nombre": "Plusvalía y minusvalía",
            "acciones": 17
          },
          {
            "nombre": "Siefores Generacionales",
            "acciones": 23
          },
          {
            "nombre": "Sistema de Ahorro para el Retiro",
            "acciones": 16
          },
          {
            "nombre": "Tasa de reemplazo",
            "acciones": 16
          },
          {
            "nombre": "Trabajadores Independientes",
            "acciones": 9
          }
        ]
      },
      {
        "id": "tramites",
        "nombre": "Trámites y servicios del Sistema de Ahorro para el Retiro",
        "nombreCorto": "Trámites y servicios",
        "total": 211,
        "subtemas": [
          {
            "nombre": "Ahorro voluntario",
            "acciones": 52
          },
          {
            "nombre": "Beneficiarios",
            "acciones": 21
          },
          {
            "nombre": "Continuación voluntaria",
            "acciones": 12
          },
          {
            "nombre": "Estado de cuenta Afore",
            "acciones": 17
          },
          {
            "nombre": "Expediente de Identificación",
            "acciones": 21
          },
          {
            "nombre": "Localización de cuenta Afore",
            "acciones": 16
          },
          {
            "nombre": "Portabilidad de derechos",
            "acciones": 9
          },
          {
            "nombre": "Registro",
            "acciones": 10
          },
          {
            "nombre": "Retiros parciales",
            "acciones": 17
          },
          {
            "nombre": "Retiros totales",
            "acciones": 13
          },
          {
            "nombre": "Separación de cuentas",
            "acciones": 9
          },
          {
            "nombre": "Unificación de cuentas",
            "acciones": 11
          },
          {
            "nombre": "Evita fraudes en los trámites de retiro",
            "acciones": 3
          }
        ]
      }
    ]
  }
];
