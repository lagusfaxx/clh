/**
 * Mapas de presentación para enums (categoría, era, fuente). Centralizado
 * para que UI y APIs usen los mismos labels e iconos.
 */
export const CATEGORY_META = {
  BATALLA: { label: 'Batalla', short: 'B', color: '#8B3A1F' },
  FUNDACION: { label: 'Fundación', short: 'F', color: '#C9A75C' },
  DESASTRE_NATURAL: { label: 'Desastre natural', short: 'D', color: '#A04E2A' },
  PATRIMONIO: { label: 'Patrimonio', short: 'P', color: '#C9A75C' },
  PUEBLOS_ORIGINARIOS: { label: 'Pueblos originarios', short: 'O', color: '#7B6038' },
  POLITICA: { label: 'Política', short: 'L', color: '#2C4A5C' },
  CULTURA: { label: 'Cultura', short: 'A', color: '#9C7B3F' },
  ECONOMIA: { label: 'Economía', short: 'E', color: '#5C7148' },
  RELIGION: { label: 'Religión', short: 'R', color: '#6B5840' },
  TRANSPORTE: { label: 'Transporte', short: 'T', color: '#4A5868' },
  CIENCIA: { label: 'Ciencia', short: 'C', color: '#3F6B7B' },
} as const

export const ERA_META = {
  PREHISPANICA: {
    label: 'Prehispánica',
    rangeLabel: 'Antes de 1520',
    yearStart: -15000,
    yearEnd: 1519,
  },
  CONQUISTA: {
    label: 'Conquista',
    rangeLabel: '1520 – 1600',
    yearStart: 1520,
    yearEnd: 1600,
  },
  COLONIA: {
    label: 'Colonia',
    rangeLabel: '1600 – 1810',
    yearStart: 1600,
    yearEnd: 1810,
  },
  INDEPENDENCIA: {
    label: 'Independencia',
    rangeLabel: '1810 – 1830',
    yearStart: 1810,
    yearEnd: 1830,
  },
  REPUBLICA_TEMPRANA: {
    label: 'República Temprana',
    rangeLabel: '1830 – 1891',
    yearStart: 1830,
    yearEnd: 1891,
  },
  PARLAMENTARISMO: {
    label: 'Parlamentarismo',
    rangeLabel: '1891 – 1925',
    yearStart: 1891,
    yearEnd: 1925,
  },
  PRESIDENCIALISMO: {
    label: 'Presidencialismo',
    rangeLabel: '1925 – 1973',
    yearStart: 1925,
    yearEnd: 1973,
  },
  DICTADURA: {
    label: 'Dictadura',
    rangeLabel: '1973 – 1990',
    yearStart: 1973,
    yearEnd: 1990,
  },
  TRANSICION: {
    label: 'Transición y siglo XXI',
    rangeLabel: '1990 – presente',
    yearStart: 1990,
    yearEnd: 2026,
  },
} as const

export const SOURCE_TYPE_META = {
  BIBLIOTECA_NACIONAL: 'Biblioteca Nacional de Chile',
  MEMORIA_CHILENA: 'Memoria Chilena',
  ARCHIVO_NACIONAL: 'Archivo Nacional',
  WIKIPEDIA: 'Wikipedia',
  ACADEMIC_PAPER: 'Artículo académico',
  BOOK: 'Libro',
  PRIMARY_DOCUMENT: 'Documento primario',
  OTHER: 'Otra fuente',
} as const

export const REGIONES_CHILE = [
  'Arica y Parinacota',
  'Tarapacá',
  'Antofagasta',
  'Atacama',
  'Coquimbo',
  'Valparaíso',
  'Metropolitana',
  "O'Higgins",
  'Maule',
  'Ñuble',
  'Biobío',
  'La Araucanía',
  'Los Ríos',
  'Los Lagos',
  'Aysén',
  'Magallanes',
] as const

export type Region = (typeof REGIONES_CHILE)[number]
