import type { SeedEvent } from '../types'

/**
 * NOTA: Estos 20 eventos son DATOS PLACEHOLDER curados para el MVP. Las
 * descripciones, fechas y coordenadas deben ser validadas por un curador
 * histórico (idealmente con apoyo de Biblioteca Nacional / Memoria Chilena)
 * antes de uso público real. Las citas referencian fuentes reales pero el
 * texto narrativo es una síntesis simplificada para arranque del producto.
 */
export const INITIAL_EVENTS: SeedEvent[] = [
  // ============== SANTIAGO (5) ==============
  {
    slug: 'fundacion-santiago-1541',
    title: 'Fundación de Santiago del Nuevo Extremo',
    shortDesc:
      'Pedro de Valdivia funda Santiago del Nuevo Extremo el 12 de febrero de 1541, junto al cerro Huelén (hoy Santa Lucía).',
    longDesc:
      'El 12 de febrero de 1541, el conquistador extremeño Pedro de Valdivia formaliza la fundación de la ciudad de Santiago del Nuevo Extremo, en la ribera sur del río Mapocho, al pie del cerro Huelén que él mismo rebautizaría como Santa Lucía. La traza original, atribuida al alarife Pedro de Gamboa, se diseñó en damero de 126 manzanas alrededor de una plaza mayor donde hoy está la Plaza de Armas. La fundación marca el inicio de la conquista hispana en el valle central. La ciudad fue arrasada por las huestes de Michimalonco apenas seis meses después, en septiembre del mismo año, y debió ser reconstruida desde sus cimientos. La permanencia de Santiago como núcleo urbano es atribuida en gran medida al liderazgo de Inés de Suárez durante el ataque de 1541.',
    yearStart: 1541,
    dateText: '12 de febrero de 1541',
    category: 'FUNDACION',
    era: 'CONQUISTA',
    latitude: -33.4416,
    longitude: -70.6506,
    region: 'Metropolitana',
    comuna: 'Santiago',
    featured: true,
    sources: [
      {
        type: 'BIBLIOTECA_NACIONAL',
        title: 'Cartas de Pedro de Valdivia que tratan del descubrimiento y conquista de Chile',
        author: 'Pedro de Valdivia',
        year: 1545,
        signature: 'BN-Sala Medina',
        citation:
          'Valdivia, P. de (1545). Cartas que tratan del descubrimiento y conquista de Chile. Reproducción facsimilar, Biblioteca Nacional de Chile, Sala Medina.',
        inPublicDomain: true,
      },
      {
        type: 'MEMORIA_CHILENA',
        title: 'Fundación de Santiago',
        url: 'https://www.memoriachilena.gob.cl/602/w3-article-3537.html',
        citation:
          'Memoria Chilena (s.f.). Fundación de Santiago. Biblioteca Nacional Digital de Chile.',
      },
    ],
  },
  {
    slug: 'cerro-santa-lucia-1872',
    title: 'Inauguración del paseo del Cerro Santa Lucía',
    shortDesc:
      'Benjamín Vicuña Mackenna transforma el cerro Huelén en paseo público con jardines, terrazas y monumentos.',
    longDesc:
      'En 1872, el intendente de Santiago Benjamín Vicuña Mackenna culminó el ambicioso proyecto de transformar el árido cerro Huelén en un paseo público al estilo europeo. Con muros, escalinatas, terrazas, ermita y jardines, el cerro pasó a ser uno de los símbolos de la ciudad y fue declarado Monumento Nacional en 1983. Vicuña Mackenna lo describió como "obra civilizadora" en su programa de "transformación de Santiago", que incluyó también el camino de cintura, la canalización del Mapocho y la apertura de avenidas. La inauguración el 17 de septiembre de 1872 fue una fiesta cívica que marcó la modernización urbana de la capital.',
    yearStart: 1872,
    dateText: '17 de septiembre de 1872',
    category: 'PATRIMONIO',
    era: 'REPUBLICA_TEMPRANA',
    latitude: -33.4404,
    longitude: -70.6432,
    region: 'Metropolitana',
    comuna: 'Santiago',
    sources: [
      {
        type: 'BIBLIOTECA_NACIONAL',
        title: 'La transformación de Santiago',
        author: 'Benjamín Vicuña Mackenna',
        year: 1872,
        signature: 'BN-983.32-V632t',
        citation:
          'Vicuña Mackenna, B. (1872). La transformación de Santiago. Imprenta de la Librería del Mercurio, Santiago.',
        inPublicDomain: true,
      },
      {
        type: 'MEMORIA_CHILENA',
        title: 'Cerro Santa Lucía',
        url: 'https://www.memoriachilena.gob.cl/602/w3-article-3611.html',
        citation:
          'Memoria Chilena (s.f.). Benjamín Vicuña Mackenna y la transformación de Santiago.',
      },
    ],
  },
  {
    slug: 'bombardeo-la-moneda-1973',
    title: 'Bombardeo del Palacio de La Moneda',
    shortDesc:
      'El 11 de septiembre de 1973, aviones Hawker Hunter bombardean La Moneda durante el golpe de Estado.',
    longDesc:
      'A las 11:52 de la mañana del 11 de septiembre de 1973, dos aviones Hawker Hunter de la Fuerza Aérea de Chile bombardearon el Palacio de La Moneda durante el golpe de Estado militar contra el gobierno de Salvador Allende. Tras el ataque, fuerzas de Ejército, Marina, Carabineros y FACh ingresaron al palacio. El presidente Allende permaneció dentro hasta su muerte. La estructura del edificio, construido entre 1786 y 1805 por Joaquín Toesca, sufrió daños severos y fue restaurada solo en 1981. El bombardeo es uno de los hechos más documentados visualmente del siglo XX chileno y marca el inicio de 17 años de dictadura cívico-militar.',
    yearStart: 1973,
    dateText: '11 de septiembre de 1973',
    category: 'POLITICA',
    era: 'DICTADURA',
    latitude: -33.4429,
    longitude: -70.6543,
    region: 'Metropolitana',
    comuna: 'Santiago',
    featured: true,
    sources: [
      {
        type: 'ARCHIVO_NACIONAL',
        title: 'Informe Rettig: Comisión Nacional de Verdad y Reconciliación',
        year: 1991,
        citation:
          'Comisión Nacional de Verdad y Reconciliación (1991). Informe de la Comisión Nacional de Verdad y Reconciliación. Tomo I. Santiago: Ministerio del Interior.',
        inPublicDomain: true,
      },
      {
        type: 'MEMORIA_CHILENA',
        title: 'Golpe de Estado del 11 de septiembre de 1973',
        url: 'https://www.memoriachilena.gob.cl/602/w3-article-92405.html',
        citation:
          'Memoria Chilena (s.f.). 11 de septiembre de 1973. Biblioteca Nacional Digital de Chile.',
      },
    ],
  },
  {
    slug: 'estacion-mapocho-1913',
    title: 'Inauguración de la Estación Mapocho',
    shortDesc:
      'La gran estación ferroviaria de Santiago, obra de Emilio Jecquier, abre sus puertas en 1913.',
    longDesc:
      'La Estación Mapocho fue inaugurada el 26 de septiembre de 1913 como cabecera del ferrocarril de Santiago a Valparaíso y posteriormente al norte del país. Diseñada por el arquitecto Emilio Jecquier en estilo Beaux-Arts, su gran cubierta abovedada de fierro fue fabricada en Bélgica y constituyó una proeza tecnológica de la época. Funcionó como estación hasta 1987 y, tras su cierre, fue restaurada y reabierta en 1994 como el Centro Cultural Estación Mapocho, uno de los principales espacios culturales de la capital. Es Monumento Nacional desde 1976.',
    yearStart: 1913,
    dateText: '26 de septiembre de 1913',
    category: 'TRANSPORTE',
    era: 'PARLAMENTARISMO',
    latitude: -33.4337,
    longitude: -70.6533,
    region: 'Metropolitana',
    comuna: 'Santiago',
    sources: [
      {
        type: 'BIBLIOTECA_NACIONAL',
        title: 'Historia de los ferrocarriles de Chile',
        author: 'Santiago Marín Vicuña',
        year: 1916,
        signature: 'BN-385.0983-M337h',
        citation:
          'Marín Vicuña, S. (1916). Los ferrocarriles de Chile. Imprenta Cervantes, Santiago.',
        inPublicDomain: true,
      },
      {
        type: 'MEMORIA_CHILENA',
        title: 'Estación Mapocho',
        url: 'https://www.memoriachilena.gob.cl/602/w3-article-100630.html',
        citation: 'Memoria Chilena (s.f.). Estación Mapocho.',
      },
    ],
  },
  {
    slug: 'quinta-normal-1842',
    title: 'Fundación de la Quinta Normal de Agricultura',
    shortDesc:
      'Se crea el primer parque público de Santiago como centro de aclimatación de especies vegetales.',
    longDesc:
      'La Quinta Normal de Agricultura fue fundada en 1842 por iniciativa del ministro Manuel Rengifo y bajo dirección técnica del francés Claudio Gay. Su objetivo original era servir como estación experimental para introducir y aclimatar especies vegetales útiles para la agricultura chilena. Con los años se transformó en el primer gran parque público de Santiago, albergando además el Museo Nacional de Historia Natural (fundado en 1830 y trasladado en 1875), el Museo de Ciencia y Tecnología y la Escuela de Artes y Oficios. El edificio principal del museo, de 1875, fue construido para la Exposición Internacional de Santiago de ese mismo año.',
    yearStart: 1842,
    category: 'CIENCIA',
    era: 'REPUBLICA_TEMPRANA',
    latitude: -33.4406,
    longitude: -70.6839,
    region: 'Metropolitana',
    comuna: 'Santiago',
    sources: [
      {
        type: 'BIBLIOTECA_NACIONAL',
        title: 'Historia física y política de Chile',
        author: 'Claudio Gay',
        year: 1844,
        signature: 'BN-Sala Medina',
        citation:
          'Gay, C. (1844). Historia física y política de Chile. Tomo I. París: Imprenta de Maulde y Renou.',
        inPublicDomain: true,
      },
      {
        type: 'MEMORIA_CHILENA',
        title: 'La Quinta Normal',
        url: 'https://www.memoriachilena.gob.cl/602/w3-article-3489.html',
        citation: 'Memoria Chilena (s.f.). La Quinta Normal de Agricultura.',
      },
    ],
  },

  // ============== VALPARAÍSO (3) ==============
  {
    slug: 'valparaiso-fundacion-1536',
    title: 'Llegada de Juan de Saavedra a Valparaíso',
    shortDesc:
      'Juan de Saavedra arriba en 1536 a la bahía y la bautiza Valparaíso en honor a su pueblo natal.',
    longDesc:
      'En septiembre de 1536, durante la expedición de Diego de Almagro al sur del Tahuantinsuyo, el capitán Juan de Saavedra arribó a la bahía de Quintil para reabastecerse del barco Santiaguillo. Saavedra rebautizó el lugar como Valparaíso en honor a su localidad natal, Valparaíso de Arriba, en Cuenca, España. Aunque tradicionalmente se ha tomado esta fecha como su fundación, Valparaíso no recibió título formal de ciudad hasta 1802. Durante la Colonia fue el principal puerto comercial del Pacífico sur, y desde mediados del siglo XIX se convirtió en una ciudad cosmopolita gracias al auge del comercio con Europa por el Cabo de Hornos.',
    yearStart: 1536,
    category: 'FUNDACION',
    era: 'CONQUISTA',
    latitude: -33.0472,
    longitude: -71.6127,
    region: 'Valparaíso',
    comuna: 'Valparaíso',
    sources: [
      {
        type: 'MEMORIA_CHILENA',
        title: 'Historia de Valparaíso',
        url: 'https://www.memoriachilena.gob.cl/602/w3-article-100565.html',
        citation: 'Memoria Chilena (s.f.). Historia urbana de Valparaíso.',
      },
      {
        type: 'BIBLIOTECA_NACIONAL',
        title: 'Historia de Valparaíso',
        author: 'Benjamín Vicuña Mackenna',
        year: 1869,
        signature: 'BN-983.32-V632hv',
        citation:
          'Vicuña Mackenna, B. (1869). Historia de Valparaíso. Tomo I. Imprenta Albión, Valparaíso.',
        inPublicDomain: true,
      },
    ],
  },
  {
    slug: 'terremoto-valparaiso-1906',
    title: 'Terremoto de Valparaíso de 1906',
    shortDesc:
      'El 16 de agosto de 1906, un terremoto de magnitud 8.2 destruye gran parte de Valparaíso.',
    longDesc:
      'A las 19:55 horas del 16 de agosto de 1906, un terremoto de magnitud estimada 8.2 sacudió la zona central de Chile, con epicentro frente a Valparaíso. El sismo derribó gran parte del casco histórico de la ciudad y provocó incendios que se prolongaron por días. Se estima que murieron entre 3.000 y 3.882 personas. El desastre marcó el fin del esplendor económico de Valparaíso, que ya había sido golpeado por la apertura del Canal de Panamá poco después (1914). La reconstrucción introdujo la zonificación moderna y las primeras regulaciones antisísmicas en Chile. Los planos del damero superior y los ascensores fueron restaurados parcialmente.',
    yearStart: 1906,
    dateText: '16 de agosto de 1906',
    category: 'DESASTRE_NATURAL',
    era: 'PARLAMENTARISMO',
    latitude: -33.0458,
    longitude: -71.6197,
    region: 'Valparaíso',
    comuna: 'Valparaíso',
    sources: [
      {
        type: 'BIBLIOTECA_NACIONAL',
        title: 'El terremoto del 16 de agosto de 1906',
        author: 'Fernand de Montessus de Ballore',
        year: 1908,
        signature: 'BN-551.22-M781t',
        citation:
          'Montessus de Ballore, F. de (1908). Historia sísmica de los Andes Meridionales. Imprenta Cervantes, Santiago.',
        inPublicDomain: true,
      },
      {
        type: 'MEMORIA_CHILENA',
        title: 'Terremoto de Valparaíso de 1906',
        url: 'https://www.memoriachilena.gob.cl/602/w3-article-94531.html',
        citation: 'Memoria Chilena (s.f.). Terremoto de Valparaíso, 1906.',
      },
    ],
  },
  {
    slug: 'ascensores-valparaiso-1883',
    title: 'Inauguración del primer ascensor de Valparaíso',
    shortDesc:
      'El ascensor Concepción se inaugura en 1883, primero de los icónicos funiculares de los cerros porteños.',
    longDesc:
      'El 1 de diciembre de 1883 fue inaugurado el ascensor Concepción, el primero de los funiculares que se construirían para conectar el plan de Valparaíso con sus 42 cerros. Diseñado por el ingeniero Liberio Brieba, el ascensor permitía superar pendientes de hasta 45 grados con tracción a vapor inicialmente, luego eléctrica. En su apogeo, Valparaíso llegó a tener más de 30 ascensores en operación. Hoy quedan ocho funcionando, y el conjunto, junto con el casco histórico, fue declarado Patrimonio de la Humanidad por la UNESCO en 2003. Son símbolo del ingenio porteño y de la condición de Valparaíso como "ciudad anfiteatro".',
    yearStart: 1883,
    dateText: '1 de diciembre de 1883',
    category: 'TRANSPORTE',
    era: 'REPUBLICA_TEMPRANA',
    latitude: -33.0411,
    longitude: -71.626,
    region: 'Valparaíso',
    comuna: 'Valparaíso',
    sources: [
      {
        type: 'MEMORIA_CHILENA',
        title: 'Ascensores de Valparaíso',
        url: 'https://www.memoriachilena.gob.cl/602/w3-article-94556.html',
        citation: 'Memoria Chilena (s.f.). Ascensores de Valparaíso.',
      },
      {
        type: 'BIBLIOTECA_NACIONAL',
        title: 'Valparaíso. La ciudad de los ascensores',
        author: 'Joaquín Edwards Bello',
        year: 1923,
        signature: 'BN-863-E26v',
        citation:
          'Edwards Bello, J. (1923). Valparaíso. Crónicas de la ciudad. Imprenta Universitaria, Santiago.',
        inPublicDomain: true,
      },
    ],
  },

  // ============== CONCEPCIÓN (2) ==============
  {
    slug: 'fundacion-concepcion-1550',
    title: 'Fundación de Concepción del Nuevo Extremo',
    shortDesc:
      'Pedro de Valdivia funda Concepción del Nuevo Extremo en la bahía de Penco el 5 de octubre de 1550.',
    longDesc:
      'El 5 de octubre de 1550, Pedro de Valdivia funda la ciudad de Concepción del Nuevo Extremo en la bahía de Penco, frontera con el territorio mapuche del Bío Bío. La nueva villa fue concebida como base militar y administrativa para la guerra de Arauco. Sufrió cinco grandes destrucciones por sismos y maremotos antes de su traslado definitivo en 1751 al valle de la Mocha (actual emplazamiento). El sismo y maremoto de 1751 destruyó completamente la ciudad antigua de Penco; el de 1835 sacudió el nuevo emplazamiento. Concepción es la única ciudad chilena que ha sido capital provisoria de la República en distintas oportunidades (1818, 1860, 1973).',
    yearStart: 1550,
    dateText: '5 de octubre de 1550',
    category: 'FUNDACION',
    era: 'CONQUISTA',
    latitude: -36.8201,
    longitude: -73.0444,
    region: 'Biobío',
    comuna: 'Concepción',
    sources: [
      {
        type: 'BIBLIOTECA_NACIONAL',
        title: 'Histórica relación del Reino de Chile',
        author: 'Alonso de Ovalle',
        year: 1646,
        signature: 'BN-Sala Medina',
        citation:
          'Ovalle, A. de (1646). Histórica relación del Reino de Chile. Roma: Francesco Caballi.',
        inPublicDomain: true,
      },
      {
        type: 'MEMORIA_CHILENA',
        title: 'Historia de Concepción',
        url: 'https://www.memoriachilena.gob.cl/602/w3-article-93577.html',
        citation: 'Memoria Chilena (s.f.). Concepción.',
      },
    ],
  },
  {
    slug: 'terremoto-cauquenes-2010',
    title: 'Terremoto y maremoto del 27F',
    shortDesc:
      'Terremoto de magnitud 8.8 con epicentro frente a Cobquecura sacude la zona centro-sur el 27 de febrero de 2010.',
    longDesc:
      'A las 03:34 del 27 de febrero de 2010, un terremoto de magnitud Mw 8.8 sacudió la zona central y sur de Chile, con epicentro frente a las costas de Cobquecura, región del Biobío. Fue el sexto sismo más grande registrado por instrumentos en el mundo. Generó un maremoto que arrasó localidades costeras como Constitución, Dichato, Talcahuano y la isla Juan Fernández. Murieron 525 personas y aproximadamente 1.5 millones de viviendas resultaron dañadas. El terremoto puso a prueba la normativa antisísmica chilena, que en general respondió bien, aunque revelaron deficiencias graves en el sistema de alerta de tsunami que costaron vidas en localidades costeras.',
    yearStart: 2010,
    dateText: '27 de febrero de 2010',
    category: 'DESASTRE_NATURAL',
    era: 'TRANSICION',
    latitude: -36.122,
    longitude: -72.898,
    region: 'Biobío',
    comuna: 'Cobquecura',
    sources: [
      {
        type: 'ACADEMIC_PAPER',
        title: 'The 2010 Mw 8.8 Maule earthquake',
        author: 'Vigny, C. et al.',
        year: 2011,
        url: 'https://www.science.org/doi/10.1126/science.1204132',
        citation:
          'Vigny, C., Socquet, A., Peyrat, S., et al. (2011). The 2010 Mw 8.8 Maule megathrust earthquake of Central Chile. Science, 332(6036), 1417-1421.',
      },
      {
        type: 'ARCHIVO_NACIONAL',
        title: 'Informe oficial del terremoto del 27F',
        year: 2011,
        citation:
          'ONEMI (2011). Informe consolidado del terremoto y maremoto del 27 de febrero de 2010. Ministerio del Interior.',
        inPublicDomain: true,
      },
    ],
  },

  // ============== ATACAMA (2) ==============
  {
    slug: 'rescate-mineros-2010',
    title: 'Rescate de los 33 mineros en San José',
    shortDesc:
      'Tras 69 días bajo tierra, los 33 mineros de la mina San José son rescatados el 13 de octubre de 2010.',
    longDesc:
      'El 5 de agosto de 2010 se derrumbó la mina San José, ubicada a 45 km de Copiapó, dejando atrapados a 33 mineros a 700 metros de profundidad. Tras 17 días en silencio, una sonda perforadora trajo a la superficie un mensaje: "Estamos bien en el refugio los 33". Comenzó así una operación de rescate de 69 días que congregó equipos de Codelco, NASA, empresas estadounidenses y canadienses. Finalmente, el 13 de octubre, mediante la cápsula Fénix 2, los 33 mineros fueron extraídos uno por uno en un evento televisado a nivel mundial. Es el rescate minero más profundo y prolongado exitoso de la historia. Marcó la presidencia de Sebastián Piñera y se convirtió en símbolo de resiliencia.',
    yearStart: 2010,
    yearEnd: 2010,
    dateText: '5 de agosto al 13 de octubre de 2010',
    category: 'ECONOMIA',
    era: 'TRANSICION',
    latitude: -27.1611,
    longitude: -70.4986,
    region: 'Atacama',
    comuna: 'Caldera',
    featured: true,
    sources: [
      {
        type: 'BOOK',
        title: 'Deep Down Dark',
        author: 'Héctor Tobar',
        year: 2014,
        citation:
          'Tobar, H. (2014). Deep Down Dark: The Untold Stories of 33 Men Buried in a Chilean Mine. Farrar, Straus and Giroux.',
      },
      {
        type: 'ARCHIVO_NACIONAL',
        title: 'Informe accidente mina San José',
        year: 2011,
        citation:
          'Sernageomin (2011). Informe técnico del derrumbe en mina San José. Ministerio de Minería de Chile.',
        inPublicDomain: true,
      },
    ],
  },
  {
    slug: 'humberstone-1872',
    title: 'Salitreras Humberstone y Santa Laura',
    shortDesc:
      'Centro de la industria del salitre que dio identidad a la pampa tarapaqueña y al sello social del norte.',
    longDesc:
      'La oficina salitrera Humberstone, fundada originalmente en 1872 como La Palma y rebautizada en 1925 en honor al ingeniero James Humberstone, fue uno de los principales centros de la industria del salitre en la pampa de Tarapacá. Junto con Santa Laura, conformó un complejo industrial donde miles de obreros chilenos, peruanos y bolivianos trabajaron en condiciones extremas. Las salitreras impulsaron la economía chilena entre 1880 y 1930 y dieron origen a uno de los movimientos obreros más combativos de América Latina. Tras la invención del salitre sintético, ambas oficinas cerraron definitivamente en 1960. En 2005 fueron declaradas Patrimonio de la Humanidad por la UNESCO. Hoy son museo al aire libre.',
    yearStart: 1872,
    yearEnd: 1960,
    category: 'PATRIMONIO',
    era: 'REPUBLICA_TEMPRANA',
    latitude: -20.207,
    longitude: -69.793,
    region: 'Tarapacá',
    comuna: 'Pozo Almonte',
    sources: [
      {
        type: 'MEMORIA_CHILENA',
        title: 'El ciclo del salitre',
        url: 'https://www.memoriachilena.gob.cl/602/w3-article-3414.html',
        citation: 'Memoria Chilena (s.f.). El ciclo del salitre.',
      },
      {
        type: 'BIBLIOTECA_NACIONAL',
        title: 'Album de las pampas salitreras',
        author: 'Oscar Bermúdez',
        year: 1963,
        signature: 'BN-985-B516a',
        citation:
          'Bermúdez, O. (1963). Historia del salitre desde sus orígenes hasta la Guerra del Pacífico. Editorial Universitaria, Santiago.',
        inPublicDomain: false,
      },
    ],
  },

  // ============== LA ARAUCANÍA (2) ==============
  {
    slug: 'pacificacion-araucania-1881',
    title: 'Refundación de Villarrica y "Pacificación" de la Araucanía',
    shortDesc:
      'El Ejército ocupa militarmente la Araucanía entre 1861 y 1883 incorporando el territorio mapuche al Estado chileno.',
    longDesc:
      'La llamada "Pacificación de la Araucanía" fue una serie de campañas militares chilenas que entre 1861 y 1883 ocuparon el territorio autónomo mapuche al sur del Bío Bío. Se levantaron fuertes (Mulchén, Lebu, Cañete, Toltén, Villarrica refundada en 1883), se fundaron ciudades como Temuco (1881) y se reasentó a la población mapuche en reducciones, despojándola de aproximadamente 5 millones de hectáreas. La incorporación se realizó simultáneamente con la Guerra del Pacífico, dejando al Estado chileno sin oposición militar interna. El proceso ha sido revaluado por la historiografía contemporánea como una guerra de ocupación cuyas heridas siguen presentes en el conflicto chileno-mapuche actual.',
    yearStart: 1861,
    yearEnd: 1883,
    category: 'PUEBLOS_ORIGINARIOS',
    era: 'REPUBLICA_TEMPRANA',
    latitude: -38.7333,
    longitude: -72.5833,
    region: 'La Araucanía',
    comuna: 'Temuco',
    sources: [
      {
        type: 'BIBLIOTECA_NACIONAL',
        title: 'Historia de la civilización de Araucanía',
        author: 'Tomás Guevara',
        year: 1898,
        signature: 'BN-983.31-G939h',
        citation:
          'Guevara, T. (1898). Historia de la civilización de Araucanía. Imprenta Cervantes, Santiago.',
        inPublicDomain: true,
      },
      {
        type: 'ACADEMIC_PAPER',
        title: 'La frontera mapuche',
        author: 'José Bengoa',
        year: 1985,
        citation:
          'Bengoa, J. (1985). Historia del pueblo mapuche, siglos XIX y XX. Ediciones Sur, Santiago.',
      },
    ],
  },
  {
    slug: 'curacautin-erupcion-llaima',
    title: 'Erupción del volcán Llaima',
    shortDesc:
      'El Llaima, uno de los volcanes más activos de los Andes, registra una erupción mayor el 1 de enero de 2008.',
    longDesc:
      'El volcán Llaima, ubicado en el Parque Nacional Conguillío en la región de la Araucanía, es uno de los más activos de Chile y de los Andes meridionales. Su erupción del 1 de enero de 2008 obligó a evacuar a más de 150 personas en el sector de Cherquenco y comunidades pewenche cercanas, y arrojó cenizas hasta en 800 km de radio. Es un sitio sagrado para el pueblo mapuche-pewenche y un referente identitario de la región. Sus erupciones documentadas se remontan al siglo XVII; las más recientes (1994, 2008-2009) han sido monitoreadas por SERNAGEOMIN.',
    yearStart: 2008,
    dateText: '1 de enero de 2008',
    category: 'DESASTRE_NATURAL',
    era: 'TRANSICION',
    latitude: -38.6928,
    longitude: -71.7297,
    region: 'La Araucanía',
    comuna: 'Curacautín',
    sources: [
      {
        type: 'ARCHIVO_NACIONAL',
        title: 'Informe erupción volcán Llaima 2008',
        year: 2008,
        citation:
          'SERNAGEOMIN (2008). Informe técnico erupción volcán Llaima, enero 2008. Observatorio Volcanológico de los Andes del Sur.',
        inPublicDomain: true,
      },
      {
        type: 'MEMORIA_CHILENA',
        title: 'Volcanes de Chile',
        url: 'https://www.memoriachilena.gob.cl/602/w3-article-94568.html',
        citation: 'Memoria Chilena (s.f.). Volcanes de Chile.',
      },
    ],
  },

  // ============== CHILOÉ (2) ==============
  {
    slug: 'iglesias-chiloe-1608',
    title: 'Iglesias jesuíticas de Chiloé',
    shortDesc:
      'Sistema de capillas de madera construidas por la misión circular jesuita desde 1608, hoy patrimonio mundial.',
    longDesc:
      'Las iglesias de Chiloé constituyen un conjunto único de arquitectura religiosa en madera nativa, fruto de la fusión de la tradición carpintera europea con técnicas locales chilote-huilliche. Su origen se remonta a 1608, cuando los jesuitas establecieron en el archipiélago el sistema de "misión circular": un cura recorría una vez al año cada localidad y entre tanto la comunidad se autoadministraba bajo la guía de fiscales. Cada capilla es construida íntegramente en madera, con clavijas en lugar de clavos, y techos de tejuela de alerce. Tras la expulsión de los jesuitas en 1767, los franciscanos continuaron la tradición. En 2000, dieciséis iglesias fueron declaradas Patrimonio de la Humanidad por la UNESCO.',
    yearStart: 1608,
    category: 'RELIGION',
    era: 'COLONIA',
    latitude: -42.4827,
    longitude: -73.7625,
    region: 'Los Lagos',
    comuna: 'Castro',
    sources: [
      {
        type: 'BIBLIOTECA_NACIONAL',
        title: 'Las iglesias misionales de Chiloé',
        author: 'Hernán Montecinos',
        year: 1995,
        signature: 'BN-726-M787i',
        citation:
          'Montecinos, H. (1995). Las iglesias misionales de Chiloé: documentos. Universidad de Chile.',
      },
      {
        type: 'MEMORIA_CHILENA',
        title: 'Iglesias de Chiloé',
        url: 'https://www.memoriachilena.gob.cl/602/w3-article-3503.html',
        citation: 'Memoria Chilena (s.f.). Iglesias de Chiloé.',
      },
    ],
  },
  {
    slug: 'castro-fundacion-1567',
    title: 'Fundación de Castro',
    shortDesc:
      'Martín Ruiz de Gamboa funda la villa de Santiago de Castro el 12 de febrero de 1567.',
    longDesc:
      'El 12 de febrero de 1567, el capitán Martín Ruiz de Gamboa fundó por orden del gobernador Rodrigo de Quiroga la villa de Santiago de Castro, en honor al virrey del Perú, Lope García de Castro. Es la tercera ciudad más antigua de Chile (después de Santiago y La Serena) que aún existe, y por casi tres siglos fue la capital del archipiélago de Chiloé. Fue saqueada por los corsarios neerlandeses Sebald de Weert (1600) y Hendrick Brouwer (1643). Sobrevivió a la fragmentación territorial de la Colonia y al aislamiento extremo, y mantuvo lealtad realista hasta 1826, año en que Chiloé se incorporó tardíamente a la república chilena.',
    yearStart: 1567,
    dateText: '12 de febrero de 1567',
    category: 'FUNDACION',
    era: 'CONQUISTA',
    latitude: -42.482,
    longitude: -73.7651,
    region: 'Los Lagos',
    comuna: 'Castro',
    sources: [
      {
        type: 'BIBLIOTECA_NACIONAL',
        title: 'Historia general del Reyno de Chile',
        author: 'Diego de Rosales',
        year: 1674,
        signature: 'BN-Sala Medina',
        citation:
          'Rosales, D. de (1674). Historia general del Reyno de Chile, Flandes Indiano. Manuscrito reproducido por Imprenta del Mercurio, 1877.',
        inPublicDomain: true,
      },
      {
        type: 'MEMORIA_CHILENA',
        title: 'Historia de Chiloé',
        url: 'https://www.memoriachilena.gob.cl/602/w3-article-94553.html',
        citation: 'Memoria Chilena (s.f.). Chiloé colonial.',
      },
    ],
  },

  // ============== MAGALLANES (2) ==============
  {
    slug: 'fuerte-bulnes-1843',
    title: 'Toma de posesión del Estrecho de Magallanes',
    shortDesc:
      'Chile funda Fuerte Bulnes en 1843 para asegurar la soberanía sobre el Estrecho de Magallanes.',
    longDesc:
      'El 21 de septiembre de 1843, el capitán Juan Williams Wilson, a bordo de la goleta Ancud y por encargo del presidente Manuel Bulnes, izó la bandera chilena en Punta Santa Ana, en la costa sur del Estrecho de Magallanes. La acción, considerada uno de los actos soberanos más importantes del siglo XIX chileno, se anticipó por horas a una expedición francesa con el mismo propósito. El asentamiento, llamado Fuerte Bulnes, sufrió condiciones extremas y fue trasladado en 1848 al actual emplazamiento de Punta Arenas. La toma de posesión consolidó la presencia chilena en la región austral y garantizó el control del paso interoceánico, vital antes de la apertura del Canal de Panamá.',
    yearStart: 1843,
    dateText: '21 de septiembre de 1843',
    category: 'POLITICA',
    era: 'REPUBLICA_TEMPRANA',
    latitude: -53.6175,
    longitude: -70.9217,
    region: 'Magallanes',
    comuna: 'Punta Arenas',
    sources: [
      {
        type: 'BIBLIOTECA_NACIONAL',
        title: 'Historia de Magallanes',
        author: 'Mateo Martinic',
        year: 1992,
        signature: 'BN-983.34-M3855h',
        citation:
          'Martinic, M. (1992). Historia de la región magallánica. Universidad de Magallanes, Punta Arenas.',
      },
      {
        type: 'MEMORIA_CHILENA',
        title: 'Toma de posesión del Estrecho de Magallanes',
        url: 'https://www.memoriachilena.gob.cl/602/w3-article-3522.html',
        citation: 'Memoria Chilena (s.f.). Colonización del Estrecho.',
      },
    ],
  },
  {
    slug: 'magallanes-estrecho-1520',
    title: 'Descubrimiento del Estrecho de Magallanes',
    shortDesc:
      'La expedición de Hernando de Magallanes cruza el estrecho que después llevará su nombre, en 1520.',
    longDesc:
      'El 21 de octubre de 1520, la expedición castellana al mando del navegante portugués Fernão de Magalhães (Hernando de Magallanes) avistó el cabo de las Vírgenes y se adentró en el laberinto de canales que separa la Patagonia continental de Tierra del Fuego. Tras 38 días de navegación, la expedición logró cruzar al Pacífico —océano que el propio Magallanes bautizaría así por la calma de sus aguas— consumando uno de los hitos geográficos más importantes de la era de los descubrimientos. El estrecho, de aproximadamente 600 km de longitud, fue durante casi 400 años la principal ruta interoceánica del hemisferio sur, hasta la apertura del Canal de Panamá en 1914.',
    yearStart: 1520,
    dateText: '21 de octubre al 28 de noviembre de 1520',
    category: 'CIENCIA',
    era: 'PREHISPANICA',
    latitude: -52.508,
    longitude: -70.067,
    region: 'Magallanes',
    comuna: 'Punta Arenas',
    sources: [
      {
        type: 'PRIMARY_DOCUMENT',
        title: 'Relación del primer viaje alrededor del mundo',
        author: 'Antonio Pigafetta',
        year: 1525,
        citation:
          'Pigafetta, A. (1525). Relazione del primo viaggio intorno al mondo. Reimpresión moderna: Alianza Editorial, Madrid, 1985.',
        inPublicDomain: true,
      },
      {
        type: 'MEMORIA_CHILENA',
        title: 'El descubrimiento del Estrecho',
        url: 'https://www.memoriachilena.gob.cl/602/w3-article-3522.html',
        citation: 'Memoria Chilena (s.f.). Magallanes y el Estrecho.',
      },
    ],
  },

  // ============== PREHISPÁNICOS (2) ==============
  {
    slug: 'monte-verde-14000',
    title: 'Asentamiento de Monte Verde',
    shortDesc:
      'Sitio arqueológico cerca de Puerto Montt con evidencia humana datada en aprox. 14.500 a.p., uno de los más antiguos de América.',
    longDesc:
      'Monte Verde, cerca de Puerto Montt en la región de Los Lagos, es uno de los yacimientos arqueológicos más importantes de América. Las excavaciones lideradas por Tom Dillehay desde 1977 revelaron evidencia de presencia humana datada por radiocarbono entre 14.500 y 18.500 años antes del presente. Los hallazgos incluyen estructuras habitacionales hechas con palos y pieles de mastodonte, restos vegetales, herramientas líticas y secuencias de fogones. Monte Verde es la prueba arqueológica más sólida que refuta el paradigma "Clovis-first" según el cual el continente habría sido poblado solo desde hace ~13.000 años. Su validación científica ocurrió en 1997 tras una visita verificatoria de un panel internacional de arqueólogos.',
    yearStart: -12500,
    yearEnd: -12500,
    category: 'PUEBLOS_ORIGINARIOS',
    era: 'PREHISPANICA',
    latitude: -41.5031,
    longitude: -73.2,
    region: 'Los Lagos',
    comuna: 'Puerto Montt',
    sources: [
      {
        type: 'ACADEMIC_PAPER',
        title: 'Monte Verde and the human occupation of South America',
        author: 'Tom Dillehay',
        year: 1997,
        url: 'https://www.smithsonianmag.com/',
        citation:
          'Dillehay, T. D. (1997). Monte Verde: A Late Pleistocene Settlement in Chile. Volume 2. Smithsonian Institution Press.',
      },
      {
        type: 'MEMORIA_CHILENA',
        title: 'Monte Verde',
        url: 'https://www.memoriachilena.gob.cl/602/w3-article-100590.html',
        citation: 'Memoria Chilena (s.f.). Sitio arqueológico de Monte Verde.',
      },
    ],
  },
  {
    slug: 'geoglifos-pintados',
    title: 'Geoglifos de Pintados',
    shortDesc:
      'Conjunto de más de 400 figuras grabadas en las laderas de la pampa del Tamarugal, hechas entre los siglos VII y XV.',
    longDesc:
      'Los Geoglifos de Pintados, ubicados en la quebrada del mismo nombre dentro del Salar del Tamarugal, son un conjunto de más de 400 figuras geométricas, zoomorfas y antropomorfas grabadas en las laderas mediante adición y sustracción de piedras oscuras. Fueron creados entre los siglos VII y XV d.C. por las culturas que habitaron el desierto de Atacama y el Camino del Inca. Su orientación y emplazamiento sugieren que cumplían una función de marcadores territoriales y guías para las caravanas de llamas que transportaban mercancías entre la costa, el oasis y el altiplano. Algunos motivos representan llamas, peces, figuras humanas con tocados y dibujos abstractos. Son Monumento Nacional desde 1976.',
    yearStart: 600,
    yearEnd: 1500,
    category: 'PUEBLOS_ORIGINARIOS',
    era: 'PREHISPANICA',
    latitude: -20.589,
    longitude: -69.663,
    region: 'Tarapacá',
    comuna: 'Pozo Almonte',
    sources: [
      {
        type: 'BIBLIOTECA_NACIONAL',
        title: 'Geoglifos de Tarapacá',
        author: 'Lautaro Núñez',
        year: 1976,
        signature: 'BN-980.31-N972g',
        citation:
          'Núñez, L. (1976). Geoglifos y tráfico de caravanas en el desierto chileno. Universidad del Norte, Antofagasta.',
      },
      {
        type: 'MEMORIA_CHILENA',
        title: 'Geoglifos del Norte Grande',
        url: 'https://www.memoriachilena.gob.cl/602/w3-article-93478.html',
        citation: 'Memoria Chilena (s.f.). Geoglifos de Tarapacá.',
      },
    ],
  },
]

export const SEED_VERSION = '0.1.0'
