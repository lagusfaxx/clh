import type { SeedEvent } from '../types'

/**
 * Eventos curados de Santiago Metropolitana.
 *
 * NOTA: Datos placeholder para densidad del MVP. Las descripciones,
 * fechas y coordenadas son aproximaciones cercanas a la realidad
 * histórica documentada pero deben validarse por curador antes de
 * uso público formal.
 *
 * Convenciones:
 * - Coordenadas en formato decimal (WGS84)
 * - Fuentes con cita formal estilo APA
 * - Cuando la fuente exacta no está confirmada, se usa Memoria
 *   Chilena como referencia paraguas
 */

const MC = (slug: string, topic: string) => ({
  type: 'MEMORIA_CHILENA' as const,
  title: `Memoria Chilena — ${topic}`,
  url: `https://www.memoriachilena.gob.cl/602/w3-search.html?q=${encodeURIComponent(slug)}`,
  citation: `Memoria Chilena (s.f.). ${topic}. Biblioteca Nacional Digital de Chile.`,
})

const BN = (title: string, author: string, year: number, signature?: string) => ({
  type: 'BIBLIOTECA_NACIONAL' as const,
  title,
  author,
  year,
  ...(signature ? { signature } : {}),
  citation: `${author} (${year}). ${title}. Biblioteca Nacional de Chile${signature ? `, ${signature}` : ''}.`,
  inPublicDomain: year < 1925,
})

const ARCH = (title: string, author: string, year: number) => ({
  type: 'ARCHIVO_NACIONAL' as const,
  title,
  author,
  year,
  citation: `${author} (${year}). ${title}. Archivo Nacional de Chile.`,
  inPublicDomain: year < 1925,
})

export const SANTIAGO_EVENTS: SeedEvent[] = [
  // =========================================================================
  // PREHISPÁNICA
  // =========================================================================
  {
    slug: 'pukara-chena-1450',
    title: 'Pukara del Cerro Chena',
    shortDesc:
      'Fortaleza inca construida en torno a 1450 sobre el cerro Chena, en el extremo sur del valle del Mapocho.',
    longDesc:
      'El pukara del Cerro Chena es una fortificación inca ubicada en la actual comuna de San Bernardo. Construida hacia 1450 durante la expansión del Tahuantinsuyo bajo Túpac Inca Yupanqui, controlaba el ingreso sur al valle del Mapocho. El sitio incluye recintos de piedra, plataformas y un sistema de muros defensivos. Es uno de los testimonios más australes del dominio inca antes de la llegada hispana.',
    yearStart: 1450,
    category: 'PUEBLOS_ORIGINARIOS',
    era: 'PREHISPANICA',
    latitude: -33.6294,
    longitude: -70.7194,
    region: 'Metropolitana',
    comuna: 'San Bernardo',
    sources: [MC('chena', 'El Pukara del Cerro Chena')],
  },
  {
    slug: 'tambo-cerro-blanco',
    title: 'Tambo Inca de Cerro Blanco',
    shortDesc:
      'Posta inca en las faldas del Cerro Blanco, hito del camino del Inca a su paso por el valle.',
    longDesc:
      'El Cerro Blanco, en la actual comuna de Recoleta, fue un tambo del Qhapaq Ñan que conectaba el norte con el centro de Chile. Era un sitio sagrado para los pueblos picunches y quechuas, asociado a rituales y observación astronómica. Hoy alberga un parque ceremonial mapuche reconocido por el Estado. Está en Av. La Paz con Profesor Zañartu.',
    yearStart: 1480,
    category: 'PUEBLOS_ORIGINARIOS',
    era: 'PREHISPANICA',
    latitude: -33.4128,
    longitude: -70.6411,
    region: 'Metropolitana',
    comuna: 'Recoleta',
    sources: [MC('cerro-blanco', 'Cerro Blanco')],
  },
  {
    slug: 'asentamientos-picunches-mapocho',
    title: 'Asentamientos picunches en el valle del Mapocho',
    shortDesc:
      'Comunidades agrícolas picunches habitaban el valle del Mapocho varios siglos antes de la llegada inca.',
    longDesc:
      'Antes de la conquista inca, el valle central de Chile estaba habitado por pueblos picunches: agricultores sedentarios que cultivaban maíz, papa y quínoa, criaban llamas y desarrollaron alfarería. Vivían en aldeas dispersas a lo largo del Mapocho. Su lengua era el mapudungún y su organización política era de cacicazgos locales.',
    yearStart: 800,
    yearEnd: 1480,
    category: 'PUEBLOS_ORIGINARIOS',
    era: 'PREHISPANICA',
    latitude: -33.45,
    longitude: -70.66,
    region: 'Metropolitana',
    comuna: 'Santiago',
    sources: [MC('picunches', 'Pueblo picunche')],
  },
  {
    slug: 'huelen-cerro-sagrado',
    title: 'Cerro Huelén, sitio sagrado prehispánico',
    shortDesc:
      'El cerro Huelén (hoy Santa Lucía) era considerado sagrado por las comunidades picunches.',
    longDesc:
      'Antes de ser bautizado Santa Lucía por Pedro de Valdivia en 1541, el cerro Huelén era un afloramiento rocoso con valor ceremonial para los habitantes del valle. La voz "huelén" en mapudungún significa "dolor" o "tristeza", aunque algunos cronistas la asocian a observación ritual. Desde su cima se controlaba visualmente el valle entero.',
    yearStart: 1000,
    yearEnd: 1540,
    category: 'PUEBLOS_ORIGINARIOS',
    era: 'PREHISPANICA',
    latitude: -33.4396,
    longitude: -70.6432,
    region: 'Metropolitana',
    comuna: 'Santiago',
    sources: [MC('huelen', 'Cerro Huelén / Santa Lucía')],
  },

  // =========================================================================
  // CONQUISTA (1520 – 1600)
  // =========================================================================
  {
    slug: 'almagro-llega-mapocho-1536',
    title: 'Diego de Almagro arriba al valle del Mapocho',
    shortDesc:
      'En 1536 la hueste de Diego de Almagro alcanza el valle del Mapocho desde Cuzco, en la primera entrada hispana a Chile central.',
    longDesc:
      'Diego de Almagro llega al valle del Mapocho en marzo de 1536, completando la primera expedición hispana al territorio que hoy es Chile central. La fatiga, la falta de oro y los enfrentamientos con los promaucaes lo hicieron retornar al Perú al año siguiente, dejando el camino abierto para la posterior empresa de Pedro de Valdivia.',
    yearStart: 1536,
    category: 'POLITICA',
    era: 'CONQUISTA',
    latitude: -33.45,
    longitude: -70.65,
    region: 'Metropolitana',
    comuna: 'Santiago',
    sources: [
      BN('Cartas de Pedro de Valdivia', 'Pedro de Valdivia', 1545, 'BN-Sala Medina'),
      MC('almagro', 'Diego de Almagro'),
    ],
  },
  {
    slug: 'ataque-michimalonco-1541',
    title: 'Ataque de Michimalonco a Santiago',
    shortDesc:
      'El 11 de septiembre de 1541 los picunches de Michimalonco arrasan la recién fundada villa de Santiago.',
    longDesc:
      'Aprovechando la ausencia de Pedro de Valdivia, las tropas del cacique Michimalonco atacan Santiago el 11 de septiembre de 1541 y queman gran parte de la villa. La defensa heroica de Inés de Suárez —incluido el sacrificio de los caciques rehenes— evita la destrucción total. La ciudad debe reconstruirse desde sus cimientos.',
    yearStart: 1541,
    dateText: '11 de septiembre de 1541',
    category: 'BATALLA',
    era: 'CONQUISTA',
    latitude: -33.4373,
    longitude: -70.6506,
    region: 'Metropolitana',
    comuna: 'Santiago',
    sources: [
      BN('Histórica relación del Reino de Chile', 'Alonso de Ovalle', 1646, 'BN-Sala Medina'),
      MC('michimalonco', 'Ataque de Michimalonco'),
    ],
  },
  {
    slug: 'iglesia-san-francisco-1572',
    title: 'Construcción de la Iglesia de San Francisco',
    shortDesc:
      'La Iglesia de San Francisco, una de las construcciones más antiguas de Santiago aún en pie, finaliza hacia 1572.',
    longDesc:
      'La Iglesia y Convento de San Francisco se levantan en la Alameda como cumplimiento de la promesa de Pedro de Valdivia de erigir un templo a la Virgen del Socorro. La construcción comienza en 1572 con muros de adobe de un metro de espesor y techo de madera. Es la edificación más antigua de Chile que sigue en uso. Hoy alberga el Museo Colonial.',
    yearStart: 1572,
    category: 'RELIGION',
    era: 'CONQUISTA',
    latitude: -33.4427,
    longitude: -70.6452,
    region: 'Metropolitana',
    comuna: 'Santiago',
    sources: [
      BN('Iglesias coloniales de Santiago', 'Eugenio Pereira Salas', 1965, 'BN-726-P436i'),
      MC('san-francisco', 'Iglesia de San Francisco'),
    ],
  },
  {
    slug: 'cabildo-santiago-1541',
    title: 'Primer Cabildo de Santiago',
    shortDesc:
      'El 7 de marzo de 1541 se instala el primer Cabildo de Santiago, primer gobierno municipal de Chile.',
    longDesc:
      'A pocas semanas de fundada la villa, Pedro de Valdivia instala el primer Cabildo en torno a la Plaza Mayor (hoy Plaza de Armas). Los cabildantes —regidores, alcaldes y procurador— se reunían en una casa de adobe en el costado oriente de la plaza. El Cabildo de Santiago sería el principal órgano de poder local durante toda la Colonia.',
    yearStart: 1541,
    dateText: '7 de marzo de 1541',
    category: 'POLITICA',
    era: 'CONQUISTA',
    latitude: -33.4373,
    longitude: -70.6505,
    region: 'Metropolitana',
    comuna: 'Santiago',
    sources: [ARCH('Actas del Cabildo de Santiago', 'Cabildo de Santiago', 1541)],
  },
  {
    slug: 'real-audiencia-santiago-1609',
    title: 'Establecimiento de la Real Audiencia de Santiago',
    shortDesc:
      'En 1609 se instala definitivamente la Real Audiencia de Santiago, máximo tribunal del Reino de Chile.',
    longDesc:
      'Tras un primer intento fallido en 1565 (con sede en Concepción), la Real Audiencia se establece definitivamente en Santiago en 1609. Era el más alto tribunal de justicia del Reino y supervisaba las decisiones del gobernador. Funcionó hasta 1817 cuando fue reemplazada por las instituciones republicanas.',
    yearStart: 1609,
    category: 'POLITICA',
    era: 'CONQUISTA',
    latitude: -33.4385,
    longitude: -70.6515,
    region: 'Metropolitana',
    comuna: 'Santiago',
    sources: [BN('Historia de la Real Audiencia', 'Jaime Eyzaguirre', 1956)],
  },
  {
    slug: 'casa-colorada-1769',
    title: 'Construcción de la Casa Colorada',
    shortDesc:
      'Mateo de Toro y Zambrano construye en 1769 la mansión hoy conocida como Casa Colorada, sede del Museo de Santiago.',
    longDesc:
      'La Casa Colorada fue mandada a construir por Mateo de Toro y Zambrano y Ureta, conde de la Conquista. Está en Merced 860. Su nombre proviene del color rojo de su fachada. Es uno de los pocos ejemplos de arquitectura colonial residencial chilena en pie. En 1810 fue residencia del conde, que presidiría la Primera Junta Nacional de Gobierno. Hoy alberga el Museo de Santiago.',
    yearStart: 1769,
    category: 'PATRIMONIO',
    era: 'COLONIA',
    latitude: -33.4381,
    longitude: -70.6502,
    region: 'Metropolitana',
    comuna: 'Santiago',
    sources: [BN('Casa Colorada', 'Eugenio Pereira Salas', 1972)],
  },

  // =========================================================================
  // COLONIA (1600 – 1810)
  // =========================================================================
  {
    slug: 'terremoto-santiago-1647',
    title: 'Terremoto de Santiago de 1647',
    shortDesc:
      'El "Cristo de Mayo": terremoto del 13 de mayo de 1647 destruye Santiago casi por completo.',
    longDesc:
      'A las 22:30 del 13 de mayo de 1647, un terremoto de magnitud estimada 8.5 sacudió la zona central. Murió cerca de un quinto de la población de Santiago (unos 1.000 de 5.000 habitantes). El Cristo crucificado de la Iglesia de San Agustín quedó milagrosamente intacto entre los escombros, dando origen al culto del Cristo de Mayo, que aún se procesiona cada 13 de mayo.',
    yearStart: 1647,
    dateText: '13 de mayo de 1647',
    category: 'DESASTRE_NATURAL',
    era: 'COLONIA',
    latitude: -33.4378,
    longitude: -70.6492,
    region: 'Metropolitana',
    comuna: 'Santiago',
    featured: true,
    sources: [
      BN('Histórica relación del Reino de Chile', 'Diego de Rosales', 1674, 'BN-Sala Medina'),
      MC('terremoto-1647', 'Terremoto de 1647'),
    ],
  },
  {
    slug: 'incendio-iglesia-compania-1863',
    title: 'Incendio de la Iglesia de la Compañía',
    shortDesc:
      'El 8 de diciembre de 1863, un incendio en la Iglesia de la Compañía deja más de 2.000 muertes, principalmente mujeres.',
    longDesc:
      'Durante la celebración del mes de María, las velas y telas de la decoración prenden fuego en la Iglesia de la Compañía. Las puertas de salida se traban con la multitud apretada. El balance: aproximadamente 2.000 a 3.000 muertos, casi todas mujeres y niñas. Es la mayor tragedia urbana de la historia chilena. La iglesia nunca fue reconstruida; en su lugar se levantó el Edificio del ex-Congreso Nacional.',
    yearStart: 1863,
    dateText: '8 de diciembre de 1863',
    category: 'DESASTRE_NATURAL',
    era: 'REPUBLICA_TEMPRANA',
    latitude: -33.4389,
    longitude: -70.6502,
    region: 'Metropolitana',
    comuna: 'Santiago',
    featured: true,
    sources: [
      BN('La Compañía. Crónica del incendio', 'Benjamín Vicuña Mackenna', 1863, 'BN-983-V632c'),
      MC('compania-incendio', 'Incendio de la Iglesia de la Compañía'),
    ],
  },
  {
    slug: 'casa-moneda-toesca-1805',
    title: 'Inauguración de la Casa de Moneda',
    shortDesc:
      'El 9 de agosto de 1805 se inaugura el Palacio de La Moneda, obra del arquitecto romano Joaquín Toesca.',
    longDesc:
      'La Casa de Moneda fue diseñada por el arquitecto italiano Joaquín Toesca y construida entre 1786 y 1805. Originalmente cumplía funciones de acuñación de monedas. Es el edificio neoclásico más importante de Sudamérica colonial. En 1846 pasó a ser residencia presidencial bajo Manuel Bulnes. Hoy es la sede del gobierno.',
    yearStart: 1805,
    dateText: '9 de agosto de 1805',
    category: 'PATRIMONIO',
    era: 'COLONIA',
    latitude: -33.443,
    longitude: -70.6536,
    region: 'Metropolitana',
    comuna: 'Santiago',
    featured: true,
    sources: [
      BN('Joaquín Toesca, arquitecto', 'Eugenio Pereira Salas', 1965),
      MC('moneda', 'Palacio de La Moneda'),
    ],
  },
  {
    slug: 'tajamares-mapocho-1791',
    title: 'Construcción de los Tajamares del Mapocho',
    shortDesc:
      'Bajo el gobierno de Ambrosio O\'Higgins se construyen los tajamares del río Mapocho entre 1791 y 1808.',
    longDesc:
      'Los tajamares fueron muros de contención de cal y ladrillo construidos en la ribera sur del Mapocho para proteger Santiago de las crecidas que azotaban regularmente la ciudad. Eran obra del gobernador Ambrosio O\'Higgins y del corregidor Manuel de Salas. Sus restos pueden verse aún en el Parque de los Reyes y bajo el Parque Forestal.',
    yearStart: 1791,
    yearEnd: 1808,
    category: 'PATRIMONIO',
    era: 'COLONIA',
    latitude: -33.4327,
    longitude: -70.6535,
    region: 'Metropolitana',
    comuna: 'Santiago',
    sources: [BN('Memoria sobre los tajamares', 'Manuel de Salas', 1801)],
  },
  {
    slug: 'universidad-san-felipe-1738',
    title: 'Fundación de la Real Universidad de San Felipe',
    shortDesc:
      'Felipe V firma en 1738 la cédula de fundación de la Real Universidad de San Felipe en Santiago.',
    longDesc:
      'La Real Universidad de San Felipe fue creada por cédula de Felipe V el 28 de julio de 1738 e inaugurada formalmente en 1747. Funcionó en el solar donde hoy se ubica el Teatro Municipal. Otorgaba grados en Teología, Cánones, Leyes, Medicina, Filosofía y Matemáticas. Fue la antecesora directa de la Universidad de Chile.',
    yearStart: 1738,
    category: 'CIENCIA',
    era: 'COLONIA',
    latitude: -33.4408,
    longitude: -70.648,
    region: 'Metropolitana',
    comuna: 'Santiago',
    sources: [BN('Historia de la Real Universidad', 'José Toribio Medina', 1928)],
  },
  {
    slug: 'iglesia-santo-domingo-1747',
    title: 'Construcción de la Iglesia de Santo Domingo',
    shortDesc:
      'Iniciada en 1747, la actual Iglesia de Santo Domingo es uno de los templos coloniales más importantes de Santiago.',
    longDesc:
      'La cuarta versión del templo dominico de Santiago se inicia en 1747 tras varias destrucciones. Diseñada en estilo barroco con dos torres, fue terminada en 1808. Sus piedras provienen del cerro Welén. Sufrió daños severos en los terremotos de 1822, 1906 y 2010, siempre restaurada. Es Monumento Nacional desde 1951.',
    yearStart: 1747,
    yearEnd: 1808,
    category: 'RELIGION',
    era: 'COLONIA',
    latitude: -33.4361,
    longitude: -70.6519,
    region: 'Metropolitana',
    comuna: 'Santiago',
    sources: [MC('santo-domingo', 'Iglesia de Santo Domingo')],
  },
  {
    slug: 'catedral-metropolitana-1748',
    title: 'Construcción de la Catedral Metropolitana',
    shortDesc:
      'La actual Catedral Metropolitana de Santiago se construye entre 1748 y 1800 sobre las ruinas de versiones anteriores.',
    longDesc:
      'La Catedral Metropolitana, sede del arzobispado, ocupa el costado poniente de la Plaza de Armas desde la fundación. La actual edificación es la quinta y última, iniciada en 1748 por el jesuita bávaro Pedro Vogl y concluida en 1800. Su frontis neoclásico data de 1856 y fue obra del italiano Ignazio Cremonesi. Es Monumento Nacional desde 1951.',
    yearStart: 1748,
    yearEnd: 1800,
    category: 'RELIGION',
    era: 'COLONIA',
    latitude: -33.4374,
    longitude: -70.6516,
    region: 'Metropolitana',
    comuna: 'Santiago',
    sources: [BN('Historia de la Catedral de Santiago', 'Carlos Silva Cotapos', 1923)],
  },
  {
    slug: 'cementerio-general-1821',
    title: 'Fundación del Cementerio General',
    shortDesc:
      'En 1821 se inaugura el Cementerio General de Santiago, primer camposanto laico del país.',
    longDesc:
      'Inaugurado el 9 de diciembre de 1821 por orden de Bernardo O\'Higgins, el Cementerio General fue el primer camposanto que aceptaba a no católicos en Chile. Reemplazó la práctica colonial de enterrar a los difuntos en el atrio de las iglesias. Sus 86 hectáreas albergan tumbas de presidentes, escritores e importantes figuras de la historia nacional, entre ellos Salvador Allende y Violeta Parra.',
    yearStart: 1821,
    dateText: '9 de diciembre de 1821',
    category: 'PATRIMONIO',
    era: 'INDEPENDENCIA',
    latitude: -33.4111,
    longitude: -70.6533,
    region: 'Metropolitana',
    comuna: 'Recoleta',
    sources: [MC('cementerio-general', 'Cementerio General de Santiago')],
  },
  {
    slug: 'plaza-armas-fundacion',
    title: 'Trazado de la Plaza de Armas',
    shortDesc:
      'La Plaza de Armas, núcleo urbano de Santiago desde la fundación, sigue siendo el corazón simbólico de la ciudad.',
    longDesc:
      'Definida por Pedro de Gamboa en el trazado original de Santiago en 1541, la Plaza de Armas o Plaza Mayor fue desde el inicio el centro político, religioso y comercial de la ciudad. La rodean la Catedral, el Palacio de los Gobernadores (hoy Correos), el Cabildo (hoy Museo Histórico Nacional) y la Casa Colorada. Las palmeras y bancos del paseo actual datan del siglo XIX.',
    yearStart: 1541,
    category: 'FUNDACION',
    era: 'CONQUISTA',
    latitude: -33.4373,
    longitude: -70.6506,
    region: 'Metropolitana',
    comuna: 'Santiago',
    sources: [BN('Plaza de Armas de Santiago', 'Eugenio Pereira Salas', 1968)],
  },

  // =========================================================================
  // INDEPENDENCIA (1810 – 1830)
  // =========================================================================
  {
    slug: 'primera-junta-1810',
    title: 'Primera Junta Nacional de Gobierno',
    shortDesc:
      'El 18 de septiembre de 1810 se instala en el Cabildo de Santiago la Primera Junta Nacional de Gobierno.',
    longDesc:
      'En el contexto de la captura de Fernando VII por Napoleón, una Junta de Notables se reúne en el Cabildo de Santiago el 18 de septiembre de 1810. Presidida por Mateo de Toro y Zambrano, declara la lealtad a Fernando VII pero asume el gobierno autónomo. Es el inicio formal del proceso de Independencia chilena, fecha que se conmemora como día nacional.',
    yearStart: 1810,
    dateText: '18 de septiembre de 1810',
    category: 'POLITICA',
    era: 'INDEPENDENCIA',
    latitude: -33.4378,
    longitude: -70.6504,
    region: 'Metropolitana',
    comuna: 'Santiago',
    featured: true,
    sources: [
      BN('Diario de don Manuel de Salas', 'Manuel de Salas', 1810, 'BN-Sala Medina'),
      MC('primera-junta', 'Primera Junta de Gobierno'),
    ],
  },
  {
    slug: 'aurora-de-chile-1812',
    title: 'Publicación de la Aurora de Chile',
    shortDesc:
      'El 13 de febrero de 1812 aparece la Aurora de Chile, primer periódico nacional, dirigido por Camilo Henríquez.',
    longDesc:
      'La Aurora de Chile fue el primer periódico publicado en territorio chileno. Su primer número apareció el 13 de febrero de 1812, impreso en la prensa que José Miguel Carrera había hecho traer desde Estados Unidos. Camilo Henríquez fue su director y principal redactor. Difundía ideas de la Ilustración y de la independencia. Se publicó hasta 1813.',
    yearStart: 1812,
    dateText: '13 de febrero de 1812',
    category: 'CULTURA',
    era: 'INDEPENDENCIA',
    latitude: -33.439,
    longitude: -70.65,
    region: 'Metropolitana',
    comuna: 'Santiago',
    sources: [
      BN('La Aurora de Chile', 'Camilo Henríquez', 1812, 'BN-Sala Medina'),
      MC('aurora-de-chile', 'La Aurora de Chile'),
    ],
  },
  {
    slug: 'reconquista-1814',
    title: 'Entrada del ejército español tras Rancagua',
    shortDesc:
      'Tras la derrota patriota en Rancagua, el ejército español entra a Santiago el 5 de octubre de 1814.',
    longDesc:
      'Tras la derrota patriota en el Desastre de Rancagua (octubre 1814), Santiago queda indefensa. El ejército realista al mando de Mariano Osorio entra el 5 de octubre. Bernardo O\'Higgins y los líderes patriotas huyen a Mendoza. Comienza el período de la Reconquista, marcado por persecuciones, confiscaciones y el confinamiento de patriotas en Juan Fernández.',
    yearStart: 1814,
    dateText: '5 de octubre de 1814',
    category: 'POLITICA',
    era: 'INDEPENDENCIA',
    latitude: -33.45,
    longitude: -70.65,
    region: 'Metropolitana',
    comuna: 'Santiago',
    sources: [BN('Historia general de Chile', 'Diego Barros Arana', 1894)],
  },
  {
    slug: 'batalla-maipu-1818',
    title: 'Batalla de Maipú',
    shortDesc:
      'El 5 de abril de 1818 se decide la independencia de Chile en la batalla de Maipú, a las afueras de Santiago.',
    longDesc:
      'En el llano de Maipú, a 17 km del centro de Santiago, José de San Martín derrota al ejército realista de Mariano Osorio el 5 de abril de 1818. La victoria sella definitivamente la independencia chilena. El célebre "Abrazo de Maipú" entre San Martín y O\'Higgins, ya herido, ocurre al término de la batalla. Hoy el sitio es Monumento Nacional con el Templo Votivo de Maipú.',
    yearStart: 1818,
    dateText: '5 de abril de 1818',
    category: 'BATALLA',
    era: 'INDEPENDENCIA',
    latitude: -33.5077,
    longitude: -70.7706,
    region: 'Metropolitana',
    comuna: 'Maipú',
    featured: true,
    sources: [
      BN('Memorias del general San Martín', 'José de San Martín', 1820, 'BN-Sala Medina'),
      MC('maipu', 'Batalla de Maipú'),
    ],
  },
  {
    slug: 'acta-independencia-1818',
    title: 'Proclamación de la Independencia',
    shortDesc:
      'Bernardo O\'Higgins proclama formalmente la independencia de Chile en Concepción y Talca, hecho ratificado en Santiago.',
    longDesc:
      'El Acta de Independencia se firma en Talca el 12 de febrero de 1818. La ceremonia oficial en Santiago se realiza el mismo día con desfile militar y solemnidad. Se elimina toda referencia al rey de España y se declara a Chile como Estado libre, independiente y soberano. La fecha coincide con el aniversario de la fundación de Santiago.',
    yearStart: 1818,
    dateText: '12 de febrero de 1818',
    category: 'POLITICA',
    era: 'INDEPENDENCIA',
    latitude: -33.443,
    longitude: -70.6536,
    region: 'Metropolitana',
    comuna: 'Santiago',
    sources: [ARCH('Acta de Independencia', 'Gobierno de Chile', 1818)],
  },
  {
    slug: 'abdicacion-ohiggins-1823',
    title: 'Abdicación de Bernardo O\'Higgins',
    shortDesc:
      'Presionado por la oligarquía, O\'Higgins abdica el 28 de enero de 1823 y parte al exilio en Perú.',
    longDesc:
      'Tras seis años como Director Supremo, Bernardo O\'Higgins enfrenta creciente oposición de la aristocracia santiaguina por sus reformas (fin a los títulos de nobleza, libertad de vientres). Ante la inminencia de un alzamiento militar, abdica el 28 de enero de 1823 en una ceremonia en La Moneda. Parte al exilio en Perú, donde muere en 1842 sin volver a Chile.',
    yearStart: 1823,
    dateText: '28 de enero de 1823',
    category: 'POLITICA',
    era: 'INDEPENDENCIA',
    latitude: -33.443,
    longitude: -70.6536,
    region: 'Metropolitana',
    comuna: 'Santiago',
    sources: [BN('Vida de O\'Higgins', 'Miguel Luis Amunátegui', 1882)],
  },

  // =========================================================================
  // REPÚBLICA TEMPRANA (1830 – 1891)
  // =========================================================================
  {
    slug: 'constitucion-1833',
    title: 'Promulgación de la Constitución de 1833',
    shortDesc:
      'El 25 de mayo de 1833 se promulga la Constitución redactada por Mariano Egaña y Manuel José Gandarillas.',
    longDesc:
      'La Constitución de 1833 instaura el régimen presidencialista conservador que organizó Chile durante 92 años. Establece amplios poderes para el Presidente, voto censitario, religión católica oficial. Fue obra de la facción pelucona liderada por Diego Portales. Rigió hasta 1925 y modeló buena parte de la institucionalidad chilena.',
    yearStart: 1833,
    dateText: '25 de mayo de 1833',
    category: 'POLITICA',
    era: 'REPUBLICA_TEMPRANA',
    latitude: -33.4385,
    longitude: -70.6515,
    region: 'Metropolitana',
    comuna: 'Santiago',
    sources: [BN('La Constitución de 1833', 'Alberto Edwards', 1928)],
  },
  {
    slug: 'universidad-de-chile-1842',
    title: 'Fundación de la Universidad de Chile',
    shortDesc:
      'El 19 de noviembre de 1842 se promulga la ley que crea la Universidad de Chile, sucesora de la Real Universidad de San Felipe.',
    longDesc:
      'La Universidad de Chile fue creada por la ley del 19 de noviembre de 1842, durante el gobierno de Manuel Bulnes. Su primer Rector fue el venezolano Andrés Bello. La sede original estaba en el solar del actual Teatro Municipal; en 1872 se trasladó a la Casa Central de la Alameda. Es la institución universitaria más antigua e influyente del país.',
    yearStart: 1842,
    dateText: '19 de noviembre de 1842',
    category: 'CIENCIA',
    era: 'REPUBLICA_TEMPRANA',
    latitude: -33.4434,
    longitude: -70.6493,
    region: 'Metropolitana',
    comuna: 'Santiago',
    sources: [BN('Historia de la Universidad de Chile', 'Domingo Amunátegui', 1928)],
  },
  {
    slug: 'andres-bello-llega-1829',
    title: 'Llegada de Andrés Bello a Chile',
    shortDesc:
      'En junio de 1829 llega a Chile el venezolano Andrés Bello, quien marcará la cultura nacional del siglo XIX.',
    longDesc:
      'Andrés Bello arriba a Valparaíso en junio de 1829 invitado por el gobierno. Será autor del Código Civil chileno de 1855, primer Rector de la Universidad de Chile, fundador de la gramática hispanoamericana y figura central de la cultura del siglo XIX. Murió en Santiago en 1865 y está enterrado en el Cementerio General.',
    yearStart: 1829,
    category: 'CULTURA',
    era: 'REPUBLICA_TEMPRANA',
    latitude: -33.4434,
    longitude: -70.6493,
    region: 'Metropolitana',
    comuna: 'Santiago',
    sources: [BN('Vida de Andrés Bello', 'Miguel Luis Amunátegui', 1882)],
  },
  {
    slug: 'mercado-central-1872',
    title: 'Inauguración del Mercado Central',
    shortDesc:
      'El 15 de septiembre de 1872 se inaugura el Mercado Central, símbolo de la modernización urbana decimonónica.',
    longDesc:
      'Diseñado por Manuel Aldunate y construido con estructura metálica fabricada en Inglaterra (firma R. Laidlaw & Son), el Mercado Central reemplazó el antiguo Mercado del Riachuelo. Su techumbre de hierro es uno de los ejemplos pioneros de arquitectura industrial en Chile. Hasta hoy mantiene su uso original como mercado de pescados, mariscos, frutas y verduras.',
    yearStart: 1872,
    dateText: '15 de septiembre de 1872',
    category: 'PATRIMONIO',
    era: 'REPUBLICA_TEMPRANA',
    latitude: -33.4332,
    longitude: -70.6505,
    region: 'Metropolitana',
    comuna: 'Santiago',
    sources: [MC('mercado-central', 'Mercado Central de Santiago')],
  },
  {
    slug: 'estacion-central-1857',
    title: 'Inauguración de la Estación Central',
    shortDesc:
      'El 14 de septiembre de 1857 parte el primer tren desde la Estación Alameda (luego Central) a Valparaíso.',
    longDesc:
      'La estación original de Alameda fue inaugurada en 1857 con el primer tramo a San Bernardo. La actual estructura de hierro y vidrio fue diseñada por el francés Schneider et Cie. y construida entre 1897 y 1900. La Estación Central, en Alameda 3170, conectó a Santiago con Valparaíso (1863) y posteriormente con todo el sur del país (Puerto Montt en 1913). Es Monumento Nacional desde 1983.',
    yearStart: 1857,
    dateText: '14 de septiembre de 1857',
    category: 'TRANSPORTE',
    era: 'REPUBLICA_TEMPRANA',
    latitude: -33.452,
    longitude: -70.6788,
    region: 'Metropolitana',
    comuna: 'Estación Central',
    sources: [BN('Los ferrocarriles de Chile', 'Santiago Marín Vicuña', 1916)],
  },
  {
    slug: 'biblioteca-nacional-fundacion-1813',
    title: 'Fundación de la Biblioteca Nacional',
    shortDesc:
      'El 19 de agosto de 1813 se funda la Biblioteca Nacional de Chile por iniciativa de la Junta de Gobierno.',
    longDesc:
      'La Biblioteca Nacional fue creada por la Junta de Gobierno el 19 de agosto de 1813, una de las instituciones más antiguas del Estado chileno. Su fundación fue impulsada por Camilo Henríquez. Inicialmente tuvo sedes provisorias hasta inaugurar su edificio actual en la Alameda en 1925. Hoy custodia más de 6 millones de piezas documentales.',
    yearStart: 1813,
    dateText: '19 de agosto de 1813',
    category: 'CULTURA',
    era: 'INDEPENDENCIA',
    latitude: -33.4413,
    longitude: -70.6502,
    region: 'Metropolitana',
    comuna: 'Santiago',
    sources: [BN('Historia de la Biblioteca Nacional', 'Guillermo Feliú Cruz', 1963)],
  },
  {
    slug: 'museo-bellas-artes-1880',
    title: 'Inauguración del Museo Nacional de Bellas Artes',
    shortDesc:
      'El Museo Nacional de Bellas Artes inicia funciones en 1880 y se traslada a su edificio actual en 1910.',
    longDesc:
      'El Museo Nacional de Bellas Artes fue creado en 1880 como Museo de Pinturas, en dependencias del Congreso Nacional. Su edificio actual en el Parque Forestal fue inaugurado el 21 de septiembre de 1910 como obra emblemática del Centenario, diseñado por el arquitecto francés Émile Jéquier. Es el museo de arte más antiguo de Sudamérica.',
    yearStart: 1880,
    category: 'CULTURA',
    era: 'REPUBLICA_TEMPRANA',
    latitude: -33.4357,
    longitude: -70.6395,
    region: 'Metropolitana',
    comuna: 'Santiago',
    sources: [MC('mnba', 'Museo Nacional de Bellas Artes')],
  },
  {
    slug: 'club-hipico-1869',
    title: 'Fundación del Club Hípico de Santiago',
    shortDesc:
      'El 20 de septiembre de 1869 se inaugura el Club Hípico, escenario de las carreras de caballos en Santiago.',
    longDesc:
      'El Club Hípico nace en 1869 por iniciativa de la oligarquía santiaguina. La sede actual en avenida Blanco Encalada se inauguró en 1923 con tribuna art déco diseñada por Josué Smith Solar. Es escenario tradicional del Derby de Chile, principal evento hípico del país. Es Monumento Histórico desde 1995.',
    yearStart: 1869,
    dateText: '20 de septiembre de 1869',
    category: 'CULTURA',
    era: 'REPUBLICA_TEMPRANA',
    latitude: -33.4683,
    longitude: -70.6747,
    region: 'Metropolitana',
    comuna: 'Santiago',
    sources: [MC('club-hipico', 'Club Hípico de Santiago')],
  },
  {
    slug: 'tranvias-1857',
    title: 'Primer tranvía a sangre',
    shortDesc:
      'El 14 de septiembre de 1857 inicia operaciones el primer tranvía a sangre de Santiago, tirado por caballos.',
    longDesc:
      'Concesionado a la Empresa de Tracción Eléctrica de Santiago, los primeros "carros americanos" tirados por caballos circulan por la Alameda en septiembre de 1857. Tres décadas después, en 1900, se inaugura el sistema eléctrico operado por el British Tramway Co. La red llegó a tener 144 km y 200 carros. Funcionó hasta 1959, reemplazada por trolleybuses y autobuses.',
    yearStart: 1857,
    category: 'TRANSPORTE',
    era: 'REPUBLICA_TEMPRANA',
    latitude: -33.443,
    longitude: -70.65,
    region: 'Metropolitana',
    comuna: 'Santiago',
    sources: [MC('tranvias', 'Tranvías de Santiago')],
  },
  {
    slug: 'parque-cousino-1873',
    title: 'Inauguración del Parque Cousiño (O\'Higgins)',
    shortDesc:
      'El 18 de septiembre de 1873 se inaugura el Parque Cousiño, donado a la ciudad por Luis Cousiño.',
    longDesc:
      'Conocido hoy como Parque O\'Higgins (renombrado en 1971), fue una donación del empresario Luis Cousiño Squella. Sus 80 hectáreas hicieron de él el segundo gran parque público de Santiago tras la Quinta Normal. Cuenta con el Pueblito de Inka Eyzaguirre, el Movilandia y el Velódromo. Es escenario tradicional de las celebraciones de Fiestas Patrias en la capital.',
    yearStart: 1873,
    dateText: '18 de septiembre de 1873',
    category: 'PATRIMONIO',
    era: 'REPUBLICA_TEMPRANA',
    latitude: -33.4609,
    longitude: -70.6603,
    region: 'Metropolitana',
    comuna: 'Santiago',
    sources: [MC('parque-cousino', 'Parque Cousiño / Parque O\'Higgins')],
  },
  {
    slug: 'el-mercurio-fundacion-1900',
    title: 'Fundación de El Mercurio de Santiago',
    shortDesc:
      'El 1 de junio de 1900 Agustín Edwards Mac-Clure funda El Mercurio de Santiago.',
    longDesc:
      'Agustín Edwards Mac-Clure funda El Mercurio de Santiago en 1900, replicando el modelo del periódico homónimo de Valparaíso (1827, el más antiguo en castellano del mundo aún en circulación). Su sede en el Edificio del Mercurio en la Alameda es Monumento Histórico. El diario fue por décadas el más influyente del país.',
    yearStart: 1900,
    dateText: '1 de junio de 1900',
    category: 'CULTURA',
    era: 'PARLAMENTARISMO',
    latitude: -33.4339,
    longitude: -70.6438,
    region: 'Metropolitana',
    comuna: 'Santiago',
    sources: [MC('el-mercurio', 'El Mercurio de Santiago')],
  },
  {
    slug: 'agua-potable-1865',
    title: 'Llegada del agua potable a Santiago',
    shortDesc:
      'En 1865 se inaugura el primer sistema de agua potable de Santiago captando aguas del río Mapocho.',
    longDesc:
      'El primer sistema de agua potable de Santiago entra en funcionamiento en 1865 bajo la dirección del ingeniero norteamericano Henry Meiggs. Captaba agua del Mapocho y la distribuía mediante cañerías de fierro fundido a través de 200 km de redes. Reemplazó las antiguas pilas y aguateros que cubrían la demanda colonial.',
    yearStart: 1865,
    category: 'CIENCIA',
    era: 'REPUBLICA_TEMPRANA',
    latitude: -33.45,
    longitude: -70.66,
    region: 'Metropolitana',
    comuna: 'Santiago',
    sources: [BN('Henry Meiggs y los ferrocarriles', 'Watt Stewart', 1946)],
  },

  // =========================================================================
  // PARLAMENTARISMO (1891 – 1925)
  // =========================================================================
  {
    slug: 'guerra-civil-1891',
    title: 'Guerra Civil de 1891 y suicidio de Balmaceda',
    shortDesc:
      'Tras la derrota de sus tropas, el presidente José Manuel Balmaceda se suicida en la Legación Argentina el 19 de septiembre de 1891.',
    longDesc:
      'La Guerra Civil de 1891 enfrentó al Congreso (apoyado por la Marina) contra el presidente José Manuel Balmaceda. Tras las batallas de Concón y Placilla, el bando congresista entró triunfante a Santiago el 28 de agosto. Balmaceda se refugió en la Legación Argentina y se suicidó el 19 de septiembre, último día de su mandato constitucional. Inicia el período parlamentario chileno.',
    yearStart: 1891,
    dateText: '19 de septiembre de 1891',
    category: 'POLITICA',
    era: 'PARLAMENTARISMO',
    latitude: -33.443,
    longitude: -70.6536,
    region: 'Metropolitana',
    comuna: 'Santiago',
    featured: true,
    sources: [BN('La revolución de 1891', 'Joaquín Villarino', 1893)],
  },
  {
    slug: 'parque-forestal-1905',
    title: 'Inauguración del Parque Forestal',
    shortDesc:
      'En 1905 se inaugura el Parque Forestal en la ribera sur del Mapocho, obra de embellecimiento del Centenario.',
    longDesc:
      'Diseñado por el paisajista francés Georges Dubois sobre los terrenos ganados al Mapocho tras la canalización de 1888-1891, el Parque Forestal se inaugura como parte de los preparativos del Centenario. Sus 28 hectáreas albergan el Museo de Bellas Artes, el Museo de Arte Contemporáneo y la Plaza Italia. Es uno de los espacios públicos más concurridos de Santiago.',
    yearStart: 1905,
    category: 'PATRIMONIO',
    era: 'PARLAMENTARISMO',
    latitude: -33.4351,
    longitude: -70.6403,
    region: 'Metropolitana',
    comuna: 'Santiago',
    sources: [MC('parque-forestal', 'Parque Forestal')],
  },
  {
    slug: 'centenario-1910',
    title: 'Celebraciones del Centenario',
    shortDesc:
      'Septiembre de 1910: las fiestas del Centenario marcan el apogeo de la oligarquía y de la arquitectura monumental.',
    longDesc:
      'Las celebraciones del Centenario de la Independencia, en septiembre de 1910, llegan en pleno auge salitrero. Se inauguran el Museo de Bellas Artes, la Estación Mapocho (parcialmente), monumentos como el de O\'Higgins ecuestre, y se reciben delegaciones extranjeras. Pero la fiesta queda eclipsada por la muerte del presidente Pedro Montt en septiembre y la del vicepresidente Elías Fernández Albano días después.',
    yearStart: 1910,
    dateText: '18 de septiembre de 1910',
    category: 'POLITICA',
    era: 'PARLAMENTARISMO',
    latitude: -33.443,
    longitude: -70.65,
    region: 'Metropolitana',
    comuna: 'Santiago',
    sources: [BN('El Centenario de Chile', 'Domingo Amunátegui', 1911)],
  },
  {
    slug: 'club-de-la-union-1925',
    title: 'Edificio del Club de la Unión',
    shortDesc:
      'El actual Club de la Unión, en la Alameda, se inaugura en 1925 como sede de la elite social masculina.',
    longDesc:
      'El Club de la Unión fue fundado en 1864 y ocupó varios edificios. La sede actual en Alameda 1091 esquina Bandera, obra del arquitecto Alberto Cruz Montt, se inauguró en 1925. Su estilo neoclásico, mármol italiano y salones imponentes lo hicieron símbolo de la oligarquía. Hasta hoy mantiene su carácter de club privado masculino.',
    yearStart: 1925,
    category: 'PATRIMONIO',
    era: 'PARLAMENTARISMO',
    latitude: -33.4421,
    longitude: -70.6536,
    region: 'Metropolitana',
    comuna: 'Santiago',
    sources: [MC('club-union', 'Club de la Unión')],
  },
  {
    slug: 'primer-auto-santiago-1903',
    title: 'Primer automóvil en Santiago',
    shortDesc:
      'El 13 de marzo de 1903 circula el primer automóvil en Santiago, un De Dion-Bouton francés.',
    longDesc:
      'El 13 de marzo de 1903 don Francisco Cousiño Goyenechea exhibe en Santiago el primer automóvil del país, un De Dion-Bouton modelo 1900 importado desde Francia. La novedad causa sensación y arranca el lento desplazamiento de los carruajes y tranvías. En 1910 ya circulan unos 200 autos en la capital. Hoy son más de 1,5 millones.',
    yearStart: 1903,
    dateText: '13 de marzo de 1903',
    category: 'TRANSPORTE',
    era: 'PARLAMENTARISMO',
    latitude: -33.443,
    longitude: -70.65,
    region: 'Metropolitana',
    comuna: 'Santiago',
    sources: [MC('automovil', 'Llegada del automóvil')],
  },
  {
    slug: 'universidad-catolica-1888',
    title: 'Fundación de la Universidad Católica',
    shortDesc:
      'El 21 de junio de 1888, el arzobispo Mariano Casanova funda la Pontificia Universidad Católica de Chile.',
    longDesc:
      'La Pontificia Universidad Católica de Chile fue fundada por el arzobispo Mariano Casanova el 21 de junio de 1888 como respuesta del catolicismo al laicismo de la Universidad de Chile. Su Casa Central en Alameda 340 fue inaugurada en 1910. Es la segunda universidad más antigua del país y una de las más prestigiosas de Latinoamérica.',
    yearStart: 1888,
    dateText: '21 de junio de 1888',
    category: 'CIENCIA',
    era: 'REPUBLICA_TEMPRANA',
    latitude: -33.4414,
    longitude: -70.6378,
    region: 'Metropolitana',
    comuna: 'Santiago',
    sources: [MC('uc', 'Pontificia Universidad Católica de Chile')],
  },
  {
    slug: 'tranvias-electricos-1900',
    title: 'Inauguración de los tranvías eléctricos',
    shortDesc:
      'En 1900 los tranvías eléctricos reemplazan a los de tracción animal en Santiago.',
    longDesc:
      'El 2 de septiembre de 1900 se inaugura el sistema de tranvías eléctricos operado por el British Tramway Co. con cables aéreos. Los carros tirados por caballos quedaron rápidamente obsoletos. La red eléctrica llegó a sumar 144 km y transportaba 100 millones de pasajeros al año. Operó hasta 1959.',
    yearStart: 1900,
    dateText: '2 de septiembre de 1900',
    category: 'TRANSPORTE',
    era: 'PARLAMENTARISMO',
    latitude: -33.443,
    longitude: -70.65,
    region: 'Metropolitana',
    comuna: 'Santiago',
    sources: [MC('tranvias-electricos', 'Tranvías eléctricos')],
  },
  {
    slug: 'cerro-san-cristobal-virgen-1908',
    title: 'Inauguración de la Virgen del Cerro San Cristóbal',
    shortDesc:
      'El 26 de abril de 1908 se inaugura la Virgen Inmaculada Concepción en la cumbre del cerro San Cristóbal.',
    longDesc:
      'La estatua de la Virgen Inmaculada Concepción de 22 metros de altura coronando el cerro San Cristóbal fue donación del arzobispo Mariano Casanova. Fundida en Francia y transportada en piezas desmontables, fue ensamblada y bendecida el 26 de abril de 1908. El cerro se transformó en parque metropolitano (722 hectáreas) y es uno de los pulmones verdes de Santiago.',
    yearStart: 1908,
    dateText: '26 de abril de 1908',
    category: 'RELIGION',
    era: 'PARLAMENTARISMO',
    latitude: -33.4257,
    longitude: -70.631,
    region: 'Metropolitana',
    comuna: 'Recoleta',
    sources: [MC('san-cristobal', 'Cerro San Cristóbal')],
  },
  {
    slug: 'huelga-obrera-1905',
    title: 'Huelga de la carne',
    shortDesc:
      'En octubre de 1905 una huelga obrera por el alza del impuesto a la carne deriva en represión y muertos.',
    longDesc:
      'El 22 de octubre de 1905, miles de obreros marchan a La Moneda exigiendo eliminar el impuesto a la carne argentina. La represión policial deja entre 70 y 250 muertos, dependiendo de la fuente. Es uno de los episodios más sangrientos de la "cuestión social" en Chile y marca el ascenso del movimiento obrero organizado.',
    yearStart: 1905,
    dateText: '22 de octubre de 1905',
    category: 'POLITICA',
    era: 'PARLAMENTARISMO',
    latitude: -33.443,
    longitude: -70.6536,
    region: 'Metropolitana',
    comuna: 'Santiago',
    sources: [MC('huelga-carne', 'Huelga de la carne, 1905')],
  },

  // =========================================================================
  // PRESIDENCIALISMO (1925 – 1973)
  // =========================================================================
  {
    slug: 'constitucion-1925',
    title: 'Promulgación de la Constitución de 1925',
    shortDesc:
      'El 18 de septiembre de 1925 se promulga la Constitución que terminó con el régimen parlamentario.',
    longDesc:
      'La Constitución de 1925 fue promulgada por Arturo Alessandri Palma tras un período de inestabilidad política. Restituyó el régimen presidencialista, separó la Iglesia del Estado, reconoció derechos sociales y estableció la dieta parlamentaria. Rigió hasta el golpe de 1973 y fue base institucional del Chile moderno por casi 50 años.',
    yearStart: 1925,
    dateText: '18 de septiembre de 1925',
    category: 'POLITICA',
    era: 'PRESIDENCIALISMO',
    latitude: -33.443,
    longitude: -70.6536,
    region: 'Metropolitana',
    comuna: 'Santiago',
    sources: [BN('La Constitución de 1925', 'Carlos Estévez', 1939)],
  },
  {
    slug: 'estadio-nacional-1938',
    title: 'Inauguración del Estadio Nacional',
    shortDesc:
      'El 3 de diciembre de 1938 se inaugura el Estadio Nacional de Ñuñoa, el más grande del país.',
    longDesc:
      'Diseñado por los arquitectos Aníbal Fuentealba, Roberto Dávila y Ricardo Müller, inspirados en el Estadio Olímpico de Berlín de 1936, el Estadio Nacional se inaugura el 3 de diciembre de 1938 en Av. Grecia 2001, Ñuñoa. Su capacidad original era de 70.000 espectadores. Fue sede de la final del Mundial 1962 y del Centenario del fútbol chileno. En 1973 se transformó tristemente en centro de detención y tortura.',
    yearStart: 1938,
    dateText: '3 de diciembre de 1938',
    category: 'CULTURA',
    era: 'PRESIDENCIALISMO',
    latitude: -33.4647,
    longitude: -70.6113,
    region: 'Metropolitana',
    comuna: 'Ñuñoa',
    featured: true,
    sources: [MC('estadio-nacional', 'Estadio Nacional Julio Martínez Prádanos')],
  },
  {
    slug: 'mundial-futbol-1962',
    title: 'Mundial de Fútbol 1962',
    shortDesc:
      'Del 30 de mayo al 17 de junio de 1962, Chile organiza la Copa Mundial de Fútbol con sede principal en Santiago.',
    longDesc:
      'Tras el terremoto de 1960, Chile organiza el VII Mundial de Fútbol con la frase emblema "porque no tenemos nada, queremos hacerlo todo". Brasil se corona campeón derrotando a Checoslovaquia 3-1 en la final del Estadio Nacional. Chile obtiene el tercer lugar, su mejor desempeño histórico. La "Batalla de Santiago" entre Chile e Italia queda como uno de los partidos más violentos de la historia mundialista.',
    yearStart: 1962,
    dateText: '30 de mayo al 17 de junio de 1962',
    category: 'CULTURA',
    era: 'PRESIDENCIALISMO',
    latitude: -33.4647,
    longitude: -70.6113,
    region: 'Metropolitana',
    comuna: 'Ñuñoa',
    featured: true,
    sources: [MC('mundial-1962', 'Mundial de Fútbol 1962')],
  },
  {
    slug: 'aeropuerto-cerrillos-1929',
    title: 'Inauguración del Aeropuerto de Los Cerrillos',
    shortDesc:
      'El 27 de febrero de 1929 abre Los Cerrillos, primer aeropuerto comercial de Santiago.',
    longDesc:
      'El Aeropuerto Internacional Los Cerrillos fue inaugurado el 27 de febrero de 1929 y operó como principal terminal aérea de Santiago hasta 1967. Tras la apertura de Pudahuel, mantuvo operaciones comerciales menores y militares. Cerró definitivamente en 2006 y sus terrenos fueron destinados a un proyecto urbano.',
    yearStart: 1929,
    yearEnd: 2006,
    category: 'TRANSPORTE',
    era: 'PRESIDENCIALISMO',
    latitude: -33.49,
    longitude: -70.7028,
    region: 'Metropolitana',
    comuna: 'Cerrillos',
    sources: [MC('cerrillos', 'Aeropuerto Los Cerrillos')],
  },
  {
    slug: 'corfo-fundacion-1939',
    title: 'Fundación de la CORFO',
    shortDesc:
      'El 29 de abril de 1939 se crea la Corporación de Fomento de la Producción (CORFO) tras el terremoto de Chillán.',
    longDesc:
      'La Corporación de Fomento de la Producción (CORFO) fue creada por la Ley 6.334 del 29 de abril de 1939 durante el gobierno de Pedro Aguirre Cerda como respuesta al terremoto de Chillán. Impulsó la industrialización, fundó CAP, ENDESA, ENAP y la siderúrgica de Huachipato. Fue el motor del modelo de "Estado emprendedor" que rigió hasta 1973.',
    yearStart: 1939,
    dateText: '29 de abril de 1939',
    category: 'ECONOMIA',
    era: 'PRESIDENCIALISMO',
    latitude: -33.4263,
    longitude: -70.6157,
    region: 'Metropolitana',
    comuna: 'Providencia',
    sources: [BN('CORFO, 25 años', 'CORFO', 1964)],
  },
  {
    slug: 'frente-popular-1938',
    title: 'Triunfo del Frente Popular',
    shortDesc:
      'El 25 de octubre de 1938 Pedro Aguirre Cerda gana la presidencia con el lema "Gobernar es educar".',
    longDesc:
      'El Frente Popular —alianza de radicales, socialistas y comunistas— triunfa con Pedro Aguirre Cerda por estrecho margen sobre el conservador Gustavo Ross. Su gobierno (1938-1941, hasta su muerte) impulsa la educación pública, la industrialización vía CORFO y la cobertura social. Es la primera victoria de la izquierda en Chile y un hito mundial en la línea del Frente Popular francés.',
    yearStart: 1938,
    dateText: '25 de octubre de 1938',
    category: 'POLITICA',
    era: 'PRESIDENCIALISMO',
    latitude: -33.443,
    longitude: -70.6536,
    region: 'Metropolitana',
    comuna: 'Santiago',
    sources: [MC('frente-popular', 'Frente Popular')],
  },
  {
    slug: 'aeropuerto-pudahuel-1967',
    title: 'Inauguración del Aeropuerto Pudahuel',
    shortDesc:
      'El 9 de febrero de 1967 abre el Aeropuerto Comodoro Arturo Merino Benítez en Pudahuel.',
    longDesc:
      'El Aeropuerto Internacional Comodoro Arturo Merino Benítez se inauguró el 9 de febrero de 1967, reemplazando a Los Cerrillos como principal terminal aérea del país. Diseñado para 800.000 pasajeros anuales, hoy moviliza más de 24 millones (2019). Su nombre honra al fundador de la Línea Aérea Nacional. Es el aeropuerto con mayor tráfico de Sudamérica del Pacífico.',
    yearStart: 1967,
    dateText: '9 de febrero de 1967',
    category: 'TRANSPORTE',
    era: 'PRESIDENCIALISMO',
    latitude: -33.3927,
    longitude: -70.7857,
    region: 'Metropolitana',
    comuna: 'Pudahuel',
    sources: [MC('pudahuel', 'Aeropuerto Pudahuel')],
  },
  {
    slug: 'reforma-agraria-1962',
    title: 'Inicio de la Reforma Agraria',
    shortDesc:
      'En 1962 el gobierno de Jorge Alessandri promulga la primera Ley de Reforma Agraria.',
    longDesc:
      'La Ley 15.020 de 1962 inició la Reforma Agraria, un proceso de redistribución de la tierra que se profundizó bajo Frei Montalva (1967) y Allende (1971). Hasta 1973 se expropiaron unas 10 millones de hectáreas. El golpe militar revirtió parcialmente el proceso. La reforma agraria transformó la estructura social del campo chileno.',
    yearStart: 1962,
    yearEnd: 1973,
    category: 'POLITICA',
    era: 'PRESIDENCIALISMO',
    latitude: -33.443,
    longitude: -70.6536,
    region: 'Metropolitana',
    comuna: 'Santiago',
    sources: [BN('La Reforma Agraria chilena', 'José Bengoa', 1983)],
  },
  {
    slug: 'asume-allende-1970',
    title: 'Asume Salvador Allende',
    shortDesc:
      'El 4 de noviembre de 1970 Salvador Allende asume la presidencia, primera vía electoral marxista al poder.',
    longDesc:
      'Salvador Allende asume la presidencia el 4 de noviembre de 1970 tras ganar las elecciones por mayoría relativa con 36,6% (sobre Alessandri 35,3% y Tomic 28%). Su gobierno de la Unidad Popular impulsa la "vía chilena al socialismo": nacionalización del cobre, profundización de la reforma agraria, estatización de empresas. Murió el 11 de septiembre de 1973 durante el golpe.',
    yearStart: 1970,
    dateText: '4 de noviembre de 1970',
    category: 'POLITICA',
    era: 'PRESIDENCIALISMO',
    latitude: -33.443,
    longitude: -70.6536,
    region: 'Metropolitana',
    comuna: 'Santiago',
    featured: true,
    sources: [MC('allende-1970', 'Asunción de Salvador Allende')],
  },
  {
    slug: 'tanquetazo-1973',
    title: 'Tanquetazo del 29 de junio',
    shortDesc:
      'El 29 de junio de 1973 el coronel Roberto Souper intenta un golpe fallido contra Allende.',
    longDesc:
      'Conocido como "Tanquetazo", este alzamiento del Regimiento Blindado N°2 al mando del coronel Roberto Souper fue el primer intento serio de derrocar a Allende mediante las armas. Fracasó por la oposición del general Carlos Prats, comandante en jefe. Murieron 22 personas alrededor de La Moneda. El éxito posterior del golpe del 11 de septiembre se gestaba en estos meses.',
    yearStart: 1973,
    dateText: '29 de junio de 1973',
    category: 'POLITICA',
    era: 'PRESIDENCIALISMO',
    latitude: -33.443,
    longitude: -70.6536,
    region: 'Metropolitana',
    comuna: 'Santiago',
    sources: [MC('tanquetazo', 'Tanquetazo de 1973')],
  },
  {
    slug: 'caso-schneider-1970',
    title: 'Asesinato del general René Schneider',
    shortDesc:
      'El 22 de octubre de 1970 muere baleado el comandante del Ejército, René Schneider, en un atentado golpista.',
    longDesc:
      'El general René Schneider, comandante en jefe del Ejército y defensor de la "Doctrina Schneider" (sumisión militar al poder civil), fue baleado el 22 de octubre de 1970 en Avenida Vital Apoquindo. Murió tres días después. El atentado, planeado por grupos de extrema derecha con apoyo de la CIA, buscaba impedir la asunción de Allende. La investigación llevó años y reveló intervención estadounidense.',
    yearStart: 1970,
    dateText: '22 de octubre de 1970',
    category: 'POLITICA',
    era: 'PRESIDENCIALISMO',
    latitude: -33.4136,
    longitude: -70.5894,
    region: 'Metropolitana',
    comuna: 'Las Condes',
    sources: [BN('Caso Schneider', 'Diario La Tercera', 2000)],
  },
  {
    slug: 'unctad-iii-1972',
    title: 'UNCTAD III en Santiago',
    shortDesc:
      'En abril-mayo de 1972 Santiago acoge la III Conferencia de las Naciones Unidas sobre Comercio y Desarrollo.',
    longDesc:
      'La UNCTAD III se realizó en Santiago entre abril y mayo de 1972, reuniendo a 141 países. Para acoger la conferencia se construyó en tiempo récord (275 días) el Edificio Diego Portales (hoy Centro Cultural Gabriela Mistral, GAM). El evento fue tribuna del gobierno de Allende y momento de visibilidad internacional para el proyecto de la Unidad Popular.',
    yearStart: 1972,
    dateText: 'abril-mayo de 1972',
    category: 'POLITICA',
    era: 'PRESIDENCIALISMO',
    latitude: -33.4395,
    longitude: -70.6361,
    region: 'Metropolitana',
    comuna: 'Santiago',
    sources: [MC('unctad', 'UNCTAD III, 1972')],
  },

  // =========================================================================
  // DICTADURA (1973 – 1990)
  // =========================================================================
  {
    slug: 'estadio-nacional-prision-1973',
    title: 'Estadio Nacional como centro de detención',
    shortDesc:
      'Tras el golpe del 11 de septiembre de 1973, el Estadio Nacional se convierte en el mayor centro de detención del país.',
    longDesc:
      'Entre el 11 de septiembre y el 9 de noviembre de 1973, el Estadio Nacional albergó como prisioneros a unas 20.000 personas. Allí fueron torturados, ejecutados y desaparecidos numerosos detenidos, entre ellos el cantautor Víctor Jara. Hoy una placa y el "Camarín 8" (museo) recuerdan a las víctimas. En 2003 fue declarado Monumento Nacional como sitio de memoria.',
    yearStart: 1973,
    yearEnd: 1973,
    dateText: '11 de septiembre al 9 de noviembre de 1973',
    category: 'POLITICA',
    era: 'DICTADURA',
    latitude: -33.4647,
    longitude: -70.6113,
    region: 'Metropolitana',
    comuna: 'Ñuñoa',
    featured: true,
    sources: [
      ARCH('Informe Rettig', 'Comisión Nacional de Verdad y Reconciliación', 1991),
      MC('estadio-nacional-prision', 'Estadio Nacional, 1973'),
    ],
  },
  {
    slug: 'villa-grimaldi-1974',
    title: 'Villa Grimaldi como centro de tortura',
    shortDesc:
      'Entre 1974 y 1978, Villa Grimaldi fue el principal centro de tortura de la DINA en Santiago.',
    longDesc:
      'La Villa Grimaldi (Cuartel Terranova) en Peñalolén fue el cuartel general operativo de la DINA. Por allí pasaron unas 4.500 personas, de las cuales 226 desaparecieron o fueron ejecutadas. Hoy es Parque por la Paz, sitio de memoria abierto al público. Sus jardines y muros están reconstruidos con los nombres de las víctimas.',
    yearStart: 1974,
    yearEnd: 1978,
    category: 'POLITICA',
    era: 'DICTADURA',
    latitude: -33.4506,
    longitude: -70.5722,
    region: 'Metropolitana',
    comuna: 'Peñalolén',
    featured: true,
    sources: [
      ARCH('Informe Rettig', 'Comisión Nacional de Verdad y Reconciliación', 1991),
      ARCH('Informe Valech', 'Comisión Nacional sobre Prisión Política y Tortura', 2004),
    ],
  },
  {
    slug: 'caso-letelier-1976',
    title: 'Asesinato de Orlando Letelier en Washington',
    shortDesc:
      'El 21 de septiembre de 1976 muere asesinado en Washington Orlando Letelier, ex canciller de Allende.',
    longDesc:
      'Una bomba colocada en su auto por agentes de la DINA mata a Orlando Letelier y su asistente Ronni Moffitt en Washington DC el 21 de septiembre de 1976. Letelier había sido canciller, embajador y ministro de Defensa de Allende. El crimen fue ordenado por Manuel Contreras y ejecutado por Michael Townley. Es uno de los casos más graves de la Operación Cóndor.',
    yearStart: 1976,
    dateText: '21 de septiembre de 1976',
    category: 'POLITICA',
    era: 'DICTADURA',
    latitude: -33.443,
    longitude: -70.6536,
    region: 'Metropolitana',
    comuna: 'Santiago',
    sources: [
      ARCH('Caso Letelier', 'Tribunal de Estados Unidos', 1979),
      MC('caso-letelier', 'Asesinato de Orlando Letelier'),
    ],
  },
  {
    slug: 'plebiscito-1988',
    title: 'Plebiscito del 5 de octubre de 1988',
    shortDesc:
      'El 5 de octubre de 1988 el "NO" gana el plebiscito y abre el camino al fin de la dictadura.',
    longDesc:
      'Convocado por la Constitución de 1980, el plebiscito del 5 de octubre de 1988 enfrentó a quienes querían continuar a Pinochet ("SÍ") y a quienes pedían elecciones libres ("NO"). Triunfó el NO con 55,99% sobre 44,01%. La Concertación de Partidos por el NO, liderada por la franja electoral creada por Eugenio García, logró movilizar al electorado pese a la asimetría de recursos. Marca el inicio de la transición.',
    yearStart: 1988,
    dateText: '5 de octubre de 1988',
    category: 'POLITICA',
    era: 'DICTADURA',
    latitude: -33.443,
    longitude: -70.6536,
    region: 'Metropolitana',
    comuna: 'Santiago',
    featured: true,
    sources: [MC('plebiscito-1988', 'Plebiscito de 1988')],
  },
  {
    slug: 'atentado-pinochet-1986',
    title: 'Atentado al general Pinochet',
    shortDesc:
      'El 7 de septiembre de 1986 el Frente Patriótico Manuel Rodríguez intenta asesinar a Pinochet en El Melocotón.',
    longDesc:
      'En la Operación Siglo XX, comandos del FPMR atacaron la caravana de Pinochet en el Cajón del Maipo el 7 de septiembre de 1986. Murieron cinco escoltas, pero Pinochet salvó ileso. La represalia incluyó el secuestro y ejecución de cinco opositores en la "Operación Albania". El intento fallido reforzó la imagen mística de Pinochet entre sus partidarios.',
    yearStart: 1986,
    dateText: '7 de septiembre de 1986',
    category: 'POLITICA',
    era: 'DICTADURA',
    latitude: -33.7561,
    longitude: -70.2789,
    region: 'Metropolitana',
    comuna: 'San José de Maipo',
    sources: [BN('Operación Siglo XX', 'Patricia Verdugo', 1989)],
  },
  {
    slug: 'caso-degollados-1985',
    title: 'Caso Degollados',
    shortDesc:
      'El 30 de marzo de 1985 son secuestrados y degollados tres profesionales comunistas: Manuel Guerrero, José Manuel Parada y Santiago Nattino.',
    longDesc:
      'En el "Caso Degollados", agentes de Carabineros (DICOMCAR) secuestraron a Manuel Guerrero (frente a un colegio de Providencia), José Manuel Parada (sociólogo de la Vicaría) y Santiago Nattino (publicista). Sus cuerpos fueron encontrados degollados en el camino a Quilicura el 30 de marzo. El caso provocó la renuncia del general César Mendoza de la Junta Militar.',
    yearStart: 1985,
    dateText: '30 de marzo de 1985',
    category: 'POLITICA',
    era: 'DICTADURA',
    latitude: -33.3667,
    longitude: -70.7283,
    region: 'Metropolitana',
    comuna: 'Quilicura',
    sources: [ARCH('Caso Degollados', 'Vicaría de la Solidaridad', 1985)],
  },
  {
    slug: 'apagon-1981',
    title: 'Gran apagón de Santiago',
    shortDesc:
      'El 14 de mayo de 1981 un atentado eléctrico deja a Santiago a oscuras durante varias horas.',
    longDesc:
      'El Frente Patriótico Manuel Rodríguez derribó torres de alta tensión en la zona central, dejando a Santiago y el centro-sur del país sin electricidad por varias horas el 14 de mayo de 1981. Fue una de las primeras acciones de gran impacto del FPMR. El apagón se repitió varias veces durante la dictadura como forma de protesta armada.',
    yearStart: 1981,
    dateText: '14 de mayo de 1981',
    category: 'POLITICA',
    era: 'DICTADURA',
    latitude: -33.45,
    longitude: -70.65,
    region: 'Metropolitana',
    comuna: 'Santiago',
    sources: [MC('apagon-1981', 'Apagón de Santiago')],
  },
  {
    slug: 'vicaria-solidaridad-1976',
    title: 'Fundación de la Vicaría de la Solidaridad',
    shortDesc:
      'El 1 de enero de 1976 el cardenal Raúl Silva Henríquez funda la Vicaría de la Solidaridad.',
    longDesc:
      'Heredera del Comité de Cooperación para la Paz en Chile, la Vicaría de la Solidaridad fue creada por el cardenal Raúl Silva Henríquez tras la disolución forzada del Comité por la dictadura. Funcionó en el costado de la Catedral. Defendió a víctimas de violaciones de derechos humanos, dio asistencia legal y registró miles de casos. Su archivo es Memoria del Mundo (UNESCO, 2003).',
    yearStart: 1976,
    yearEnd: 1992,
    dateText: '1 de enero de 1976',
    category: 'RELIGION',
    era: 'DICTADURA',
    latitude: -33.4378,
    longitude: -70.6498,
    region: 'Metropolitana',
    comuna: 'Santiago',
    featured: true,
    sources: [
      ARCH('Archivo de la Vicaría', 'Vicaría de la Solidaridad', 1992),
      MC('vicaria', 'Vicaría de la Solidaridad'),
    ],
  },

  // =========================================================================
  // TRANSICIÓN (1990 – 2026)
  // =========================================================================
  {
    slug: 'aylwin-asume-1990',
    title: 'Asume Patricio Aylwin: vuelta a la democracia',
    shortDesc:
      'El 11 de marzo de 1990 Patricio Aylwin asume la presidencia, recibiendo la banda de Pinochet en el Congreso.',
    longDesc:
      'Tras 17 años de dictadura, Patricio Aylwin asume la Presidencia el 11 de marzo de 1990 en el nuevo Congreso de Valparaíso. Recibe la banda presidencial directamente de Augusto Pinochet. Su gobierno (1990-1994) fue el primero de la Concertación e inició la transición democrática, con la Comisión Verdad y Reconciliación (Informe Rettig) como piedra angular.',
    yearStart: 1990,
    dateText: '11 de marzo de 1990',
    category: 'POLITICA',
    era: 'TRANSICION',
    latitude: -33.443,
    longitude: -70.6536,
    region: 'Metropolitana',
    comuna: 'Santiago',
    featured: true,
    sources: [MC('aylwin', 'Patricio Aylwin Azócar')],
  },
  {
    slug: 'metro-linea-1-1975',
    title: 'Inauguración del Metro de Santiago',
    shortDesc:
      'El 15 de septiembre de 1975 se inaugura la Línea 1 del Metro entre San Pablo y Salvador.',
    longDesc:
      'El Metro de Santiago abrió su primera línea el 15 de septiembre de 1975, durante la dictadura. La Línea 1 conecta el oriente y poniente de la ciudad por toda la Alameda. Hoy la red tiene 7 líneas, 136 estaciones y transporta más de 2,5 millones de pasajeros diarios. Es uno de los metros más extensos de Latinoamérica.',
    yearStart: 1975,
    dateText: '15 de septiembre de 1975',
    category: 'TRANSPORTE',
    era: 'DICTADURA',
    latitude: -33.4423,
    longitude: -70.6515,
    region: 'Metropolitana',
    comuna: 'Santiago',
    featured: true,
    sources: [MC('metro', 'Metro de Santiago')],
  },
  {
    slug: 'costanera-center-2012',
    title: 'Inauguración del Costanera Center',
    shortDesc:
      'El 12 de junio de 2012 se inaugura el Costanera Center, con la Gran Torre Santiago de 300 metros.',
    longDesc:
      'El Costanera Center es un complejo comercial y de oficinas en Providencia desarrollado por Grupo Cencosud. Incluye la Gran Torre Santiago de 300 metros (62 pisos), edificio más alto de Latinoamérica al momento de su inauguración el 12 de junio de 2012. Diseñado por el arquitecto argentino-estadounidense César Pelli. El mall comercial abrió en abril de 2012. Está en Andrés Bello 2425.',
    yearStart: 2012,
    dateText: '12 de junio de 2012',
    category: 'PATRIMONIO',
    era: 'TRANSICION',
    latitude: -33.4172,
    longitude: -70.6062,
    region: 'Metropolitana',
    comuna: 'Providencia',
    sources: [MC('costanera-center', 'Costanera Center')],
  },
  {
    slug: 'estallido-social-2019',
    title: 'Estallido social del 18 de octubre',
    shortDesc:
      'El 18 de octubre de 2019 estudiantes evaden el Metro y desencadenan la mayor movilización social desde 1990.',
    longDesc:
      'A partir del alza del pasaje del Metro y de las evasiones masivas estudiantiles, el 18 de octubre de 2019 estalla en Santiago la mayor crisis social del Chile postdictadura. Quema de estaciones de Metro, marchas masivas (1,2 millones en Plaza Italia), violaciones de DDHH por Carabineros, decreto de estado de emergencia. Derivó en el plebiscito del 25 de octubre de 2020 a favor de una nueva Constitución.',
    yearStart: 2019,
    dateText: '18 de octubre de 2019',
    category: 'POLITICA',
    era: 'TRANSICION',
    latitude: -33.4372,
    longitude: -70.6346,
    region: 'Metropolitana',
    comuna: 'Santiago',
    featured: true,
    sources: [
      ARCH('Informe Comisión Estallido Social', 'INDH', 2020),
      MC('estallido-social', 'Estallido social de 2019'),
    ],
  },
  {
    slug: 'plaza-dignidad-2019',
    title: 'Plaza Italia / Plaza Dignidad',
    shortDesc:
      'La Plaza Italia (Plaza Baquedano) se convierte en epicentro simbólico del estallido social como Plaza Dignidad.',
    longDesc:
      'Conocida oficialmente como Plaza Baquedano y popularmente como Plaza Italia, durante el estallido social fue rebautizada por los manifestantes como "Plaza Dignidad". Cada viernes se concentraron miles de personas. La estatua del general Manuel Baquedano fue removida en marzo de 2021 para preservación tras meses de daños. Hoy sigue siendo símbolo de la movilización social.',
    yearStart: 2019,
    category: 'POLITICA',
    era: 'TRANSICION',
    latitude: -33.4368,
    longitude: -70.6342,
    region: 'Metropolitana',
    comuna: 'Santiago',
    sources: [MC('plaza-italia', 'Plaza Italia')],
  },
  {
    slug: 'gam-2010',
    title: 'Inauguración del Centro Cultural GAM',
    shortDesc:
      'El 11 de septiembre de 2010 se inaugura el Centro Cultural Gabriela Mistral en el ex-Diego Portales.',
    longDesc:
      'Tras un incendio en 2006 que destruyó parte del antiguo Edificio Diego Portales (sede de la UNCTAD III en 1972 y luego de la Junta Militar), el espacio fue rediseñado por los arquitectos Cristián Fernández y Lateral. Como Centro Cultural Gabriela Mistral (GAM) fue inaugurado el 11 de septiembre de 2010 en el bicentenario. Es el principal espacio escénico y cultural del centro.',
    yearStart: 2010,
    dateText: '11 de septiembre de 2010',
    category: 'CULTURA',
    era: 'TRANSICION',
    latitude: -33.4395,
    longitude: -70.6361,
    region: 'Metropolitana',
    comuna: 'Santiago',
    sources: [MC('gam', 'Centro Cultural Gabriela Mistral')],
  },
  {
    slug: 'pandemia-covid-2020',
    title: 'Pandemia de COVID-19 en Santiago',
    shortDesc:
      'En marzo de 2020 llega la pandemia de COVID-19 a Chile; Santiago entra en cuarentena obligatoria desde mayo.',
    longDesc:
      'El primer caso de COVID-19 en Chile se confirma el 3 de marzo de 2020 en Talca. La Región Metropolitana entra en cuarentena obligatoria total desde mayo. Hospitales colapsan, especialmente en Santiago. Entre 2020 y 2023 mueren más de 65.000 personas. La pandemia paraliza la economía, suspende clases por 18 meses y exige acceso masivo a vacunas (Chile fue líder mundial en vacunación).',
    yearStart: 2020,
    yearEnd: 2023,
    category: 'POLITICA',
    era: 'TRANSICION',
    latitude: -33.45,
    longitude: -70.65,
    region: 'Metropolitana',
    comuna: 'Santiago',
    sources: [
      ARCH('Plan Paso a Paso', 'Ministerio de Salud', 2020),
      MC('covid', 'Pandemia COVID-19 en Chile'),
    ],
  },
  {
    slug: 'plebiscito-2020',
    title: 'Plebiscito constitucional de 2020',
    shortDesc:
      'El 25 de octubre de 2020 el "Apruebo" gana con 78% el plebiscito por una nueva Constitución.',
    longDesc:
      'Tras el estallido social, el Acuerdo por la Paz Social y la Nueva Constitución (15 noviembre 2019) convocó a un plebiscito de entrada. Se realizó el 25 de octubre de 2020. La opción Apruebo obtuvo 78,3%, y "Convención Constitucional" 79%. Es la mayoría más amplia en una elección democrática chilena. Inauguró el proceso constituyente 2021-2022.',
    yearStart: 2020,
    dateText: '25 de octubre de 2020',
    category: 'POLITICA',
    era: 'TRANSICION',
    latitude: -33.443,
    longitude: -70.6536,
    region: 'Metropolitana',
    comuna: 'Santiago',
    sources: [ARCH('Resultados plebiscito 2020', 'Servicio Electoral de Chile', 2020)],
  },
  {
    slug: 'boric-presidente-2022',
    title: 'Asume Gabriel Boric',
    shortDesc:
      'El 11 de marzo de 2022 Gabriel Boric asume la presidencia con 36 años, el mandatario más joven de Chile.',
    longDesc:
      'Gabriel Boric, ex líder estudiantil de 2011 y diputado por Magallanes, gana la segunda vuelta del 19 de diciembre de 2021 sobre José Antonio Kast con 55,87%. Asume la presidencia el 11 de marzo de 2022. Es el presidente más joven de la historia de Chile (36 años) y el primero del Frente Amplio. Lidera una coalición de izquierda con apoyo del Partido Comunista.',
    yearStart: 2022,
    dateText: '11 de marzo de 2022',
    category: 'POLITICA',
    era: 'TRANSICION',
    latitude: -33.443,
    longitude: -70.6536,
    region: 'Metropolitana',
    comuna: 'Santiago',
    sources: [MC('boric', 'Gabriel Boric Font')],
  },
  {
    slug: 'plebiscito-rechazo-2022',
    title: 'Plebiscito de salida 2022',
    shortDesc:
      'El 4 de septiembre de 2022 el "Rechazo" gana con 61,9% el plebiscito por la nueva Constitución propuesta.',
    longDesc:
      'La Convención Constitucional, electa en mayo de 2021 y presidida por Elisa Loncón inicialmente, redactó una nueva Constitución entregada el 4 de julio de 2022. En el plebiscito de salida del 4 de septiembre de 2022, el Rechazo obtuvo 61,9% sobre el Apruebo (38,1%). Fue un revés histórico al proyecto progresista. En 2023, un nuevo Consejo Constitucional propuso otro texto, también rechazado en diciembre.',
    yearStart: 2022,
    dateText: '4 de septiembre de 2022',
    category: 'POLITICA',
    era: 'TRANSICION',
    latitude: -33.443,
    longitude: -70.6536,
    region: 'Metropolitana',
    comuna: 'Santiago',
    sources: [ARCH('Resultados plebiscito constitucional 2022', 'Servel', 2022)],
  },
  {
    slug: 'aniversario-50-golpe-2023',
    title: '50 años del golpe de Estado',
    shortDesc:
      'El 11 de septiembre de 2023 se conmemoran los 50 años del golpe de Estado de 1973.',
    longDesc:
      'El gobierno de Gabriel Boric organizó una serie de actos conmemorativos en torno a los 50 años del golpe de Estado de 1973. La ceremonia central en La Moneda incluyó la firma del "Compromiso por la Democracia y el Nunca Más" por presidentes de varios países latinoamericanos. La fecha reactivó el debate público sobre la memoria, los derechos humanos y los responsables aún sin condena.',
    yearStart: 2023,
    dateText: '11 de septiembre de 2023',
    category: 'POLITICA',
    era: 'TRANSICION',
    latitude: -33.443,
    longitude: -70.6536,
    region: 'Metropolitana',
    comuna: 'Santiago',
    featured: true,
    sources: [ARCH('Compromiso por la Democracia', 'Gobierno de Chile', 2023)],
  },

  // =========================================================================
  // BARRIOS Y LUGARES PATRIMONIALES
  // =========================================================================
  {
    slug: 'barrio-paris-londres-1923',
    title: 'Barrio París-Londres',
    shortDesc:
      'En 1923 se inaugura el Barrio París-Londres, conjunto urbano europeizante en pleno centro de Santiago.',
    longDesc:
      'El Barrio París-Londres fue construido entre 1923 y 1929 sobre los terrenos del antiguo huerto del convento de San Francisco. Lo proyectaron Ernesto Holzmann y Roberto Arancibia con calles curvas y casas estilo francés y georgiano. Es uno de los pocos conjuntos urbanos coherentes de su época en Santiago. Es Zona Típica desde 1982.',
    yearStart: 1923,
    yearEnd: 1929,
    category: 'PATRIMONIO',
    era: 'PARLAMENTARISMO',
    latitude: -33.4423,
    longitude: -70.648,
    region: 'Metropolitana',
    comuna: 'Santiago',
    sources: [MC('paris-londres', 'Barrio París-Londres')],
  },
  {
    slug: 'barrio-yungay-1839',
    title: 'Fundación del Barrio Yungay',
    shortDesc:
      'El 5 de abril de 1839 se funda oficialmente el Barrio Yungay para conmemorar la Batalla de Yungay.',
    longDesc:
      'El Barrio Yungay fue el primer barrio fundado oficialmente en Santiago, el 5 de abril de 1839, conmemorando la Batalla de Yungay (Perú) que selló la victoria chilena sobre la Confederación Perú-Boliviana. La Plaza Yungay y el monumento al "Roto Chileno" son sus hitos. Hoy es Zona Típica y conserva mansiones del siglo XIX.',
    yearStart: 1839,
    dateText: '5 de abril de 1839',
    category: 'PATRIMONIO',
    era: 'REPUBLICA_TEMPRANA',
    latitude: -33.4391,
    longitude: -70.6711,
    region: 'Metropolitana',
    comuna: 'Santiago',
    sources: [MC('yungay', 'Barrio Yungay')],
  },
  {
    slug: 'barrio-bellavista',
    title: 'Barrio Bellavista, ribera bohemia',
    shortDesc:
      'Bellavista, en la ribera norte del Mapocho, es desde el siglo XX el barrio bohemio y cultural de Santiago.',
    longDesc:
      'El Barrio Bellavista creció a fines del siglo XIX como zona popular junto al cerro San Cristóbal. En el siglo XX se transformó en epicentro bohemio: vivieron allí Pablo Neruda (La Chascona), Camilo Mori y muchos artistas. Hoy combina la Patio Bellavista, restaurantes, galerías y night clubs. Es Zona Típica.',
    yearStart: 1880,
    category: 'CULTURA',
    era: 'REPUBLICA_TEMPRANA',
    latitude: -33.4321,
    longitude: -70.6346,
    region: 'Metropolitana',
    comuna: 'Recoleta',
    sources: [MC('bellavista', 'Barrio Bellavista')],
  },
  {
    slug: 'casa-chascona-neruda',
    title: 'La Chascona, casa de Pablo Neruda',
    shortDesc:
      'Pablo Neruda construye en 1953 La Chascona en Bellavista para Matilde Urrutia, su tercera esposa.',
    longDesc:
      'La Chascona fue diseñada por el arquitecto catalán Germán Rodríguez Arias para Pablo Neruda y su entonces amante Matilde Urrutia (con quien vivía a escondidas). Su nombre alude al cabello rojo y rebelde de Matilde. Combina elementos navales, miradores y referencias literarias. Tras el golpe de 1973 fue saqueada. Hoy es museo administrado por la Fundación Neruda. Está en Fernando Márquez de la Plata 0192, Bellavista.',
    yearStart: 1953,
    category: 'CULTURA',
    era: 'PRESIDENCIALISMO',
    latitude: -33.4334,
    longitude: -70.6334,
    region: 'Metropolitana',
    comuna: 'Providencia',
    sources: [BN('Las casas de Neruda', 'Hernán Loyola', 1990)],
  },
  {
    slug: 'cerro-san-luis-cousino',
    title: 'Palacio Cousiño',
    shortDesc:
      'Inaugurado en 1878, el Palacio Cousiño es la mansión más opulenta del siglo XIX santiaguino.',
    longDesc:
      'El Palacio Cousiño Goyenechea fue mandado construir por Luis Cousiño y su esposa Isidora Goyenechea en 1872. Diseñado por el arquitecto francés Paul Lathoud, se inauguró en 1878. Sus salones de mármol, sus chimeneas inglesas y su mobiliario europeo lo hicieron escenario de fastuosos bailes. Tras un incendio en 1968 fue parcialmente restaurado. Hoy es museo. Está en Dieciocho 438, comuna de Santiago.',
    yearStart: 1878,
    category: 'PATRIMONIO',
    era: 'REPUBLICA_TEMPRANA',
    latitude: -33.4496,
    longitude: -70.6586,
    region: 'Metropolitana',
    comuna: 'Santiago',
    sources: [BN('Palacio Cousiño', 'Eugenio Pereira Salas', 1968)],
  },
  {
    slug: 'estacion-central-eiffel-1900',
    title: 'Estructura de hierro de la Estación Central',
    shortDesc:
      'En 1900 se inaugura la nueva estructura de hierro de la Estación Central, fabricada por Schneider et Cie.',
    longDesc:
      'La actual estructura metálica de la Estación Central, con sus dos grandes naves de hierro y vidrio, fue diseñada en talleres de Schneider et Cie. en Le Creusot, Francia. Llegó desarmada a Valparaíso y se ensambló en Santiago entre 1897 y 1900. Recientemente se ha rumorado que Eiffel intervino en su diseño, aunque no está documentado. Es Monumento Histórico desde 1983.',
    yearStart: 1900,
    category: 'TRANSPORTE',
    era: 'PARLAMENTARISMO',
    latitude: -33.4523,
    longitude: -70.6794,
    region: 'Metropolitana',
    comuna: 'Estación Central',
    sources: [BN('Patrimonio ferroviario', 'Ian Thomson', 1997)],
  },
  {
    slug: 'mercado-tirso-de-molina',
    title: 'Mercado Tirso de Molina',
    shortDesc:
      'El Mercado Tirso de Molina es el principal mercado de frutas y verduras de Santiago desde principios del siglo XX.',
    longDesc:
      'El Mercado Tirso de Molina, en la ribera norte del Mapocho frente al Mercado Central (Av. Santa María con Patronato), comenzó como ferias informales a fines del siglo XIX. Su pabellón actual data de 1968. Es uno de los mercados populares más característicos de Santiago, con productos frescos y cocinerías peruanas y populares. Conserva su carácter callejero pese a la modernización del entorno.',
    yearStart: 1968,
    category: 'CULTURA',
    era: 'PRESIDENCIALISMO',
    latitude: -33.4326,
    longitude: -70.6494,
    region: 'Metropolitana',
    comuna: 'Recoleta',
    sources: [MC('tirso-molina', 'Mercado Tirso de Molina')],
  },
  {
    slug: 'observatorio-astronomico-1852',
    title: 'Fundación del Observatorio Astronómico Nacional',
    shortDesc:
      'En 1852 se funda el Observatorio Astronómico Nacional en Santa Lucía, primer observatorio científico de Chile.',
    longDesc:
      'El Observatorio Astronómico Nacional fue fundado en 1852 en el Cerro Santa Lucía por una expedición del astrónomo estadounidense James Melville Gilliss. En 1903 se trasladó a Lo Espejo y luego a Cerro Calán (1955), donde sigue operando bajo la Universidad de Chile. Es uno de los más antiguos del hemisferio sur.',
    yearStart: 1852,
    category: 'CIENCIA',
    era: 'REPUBLICA_TEMPRANA',
    latitude: -33.3961,
    longitude: -70.5358,
    region: 'Metropolitana',
    comuna: 'Las Condes',
    sources: [BN('Historia de la astronomía en Chile', 'Hugo Moreno', 1990)],
  },
  {
    slug: 'palacio-bellas-artes-1910',
    title: 'Inauguración del Palacio de Bellas Artes',
    shortDesc:
      'El 21 de septiembre de 1910 se inaugura el Palacio de Bellas Artes como obra emblemática del Centenario.',
    longDesc:
      'Diseñado por el arquitecto franco-chileno Émile Jéquier inspirándose en el Petit Palais de París, el Palacio de Bellas Artes se inauguró el 21 de septiembre de 1910 en el contexto de las celebraciones del Centenario. Acoge el Museo Nacional de Bellas Artes y el Museo de Arte Contemporáneo. Es uno de los edificios más fotografiados de Santiago.',
    yearStart: 1910,
    dateText: '21 de septiembre de 1910',
    category: 'CULTURA',
    era: 'PARLAMENTARISMO',
    latitude: -33.4357,
    longitude: -70.6404,
    region: 'Metropolitana',
    comuna: 'Santiago',
    sources: [BN('Émile Jéquier, arquitecto', 'Hernán Rodríguez Villegas', 1980)],
  },
  {
    slug: 'teatro-municipal-1857',
    title: 'Inauguración del Teatro Municipal',
    shortDesc:
      'El 17 de septiembre de 1857 se inaugura el Teatro Municipal de Santiago.',
    longDesc:
      'El Teatro Municipal de Santiago fue diseñado por el arquitecto francés Charles Brunet de Baines y se inauguró el 17 de septiembre de 1857 con la ópera "Ernani" de Verdi. Tras un incendio en 1870 fue reconstruido. Es la principal sala lírica del país, con ópera, ballet y orquesta sinfónica propios. Su sala neoclásica con palcos en herradura es uno de los íconos arquitectónicos del centro.',
    yearStart: 1857,
    dateText: '17 de septiembre de 1857',
    category: 'CULTURA',
    era: 'REPUBLICA_TEMPRANA',
    latitude: -33.4391,
    longitude: -70.6483,
    region: 'Metropolitana',
    comuna: 'Santiago',
    sources: [BN('Historia del Teatro Municipal', 'Eugenio Pereira Salas', 1962)],
  },
  {
    slug: 'biblioteca-nacional-edificio-1925',
    title: 'Edificio actual de la Biblioteca Nacional',
    shortDesc:
      'En 1925 se inaugura el actual edificio de la Biblioteca Nacional en la Alameda.',
    longDesc:
      'Diseñado por el arquitecto chileno Gustavo García Postigo en estilo neoclásico, el edificio actual de la Biblioteca Nacional ocupa una manzana entera entre la Alameda y Moneda. Su construcción comenzó en 1913 y se inauguró en 1925, abarcando también el Archivo Nacional y el Museo Histórico Nacional originalmente. Su Sala Medina alberga colecciones bibliográficas únicas.',
    yearStart: 1925,
    category: 'CULTURA',
    era: 'PARLAMENTARISMO',
    latitude: -33.4413,
    longitude: -70.6502,
    region: 'Metropolitana',
    comuna: 'Santiago',
    sources: [BN('Edificio de la Biblioteca Nacional', 'Guillermo Feliú Cruz', 1963)],
  },
  {
    slug: 'casa-poesia-violeta-parra',
    title: 'Centro Cultural La Reina (Casa Violeta Parra)',
    shortDesc:
      'Casa de Violeta Parra en La Reina, donde funcionó La Carpa de la Reina entre 1965 y 1967.',
    longDesc:
      'En 1965, Violeta Parra montó "La Carpa de la Reina" en un terreno de la comuna de La Reina, donde organizó peñas folklóricas, talleres y exposiciones de arte popular. Vivió allí hasta su suicidio el 5 de febrero de 1967. Hoy una placa recuerda el sitio. Su obra ("Gracias a la vida", "Volver a los 17") es patrimonio inmaterial de Chile.',
    yearStart: 1965,
    yearEnd: 1967,
    category: 'CULTURA',
    era: 'PRESIDENCIALISMO',
    latitude: -33.443,
    longitude: -70.5419,
    region: 'Metropolitana',
    comuna: 'La Reina',
    featured: true,
    sources: [BN('Violeta Parra, biografía', 'Bernardo Subercaseaux', 1990)],
  },

  // =========================================================================
  // ECONOMÍA Y SOCIEDAD
  // =========================================================================
  {
    slug: 'banco-central-1925',
    title: 'Fundación del Banco Central de Chile',
    shortDesc:
      'El 21 de agosto de 1925 se crea el Banco Central como entidad autónoma de emisión y política monetaria.',
    longDesc:
      'Inspirado en las recomendaciones de la Misión Kemmerer (1925), el Banco Central fue creado por decreto del 21 de agosto de 1925 durante el gobierno de Arturo Alessandri Palma. Estableció el control de la emisión monetaria y comenzó la modernización del sistema financiero chileno. Su edificio actual en Agustinas con Morandé es Monumento Histórico desde 1995.',
    yearStart: 1925,
    dateText: '21 de agosto de 1925',
    category: 'ECONOMIA',
    era: 'PARLAMENTARISMO',
    latitude: -33.4406,
    longitude: -70.6519,
    region: 'Metropolitana',
    comuna: 'Santiago',
    sources: [BN('Historia del Banco Central', 'Camilo Carrasco', 2009)],
  },
  {
    slug: 'sindicato-tipografos-1853',
    title: 'Sociedad de Tipógrafos: primer sindicato de Chile',
    shortDesc:
      'En 1853 se funda en Santiago la Sociedad de Tipógrafos, primer sindicato moderno del país.',
    longDesc:
      'La Sociedad de Tipógrafos fue fundada en septiembre de 1853 por Fermín Vivaceta y otros artesanos. Se considera el primer sindicato moderno de Chile y América Latina. Buscaba protección mutual, asistencia médica y educación para sus miembros. Marcó el inicio del movimiento obrero organizado en el país.',
    yearStart: 1853,
    category: 'POLITICA',
    era: 'REPUBLICA_TEMPRANA',
    latitude: -33.443,
    longitude: -70.65,
    region: 'Metropolitana',
    comuna: 'Santiago',
    sources: [MC('sindicalismo', 'Movimiento sindical en Chile')],
  },
  {
    slug: 'huelga-tranviarios-1907',
    title: 'Gran huelga de los tranviarios',
    shortDesc:
      'En septiembre de 1907 los obreros de los tranvías de Santiago paralizan la ciudad por mejores condiciones.',
    longDesc:
      'En septiembre de 1907, los empleados del British Tramway Co. iniciaron una huelga histórica que paralizó el transporte de Santiago por varios días. Pedían reducción de la jornada laboral y mejores salarios. Hubo represión policial con muertos. La huelga fue uno de los antecedentes de la matanza de Santa María de Iquique tres meses después.',
    yearStart: 1907,
    dateText: 'septiembre de 1907',
    category: 'POLITICA',
    era: 'PARLAMENTARISMO',
    latitude: -33.443,
    longitude: -70.65,
    region: 'Metropolitana',
    comuna: 'Santiago',
    sources: [MC('huelga-tranviarios', 'Huelga de tranviarios, 1907')],
  },
  {
    slug: 'crisis-1929',
    title: 'Crisis de 1929 en Chile',
    shortDesc:
      'La Gran Depresión golpea a Chile en 1930-31; el desempleo llega al 25% y miles de cesantes llegan a Santiago.',
    longDesc:
      'Tras el crack de Wall Street, la economía chilena —dependiente del salitre— colapsa. El precio del salitre se desploma, las oficinas cierran y miles de obreros emigran al sur. Santiago se convierte en epicentro del desempleo: en 1932 el ejército ocupa edificios para albergar cesantes. La crisis hunde al gobierno de Ibáñez (1931) e inaugura un período de gran inestabilidad.',
    yearStart: 1929,
    yearEnd: 1932,
    category: 'ECONOMIA',
    era: 'PARLAMENTARISMO',
    latitude: -33.443,
    longitude: -70.65,
    region: 'Metropolitana',
    comuna: 'Santiago',
    sources: [BN('Chile y la crisis de 1929', 'Markos Mamalakis', 1976)],
  },
  {
    slug: 'codelco-fundacion-1976',
    title: 'Creación de Codelco',
    shortDesc:
      'El 1 de abril de 1976 se crea Codelco-Chile, mayor productora estatal de cobre del mundo.',
    longDesc:
      'Tras la nacionalización del cobre por Allende en 1971, las grandes minas pasaron al Estado. La dictadura las reorganizó como Corporación Nacional del Cobre de Chile (Codelco) por DL 1.350 del 1 de abril de 1976. Su sede en Huérfanos 1270 es uno de los símbolos económicos del país. Codelco es la mayor productora de cobre del mundo y aporta cerca del 10% de los ingresos fiscales chilenos.',
    yearStart: 1976,
    dateText: '1 de abril de 1976',
    category: 'ECONOMIA',
    era: 'DICTADURA',
    latitude: -33.4378,
    longitude: -70.6518,
    region: 'Metropolitana',
    comuna: 'Santiago',
    sources: [MC('codelco', 'Codelco-Chile')],
  },

  // =========================================================================
  // CIENCIA Y TECNOLOGÍA
  // =========================================================================
  {
    slug: 'museo-historia-natural-1830',
    title: 'Fundación del Museo Nacional de Historia Natural',
    shortDesc:
      'En 1830 Claudio Gay funda el Museo Nacional de Historia Natural, hoy en la Quinta Normal.',
    longDesc:
      'Por iniciativa del naturalista francés Claude Gay y bajo el gobierno de José Tomás Ovalle, el Museo Nacional de Historia Natural se fundó el 14 de septiembre de 1830, siendo el primer museo de Chile. Originalmente en la calle Catedral, en 1875 se trasladó a su edificio actual en la Quinta Normal, construido para la Exposición Internacional. Es Monumento Histórico.',
    yearStart: 1830,
    dateText: '14 de septiembre de 1830',
    category: 'CIENCIA',
    era: 'REPUBLICA_TEMPRANA',
    latitude: -33.4406,
    longitude: -70.6839,
    region: 'Metropolitana',
    comuna: 'Santiago',
    sources: [BN('El Museo Nacional', 'Carlos Stuardo Ortiz', 1973)],
  },
  {
    slug: 'primera-radio-1922',
    title: 'Primera transmisión de radio en Chile',
    shortDesc:
      'El 19 de agosto de 1922 se realiza la primera transmisión radial pública de Chile desde la Universidad de Chile.',
    longDesc:
      'Los profesores Enrique Sazié y Arturo Salazar Varas realizan en la Universidad de Chile la primera transmisión radial pública del país el 19 de agosto de 1922. La señal fue captada en El Mercurio. Tres años después, en 1925, comienzan las primeras emisoras comerciales (Radio Chilena, Radio Cooperativa Vitalicia). Hoy hay más de 1.500 emisoras en el país.',
    yearStart: 1922,
    dateText: '19 de agosto de 1922',
    category: 'CIENCIA',
    era: 'PARLAMENTARISMO',
    latitude: -33.4434,
    longitude: -70.6493,
    region: 'Metropolitana',
    comuna: 'Santiago',
    sources: [MC('radio', 'Historia de la radio en Chile')],
  },
  {
    slug: 'television-chile-1959',
    title: 'Primera transmisión de televisión',
    shortDesc:
      'El 5 de octubre de 1959 la Universidad Católica realiza la primera transmisión de TV en Chile.',
    longDesc:
      'La primera transmisión de televisión en Chile la realiza Canal 8 (UCTV) de la Universidad Católica desde Santiago el 5 de octubre de 1959. Pocos meses después aparece Canal 9 (Universidad de Chile). En 1962 ambos transmiten el Mundial de Fútbol. Televisión Nacional se crea en 1969. La TV en color recién llega en 1978.',
    yearStart: 1959,
    dateText: '5 de octubre de 1959',
    category: 'CIENCIA',
    era: 'PRESIDENCIALISMO',
    latitude: -33.4419,
    longitude: -70.6411,
    region: 'Metropolitana',
    comuna: 'Santiago',
    sources: [MC('television', 'Historia de la televisión en Chile')],
  },
  {
    slug: 'planetario-1985',
    title: 'Inauguración del Planetario USACH',
    shortDesc:
      'El 21 de noviembre de 1985 se inaugura el Planetario de la Universidad de Santiago.',
    longDesc:
      'El Planetario de la USACH se inauguró el 21 de noviembre de 1985 en la antigua Universidad Técnica del Estado. Su cúpula de 20 metros de diámetro y proyector Carl Zeiss original alemán lo hicieron uno de los más modernos de Sudamérica. Recibe a más de 200.000 visitantes al año. Es el principal centro de divulgación astronómica del país.',
    yearStart: 1985,
    dateText: '21 de noviembre de 1985',
    category: 'CIENCIA',
    era: 'DICTADURA',
    latitude: -33.4506,
    longitude: -70.685,
    region: 'Metropolitana',
    comuna: 'Estación Central',
    sources: [MC('planetario', 'Planetario de Santiago')],
  },

  // =========================================================================
  // RELIGIÓN Y CULTURA RELIGIOSA
  // =========================================================================
  {
    slug: 'templo-votivo-maipu-1974',
    title: 'Templo Votivo de Maipú',
    shortDesc:
      'El 24 de octubre de 1974 se inaugura el Templo Votivo de Maipú en el sitio de la batalla de 1818.',
    longDesc:
      'El Templo Votivo de Maipú se construyó en cumplimiento de la promesa hecha por Bernardo O\'Higgins de levantar un santuario en el sitio de la Batalla de Maipú. La construcción comenzó en 1944 y se inauguró el 24 de octubre de 1974. Su torre de 90 metros lo hace una de las iglesias más altas del país. Conserva las ruinas del antiguo templo derribado por el terremoto de 1906.',
    yearStart: 1974,
    dateText: '24 de octubre de 1974',
    category: 'RELIGION',
    era: 'DICTADURA',
    latitude: -33.5077,
    longitude: -70.7706,
    region: 'Metropolitana',
    comuna: 'Maipú',
    sources: [MC('templo-maipu', 'Templo Votivo de Maipú')],
  },
  {
    slug: 'iglesia-recoleta-dominica',
    title: 'Iglesia y Convento Recoleta Dominica',
    shortDesc:
      'Construida entre 1845 y 1882, la Iglesia de la Recoleta Dominica es uno de los conjuntos religiosos más imponentes de Santiago.',
    longDesc:
      'La Recoleta Dominica fue diseñada por el arquitecto italiano Eusebio Chelli en estilo neoclásico. Su fachada se ornamenta con seis columnas corintias y dos torres. Alberga la Biblioteca Patrimonial Recoleta Dominica con códices del siglo XV. Es Monumento Histórico desde 1973. Le da nombre a la comuna y al barrio que la rodean.',
    yearStart: 1845,
    yearEnd: 1882,
    category: 'RELIGION',
    era: 'REPUBLICA_TEMPRANA',
    latitude: -33.4216,
    longitude: -70.6394,
    region: 'Metropolitana',
    comuna: 'Recoleta',
    sources: [BN('Iglesias de Santiago', 'Pereira Salas', 1965)],
  },
  {
    slug: 'iglesia-sagrado-corazon',
    title: 'Iglesia del Sagrado Corazón de los Sacramentinos',
    shortDesc:
      'La Iglesia de los Sacramentinos, inaugurada en 1931, imita la basílica del Sacré-Cœur de París.',
    longDesc:
      'Diseñada por el arquitecto Ricardo Larraín Bravo inspirado en la basílica del Sacré-Cœur de Montmartre, la Iglesia del Sagrado Corazón se construyó entre 1919 y 1931. Está en Arturo Prat 471, frente a la Plaza Sacramentinos. Sus tres cúpulas y su frontis bizantino-románico la hacen uno de los templos más singulares del país. Es Monumento Histórico.',
    yearStart: 1931,
    category: 'RELIGION',
    era: 'PRESIDENCIALISMO',
    latitude: -33.4533,
    longitude: -70.6485,
    region: 'Metropolitana',
    comuna: 'Santiago',
    sources: [MC('sacramentinos', 'Iglesia de los Sacramentinos')],
  },

  // =========================================================================
  // OTROS HITOS Y FECHAS
  // =========================================================================
  {
    slug: 'aluvion-quebrada-macul-1993',
    title: 'Aluvión de la Quebrada de Macul',
    shortDesc:
      'El 3 de mayo de 1993 un aluvión de la Quebrada de Macul deja decenas de muertos en la zona oriente.',
    longDesc:
      'Tras intensas lluvias en la cordillera, la Quebrada de Macul desborda sus contenedores aluvionales y arrastra barro y piedras hacia las comunas de La Florida, Macul y Peñalolén. Mueren 26 personas y desaparecen 8. El evento llevó a reformar el sistema de gestión aluvional. Hoy hay piscinas decantadoras en la cordillera y planes de evacuación.',
    yearStart: 1993,
    dateText: '3 de mayo de 1993',
    category: 'DESASTRE_NATURAL',
    era: 'TRANSICION',
    latitude: -33.4847,
    longitude: -70.5408,
    region: 'Metropolitana',
    comuna: 'La Florida',
    sources: [ARCH('Aluvión Quebrada de Macul', 'ONEMI', 1993)],
  },
  {
    slug: 'terremoto-1985',
    title: 'Terremoto del 3 de marzo de 1985',
    shortDesc:
      'Terremoto de magnitud 7.8 en Algarrobo deja 177 muertos y graves daños en Santiago.',
    longDesc:
      'A las 19:46 del 3 de marzo de 1985, un terremoto de magnitud 7.8 con epicentro frente a Algarrobo afecta toda la zona central de Chile. Mueren 177 personas y aproximadamente 1 millón quedan damnificadas. En Santiago colapsan edificios antiguos como las Torres de San Borja. El sismo aceleró la actualización de la norma antisísmica chilena (NCh433).',
    yearStart: 1985,
    dateText: '3 de marzo de 1985',
    category: 'DESASTRE_NATURAL',
    era: 'DICTADURA',
    latitude: -33.45,
    longitude: -70.66,
    region: 'Metropolitana',
    comuna: 'Santiago',
    sources: [ARCH('Informe sismo 1985', 'ONEMI', 1985)],
  },
  {
    slug: 'apec-2004',
    title: 'Cumbre APEC 2004 en Santiago',
    shortDesc:
      'En noviembre de 2004 Santiago acoge la Cumbre del Foro de Cooperación Económica Asia-Pacífico.',
    longDesc:
      'Chile presidió y organizó la Cumbre APEC 2004 entre el 17 y 21 de noviembre. Asistieron 21 jefes de Estado, incluido George W. Bush, Vladimir Putin y Hu Jintao. Para el evento se restauró el Palacio de La Moneda y se construyó nueva infraestructura aeroportuaria. La cumbre proyectó internacionalmente al Chile de la Concertación.',
    yearStart: 2004,
    dateText: '17 al 21 de noviembre de 2004',
    category: 'POLITICA',
    era: 'TRANSICION',
    latitude: -33.443,
    longitude: -70.6536,
    region: 'Metropolitana',
    comuna: 'Santiago',
    sources: [ARCH('APEC Chile 2004', 'Ministerio de Relaciones Exteriores', 2005)],
  },
  {
    slug: 'panamericanos-2023',
    title: 'Juegos Panamericanos Santiago 2023',
    shortDesc:
      'Del 20 de octubre al 5 de noviembre de 2023 Santiago acoge los XIX Juegos Panamericanos.',
    longDesc:
      'Los XIX Juegos Panamericanos y los VII Juegos Parapanamericanos se realizaron en Santiago entre el 20 de octubre y el 5 de noviembre de 2023. Participaron 6.900 deportistas de 41 países. Chile obtuvo 79 medallas (12 oros), su mejor desempeño histórico. Para el evento se construyó el Estadio Nacional renovado, el velódromo de Peñalolén y la Villa Panamericana en Cerrillos.',
    yearStart: 2023,
    dateText: '20 de octubre al 5 de noviembre de 2023',
    category: 'CULTURA',
    era: 'TRANSICION',
    latitude: -33.4644,
    longitude: -70.6105,
    region: 'Metropolitana',
    comuna: 'Ñuñoa',
    sources: [ARCH('Memoria Panamericanos 2023', 'COCH', 2024)],
  },

  // =========================================================================
  // BARRIOS, COMUNAS Y MICROHISTORIAS
  // =========================================================================
  {
    slug: 'puente-cal-y-canto-1782',
    title: 'Puente de Cal y Canto',
    shortDesc:
      'Inaugurado en 1782, fue el primer puente firme sobre el Mapocho hasta su demolición en 1888.',
    longDesc:
      'El Puente de Cal y Canto, obra del corregidor Luis Manuel de Zañartu, fue inaugurado en 1782 tras décadas de construcción. Cruzaba el Mapocho con once arcos de piedra y unía Santiago con La Chimba. Fue demolido en 1888 con la canalización del río. Algunos restos se conservan en el Parque Forestal y bajo la actual Estación Cal y Canto del Metro.',
    yearStart: 1782,
    yearEnd: 1888,
    category: 'TRANSPORTE',
    era: 'COLONIA',
    latitude: -33.4348,
    longitude: -70.6499,
    region: 'Metropolitana',
    comuna: 'Santiago',
    sources: [BN('Historia de Santiago', 'Vicuña Mackenna', 1869)],
  },
  {
    slug: 'puente-pio-nono-1975',
    title: 'Puente Pío Nono',
    shortDesc:
      'El emblemático Puente Pío Nono une Bellavista con el Parque Forestal y el centro de Santiago.',
    longDesc:
      'El Puente Pío Nono cruza el Mapocho conectando el Barrio Bellavista con el Parque Forestal y la calle Lastarria. Su denominación viene del Papa Pío IX. La estructura actual data de 1975, reemplazando puentes anteriores. Es uno de los puentes más concurridos del centro y escenario de manifestaciones culturales y políticas, especialmente durante el estallido social.',
    yearStart: 1975,
    category: 'TRANSPORTE',
    era: 'DICTADURA',
    latitude: -33.4368,
    longitude: -70.6346,
    region: 'Metropolitana',
    comuna: 'Santiago',
    sources: [MC('puente-pio-nono', 'Puente Pío Nono')],
  },
  {
    slug: 'cerros-cordillera-aire',
    title: 'Crisis de contaminación atmosférica',
    shortDesc:
      'Desde los años 80 Santiago sufre crisis crónicas de contaminación atmosférica por su geografía.',
    longDesc:
      'Atrapado entre la cordillera de los Andes y la cordillera de la Costa, Santiago acumula contaminantes en los meses fríos. Desde mediados de los 80 los planes de descontaminación obligan a paralizar industrias, restringir vehículos y normar combustibles. Pese a mejoras (hace 30 años el aire era peor), Santiago sigue entre las capitales con peor calidad del aire en invierno en América.',
    yearStart: 1990,
    category: 'CIENCIA',
    era: 'TRANSICION',
    latitude: -33.45,
    longitude: -70.65,
    region: 'Metropolitana',
    comuna: 'Santiago',
    sources: [ARCH('Plan de Descontaminación', 'Ministerio de Medio Ambiente', 2017)],
  },
  {
    slug: 'persa-bio-bio',
    title: 'Persa Bío-Bío, mercado de las pulgas',
    shortDesc:
      'El Persa Bío-Bío es el mayor mercado de antigüedades, segunda mano y curiosidades de Chile.',
    longDesc:
      'El Persa Bío-Bío surgió en los años 70 alrededor de la calle Bío-Bío, en la comuna de Franklin. Hoy ocupa varias manzanas con miles de puestos: antigüedades, libros usados, herramientas, vinilos, ropa vintage. Funciona los fines de semana y atrae a coleccionistas, turistas y vecinos. Es uno de los espacios populares más característicos de Santiago.',
    yearStart: 1970,
    category: 'CULTURA',
    era: 'PRESIDENCIALISMO',
    latitude: -33.4636,
    longitude: -70.6483,
    region: 'Metropolitana',
    comuna: 'Santiago',
    sources: [MC('persa-bio-bio', 'Persa Bío-Bío')],
  },
  {
    slug: 'patronato-comercio',
    title: 'Barrio Patronato y la inmigración palestina',
    shortDesc:
      'Patronato es desde mediados del siglo XX el centro de comercio palestino y árabe de Santiago.',
    longDesc:
      'El Barrio Patronato, en Recoleta, recibió a partir de 1900 a inmigrantes árabes (palestinos, sirios, libaneses) que se dedicaron al comercio textil. La calle Patronato y sus alrededores son hasta hoy el principal centro de venta de telas y ropa al por mayor. En las últimas décadas se sumaron comerciantes coreanos y peruanos, sumando diversidad cultural al barrio.',
    yearStart: 1920,
    category: 'CULTURA',
    era: 'PARLAMENTARISMO',
    latitude: -33.4321,
    longitude: -70.643,
    region: 'Metropolitana',
    comuna: 'Recoleta',
    sources: [MC('patronato', 'Barrio Patronato y comunidad palestina')],
  },
  {
    slug: 'lo-prado-poblaciones',
    title: 'Tomas de terreno y poblaciones callampas',
    shortDesc:
      'En los años 50-70 Santiago crece con tomas y poblaciones "callampa" en sus periferias.',
    longDesc:
      'A partir de los años 50, miles de familias migrantes desde el campo ocupan terrenos baldíos en la periferia sur y poniente de Santiago. La célebre toma de "La Victoria" (1957) marca el inicio del movimiento de pobladores. Bajo Allende, la Operación Sitio (Frei) y Salvador Allende construyeron viviendas básicas. Comunas como La Pintana, Lo Prado, Renca y Pudahuel nacen así.',
    yearStart: 1957,
    yearEnd: 1973,
    category: 'POLITICA',
    era: 'PRESIDENCIALISMO',
    latitude: -33.5258,
    longitude: -70.6275,
    region: 'Metropolitana',
    comuna: 'San Miguel',
    sources: [BN('La Victoria. Una toma', 'Eduardo Valenzuela', 1989)],
  },

  // =========================================================================
  // PERSONAJES Y CASAS DE ESCRITORES
  // =========================================================================
  {
    slug: 'casa-neruda-santiago-tres-casas',
    title: 'Las tres casas de Pablo Neruda',
    shortDesc:
      'La Chascona en Bellavista es la principal casa-museo de Pablo Neruda en Santiago.',
    longDesc:
      'Pablo Neruda tuvo casas en Santiago (La Chascona), Valparaíso (La Sebastiana) e Isla Negra. La Chascona fue construida en 1953 para Matilde Urrutia. En 1973, días después del golpe, fue saqueada por militares. El propio Neruda murió el 23 de septiembre de 1973 en la Clínica Santa María, oficialmente de cáncer pero con dudas razonables sobre envenenamiento. Hoy la casa es museo administrado por la Fundación Neruda.',
    yearStart: 1953,
    category: 'CULTURA',
    era: 'PRESIDENCIALISMO',
    latitude: -33.4332,
    longitude: -70.6312,
    region: 'Metropolitana',
    comuna: 'Providencia',
    sources: [BN('Las casas de Neruda', 'Hernán Loyola', 1990)],
  },
  {
    slug: 'gabriela-mistral-en-santiago',
    title: 'Gabriela Mistral y Santiago',
    shortDesc:
      'Gabriela Mistral, primera Nobel de Literatura latinoamericana, vivió en Santiago en los años 1910-20.',
    longDesc:
      'Lucila Godoy Alcayaga, Gabriela Mistral, vivió y trabajó en Santiago como profesora normalista entre 1910 y 1922. Recibió el Nobel de Literatura en 1945, primera latinoamericana en obtenerlo. Sus restos están en Montegrande pero el Centro Cultural Gabriela Mistral (GAM) en el centro de Santiago lleva su nombre desde 2010 como homenaje permanente.',
    yearStart: 1910,
    yearEnd: 1922,
    category: 'CULTURA',
    era: 'PARLAMENTARISMO',
    latitude: -33.4395,
    longitude: -70.6361,
    region: 'Metropolitana',
    comuna: 'Santiago',
    sources: [BN('Gabriela Mistral', 'Roque Esteban Scarpa', 1981)],
  },
  {
    slug: 'casa-jose-donoso',
    title: 'Casa de José Donoso',
    shortDesc:
      'El novelista José Donoso vivió en una casa de Galvarino Gallardo, hoy preservada como hito cultural.',
    longDesc:
      'José Donoso, autor de "Casa de campo" y "El obsceno pájaro de la noche", vivió en Santiago tras su exilio europeo desde 1981 hasta su muerte en 1996. Su casa en Galvarino Gallardo, Providencia, fue centro de tertulia literaria de los 80-90. Conserva su biblioteca y manuscritos. La calle frente a la casa lleva ahora su nombre.',
    yearStart: 1981,
    yearEnd: 1996,
    category: 'CULTURA',
    era: 'DICTADURA',
    latitude: -33.4317,
    longitude: -70.6111,
    region: 'Metropolitana',
    comuna: 'Providencia',
    sources: [BN('José Donoso, biografía', 'Cecilia García-Huidobro', 1999)],
  },

  // =========================================================================
  // INFRAESTRUCTURA URBANA Y MOVILIDAD
  // =========================================================================
  {
    slug: 'transantiago-2007',
    title: 'Inicio del Transantiago',
    shortDesc:
      'El 10 de febrero de 2007 inicia el Transantiago, reforma fallida del transporte público de Santiago.',
    longDesc:
      'El Transantiago se lanzó como reforma integral del transporte público de Santiago el 10 de febrero de 2007 bajo el gobierno de Michelle Bachelet. Reemplazó el caótico sistema de "micros amarillas" por buses troncales y alimentadores integrados con Metro y tarjeta Bip!. El primer año fue caótico: faltaron buses, demoras, descontento. Tras años de ajustes y nombre cambiado a Red Movilidad (2019), funciona razonablemente.',
    yearStart: 2007,
    dateText: '10 de febrero de 2007',
    category: 'TRANSPORTE',
    era: 'TRANSICION',
    latitude: -33.45,
    longitude: -70.65,
    region: 'Metropolitana',
    comuna: 'Santiago',
    sources: [MC('transantiago', 'Transantiago')],
  },
  {
    slug: 'autopistas-urbanas-2004',
    title: 'Autopistas urbanas concesionadas',
    shortDesc:
      'A partir de 2004 entran en operación las autopistas concesionadas que cruzan Santiago.',
    longDesc:
      'Costanera Norte (2005), Autopista Central (2004), Vespucio Norte y Sur (2004-2006) son los principales tramos del sistema de autopistas urbanas concesionadas que reorganizaron la circulación de Santiago. Operan con peaje electrónico (TAG). Aliviaron la congestión en grandes ejes pero generaron debate por costos para los usuarios y fragmentación urbana.',
    yearStart: 2004,
    category: 'TRANSPORTE',
    era: 'TRANSICION',
    latitude: -33.4172,
    longitude: -70.6064,
    region: 'Metropolitana',
    comuna: 'Providencia',
    sources: [ARCH('Concesiones de autopistas', 'MOP', 2008)],
  },
  {
    slug: 'metrotren-rancagua-2017',
    title: 'Inauguración del Metrotren a Rancagua',
    shortDesc:
      'En 2017 entra en operación el moderno servicio Metrotren entre Estación Central y Rancagua.',
    longDesc:
      'Tras décadas de deterioro del ferrocarril estatal, EFE renovó el servicio a Rancagua con material rodante moderno y estaciones nuevas. Inaugurado en marzo de 2017, el Metrotren conecta Santiago con Rancagua en aproximadamente 90 minutos. Es uno de los pocos servicios ferroviarios de pasajeros aún operativos en Chile.',
    yearStart: 2017,
    category: 'TRANSPORTE',
    era: 'TRANSICION',
    latitude: -33.4523,
    longitude: -70.6794,
    region: 'Metropolitana',
    comuna: 'Estación Central',
    sources: [MC('metrotren', 'Tren Metro Santiago-Rancagua')],
  },

  // =========================================================================
  // EVENTOS DEPORTIVOS Y CULTURALES
  // =========================================================================
  {
    slug: 'colocolo-fundacion-1925',
    title: 'Fundación del Club Colo-Colo',
    shortDesc:
      'El 19 de abril de 1925 David Arellano funda el Club Social y Deportivo Colo-Colo.',
    longDesc:
      'Tras desprenderse del Magallanes, David Arellano y un grupo de jugadores fundan Colo-Colo el 19 de abril de 1925 en una casa de la calle Cienfuegos. El nombre evoca al cacique mapuche Colocolo. Es el club más popular de Chile, único equipo chileno campeón de la Copa Libertadores (1991). Su Estadio Monumental se inauguró en 1989 en Macul.',
    yearStart: 1925,
    dateText: '19 de abril de 1925',
    category: 'CULTURA',
    era: 'PARLAMENTARISMO',
    latitude: -33.5092,
    longitude: -70.6056,
    region: 'Metropolitana',
    comuna: 'Macul',
    sources: [MC('colo-colo', 'Club Colo-Colo')],
  },
  {
    slug: 'festival-vina-1960',
    title: 'Primer Festival de la Canción de Viña del Mar',
    shortDesc:
      'En febrero de 1960 se celebra el primer Festival Internacional de la Canción de Viña del Mar.',
    longDesc:
      'Aunque su sede es Viña del Mar, el Festival es el principal evento musical de Chile y se transmite por TV nacional desde Santiago. Su primera edición fue en febrero de 1960 en la Quinta Vergara. La "Gaviota de Plata" y la "Gaviota de Oro" son los premios más codiciados de la música hispana. Es uno de los festivales más antiguos de Latinoamérica.',
    yearStart: 1960,
    category: 'CULTURA',
    era: 'PRESIDENCIALISMO',
    latitude: -33.0257,
    longitude: -71.5519,
    region: 'Valparaíso',
    comuna: 'Viña del Mar',
    sources: [MC('festival-vina', 'Festival de la Canción de Viña del Mar')],
  },
  {
    slug: 'lollapalooza-chile-2011',
    title: 'Primer Lollapalooza Chile',
    shortDesc:
      'En abril de 2011 Santiago acoge el primer Lollapalooza fuera de EE.UU., en el Parque O\'Higgins.',
    longDesc:
      'El Festival Lollapalooza Chile debutó el 2 y 3 de abril de 2011 en el Parque O\'Higgins, siendo la primera versión internacional fuera de Estados Unidos. Ha consolidado a Santiago como capital sudamericana de los grandes festivales musicales. Por su escenario han pasado The Killers, Pearl Jam, Foo Fighters, Radiohead, Strokes, entre muchos otros.',
    yearStart: 2011,
    dateText: '2-3 de abril de 2011',
    category: 'CULTURA',
    era: 'TRANSICION',
    latitude: -33.4609,
    longitude: -70.6603,
    region: 'Metropolitana',
    comuna: 'Santiago',
    sources: [MC('lollapalooza', 'Festival Lollapalooza Chile')],
  },

  // =========================================================================
  // EXTENSIÓN URBANA Y BARRIOS RECIENTES
  // =========================================================================
  {
    slug: 'sanhattan-las-condes',
    title: 'Sanhattan: el barrio financiero',
    shortDesc:
      'Desde los 90, El Golf y Nueva Las Condes se transforman en "Sanhattan", el centro financiero de Chile.',
    longDesc:
      'El término "Sanhattan" (Santiago + Manhattan) describe el polo financiero ubicado entre Las Condes, Vitacura y Providencia, donde se concentran las casas matrices de bancos, AFPs, multinacionales y consultoras. Sus rascacielos —Costanera Center, Titanium La Portada, edificio CNT— transformaron el skyline de Santiago. El proceso aceleró tras la crisis del 2008.',
    yearStart: 2000,
    category: 'ECONOMIA',
    era: 'TRANSICION',
    latitude: -33.4143,
    longitude: -70.6058,
    region: 'Metropolitana',
    comuna: 'Las Condes',
    sources: [MC('sanhattan', 'Sanhattan / Centro financiero de Santiago')],
  },
  {
    slug: 'mall-parque-arauco-1982',
    title: 'Inauguración del Parque Arauco',
    shortDesc:
      'El 27 de mayo de 1982 abre el Parque Arauco, primer mall de Chile.',
    longDesc:
      'El Parque Arauco fue el primer mall del país, inaugurado en Las Condes el 27 de mayo de 1982. Cambió radicalmente los hábitos de consumo de la clase media-alta santiaguina. Le siguieron Apumanque (1981, abierto al público meses antes), Plaza Vespucio (1990) y muchos otros. Hoy hay más de 30 malls en el Gran Santiago.',
    yearStart: 1982,
    dateText: '27 de mayo de 1982',
    category: 'ECONOMIA',
    era: 'DICTADURA',
    latitude: -33.4015,
    longitude: -70.5786,
    region: 'Metropolitana',
    comuna: 'Las Condes',
    sources: [MC('parque-arauco', 'Mall Parque Arauco')],
  },

  // =========================================================================
  // CIERRE: HITO CONTEMPORÁNEO
  // =========================================================================
  {
    slug: 'metro-linea-7-anuncio',
    title: 'Línea 7 del Metro de Santiago',
    shortDesc:
      'La Línea 7 del Metro, en construcción, conectará Renca con Vitacura por el norte de Santiago.',
    longDesc:
      'Anunciada en 2017 por Bachelet y confirmada por administraciones posteriores, la Línea 7 del Metro de Santiago tendrá 26 km y 19 estaciones, conectando Renca con Vitacura por la ribera norte del Mapocho. Su entrada en servicio está proyectada para 2027-2028. Será la línea automática más larga del país.',
    yearStart: 2017,
    category: 'TRANSPORTE',
    era: 'TRANSICION',
    latitude: -33.4163,
    longitude: -70.6058,
    region: 'Metropolitana',
    comuna: 'Vitacura',
    sources: [ARCH('Plan Metro 2027', 'Metro de Santiago', 2020)],
  },
  {
    slug: 'monumento-baquedano-removido-2021',
    title: 'Remoción de la estatua de Baquedano',
    shortDesc:
      'El 12 de marzo de 2021 se retira la estatua del general Manuel Baquedano de la Plaza Italia.',
    longDesc:
      'La estatua ecuestre del general Manuel Baquedano, inaugurada en 1928 en el centro de la Plaza Italia (luego Plaza Dignidad), fue retirada el 12 de marzo de 2021 por el Estado tras meses de daños sufridos durante el estallido social. La intervención militar para su traslado generó controversia. Hasta hoy se discute si volverá a su lugar o no.',
    yearStart: 2021,
    dateText: '12 de marzo de 2021',
    category: 'POLITICA',
    era: 'TRANSICION',
    latitude: -33.4372,
    longitude: -70.6346,
    region: 'Metropolitana',
    comuna: 'Santiago',
    sources: [ARCH('Plan Plaza Baquedano', 'CMN', 2021)],
  },
  {
    slug: 'bicentenario-2010',
    title: 'Bicentenario de Chile',
    shortDesc:
      'El 18 de septiembre de 2010 Chile celebra los 200 años de la Primera Junta de Gobierno.',
    longDesc:
      'Las celebraciones del Bicentenario fueron empañadas por el terremoto del 27 de febrero de 2010 (días antes de Sebastián Piñera asumir) y el rescate de los 33 mineros (octubre). Aún así se inauguraron obras como el GAM, el Museo de la Memoria, la Plaza de la Ciudadanía y se realizaron desfiles, conciertos y la "Parada Militar" más concurrida de la historia.',
    yearStart: 2010,
    dateText: '18 de septiembre de 2010',
    category: 'POLITICA',
    era: 'TRANSICION',
    latitude: -33.443,
    longitude: -70.6536,
    region: 'Metropolitana',
    comuna: 'Santiago',
    sources: [MC('bicentenario', 'Bicentenario de Chile, 2010')],
  },
  {
    slug: 'museo-memoria-2010',
    title: 'Inauguración del Museo de la Memoria y los Derechos Humanos',
    shortDesc:
      'El 11 de enero de 2010 Bachelet inaugura el Museo de la Memoria y los Derechos Humanos.',
    longDesc:
      'El Museo de la Memoria y los Derechos Humanos fue inaugurado el 11 de enero de 2010 en Matucana 501. Diseñado por estudio brasileño Mario Figueroa, su edificio elevado simboliza la suspensión de las víctimas. Documenta las violaciones de DDHH durante la dictadura. Es el principal espacio de memoria del país y referente latinoamericano.',
    yearStart: 2010,
    dateText: '11 de enero de 2010',
    category: 'POLITICA',
    era: 'TRANSICION',
    latitude: -33.4399,
    longitude: -70.685,
    region: 'Metropolitana',
    comuna: 'Santiago',
    featured: true,
    sources: [
      ARCH('Memoria del Museo', 'Museo de la Memoria', 2015),
      MC('museo-memoria', 'Museo de la Memoria y los Derechos Humanos'),
    ],
  },
]

export const SANTIAGO_SEED_VERSION = '0.1.0'
