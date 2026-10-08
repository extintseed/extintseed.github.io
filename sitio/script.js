const WHATSAPP_NUMBER = "593979452045";

// El catálogo conserva nombres legibles y sirve únicamente sus copias WebP.
// Las imágenes originales no forman parte de la carpeta publicada.
const optimizedAssetPath = (src) => src && /\.(?:jpe?g|png)$/i.test(src) ? `${src}.webp` : src;

const productGuidanceByFamily = (family) => {
    const normalizedFamily = family.toLocaleLowerCase("es-EC");

    if (normalizedFamily.includes("extintor")) {
        return "La capacidad y el agente deben seleccionarse de acuerdo con el riesgo, la ubicación y las condiciones reales del establecimiento.";
    }
    if (normalizedFamily.includes("detección") || normalizedFamily.includes("activación") || normalizedFamily.includes("notificación")) {
        return "Antes de instalarlo se debe confirmar la alimentación, la compatibilidad y la forma de integración con el sistema existente.";
    }
    if (normalizedFamily.includes("protección") || normalizedFamily.includes("visibilidad")) {
        return "La selección final debe considerar la actividad, el nivel de exposición, la talla y las condiciones específicas de uso.";
    }
    if (normalizedFamily.includes("evacuación") || normalizedFamily.includes("advertencia") || normalizedFamily.includes("prohibición") || normalizedFamily.includes("obligación") || normalizedFamily.includes("información") || normalizedFamily.includes("emergencia")) {
        return "El material, la medida y la ubicación deben definirse según la distancia de lectura, la superficie y las condiciones del entorno.";
    }

    return "La compatibilidad, presentación y disponibilidad deben confirmarse antes de realizar la instalación o reposición del producto.";
};

const buildProductDetailDescription = ({ name, family, summary, specs }) => {
    const mainSpecs = Object.entries(specs).slice(0, 3);
    const specSentence = mainSpecs.length > 0
        ? `Sus datos principales consideran ${mainSpecs.map(([label, value]) => `${label.toLocaleLowerCase("es-EC")}: ${value}`).join("; ")}.`
        : "Su configuración se define según el modelo y la aplicación requerida.";

    return [
        summary,
        `${name} forma parte de nuestra línea de ${family.toLocaleLowerCase("es-EC")} y se entrega bajo verificación de disponibilidad.`,
        specSentence,
        productGuidanceByFamily(family)
    ].join(" ");
};

const createProduct = ({
    id,
    name,
    displayNames = [],
    family,
    summary,
    image = null,
    gallery = [],
    code = "EXT",
    badge = "Disponible",
    reference = false,
    regularPrice = null,
    salePrice = null,
    detailDescription = null,
    features = [],
    specs = {}
}) => {
    const displayName = displayNames.length > 0 ? displayNames.join(" / ") : name;

    return {
        id,
        name: displayName.toLocaleUpperCase("es-EC"),
        displayNames: displayNames.map((displayNamePart) => displayNamePart.toLocaleUpperCase("es-EC")),
        family,
        summary,
        detailDescription: detailDescription || buildProductDetailDescription({ name: displayName, family, summary, specs }),
        image: optimizedAssetPath(image),
        gallery: gallery.map(optimizedAssetPath),
        code,
        badge,
        reference,
        regularPrice,
        salePrice,
        features,
        specs: {
            ...specs,
            Disponibilidad: "Bajo cotización",
            Entrega: "Según stock y cobertura"
        }
    };
};

const extinguisherProducts = [
    createProduct({
        id: "pqs-2",
        name: "Extintores compactos PQS",
        displayNames: ["Extintor 2 libras PQS", "Extintor 2,5 libras PQS"],
        family: "Extintores PQS",
        summary: "Presentaciones compactas y recargables para automóviles y espacios de fácil acceso.",
        image: "Imagenes/Productos/Extintores/Extintor PQS 2 libras.png",
        badge: "PQS",
        reference: true,
        regularPrice: "$18,00",
        salePrice: "$13,00",
        detailDescription: "Extintores recargables de 2 y 2,5 libras con Polvo Químico Seco PQS, diseñados para una respuesta inicial ante fuegos clase A, B y C. Su tamaño compacto facilita la instalación en automóviles, espacios reducidos y puntos de acceso inmediato. Incorporan control visual de presión y componentes preparados para una descarga rápida. Son una alternativa práctica cuando se necesita protección portátil sin ocupar demasiado espacio.",
        features: [
            { label: "Soporte", text: "Para pared o vehículo" },
            { label: "Control de presión", text: "Manómetro indicador" },
            { label: "Válvula", text: "Bronce de accionamiento rápido" },
            { label: "Descarga", text: "Pitón plástico" },
            { label: "Cilindro", text: "Acero SPCC" },
            { label: "Garantía", text: "1 año" }
        ],
        specs: {
            Capacidades: "2 y 2,5 libras",
            Agente: "Polvo químico seco (PQS)",
            "Clases de fuego": "A, B y C",
            Formato: "Portátil y recargable",
            Aplicación: "Automóviles y espacios compactos",
            Presurización: "Presión almacenada"
        }
    }),
    createProduct({
        id: "pqs-5",
        name: "EXTINTOR 5 LIBRAS PQS",
        family: "Extintores PQS",
        summary: "Alternativa portátil para comercios, vehículos y áreas de trabajo.",
        image: "Imagenes/Productos/Extintores/Extintor PQS 5 libras.png",
        badge: "PQS",
        regularPrice: "$24,00",
        salePrice: "$16,00",
        detailDescription: "Extintor portátil y recargable de 5 libras con Polvo Químico Seco PQS para fuegos clase A, B y C. Su capacidad ofrece un equilibrio adecuado entre facilidad de transporte y cantidad de agente para vehículos grandes, pequeños comercios y áreas operativas. El manómetro permite comprobar visualmente la condición de presión antes de una emergencia. Su formato facilita una ubicación accesible mediante soporte compatible.",
        specs: {
            Capacidad: "5 libras",
            Agente: "Polvo químico seco (PQS)",
            "Clases de fuego": "A, B y C",
            Formato: "Portátil y recargable",
            "Control de presión": "Manómetro indicador",
            Descarga: "Manguera o pitón según modelo",
            Aplicación: "Vehículos, comercios y áreas operativas",
            Presurización: "Presión almacenada",
            Cilindro: "Acero con acabado protector",
            Válvula: "Accionamiento manual",
            Seguridad: "Pasador y precinto de control",
            Mantenimiento: "Inspeccionable y recargable"
        }
    }),
    createProduct({
        id: "pqs-10",
        name: "EXTINTOR 10 LIBRAS PQS",
        family: "Extintores PQS",
        summary: "Una capacidad versátil para instalaciones comerciales y empresariales.",
        image: "Imagenes/Productos/Extintores/Extintor PQS 10 libras.png",
        badge: "PQS",
        regularPrice: "$35,00",
        salePrice: "$27,00",
        detailDescription: "Extintor recargable de 10 libras con Polvo Químico Seco PQS para protección multipropósito frente a fuegos clase A, B y C. Es una capacidad versátil para locales, oficinas, edificios, talleres y áreas de trabajo con riesgos comunes. Su manguera permite orientar la descarga hacia la base del fuego manteniendo una operación controlada. El equipo debe instalarse en un punto visible, señalizado y de fácil acceso.",
        specs: {
            Capacidad: "10 libras",
            Agente: "Polvo químico seco (PQS)",
            "Clases de fuego": "A, B y C",
            Formato: "Portátil y recargable",
            "Control de presión": "Manómetro indicador",
            Descarga: "Manguera con pitón",
            Aplicación: "Locales, oficinas, talleres y edificios",
            Presurización: "Presión almacenada",
            Cilindro: "Acero con acabado protector",
            Válvula: "Accionamiento manual",
            Seguridad: "Pasador y precinto de control",
            Mantenimiento: "Inspeccionable y recargable"
        }
    }),
    createProduct({
        id: "pqs-20",
        name: "EXTINTOR 20 LIBRAS PQS",
        family: "Extintores PQS",
        summary: "Mayor capacidad para espacios industriales, bodegas y áreas de operación.",
        image: "Imagenes/Productos/Extintores/Extintor PQS 20 libras.jpg",
        badge: "PQS",
        regularPrice: "$49,90",
        salePrice: "$39,95",
        detailDescription: "Extintor portátil de 20 libras con Polvo Químico Seco PQS, recargable y apto para fuegos clase A, B y C. La mayor reserva de agente brinda una respuesta inicial más amplia en bodegas, talleres, estacionamientos y zonas operativas. Incluye manguera para dirigir la descarga con mejor alcance y control durante la intervención. Por su peso y capacidad requiere una ubicación estable, señalizada y sin obstáculos.",
        specs: {
            Capacidad: "20 libras",
            Agente: "Polvo químico seco (PQS)",
            "Clases de fuego": "A, B y C",
            Formato: "Portátil y recargable",
            "Control de presión": "Manómetro indicador",
            Descarga: "Manguera con pitón",
            Aplicación: "Bodegas, talleres y zonas operativas",
            Presurización: "Presión almacenada",
            Cilindro: "Acero con acabado protector",
            Válvula: "Accionamiento manual",
            Seguridad: "Pasador y precinto de control",
            Mantenimiento: "Inspeccionable y recargable"
        }
    }),
    createProduct({
        id: "pqs-50",
        name: "EXTINTOR 50 LIBRAS PQS",
        family: "Extintores PQS",
        summary: "Equipo de alta capacidad para requerimientos industriales y zonas de mayor exposición.",
        image: "Imagenes/Productos/Extintores/Extintor PQS 50 libras.png",
        code: "PQS",
        badge: "PQS",
        regularPrice: "$189,00",
        salePrice: "$165,00",
        detailDescription: "Extintor móvil de 50 libras con Polvo Químico Seco PQS para fuegos clase A, B y C en instalaciones con una carga de riesgo mayor. El carro con ruedas permite trasladar el equipo hasta el punto de intervención y la manguera facilita operar a distancia del cilindro. Está orientado a bodegas, galpones, talleres e instalaciones industriales. Su selección debe considerar recorridos despejados y personal preparado para utilizar equipos móviles.",
        specs: {
            Capacidad: "50 libras",
            Agente: "Polvo químico seco (PQS)",
            "Clases de fuego": "A, B y C",
            Formato: "Móvil, recargable y con ruedas",
            "Control de presión": "Manómetro indicador",
            Descarga: "Manguera con pitón",
            Aplicación: "Bodegas, galpones e industria",
            Presurización: "Presión almacenada",
            Cilindro: "Acero con acabado protector",
            Válvula: "Accionamiento manual",
            Seguridad: "Pasador y precinto de control",
            Mantenimiento: "Inspeccionable y recargable"
        }
    }),
    createProduct({
        id: "pqs-100",
        name: "EXTINTOR 100 LIBRAS PQS",
        family: "Extintores PQS móviles",
        summary: "Equipo móvil de gran capacidad para bodegas, industrias y áreas con una exposición elevada.",
        image: "Imagenes/Productos/Extintores/Extintor PQS 150 libras.png",
        badge: "PQS móvil",
        reference: true,
        regularPrice: "$465,00",
        salePrice: "$413,34",
        detailDescription: "Extintor móvil de 100 libras con Polvo Químico Seco PQS para fuegos clase A, B y C en operaciones con exposición elevada. Su reserva de agente está pensada para áreas industriales, centros logísticos, bodegas y puntos donde un equipo portátil puede resultar insuficiente. El carro facilita la movilización y la manguera permite dirigir la descarga manteniendo el cilindro estable. Requiere rutas de acceso libres y personal capacitado para su operación.",
        features: [
            { label: "Movilidad", text: "Carro con ruedas para facilitar el traslado" },
            { label: "Descarga", text: "Manguera para operación a distancia" },
            { label: "Aplicación", text: "Reserva de agente para áreas industriales" },
            { label: "Mantenimiento", text: "Equipo recargable para atención especializada" }
        ],
        specs: {
            Capacidad: "100 libras",
            Agente: "Polvo químico seco (PQS)",
            Formato: "Móvil con ruedas",
            "Clases de fuego": "A, B y C",
            Aplicación: "Industria, logística y almacenamiento",
            "Control de presión": "Manómetro indicador",
            Cilindro: "Acero con acabado protector",
            Seguridad: "Pasador y precinto de control"
        }
    }),
    createProduct({
        id: "pqs-150",
        name: "EXTINTOR 150 LIBRAS PQS",
        family: "Extintores PQS móviles",
        summary: "Máxima capacidad de respuesta para instalaciones industriales y operaciones de alto riesgo.",
        image: "Imagenes/Productos/Extintores/Extintor PQS 150 libras.png",
        badge: "PQS móvil",
        regularPrice: "$695,00",
        salePrice: "$619,00",
        detailDescription: "Extintor móvil de 150 libras con Polvo Químico Seco PQS para una respuesta inicial de gran capacidad ante fuegos clase A, B y C. Está orientado a complejos industriales, grandes bodegas y operaciones donde se requiere una reserva superior de agente. El conjunto móvil permite aproximar el equipo y controlar la descarga mediante manguera. Su implementación debe acompañarse de evaluación técnica, espacio de maniobra y entrenamiento del personal responsable.",
        features: [
            { label: "Movilidad", text: "Carro reforzado para áreas operativas" },
            { label: "Descarga", text: "Manguera para operación controlada" },
            { label: "Capacidad", text: "Reserva de agente para riesgos de mayor escala" },
            { label: "Mantenimiento", text: "Equipo recargable e inspeccionable" }
        ],
        specs: {
            Capacidad: "150 libras",
            Agente: "Polvo químico seco (PQS)",
            Formato: "Móvil con ruedas",
            "Clases de fuego": "A, B y C",
            Aplicación: "Grandes bodegas y complejos industriales",
            "Control de presión": "Manómetro indicador",
            Cilindro: "Acero con acabado protector",
            Seguridad: "Pasador y precinto de control"
        }
    }),
    createProduct({
        id: "co2-5",
        name: "EXTINTOR 5 LIBRAS CO2",
        family: "Extintores CO2",
        summary: "Equipo compacto con agente CO2 para aplicaciones que requieren una descarga limpia.",
        image: "Imagenes/Productos/Extintores/Extintor CO2 5 libras.png",
        badge: "CO2",
        regularPrice: "$65,00",
        salePrice: "$55,00",
        detailDescription: "Extintor portátil y recargable de 5 libras con dióxido de carbono (CO₂), indicado para fuegos clase B y C. Su descarga no deja residuos sólidos, por lo que resulta apropiado para equipos eléctricos energizados y áreas técnicas. La corneta difusora permite dirigir el agente y debe sujetarse únicamente por su zona aislada durante la operación. Es una solución compacta para oficinas, cuartos eléctricos y espacios con equipos sensibles.",
        specs: {
            Capacidad: "5 libras",
            Agente: "Dióxido de carbono (CO₂)",
            "Clases de fuego": "B y C",
            Formato: "Portátil y recargable",
            Cilindro: "Acero para alta presión",
            Descarga: "Corneta difusora",
            Manómetro: "No utiliza; se controla por peso",
            Aplicación: "Equipos eléctricos y áreas técnicas",
            "Estado del agente": "Gas licuado a presión",
            Presurización: "Autopresurizado",
            Residuo: "No deja residuos sólidos",
            Mantenimiento: "Inspección y recarga especializada"
        }
    }),
    createProduct({
        id: "co2-10",
        name: "EXTINTOR 10 LIBRAS CO2",
        family: "Extintores CO2",
        summary: "Capacidad intermedia para instalaciones técnicas, comerciales y empresariales.",
        image: "Imagenes/Productos/Extintores/Extintor CO2 10 libras.png",
        badge: "CO2",
        regularPrice: "$95,00",
        salePrice: "$79,90",
        detailDescription: "Extintor portátil y recargable de 10 libras con dióxido de carbono (CO₂) para fuegos clase B y C. Su capacidad intermedia brinda mayor reserva de agente para tableros eléctricos, salas técnicas, comercios y áreas con equipos energizados. La descarga mediante manguera y corneta ayuda a orientar el gas sin dejar residuos sólidos sobre los componentes. Debe utilizarse con ventilación adecuada y siguiendo las precauciones propias de un agente a alta presión.",
        specs: {
            Capacidad: "10 libras",
            Agente: "Dióxido de carbono (CO₂)",
            "Clases de fuego": "B y C",
            Formato: "Portátil y recargable",
            Cilindro: "Acero para alta presión",
            Descarga: "Manguera y corneta difusora",
            Manómetro: "No utiliza; se controla por peso",
            Aplicación: "Tableros eléctricos y salas técnicas",
            "Estado del agente": "Gas licuado a presión",
            Presurización: "Autopresurizado",
            Residuo: "No deja residuos sólidos",
            Mantenimiento: "Inspección y recarga especializada"
        }
    }),
    createProduct({
        id: "co2-20",
        name: "EXTINTOR 20 LIBRAS CO2",
        family: "Extintores CO2",
        summary: "Mayor autonomía de descarga para necesidades de protección especializadas.",
        image: "Imagenes/Productos/Extintores/Extintor CO2 20 libras.png",
        badge: "CO2",
        regularPrice: "$195,00",
        salePrice: "$169,00",
        detailDescription: "Extintor de 20 libras con dióxido de carbono (CO₂), recargable y destinado a fuegos clase B y C. Ofrece una reserva superior para cuartos eléctricos, áreas de mantenimiento, laboratorios y operaciones con equipos energizados. El agente se dispersa sin dejar polvo ni residuos sólidos, reduciendo la limpieza posterior a la descarga. Por su peso requiere una ubicación firme, accesible y correctamente señalizada cerca del riesgo protegido.",
        specs: {
            Capacidad: "20 libras",
            Agente: "Dióxido de carbono (CO₂)",
            "Clases de fuego": "B y C",
            Formato: "Portátil de alta capacidad y recargable",
            Cilindro: "Acero para alta presión",
            Descarga: "Manguera y corneta difusora",
            Manómetro: "No utiliza; se controla por peso",
            Aplicación: "Cuartos eléctricos y mantenimiento",
            "Estado del agente": "Gas licuado a presión",
            Presurización: "Autopresurizado",
            Residuo: "No deja residuos sólidos",
            Mantenimiento: "Inspección y recarga especializada"
        }
    }),
    createProduct({
        id: "co2-50",
        name: "EXTINTOR 50 LIBRAS CO2",
        family: "Extintores CO2",
        summary: "Equipo móvil de alta capacidad para instalaciones y operaciones de mayor escala.",
        image: "Imagenes/Productos/Extintores/Extintor CO2 50 libras.png",
        badge: "CO2",
        regularPrice: "$3.500,00",
        salePrice: "$2.990,00",
        detailDescription: "Extintor móvil de 50 libras con dióxido de carbono (CO₂) para fuegos clase B y C en instalaciones de mayor escala. El carro permite trasladar el cilindro de alta presión hasta áreas eléctricas, procesos industriales y zonas con líquidos inflamables compatibles. La manguera y corneta facilitan operar manteniendo estable el conjunto móvil. Requiere espacio de maniobra, ventilación suficiente y personal preparado para trabajar con una descarga de CO2 de gran capacidad.",
        specs: {
            Capacidad: "50 libras",
            Agente: "Dióxido de carbono (CO₂)",
            "Clases de fuego": "B y C",
            Formato: "Móvil, recargable y con ruedas",
            Cilindro: "Acero para alta presión",
            Descarga: "Manguera y corneta difusora",
            Manómetro: "No utiliza; se controla por peso",
            Aplicación: "Procesos industriales y áreas eléctricas",
            "Estado del agente": "Gas licuado a presión",
            Presurización: "Autopresurizado",
            Residuo: "No deja residuos sólidos",
            Mantenimiento: "Inspección y recarga especializada"
        }
    }),
    createProduct({
        id: "agua-2-5",
        name: "EXTINTOR 2,5 GALONES DE AGUA",
        family: "Extintores de agua",
        summary: "Equipo de 2,5 galones disponible bajo especificación y cotización.",
        image: "Imagenes/Productos/Extintores/Extintor AGUA 2.5 Galones.png",
        code: "H₂O",
        badge: "Agua",
        regularPrice: "$175,00",
        salePrice: "$149,00",
        detailDescription: "Extintor portátil de 2,5 galones con agua presurizada para fuegos clase A en materiales combustibles ordinarios. Actúa principalmente por enfriamiento sobre madera, papel, textiles y otros sólidos compatibles. Incorpora manómetro y manguera para controlar la presión y orientar la descarga hacia el material en combustión. No debe utilizarse sobre equipos eléctricos energizados, líquidos inflamables ni aceites de cocina.",
        specs: {
            Capacidad: "2,5 galones / aproximadamente 10 litros",
            Agente: "Agua presurizada",
            "Clase de fuego": "A",
            Formato: "Portátil y recargable",
            "Control de presión": "Manómetro indicador",
            Descarga: "Manguera de aplicación",
            Aplicación: "Madera, papel, textiles y sólidos compatibles",
            Restricción: "No usar en equipos eléctricos energizados",
            Presurización: "Presión almacenada",
            Cilindro: "Metálico resistente a la corrosión",
            Válvula: "Accionamiento manual",
            Mantenimiento: "Inspeccionable y recargable"
        }
    }),
    createProduct({
        id: "tipo-k-2-5",
        name: "EXTINTOR 2,5 GALONES TIPO K",
        family: "Extintores Tipo K",
        summary: "Solución especializada de 2,5 galones para requerimientos de cocina.",
        image: "Imagenes/Productos/Extintores/Extintor ESPUMA o Tipo K o COLD FIRE 1.25 galones.png",
        code: "K",
        badge: "Tipo K",
        reference: true,
        regularPrice: "$345,00",
        salePrice: "$299,00",
        detailDescription: "Extintor portátil de 2,5 galones con agente químico húmedo para fuegos clase K producidos por aceites y grasas de cocina. La descarga ayuda a enfriar la superficie y a formar una barrera que reduce la posibilidad de reignición. Está orientado a cocinas comerciales, restaurantes, hoteles y áreas con freidoras o equipos de cocción. Debe instalarse como parte de una protección evaluada específicamente para el riesgo culinario.",
        specs: {
            Capacidad: "2,5 galones",
            Agente: "Solución de químico húmedo",
            "Clase de fuego": "K",
            Formato: "Portátil y recargable",
            Aplicación: "Aceites y grasas de cocina",
            "Entornos recomendados": "Restaurantes, hoteles y cocinas comerciales",
            Acción: "Enfriamiento y reducción de la reignición",
            Descarga: "Manguera y boquilla aplicadora",
            "Control de presión": "Indicador según modelo",
            Cilindro: "Metálico resistente a la corrosión",
            Válvula: "Accionamiento manual",
            Mantenimiento: "Inspeccionable y recargable"
        }
    })
];

const accessoryProducts = [
    createProduct({
        id: "soporte-pqs-2-2-5",
        name: "Soportes de pared para extintores PQS compactos",
        displayNames: ["Soporte para extintor PQS de 2 libras", "Soporte para extintor PQS de 2,5 libras"],
        family: "Soportes para extintores",
        summary: "Soporte compacto para instalación en pared o sujeción del extintor dentro de un vehículo.",
        image: "Imagenes/Productos/Accesorios/soportedeextintor2libras.jpeg",
        badge: "PQS 2–2,5 lb",
        regularPrice: "$4,00",
        salePrice: "$2,50",
        specs: { Capacidades: "2 y 2,5 libras", Instalación: "Pared o vehículo", Material: "Metálico" }
    }),
    createProduct({
        id: "soporte-pqs-5",
        name: "Soporte de pared para extintor PQS de 5 libras",
        family: "Soportes para extintores",
        summary: "Base metálica de fijación para mantener extintores PQS de 5 libras estables y accesibles.",
        image: "Imagenes/Productos/Accesorios/soportedeextintor5libras.jpeg",
        badge: "PQS 5 lb",
        regularPrice: "$6,00",
        salePrice: "$4,50",
        specs: { Capacidad: "5 libras", Instalación: "Pared", Material: "Metálico" }
    }),
    createProduct({
        id: "soporte-pqs-10",
        name: "Soporte de pared para extintor PQS de 10 libras",
        family: "Soportes para extintores",
        summary: "Sistema de fijación dimensionado para extintores PQS de 10 libras en áreas comerciales e industriales.",
        image: "Imagenes/Productos/Accesorios/soporte_extintor_pqs_10.png",
        badge: "PQS 10 lb",
        regularPrice: "$8,00",
        salePrice: "$5,00",
        specs: { Capacidad: "10 libras", Instalación: "Pared", Material: "Metálico" }
    }),
    createProduct({
        id: "soporte-pqs-20",
        name: "Soporte de pared para extintor PQS de 20 libras",
        family: "Soportes para extintores",
        summary: "Soporte reforzado para asegurar extintores PQS de 20 libras en puntos visibles y de acceso inmediato.",
        image: "Imagenes/Productos/Accesorios/soporte_extintor_pqs_20_libras.jpeg",
        badge: "PQS 20 lb",
        regularPrice: "$12,00",
        salePrice: "$5,00",
        specs: { Capacidad: "20 libras", Instalación: "Pared", Material: "Metálico reforzado" }
    }),
    createProduct({
        id: "soporte-co2-5-10",
        name: "Soportes de pared para extintores CO2",
        displayNames: ["Soporte para extintor CO2 de 5 libras", "Soporte para extintor CO2 de 10 libras"],
        family: "Soportes para extintores",
        summary: "Sujeción metálica para extintores CO2 portátiles, seleccionada según el diámetro del cilindro.",
        image: "Imagenes/Productos/Accesorios/soporte_extintor_co2.png",
        badge: "CO2 5–10 lb",
        regularPrice: "$16,00",
        salePrice: "$13,00",
        specs: { Capacidades: "5 y 10 libras", Instalación: "Pared", Compatibilidad: "Según diámetro" }
    }),
    createProduct({
        id: "soporte-piso-extintor",
        name: "Soporte de piso para extintor",
        family: "Soportes para extintores",
        summary: "Soporte metálico autoportante para mantener el extintor visible, estable y accesible sin fijarlo directamente a la pared.",
        image: "Imagenes/Productos/Accesorios/soporte_de_piso_para_extintor.png",
        gallery: [
            "Imagenes/Productos/Accesorios/soporte_de_piso_para_extintor1.png",
            "Imagenes/Productos/Accesorios/soporte_de_piso_para_extintor2.png",
            "Imagenes/Productos/Accesorios/soporte_de_piso_para_extintor3.png"
        ],
        code: "SOP",
        badge: "Soporte de piso",
        reference: true,
        regularPrice: "$35,00",
        salePrice: "$30,00",
        detailDescription: "Soporte metálico de piso diseñado para ubicar un extintor en un punto visible y de acceso inmediato cuando la fijación directa a la pared no es conveniente. Su estructura autoportante ayuda a mantener el cilindro estable, ordenado y separado del contacto directo con el suelo. Está disponible para extintores PQS de 10 y 20 libras, equipos de agua y extintores CO2 de 5 libras. La presentación adecuada se selecciona según el diámetro, la geometría y el peso del equipo que se instalará.",
        specs: {
            Tipo: "Soporte autoportante para un extintor",
            Compatibilidad: "PQS de 10 y 20 lb, agua y CO2 de 5 lb",
            Instalación: "Sobre piso, sin perforación de pared",
            Material: "Estructura metálica tubular",
            Sujeción: "Base anular o sistema de retención según modelo",
            Acabado: "Metálico o pintura roja según presentación",
            Señalización: "Placa superior disponible según modelo",
            Aplicación: "Locales, oficinas, edificios y áreas de atención",
            Ubicación: "Interiores y espacios protegidos",
            Capacidad: "Un extintor",
            Selección: "Según diámetro y peso del cilindro",
            Incluye: "Soporte de piso; extintor no incluido"
        }
    }),
    createProduct({
        id: "gabinete-extintor-pqs10-co2-5",
        name: "Gabinete para extintores portátiles",
        displayNames: ["Gabinete para extintor PQS de 10 libras", "Gabinete para extintor CO2 de 5 libras"],
        family: "Gabinetes para extintores",
        summary: "Gabinete metálico de pared con visor frontal y cerradura para proteger el extintor y mantenerlo identificado.",
        image: "Imagenes/Productos/Deteccion y Alarma/Gabinete_Para_Extintor_PQS10libras_CO25libras_1.png",
        gallery: ["Imagenes/Productos/Deteccion y Alarma/Gabinete_Para_Extintor_PQS10libras_CO25libras_2.png"],
        code: "GAB",
        badge: "PQS 10 lb · CO2 5 lb",
        specs: { Compatibilidad: "PQS 10 lb y CO2 5 lb", Instalación: "Pared", Material: "Metálico", Acceso: "Puerta con visor y cerradura" }
    }),
    createProduct({
        id: "cabezales-extintores",
        name: "Cabezales para extintores",
        family: "Componentes de control",
        summary: "Conjuntos de accionamiento para controlar la apertura y descarga del agente extintor.",
        image: "Imagenes/Productos/Accesorios/cabezales_de_extintores.png",
        badge: "Control",
        regularPrice: "$10,00",
        salePrice: "$8,00",
        specs: { Tipo: "Cabezal de accionamiento", Compatibilidad: "Según rosca y agente", Instalación: "Servicio técnico" }
    }),
    createProduct({
        id: "manometros-extintores",
        name: "Manómetros de presión para extintores",
        family: "Componentes de control",
        summary: "Indicadores visuales para comprobar de forma rápida el estado de presurización del equipo.",
        image: "Imagenes/Productos/Accesorios/manometros_de_presion_extintores.png",
        gallery: ["Imagenes/Productos/Accesorios/manometros_de_presion.png"],
        badge: "Presión",
        regularPrice: "$7,00",
        salePrice: "$5,50",
        specs: { Tipo: "Indicador de presión", Aplicación: "Extintores presurizados", Conexión: "Según cabezal" }
    }),
    createProduct({
        id: "seguros-metalicos-extintores",
        name: "Seguros metálicos para extintores",
        family: "Componentes de control",
        summary: "Pasadores metálicos que evitan la activación accidental de la palanca del extintor.",
        image: "Imagenes/Productos/Accesorios/Seguros_Metalicos_Extintores.png",
        badge: "Seguro",
        regularPrice: "$2,00",
        salePrice: "$1,25",
        specs: { Tipo: "Pasador de seguridad", Material: "Metal", Compatibilidad: "Según cabezal" }
    }),
    createProduct({
        id: "llaves-triangulares-gabinetes",
        name: "Llaves triangulares metálicas para gabinetes contra incendios",
        family: "Acceso a gabinetes",
        summary: "Llaves metálicas para apertura rápida y controlada de gabinetes de equipos contra incendios.",
        image: "Imagenes/Productos/Accesorios/Llaves_Triangulares_Gabinetes_Contra_Incendios.png",
        gallery: ["Imagenes/Productos/Accesorios/Llaves_Triangulares_Gabinetes_Contra_Incendios_2.png"],
        badge: "Gabinetes",
        regularPrice: "$8,00",
        salePrice: "$6,00",
        specs: { Tipo: "Llave triangular", Material: "Metal", Aplicación: "Gabinetes contra incendios" }
    }),
    createProduct({
        id: "cornetitas-pqs-2-2-5",
        name: "Cornetitas plásticas para extintores PQS compactos",
        displayNames: ["Cornetita para extintor PQS de 2 libras", "Cornetita para extintor PQS de 2,5 libras"],
        family: "Sistemas de descarga",
        summary: "Boquillas compactas para orientar la salida del agente en extintores PQS vehiculares.",
        image: "Imagenes/Productos/Accesorios/cornetas_cornetitas_plasticas_extintores_pqs_2_2.5_libras.png",
        badge: "PQS 2–2,5 lb",
        regularPrice: "$4,00",
        salePrice: "$3,00",
        specs: { Capacidades: "2 y 2,5 libras", Material: "Plástico técnico", Conexión: "Según cabezal" }
    }),
    createProduct({
        id: "manguera-pqs-5",
        name: "Manguera para extintor PQS de 5 libras",
        family: "Sistemas de descarga",
        summary: "Conducto flexible para dirigir de manera controlada la descarga de un extintor PQS de 5 libras.",
        image: "Imagenes/Productos/Accesorios/manguera_pqs_5_libras.png",
        badge: "PQS 5 lb",
        regularPrice: "$8,00",
        salePrice: "$6,50",
        specs: { Capacidad: "5 libras", Agente: "PQS", Compatibilidad: "Según conexión" }
    }),
    createProduct({
        id: "manguera-pqs-10",
        name: "Manguera para extintor PQS de 10 libras",
        family: "Sistemas de descarga",
        summary: "Manguera de descarga para maniobrar con precisión extintores PQS de 10 libras.",
        image: "Imagenes/Productos/Accesorios/mangueras_pqs_10_libras.png",
        badge: "PQS 10 lb",
        regularPrice: "$10,00",
        salePrice: "$8,00",
        specs: { Capacidad: "10 libras", Agente: "PQS", Compatibilidad: "Según conexión" }
    }),
    createProduct({
        id: "manguera-pqs-20",
        name: "Manguera para extintor PQS de 20 libras",
        family: "Sistemas de descarga",
        summary: "Conducto reforzado para orientar la descarga de extintores PQS de mayor capacidad.",
        image: "Imagenes/Productos/Accesorios/mangueras_pqs_10_libras.png",
        badge: "PQS 20 lb",
        reference: true,
        regularPrice: "$14,00",
        salePrice: "$11,50",
        specs: { Capacidad: "20 libras", Agente: "PQS", Compatibilidad: "Según conexión" }
    }),
    createProduct({
        id: "corneta-co2-5",
        name: "Corneta para extintor CO2 de 5 libras",
        family: "Sistemas de descarga",
        summary: "Difusor aislante para dirigir de forma segura la descarga de CO2 en equipos de 5 libras.",
        image: "Imagenes/Productos/Accesorios/corneta_extintor_co2_5_libras.png",
        badge: "CO2 5 lb",
        regularPrice: "$15,00",
        salePrice: "$12,00",
        specs: { Capacidad: "5 libras", Agente: "Dióxido de carbono (CO₂)", Compatibilidad: "Según manguera" }
    }),
    createProduct({
        id: "corneta-co2-10",
        name: "Corneta para extintor CO2 de 10 libras",
        family: "Sistemas de descarga",
        summary: "Corneta de descarga con aislamiento para extintores CO2 portátiles de 10 libras.",
        image: "Imagenes/Productos/Accesorios/corneta_extintor_co2_10_libras.png",
        badge: "CO2 10 lb",
        regularPrice: "$22,00",
        salePrice: "$18,00",
        specs: { Capacidad: "10 libras", Agente: "Dióxido de carbono (CO₂)", Compatibilidad: "Según manguera" }
    }),
    createProduct({
        id: "collarines-plasticos-extintores",
        name: "Collarines plásticos para extintores",
        family: "Seguridad y sujeción",
        summary: "Identificadores de control que evidencian la intervención técnica y el mantenimiento del equipo.",
        image: "Imagenes/Productos/Accesorios/Collarines_Plasticos_Extintores.png",
        badge: "Control",
        regularPrice: "$1,50",
        salePrice: "$1,00",
        specs: { Tipo: "Collarín de identificación", Material: "Plástico", Presentación: "Unidad" }
    }),
    createProduct({
        id: "seguros-plasticos-extintores",
        name: "Seguros plásticos para extintores",
        family: "Seguridad y sujeción",
        summary: "Precintos de garantía para proteger el mecanismo de activación y evidenciar manipulaciones. Venta exclusiva en paquetes de 50 unidades.",
        image: "Imagenes/Productos/Accesorios/Seguros_Plasticos_Extintores.png",
        badge: "Precinto",
        regularPrice: "$1,00",
        salePrice: "$0,20",
        specs: { Tipo: "Precinto plástico", Aplicación: "Pasador de seguridad", Presentación: "Paquete de 50 unidades", "Venta mínima": "50 unidades" }
    }),
    createProduct({
        id: "correa-plastica-extintor",
        name: "Correa plástica para extintor",
        family: "Seguridad y sujeción",
        summary: "Correa flexible para mantener el cilindro estable dentro de soportes de pared o vehículo.",
        image: "Imagenes/Productos/Accesorios/correa_plastica_extintor.jpg",
        badge: "Sujeción",
        regularPrice: "$3,00",
        salePrice: "$2,50",
        specs: { Tipo: "Correa de sujeción", Material: "Plástico flexible", Compatibilidad: "Según diámetro" }
    })
];

const detectorProducts = [
    createProduct({
        id: "detector-humo-centralizado",
        name: "Detector de humo fotoeléctrico 24 V centralizado",
        family: "Detección de incendios",
        summary: "Detector fotoeléctrico para identificar humo e integrarse a un panel central de alarma contra incendios.",
        image: "Imagenes/Productos/Deteccion y Alarma/Detector_Humo_Centralizado_Frente.png",
        gallery: ["Imagenes/Productos/Deteccion y Alarma/Detector_Humo_Centralizado_Atras.png"],
        badge: "24 V centralizado",
        regularPrice: "$35,00",
        salePrice: "$29,90",
        specs: { Tecnología: "Fotoeléctrica", Alimentación: "24 V DC según panel", Integración: "Sistema centralizado" }
    }),
    createProduct({
        id: "detector-humo-bateria",
        name: "Detector de humo autónomo a batería de 9 V",
        family: "Detección autónoma",
        summary: "Alarma de humo autónoma con aviso sonoro local, ideal para viviendas, oficinas y espacios sin panel central.",
        image: "Imagenes/Productos/Deteccion y Alarma/Detector_de_Humo_Bateria_Frente.png",
        gallery: ["Imagenes/Productos/Deteccion y Alarma/Detector_de_Humo_Bateria_Atras.png"],
        badge: "Batería 9 V",
        regularPrice: "$14,00",
        salePrice: "$10,90",
        specs: { Tecnología: "Detección de humo", Alimentación: "Batería de 9 V", Funcionamiento: "Autónomo" }
    }),
    createProduct({
        id: "detector-gas-enchufable",
        name: "Detector de gas enchufable de 110 V",
        family: "Detección de gas",
        summary: "Detector con alarma sonora y señalización visual para monitorear presencia de gas en áreas interiores.",
        image: "Imagenes/Productos/Deteccion y Alarma/Detector_de_Gas_Frente.png",
        gallery: ["Imagenes/Productos/Deteccion y Alarma/Detector_de_Gas_Atras.png"],
        badge: "Gas · 110 V",
        regularPrice: "$49,00",
        salePrice: "$25,00",
        specs: { Alimentación: "100–240 V AC", Alarma: "Sonora y visual", Instalación: "Enchufe directo" }
    }),
    createProduct({
        id: "detector-gas-con-cable",
        name: "Detector de gas de 110 V con cable",
        family: "Detección de gas",
        summary: "Detector cableado para instalación mural, con indicadores de funcionamiento, alarma y botón de prueba.",
        image: "Imagenes/Productos/Deteccion y Alarma/Detector_de_Gas_Cable_Frente.png",
        gallery: ["Imagenes/Productos/Deteccion y Alarma/Detector_de_Gas_Cable_Atras.png"],
        badge: "Gas · Cableado",
        regularPrice: "$52,00",
        salePrice: "$25,00",
        specs: { Alimentación: "110 V AC", Alarma: "Sonora y visual", Instalación: "Mural con cable" }
    })
];

const signalData = [
    ["bano-mixto.png", "Señal Baño mixto", "Información"],
    ["botiquin.jpg", "Señal Botiquín", "Emergencia"],
    ["co2.png", "Señal Extintor CO2 · Modelo A", "Equipos contra incendios"],
    ["covid19_guantes.jpg", "Señal Uso obligatorio de guantes", "Obligación"],
    ["extintor-co2.png", "Señal Extintor CO2 · Modelo B", "Equipos contra incendios"],
    ["extintordeco2.png", "Señal Extintor CO2 · Modelo C", "Equipos contra incendios"],
    ["extintor-pqs.png", "Señal Extintor PQS", "Equipos contra incendios"],
    ["gas-inflamable.jpg", "Señal Peligro: gas inflamable", "Advertencia"],
    ["hapa-pqs.png", "Señal Instrucciones para extintor PQS", "Equipos contra incendios"],
    ["inflamable.png", "Señal Peligro: inflamable", "Advertencia"],
    ["Lavese-las-manos.png", "Señal Lávese las manos", "Obligación"],
    ["manguera-contra-incendios.png", "Señal Manguera contra incendios", "Equipos contra incendios"],
    ["Mascarilla_covid19.jpg", "Señal Uso obligatorio de mascarilla", "Obligación"],
    ["menores-de-edad.png", "Señal Prohibido menores de edad", "Prohibición"],
    ["productos-quimicos.png", "Señal Peligro: productos químicos", "Advertencia"],
    ["prohibido-botar-basura.png", "Señal Prohibido botar basura", "Prohibición"],
    ["prohibido-estacionar.png", "Señal Prohibido estacionarse · Modelo A", "Prohibición"],
    ["puntos-de-encuentro.png", "Señal Punto de encuentro", "Evacuación"],
    ["Registre-el-Ingreso.png", "Señal Registre el ingreso", "Información"],
    ["riesgo-biologico.png", "Señal Riesgo biológico", "Advertencia"],
    ["riesgo-electrico.jpg", "Señal Riesgo eléctrico · Modelo A", "Advertencia"],
    ["riesgo-electrico.png", "Señal Riesgo eléctrico · Modelo B", "Advertencia"],
    ["ruta-de-Evacuacion-Derecha.png", "Señal Ruta de evacuación derecha", "Evacuación"],
    ["ruta-de-evacuacion-izquierda.png", "Señal Ruta de evacuación izquierda", "Evacuación"],
    ["Salida-de-emergencia.png", "Señal Salida de emergencia", "Evacuación"],
    ["salida-de-emergencia-bajando-gradas-derecha.png", "Señal Salida bajando gradas a la derecha", "Evacuación"],
    ["salida-de-emergencia-subiendo-gradas-izquierda.png", "Señal Salida subiendo gradas a la izquierda", "Evacuación"],
    ["Salida-emergencia.png", "Señal Salida de emergencia · Modelo alterno", "Evacuación"],
    ["Senaletica-Extintor-CO2.png", "Señal Extintor CO2 · Modelo D", "Equipos contra incendios"],
    ["Senaletica-Prohibido-Estacionar.png", "Señal Prohibido estacionar · Modelo B", "Prohibición"],
    ["Senaletica-Prohibido-Fumar.png", "Señal Prohibido fumar", "Prohibición"],
    ["Senaletica-Salida.png", "Señal Salida", "Evacuación"],
    ["Senaletica-Salida-de-Emergencia-Derecha.png", "Señal Salida de emergencia derecha", "Evacuación"],
    ["Senaletica-Salida-de-Emergencia-Izquierda.png", "Señal Salida de emergencia izquierda", "Evacuación"],
    ["Senaletica-Salida-de-Emergencia-Puerta-Derecha.png", "Señal Salida de emergencia con puerta derecha", "Evacuación"],
    ["Senaletica-Solo-Personal-Autorizado.png", "Señal Solo personal autorizado", "Prohibición"],
    ["Use-casco.png", "Señal Use casco de seguridad", "Obligación"],
    ["Uso_obligatorio_casco_proteccionauditiva_ocular.jpg", "Señal Uso obligatorio de EPP", "Obligación"]
];

const signalGroupByFamily = {
    Evacuación: { name: "Evacuación y emergencia", tone: "verde", color: "Verde", priority: 1 },
    Emergencia: { name: "Evacuación y emergencia", tone: "verde", color: "Verde", priority: 1 },
    "Equipos contra incendios": { name: "Equipos contra incendios", tone: "rojo", color: "Rojo", priority: 2 },
    Advertencia: { name: "Riesgo y advertencia", tone: "amarillo", color: "Amarillo", priority: 3 },
    Prohibición: { name: "Prohibición", tone: "rojo", color: "Rojo", priority: 4 },
    Obligación: { name: "Obligación", tone: "azul", color: "Azul", priority: 5 },
    Información: { name: "Informativa", tone: "azul", color: "Azul", priority: 6 }
};

const signalPurposeByFamily = {
    Evacuación: "orientar el desplazamiento seguro y reconocer rutas, salidas o puntos de encuentro durante una evacuación",
    Emergencia: "identificar con rapidez recursos de atención y apoyo disponibles ante una emergencia",
    "Equipos contra incendios": "localizar e identificar equipos de protección contra incendios sin demoras",
    Advertencia: "comunicar un riesgo presente antes de que una persona ingrese o ejecute una actividad",
    Prohibición: "indicar una conducta restringida y reducir acciones que puedan generar riesgos",
    Obligación: "recordar una medida preventiva o el equipo de protección requerido en el área",
    Información: "identificar espacios, servicios o instrucciones generales dentro del establecimiento"
};

const signalProducts = signalData.map(([file, name, family], index) => {
    const group = signalGroupByFamily[family];
    const signalSummary = `${name} diseñada para ${signalPurposeByFamily[family]}.`;
    return {
        ...createProduct({
            id: `senal-${index + 1}`,
            name,
            family,
            summary: signalSummary,
            image: `Imagenes/Productos/Señaleticas/${file}`,
            badge: family,
            regularPrice: "$6,00",
            salePrice: "$4,50",
            specs: {
                Categoría: family,
                Color: group.color,
                Material: "A definir según requerimiento",
                Medida: "Personalizable bajo cotización"
            }
        }),
        signalGroup: group.name,
        signalTone: group.tone,
        signalPriority: group.priority
    };
}).sort((first, second) => first.signalPriority - second.signalPriority);

const eppProducts = [
    createProduct({
        id: "gafas-proteccion",
        name: "Gafas de protección",
        family: "Protección visual",
        summary: "Protección ocular para actividades operativas y ambientes de trabajo.",
        image: "Imagenes/Productos/EPP/Gafas_De_Proteccion.png",
        badge: "Protección visual",
        regularPrice: "$5,00",
        salePrice: "$3,50",
        specs: { Protección: "Visual", Modelos: "Lente claro y oscuro", Presentación: "Según disponibilidad" }
    }),
    createProduct({
        id: "mascarilla-industrial",
        name: "Mascarilla industrial de doble filtro",
        family: "Protección respiratoria",
        summary: "Mascarilla reutilizable para trabajos que requieren protección respiratoria mediante filtros reemplazables.",
        image: "Imagenes/Productos/EPP/Mascarilla_Industrial.png",
        badge: "Uso industrial",
        specs: { Protección: "Respiratoria", Configuración: "Doble filtro", Presentación: "Según disponibilidad" }
    }),
    createProduct({
        id: "mascarilla-particulas",
        name: "Mascarilla para partículas",
        family: "Protección respiratoria",
        summary: "Mascarilla compacta para reducir la exposición a partículas durante actividades operativas.",
        image: "Imagenes/Productos/EPP/Mascarilla_de_Particulas.png",
        badge: "Partículas",
        specs: { Protección: "Respiratoria", Uso: "Partículas", Presentación: "Unidad" }
    }),
    createProduct({
        id: "mascarilla-quirurgica",
        name: "Mascarilla quirúrgica",
        family: "Protección respiratoria",
        summary: "Mascarilla desechable de uso general disponible en diferentes colores y presentaciones.",
        image: "Imagenes/Productos/EPP/Mascarilla_Quirurgica.png",
        badge: "Desechable",
        regularPrice: "$2,50",
        salePrice: "$1,99",
        specs: { Protección: "Barrera facial", Tipo: "Desechable", Presentación: "Según disponibilidad" }
    }),
    createProduct({
        id: "chaleco-reflectivo",
        name: "Chalecos reflectivos mallados",
        family: "Alta visibilidad",
        summary: "Prendas livianas de alta visibilidad para personal operativo, brigadas, visitantes y control de tránsito.",
        image: "Imagenes/Productos/EPP/Chalecos_Reflectivos_Mallados.png",
        badge: "Alta visibilidad",
        regularPrice: "$5,00",
        salePrice: "$3,50",
        specs: { Protección: "Alta visibilidad", Colores: "Amarillo y naranja", Talla: "Según disponibilidad" }
    }),
    createProduct({
        id: "tapones-auditivos",
        name: "Tapones auditivos con estuche",
        family: "Protección auditiva",
        summary: "Tapones reutilizables con cordón y estuche para facilitar su almacenamiento y transporte.",
        image: "Imagenes/Productos/EPP/Tapones para los oídos con estuche.png",
        badge: "Protección auditiva",
        regularPrice: "$3,00",
        salePrice: "$2,00",
        specs: { Protección: "Auditiva", Accesorios: "Cordón y estuche", Presentación: "Par" }
    }),
    createProduct({
        id: "guantes-seguridad-pvc",
        name: "Guantes de seguridad con puntos de PVC",
        family: "Protección manual",
        summary: "Guantes tejidos con puntos de PVC para mejorar el agarre durante tareas de manipulación y trabajo operativo.",
        image: "Imagenes/Productos/EPP/Guantes.png",
        badge: "Protección manual",
        specs: { Protección: "Manos", Material: "Tejido con puntos de PVC", Uso: "Manipulación general", Presentación: "Par" }
    })
];

const alarmProducts = [
    createProduct({
        id: "estacion-manual",
        name: "Estación manual de alarma",
        family: "Activación manual",
        summary: "Estación de accionamiento manual para activar de inmediato el sistema de alarma contra incendios.",
        image: "Imagenes/Productos/Deteccion y Alarma/Estacion_Manual_Frente.png",
        gallery: [
            "Imagenes/Productos/Deteccion y Alarma/Estacion_Manual_Atras.png",
            "Imagenes/Productos/Deteccion y Alarma/Estacion_Manual_Abierto.png"
        ],
        badge: "Activación manual",
        regularPrice: "$29,00",
        salePrice: "$20,00",
        specs: { Tipo: "Estación manual", Accionamiento: "Jale / pull", Integración: "Sistema de alarma" }
    }),
    createProduct({
        id: "pulsador-rearmable",
        name: "Pulsador rearmable",
        family: "Activación manual",
        summary: "Pulsador para activación y restablecimiento según el sistema instalado.",
        image: "Imagenes/Productos/Deteccion y Alarma/Pulsador_de_Emergencia.png",
        badge: "Pulsador",
        regularPrice: "$22,00",
        salePrice: "$18,00",
        specs: { Tipo: "Rearmable", Integración: "Según sistema" }
    }),
    createProduct({
        id: "luz-estroboscopica",
        name: "Luz estroboscópica",
        family: "Notificación visual",
        summary: "Dispositivo de señalización luminosa para advertir una emergencia y apoyar los procesos de evacuación.",
        image: "Imagenes/Productos/Deteccion y Alarma/luz_estroboscópica_tipo_licuadora.png",
        badge: "Visual",
        regularPrice: "$24,00",
        salePrice: "$20,00",
        specs: { Tipo: "Estroboscópica", Alimentación: "Según modelo" }
    }),
    createProduct({
        id: "sirena-estroboscopica",
        name: "Sirena con luz estroboscópica de 12 V DC",
        family: "Notificación audiovisual",
        summary: "Notificación sonora y visual integrada para alertar con rapidez en sistemas de detección de incendios.",
        image: "Imagenes/Productos/Deteccion y Alarma/luz_estroboscopica_frente.png",
        gallery: ["Imagenes/Productos/Deteccion y Alarma/luz_estroboscopica_reverso.png"],
        badge: "12 V audiovisual",
        regularPrice: "$30,00",
        salePrice: "$25,00",
        specs: { Tipo: "Sirena estroboscópica", Alimentación: "12 V DC", Sonido: "Hasta 105 dB según modelo" }
    })
];

const emergencyProducts = [
    createProduct({
        id: "lampara-emergencia",
        name: "Lámpara de emergencia",
        family: "Iluminación de respaldo",
        summary: "Luminaria recargable de doble cabezal para mantener visibles las rutas de circulación y evacuación durante cortes de energía.",
        image: "Imagenes/Productos/Emergencia/Lampara de emergencia.png",
        badge: "Iluminación",
        reference: true,
        regularPrice: "$26,90",
        salePrice: "$22,90",
        features: [
            { label: "Iluminación", text: "Dos cabezales orientables" },
            { label: "Batería", text: "Recargable e integrada" },
            { label: "Activación", text: "Encendido automático ante cortes de energía" },
            { label: "Instalación", text: "Montaje en pared para espacios interiores" }
        ],
        specs: { Tipo: "Doble cabezal", Alimentación: "Recargable", Aplicación: "Rutas y áreas de circulación" }
    }),
    createProduct({
        id: "kit-emergencia-vehiculo",
        name: "Kit de emergencia para vehículo",
        family: "Seguridad vehicular",
        summary: "Conjunto portátil de elementos esenciales para señalizar y atender de forma inicial una emergencia en carretera.",
        image: "Imagenes/Productos/Emergencia/Kit de emergencia para vehiculo.jpg",
        badge: "Vehicular",
        reference: true,
        regularPrice: "$34,90",
        salePrice: "$25,00",
        features: [
            { label: "Transporte", text: "Bolso portátil para almacenar el equipo" },
            { label: "Señalización", text: "Elementos reflectivos para prevención" },
            { label: "Atención inicial", text: "Botiquín incluido según presentación" },
            { label: "Configuración", text: "Contenido disponible según requerimiento" }
        ],
        specs: { Aplicación: "Vehículos", Contenido: "Según presentación", Formato: "Kit portátil" }
    }),
    createProduct({
        id: "botiquin-primeros-auxilios",
        name: "Botiquín de primeros auxilios",
        family: "Atención inicial",
        summary: "Botiquín portátil con insumos esenciales organizados para una respuesta inicial ante lesiones menores.",
        image: "Imagenes/Productos/Emergencia/Botiquen primeros auxilios.png",
        gallery: ["Imagenes/Productos/Emergencia/Botiquen primeros auxilios1.png"],
        badge: "Primeros auxilios",
        reference: true,
        regularPrice: "$18,90",
        salePrice: "$15,90",
        features: [
            { label: "Estuche", text: "Rígido, compacto y fácil de identificar" },
            { label: "Organización", text: "Distribución interior para los insumos" },
            { label: "Presentación", text: "Portátil para instalación o traslado" },
            { label: "Contenido", text: "Configurable según el requerimiento" }
        ],
        specs: { Contenido: "Según presentación", Aplicación: "Hogar, vehículo y trabajo", Formato: "Estuche portátil" }
    })
];

const catalogCategories = [
    {
        id: "extintores",
        code: "EXT",
        icon: optimizedAssetPath("Imagenes/Iconos/extintores_nuevos.png"),
        name: "Extintores nuevos",
        description: "PQS, CO2, agua y Tipo K",
        products: extinguisherProducts
    },
    {
        id: "accesorios",
        code: "ACC",
        icon: optimizedAssetPath("Imagenes/Iconos/accesorios_repuestos.png"),
        name: "Accesorios de extintores",
        description: "Soportes, control, descarga y seguridad",
        products: accessoryProducts
    },
    {
        id: "deteccion-alarma",
        code: "SDA",
        icon: optimizedAssetPath("Imagenes/Iconos/sistema_deteccion_alarma.png"),
        name: "Sistemas de Detección y Alarma",
        description: "Detectores, estaciones y notificación",
        products: [...detectorProducts, ...alarmProducts]
    },
    {
        id: "senaleticas",
        code: "SEÑ",
        icon: optimizedAssetPath("Imagenes/Iconos/señaletica.png"),
        name: "Señalética Bajo Normas Técnicas",
        description: "Riesgo, advertencia, prohibición, informativa y evacuación",
        products: signalProducts
    },
    {
        id: "emergencia",
        code: "SOS",
        icon: optimizedAssetPath("Imagenes/Iconos/primeros_auxilios.png"),
        name: "Equipos de Emergencia y Primeros Auxilios",
        description: "Iluminación, atención inicial y respuesta",
        products: emergencyProducts
    },
    {
        id: "epp",
        code: "EPP",
        icon: optimizedAssetPath("Imagenes/Iconos/equipo_proteccion_personal.png"),
        name: "Equipos EPP",
        description: "Protección personal",
        products: eppProducts
    }
];

const productIndex = new Map();
catalogCategories.forEach((category) => {
    category.products.forEach((product) => {
        productIndex.set(product.id, { product, category });
    });
});

const escapeHTML = (value) => String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const createProductNameMarkup = (product) => {
    const names = product.displayNames.length > 0 ? product.displayNames : [product.name];
    return names.map((name) => `<span class="product-name-line">${escapeHTML(name)}</span>`).join("");
};

const createMediaMarkup = (product, modal = false) => {
    if (modal && product.image && product.gallery.length > 0) {
        const galleryImages = [product.image, ...product.gallery];
        return `
            <div class="dialog-image-carousel" role="region" aria-label="Galería de ${escapeHTML(product.name)}">
                <div class="dialog-image-stage">
                ${galleryImages.map((source, index) => `
                    <img class="dialog-image-slide${index === 0 ? " is-active" : ""}"
                        src="${escapeHTML(source)}"
                        alt="${escapeHTML(product.name)} · Vista ${index + 1} de ${galleryImages.length}"
                        decoding="async"
                        ${index === 0 ? "" : 'aria-hidden="true"'}>
                `).join("")}
                </div>
                <div class="dialog-image-controls">
                    <button class="dialog-image-nav dialog-image-prev" type="button" data-image-direction="-1"
                        aria-label="Ver imagen anterior"><span aria-hidden="true">‹</span></button>
                    <div class="dialog-image-dots" aria-label="Seleccionar imagen">
                        ${galleryImages.map((_, index) => `
                            <button class="dialog-image-dot${index === 0 ? " is-active" : ""}" type="button"
                                data-image-index="${index}" aria-label="Ver imagen ${index + 1} de ${galleryImages.length}"
                                ${index === 0 ? 'aria-current="true"' : ""}></button>
                        `).join("")}
                    </div>
                    <button class="dialog-image-nav dialog-image-next" type="button" data-image-direction="1"
                        aria-label="Ver imagen siguiente"><span aria-hidden="true">›</span></button>
                </div>
            </div>
        `;
    }

    if (product.image) {
        return `<img src="${escapeHTML(product.image)}" alt="${escapeHTML(product.name)}" decoding="async"${modal ? "" : ' loading="lazy"'}>`;
    }

    return `<div class="product-placeholder" aria-hidden="true">${escapeHTML(product.code)}</div>`;
};

const categoryList = document.querySelector("#category-list");
const productGrid = document.querySelector("#product-grid");
const activeCategoryTitle = document.querySelector("#active-category-title");
const productCount = document.querySelector("#product-count");
const productBrowser = document.querySelector(".product-browser");
let activeCategoryId = catalogCategories[0].id;

function renderCategories() {
    categoryList.innerHTML = catalogCategories.map((category) => {
        const isActive = category.id === activeCategoryId;
        return `
            <button
                class="category-button${isActive ? " is-active" : ""}"
                type="button"
                role="tab"
                id="category-${escapeHTML(category.id)}"
                aria-selected="${isActive}"
                tabindex="${isActive ? "0" : "-1"}"
                aria-controls="product-grid"
                data-category="${escapeHTML(category.id)}">
                <span class="category-code" aria-hidden="true">
                    ${category.icon
                        ? `<img src="${escapeHTML(category.icon)}" alt="" loading="lazy" decoding="async">`
                        : escapeHTML(category.code)}
                </span>
                <span class="category-label">
                    <strong>${escapeHTML(category.name)}</strong>
                    <small>${escapeHTML(category.description)}</small>
                </span>
                <span class="category-arrow" aria-hidden="true">›</span>
            </button>
        `;
    }).join("");
}

const createProductCardMarkup = (product) => `
    <article class="product-card" role="button" tabindex="0"
        data-product="${escapeHTML(product.id)}"
        aria-label="Ver producto: ${escapeHTML(product.name)}">
        <div class="product-card-media">
            ${createMediaMarkup(product)}
            <span class="product-badge">¡OFERTA!</span>
        </div>
        <div class="product-card-content">
            <span class="product-family">${escapeHTML(product.family)}</span>
            <h4${product.displayNames.length > 1 ? ' class="has-name-lines"' : ""}>${createProductNameMarkup(product)}</h4>
            <p>${escapeHTML(product.summary)}</p>
            <div class="product-card-footer">
                <strong class="product-card-price${product.salePrice ? "" : " is-on-request"}"
                    aria-label="${product.salePrice ? `Precio de oferta ${escapeHTML(product.salePrice)}` : "Precio bajo cotización"}">${escapeHTML(product.salePrice || "Bajo cotización")}</strong>
                <span class="product-card-arrow" aria-hidden="true">→</span>
            </div>
        </div>
    </article>
`;

function renderSignalProductGroups(products) {
    const groups = new Map();
    products.forEach((product) => {
        if (!groups.has(product.signalGroup)) {
            groups.set(product.signalGroup, []);
        }
        groups.get(product.signalGroup).push(product);
    });

    return [...groups.entries()].map(([groupName, groupProducts]) => {
        const tone = groupProducts[0].signalTone;
        return `
            <div class="product-subcategory-heading signal-tone-${escapeHTML(tone)}" role="heading" aria-level="4">
                <span class="signal-color-chip" aria-hidden="true"></span>
                <div>
                    <strong>${escapeHTML(groupName)}</strong>
                </div>
                <span>${groupProducts.length} ${groupProducts.length === 1 ? "diseño" : "diseños"}</span>
            </div>
            ${groupProducts.map(createProductCardMarkup).join("")}
        `;
    }).join("");
}

function renderProducts() {
    const category = catalogCategories.find((item) => item.id === activeCategoryId);
    const hasSignalGroups = category.id === "senaleticas";
    activeCategoryTitle.textContent = category.name;
    productCount.textContent = `${category.products.length} ${category.products.length === 1 ? "producto" : "productos"}`;
    productGrid.setAttribute("aria-labelledby", `category-${category.id}`);
    productGrid.classList.toggle("has-signal-groups", hasSignalGroups);
    productGrid.innerHTML = hasSignalGroups
        ? renderSignalProductGroups(category.products)
        : category.products.map(createProductCardMarkup).join("");
}

function keepProductBrowserVisible() {
    requestAnimationFrame(() => {
        const headerHeight = Number.parseFloat(
            getComputedStyle(document.documentElement).getPropertyValue("--header-height")
        ) || 0;
        const targetTop = productBrowser.getBoundingClientRect().top
            + window.scrollY
            - headerHeight
            - 16;

        window.scrollTo({
            top: Math.max(0, targetTop),
            behavior: "auto"
        });
    });
}

categoryList.addEventListener("click", (event) => {
    const button = event.target.closest("[data-category]");
    event.preventDefault();

    if (!button || button.dataset.category === activeCategoryId) {
        return;
    }

    activeCategoryId = button.dataset.category;
    renderCategories();
    renderProducts();
    keepProductBrowserVisible();
});

categoryList.addEventListener("keydown", (event) => {
    if (!["ArrowDown", "ArrowUp", "ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) {
        return;
    }

    event.preventDefault();
    const currentIndex = catalogCategories.findIndex((category) => category.id === activeCategoryId);
    let nextIndex = currentIndex;

    if (event.key === "Home") {
        nextIndex = 0;
    } else if (event.key === "End") {
        nextIndex = catalogCategories.length - 1;
    } else if (event.key === "ArrowDown" || event.key === "ArrowRight") {
        nextIndex = (currentIndex + 1) % catalogCategories.length;
    } else {
        nextIndex = (currentIndex - 1 + catalogCategories.length) % catalogCategories.length;
    }

    activeCategoryId = catalogCategories[nextIndex].id;
    renderCategories();
    renderProducts();
    categoryList.querySelector(`[data-category="${activeCategoryId}"]`)?.focus();
    keepProductBrowserVisible();
});

renderCategories();
renderProducts();

// Individual service and training experiences
const serviceDialogCatalog = {
    training: {
        direct: true,
        kicker: "Formación empresarial",
        title: "QUÉ TIPO DE CAPACITACIONES REALIZAMOS",
        intro: "Programas teórico-prácticos adaptados a los riesgos y necesidades de cada organización.",
        items: [
            {
                id: "capacitaciones-empresariales",
                eyebrow: "Empresas · Instituciones · Equipos de trabajo",
                title: "Programas disponibles",
                summary: "Formación integral para fortalecer la prevención y la respuesta del personal.",
                lead: "Contenidos claros, demostración técnica y ejercicios guiados para fortalecer la respuesta del personal.",
                description: [
                    "Cada jornada combina explicación técnica, demostración y práctica en campo, según la actividad y el nivel de riesgo de la empresa."
                ],
                highlights: [
                    { title: "Uso y manejo de extintores", description: "Clases de fuego, selección del equipo y práctica segura de descarga." },
                    { title: "Uso y Manejo de Gabinetes Contra Incendios", description: "Componentes, despliegue de manguera y operación inicial del sistema." },
                    { title: "Primeros auxilios", description: "Evaluación primaria y acciones inmediatas mientras llega ayuda especializada." },
                    { title: "Formación de brigadas", description: "Funciones, comunicación y coordinación de los equipos internos." },
                    { title: "Evacuación y simulacros", description: "Rutas, responsabilidades, ejecución y evaluación del ejercicio." }
                ],
                galleryNote: "Experiencia real con empresas, instituciones y equipos de trabajo.",
                images: [
                    { src: "Imagenes/Servicios/Capacitaciones/IMG20240820103838.jpg", alt: "Capacitación práctica de EXTINT S.E.E.D con personal de una empresa", caption: "Formación práctica con acompañamiento técnico" },
                    { src: "Imagenes/Servicios/Capacitaciones/IMG20240322121355.jpg", alt: "Grupo empresarial durante una capacitación de seguridad contra incendios", caption: "Preparación de equipos de trabajo" },
                    { src: "Imagenes/Servicios/Capacitaciones/IMG20230313091247.jpg", alt: "Personal capacitado junto a equipos contra incendios", caption: "Experiencia en campo con empresas" },
                    { src: "Imagenes/Servicios/Capacitaciones/IMG20230227084036.jpg", alt: "Explicación técnica previa a una práctica con extintores", caption: "Explicación técnica antes de la práctica" },
                    { src: "Imagenes/Servicios/Capacitaciones/IMG20220719101324.jpg", alt: "Participante durante una práctica controlada con extintor", caption: "Uso y manejo seguro de extintores" },
                    { src: "Imagenes/Servicios/Capacitaciones/IMG20220520154538.jpg", alt: "Personal operando una manguera de gabinete contra incendios", caption: "Operación de gabinetes contra incendios" },
                    { src: "Imagenes/Servicios/Capacitaciones/IMG_20220530_172124.jpg", alt: "Grupo empresarial recibiendo instrucciones para una práctica de emergencia", caption: "Preparación y coordinación del personal" },
                    { src: "Imagenes/Servicios/Capacitaciones/IMG20220420104947.jpg", alt: "Capacitación práctica en control inicial de incendios", caption: "Ejercicio práctico en escenario controlado" },
                    { src: "Imagenes/Servicios/Capacitaciones/IMG_20211014_100916.jpg", alt: "Participante practicando con una manguera contra incendios", caption: "Práctica guiada con equipos de extinción" },
                    { src: "Imagenes/Servicios/Capacitaciones/IMG_20211014_094642.jpg", alt: "Capacitación técnica impartida dentro de una empresa", caption: "Formación adaptada al entorno de trabajo" },
                    { src: "Imagenes/Servicios/Capacitaciones/IMG_20210818_075851.jpg", alt: "Demostración de inspección y uso de un extintor", caption: "Reconocimiento e inspección del equipo" },
                    { src: "Imagenes/Servicios/Capacitaciones/IMG_20210813_083558.jpg", alt: "Personal de estación de servicio durante una capacitación", caption: "Capacitación según el riesgo de la actividad" },
                    { src: "Imagenes/Servicios/Capacitaciones/IMG_20210721_130344.jpg", alt: "Grupo empresarial durante una explicación sobre equipos contra incendios", caption: "Organización y respuesta del personal" },
                    { src: "Imagenes/Servicios/Capacitaciones/IMG-20201115-WA0101.jpg", alt: "Capacitación de prevención de incendios a estudiantes", caption: "Formación preventiva para instituciones" },
                    { src: "Imagenes/Servicios/Capacitaciones/IMG_20200214_114819.jpg", alt: "Instructor explicando el funcionamiento de un extintor móvil", caption: "Reconocimiento de equipos de mayor capacidad" },
                    { src: "Imagenes/Servicios/Capacitaciones/IMG_20200120_074656.jpg", alt: "Personal operativo reunido para una práctica con extintores", caption: "Preparación de brigadas internas" },
                    { src: "Imagenes/Servicios/Capacitaciones/IMG_20191217_100926.jpg", alt: "Participante descargando un extintor durante una práctica", caption: "Aplicación práctica de los conocimientos" }
                ],
                cta: { label: "Cotizar capacitación", whatsapp: "Capacitaciones empresariales en seguridad y emergencias" }
            }
        ]
    },
    extinguishers: {
        kicker: "Servicios especializados · Equipos contra incendios",
        title: "VENTA, MANTENIMIENTO Y RECARGA DE EXTINTORES",
        intro: "Atención integral para adquirir equipos nuevos y conservar los extintores instalados en condiciones adecuadas de operación.",
        direct: true,
        items: [
            {
                id: "servicio-integral-extintores",
                eyebrow: "Venta · Mantenimiento · Recarga",
                title: "SERVICIO INTEGRAL DE EXTINTORES",
                summary: "Venta de equipos nuevos, mantenimiento preventivo y recarga para diferentes agentes y capacidades.",
                lead: "Atendemos todo el ciclo del extintor: selección de equipos nuevos, revisión de componentes y restitución del agente extintor.",
                description: [
                    "Comercializamos al por mayor y menor extintores PQS, CO2, agua presurizada y Tipo K, en capacidades portátiles y móviles para hogares, vehículos, locales, conjuntos, edificios, empresas e industrias.",
                    "En los equipos instalados inspeccionamos cilindro, válvula, manómetro, manguera, boquilla, seguros y accesorios. Cuando corresponde, realizamos mantenimiento y recarga según el agente, la capacidad y la condición del extintor."
                ],
                highlights: [
                    { title: "Venta", description: "Extintores nuevos PQS, CO2, agua y Tipo K, al por mayor y menor." },
                    { title: "Mantenimiento", description: "Revisión del estado físico, componentes, accesorios y condiciones generales de operación." },
                    { title: "Recarga", description: "Reposición del agente y presurización de acuerdo con el tipo, capacidad y estado del equipo." }
                ],
                galleryNote: "Equipos nuevos y trabajos de mantenimiento y recarga realizados por EXTINT S.E.E.D.",
                images: [
                    { src: "Imagenes/Servicios/Extintores/IMG20241223145135.jpg", alt: "Extintores nuevos preparados por EXTINT S.E.E.D", caption: "Equipos nuevos listos para entrega" },
                    { src: "Imagenes/Servicios/Extintores/IMG20220929110419.jpg", alt: "Diferentes capacidades de extintores disponibles", caption: "Opciones para distintas necesidades de protección" },
                    { src: "Imagenes/Servicios/Extintores/IMG20230821121638.jpg", alt: "Lote de extintores portátiles preparados para clientes", caption: "Equipos revisados y correctamente identificados" },
                    { src: "Imagenes/Servicios/Extintores/IMG_20251113_160245.jpg", alt: "Extintores organizados antes de su distribución", caption: "Preparación ordenada de equipos para entrega" },
                    { src: "Imagenes/Servicios/Extintores/WhatsApp Image 2026-08-04 at 21.40.30.jpeg", alt: "Técnicos de EXTINT S.E.E.D realizando mantenimiento a un extintor", caption: "Intervención técnica realizada por personal capacitado" },
                    { src: "Imagenes/Servicios/Extintores/IMG_20210506_141917.jpg", alt: "Extintor móvil durante revisión en taller", caption: "Revisión de equipos de mayor capacidad" },
                    { src: "Imagenes/Servicios/Extintores/IMG_20210907_102110.jpg", alt: "Extintor móvil instalado para su inspección", caption: "Control del estado físico y sus componentes" },
                    { src: "Imagenes/Servicios/Extintores/IMG_20250408_102821.jpg", alt: "Extintores organizados después del servicio de recarga", caption: "Equipos preparados después de la atención técnica" },
                    { src: "Imagenes/Servicios/Extintores/IMG_20250822_133000.jpg", alt: "Lote de extintores recargados y revisados", caption: "Atención de lotes empresariales" },
                    { src: "Imagenes/Servicios/Extintores/IMG_20251108_135652.jpg", alt: "Extintores listos para devolución al cliente", caption: "Organización y control posterior al servicio" },
                    { src: "Imagenes/Servicios/Extintores/IMG20220701142526.jpg", alt: "Accesorios de seguridad preparados durante la recarga", caption: "Reposición de elementos de seguridad" },
                    { src: "Imagenes/Servicios/Extintores/WhatsApp Image 2026-08-04 at 21.42.24.jpeg", alt: "Extintores recargados ubicados en un establecimiento", caption: "Equipos nuevamente disponibles para operación" }
                ],
                cta: { label: "Solicitar servicio", whatsapp: "Venta, mantenimiento o recarga de extintores" }
            }
        ]
    },
    advisory: {
        kicker: "Asesoramiento técnico personalizado",
        title: "ASESORAMIENTO TÉCNICO PERSONALIZADO",
        intro: "Orientación profesional para identificar necesidades, resolver observaciones y preparar correctamente cada establecimiento.",
        direct: true,
        items: [
            {
                id: "acompanamiento-inspecciones",
                eyebrow: "Evaluación · Recomendaciones · Seguimiento",
                title: "VISITA TÉCNICA A SU ESTABLECIMIENTO",
                summary: "Acompañamiento profesional durante la revisión y adecuación del establecimiento.",
                lead: "Identificamos las necesidades del establecimiento, resolvemos observaciones y definimos las acciones necesarias para preparar la inspección.",
                description: [
                    "Visitamos el establecimiento, escuchamos las necesidades del cliente y revisamos equipos contra incendios, señalización, rutas de evacuación, sistemas de alarma, instalaciones y medidas preventivas. Cada observación se explica de forma clara para que el cliente conozca qué debe corregir, mejorar o implementar.",
                    "El acompañamiento continúa durante los servicios o trabajos realizados con EXTINT S.E.E.D, la gestión de requisitos y el levantamiento de observaciones, hasta que el establecimiento complete satisfactoriamente la inspección del Cuerpo de Bomberos."
                ],
                highlights: [
                    { title: "Visita y evaluación", description: "Revisión de las condiciones reales de seguridad del establecimiento." },
                    { title: "Recomendaciones priorizadas", description: "Explicación clara de las correcciones, mejoras o equipos necesarios." },
                    { title: "Gestión de permisos", description: "Organización de requisitos y respaldos para el proceso ante el Cuerpo de Bomberos.", featured: true },
                    { title: "Seguimiento técnico", description: "Acompañamiento durante los trabajos y el levantamiento de observaciones." }
                ],
                galleryNote: "Experiencia de campo en locales, conjuntos, edificios, empresas e instalaciones industriales.",
                images: [
                    { src: "Imagenes/Servicios/Asesoramiento/IMG20220830135424.jpg", alt: "Equipo de EXTINT S.E.E.D realizando una visita técnica industrial", caption: "Evaluación técnica de instalaciones industriales" },
                    { src: "Imagenes/Servicios/Asesoramiento/IMG20211123181841.jpg", alt: "Revisión de condiciones de seguridad en una cocina comercial", caption: "Revisión de riesgos y condiciones del establecimiento" },
                    { src: "Imagenes/Servicios/Asesoramiento/IMG_20210623_091859.jpg", alt: "Asesor explicando el funcionamiento de una estación manual de alarma", caption: "Verificación de sistemas de detección y alarma" },
                    { src: "Imagenes/Servicios/Asesoramiento/IMG_20210519_134002.jpg", alt: "Asesor explicando el estado de un extintor al cliente", caption: "Orientación directa sobre equipos contra incendios" },
                    { src: "Imagenes/Servicios/Asesoramiento/IMG_20210507_120106.jpg", alt: "Inspección técnica de rutas y condiciones internas de un establecimiento", caption: "Revisión de rutas, espacios y medidas preventivas" },
                    { src: "Imagenes/Servicios/Asesoramiento/IMG_20210426_113713.jpg", alt: "Revisión de extintor y señalización en un local comercial", caption: "Verificación de ubicación, señalización y equipos" },
                    { src: "Imagenes/Servicios/Asesoramiento/IMG_20210414_114401.jpg", alt: "Visita técnica a un área de almacenamiento", caption: "Identificación de riesgos y oportunidades de mejora" }
                ],
                cta: { label: "Solicitar asesoramiento", whatsapp: "Visita técnica y gestión de permisos contra incendios" }
            }
        ]
    },
    "alarm-systems": {
        kicker: "Detección y notificación",
        title: "SISTEMA CENTRALIZADO DE ALARMAS",
        intro: "Soluciones para detectar oportunamente una condición de incendio y alertar a los ocupantes.",
        direct: true,
        items: [
            {
                id: "sistema-centralizado-alarmas",
                eyebrow: "Diseño · Instalación · Mantenimiento",
                title: "Sistema centralizado de alarmas",
                summary: "Integración de dispositivos para detección temprana y notificación de emergencias.",
                lead: "Implementamos soluciones de alarma contra incendios de acuerdo con las condiciones y necesidades del establecimiento.",
                description: [
                    "Evaluamos la distribución del espacio para orientar la ubicación de paneles, detectores, estaciones manuales y dispositivos de notificación.",
                    "Realizamos instalación, pruebas funcionales y mantenimiento, explicando al cliente el funcionamiento general y las recomendaciones de operación."
                ],
                highlights: [
                    { title: "Evaluación y diseño", description: "Definición de dispositivos y ubicación según las características del establecimiento." },
                    { title: "Instalación e integración", description: "Conexión de panel, detectores, pulsadores y elementos de notificación." },
                    { title: "Pruebas y mantenimiento", description: "Verificación funcional y atención preventiva de los componentes." }
                ],
                galleryNote: "Instalaciones, pruebas y mantenimiento realizados en sistemas de alarma.",
                images: [
                    { src: "Imagenes/Servicios/Alarmas/IMG20230309112006.jpg", alt: "Técnicos revisando un panel centralizado de alarma contra incendios", caption: "Revisión técnica del panel de control" },
                    { src: "Imagenes/Servicios/Alarmas/IMG20231115155700.jpg", alt: "Panel centralizado de alarma instalado en un establecimiento", caption: "Panel instalado y correctamente identificado" },
                    { src: "Imagenes/Servicios/Alarmas/IMG_20201017_114439.jpg", alt: "Detectores y dispositivos preparados para instalación", caption: "Selección e integración de dispositivos" },
                    { src: "Imagenes/Servicios/Alarmas/IMG_20250912_130204.jpg", alt: "Componentes internos de un panel de detección y alarma", caption: "Conexión y verificación de componentes" },
                    { src: "Imagenes/Servicios/Alarmas/IMG_20260401_131834.jpg", alt: "Dispositivo audiovisual instalado junto a señalética de emergencia", caption: "Notificación visual y señalización complementaria" },
                    { src: "Imagenes/Servicios/Alarmas/WhatsApp Image 2026-08-04 at 21.43.03.jpeg", alt: "Instalación de cableado para un sistema centralizado de alarma", caption: "Montaje técnico en las instalaciones del cliente" }
                ],
                cta: { label: "Solicitar asesoría", whatsapp: "Sistema centralizado de alarmas contra incendios" }
            }
        ]
    },
    "hydraulic-network": {
        kicker: "Protección fija contra incendios",
        title: "SISTEMA DE EXTINCIÓN: RED HÍDRICA",
        intro: "Soluciones para abastecer y distribuir agua mediante gabinetes, tuberías y componentes de protección.",
        direct: true,
        items: [
            {
                id: "sistema-red-hidrica",
                eyebrow: "Diseño · Instalación · Mantenimiento",
                title: "Sistema de extinción por red hídrica",
                summary: "Diseño e implementación de redes para protección integral de establecimientos.",
                lead: "Desarrollamos soluciones de red hídrica de acuerdo con las condiciones, dimensiones y riesgos del proyecto.",
                description: [
                    "Revisamos recorridos, puntos de cobertura, gabinetes, tuberías, válvulas y demás componentes necesarios para definir una instalación funcional.",
                    "También efectuamos mantenimiento y revisiones para detectar fugas, deterioro u otras condiciones que puedan afectar la disponibilidad del sistema."
                ],
                highlights: [
                    { title: "Evaluación del proyecto", description: "Revisión de espacios, cobertura requerida y ubicación de componentes." },
                    { title: "Instalación del sistema", description: "Implementación de tuberías, gabinetes, válvulas y accesorios." },
                    { title: "Revisión y mantenimiento", description: "Control de condiciones físicas y funcionamiento general de la red." }
                ],
                galleryNote: "Implementaciones y revisiones reales de sistemas de bombeo y redes contra incendios.",
                images: [
                    { src: "Imagenes/Servicios/Red Hidrica/IMG20220715154322.jpg", alt: "Sistema de bombeo y tuberías de una red hídrica contra incendios", caption: "Conjunto de bombeo y distribución instalado" },
                    { src: "Imagenes/Servicios/Red Hidrica/IMG_20181222_144121.jpg", alt: "Cuarto técnico con bomba, panel y tuberías contra incendios", caption: "Integración de equipos y controles del sistema" },
                    { src: "Imagenes/Servicios/Red Hidrica/extintseed16.jpg", alt: "Técnico de EXTINT S.E.E.D revisando una bomba contra incendios", caption: "Inspección del sistema de bombeo" },
                    { src: "Imagenes/Servicios/Red Hidrica/IMG-20201115-WA0107.jpg", alt: "Componentes de una bomba para red hídrica", caption: "Mantenimiento de componentes hidráulicos" },
                    { src: "Imagenes/Servicios/Red Hidrica/IMG_20210507_115411.jpg", alt: "Evaluación técnica de una instalación de red hídrica", caption: "Revisión de tuberías, equipos y accesos" },
                    { src: "Imagenes/Servicios/Red Hidrica/IMG_20210507_135248.jpg", alt: "Personal trabajando en el recorrido de una red hídrica", caption: "Verificación del recorrido de instalación" },
                    { src: "Imagenes/Servicios/Red Hidrica/IMG_20210721_133138.jpg", alt: "Revisión de equipo motriz de una red contra incendios", caption: "Control de equipos auxiliares del sistema" },
                    { src: "Imagenes/Servicios/Red Hidrica/IMG_20210813_080103.jpg", alt: "Mantenimiento de una bomba y tuberías contra incendios", caption: "Atención preventiva del sistema" }
                ],
                cta: { label: "Consultar proyecto", whatsapp: "Sistema de extinción por red hídrica" }
            }
        ]
    },
    "gas-glp": {
        kicker: "Instalaciones centralizadas",
        title: "SISTEMA CENTRALIZADO DE GAS GLP",
        intro: "Diseño, instalación y mantenimiento de sistemas centralizados para distribución segura de gas GLP.",
        direct: true,
        items: [
            {
                id: "sistema-gas-glp",
                eyebrow: "Diseño · Instalación · Mantenimiento",
                title: "Sistema centralizado de gas GLP",
                summary: "Diseño, instalación y mantenimiento de redes centralizadas para establecimientos.",
                lead: "Planificamos, instalamos y mantenemos cada sistema considerando el consumo, la distribución del espacio y las condiciones del establecimiento.",
                description: [
                    "Definimos recorridos, puntos de consumo, válvulas, reguladores y componentes necesarios para una distribución ordenada del gas.",
                    "Realizamos revisión de conexiones, pruebas de hermeticidad y mantenimiento preventivo, comunicando al cliente las condiciones encontradas y las acciones recomendadas."
                ],
                highlights: [
                    { title: "Planificación de la red", description: "Definición de recorridos, puntos de consumo y componentes del sistema." },
                    { title: "Instalación técnica", description: "Montaje de tuberías, válvulas, reguladores y conexiones." },
                    { title: "Mantenimiento y verificación", description: "Revisión de conexiones, pruebas de hermeticidad y atención preventiva." }
                ],
                galleryNote: "Instalaciones, mantenimientos y revisiones realizadas en sistemas centralizados de gas GLP.",
                images: [
                    { src: "Imagenes/Servicios/GLP/IMG_20250407_153738.jpg", alt: "Central de cilindros y tuberías de gas GLP organizada en gabinete", caption: "Central de gas protegida y correctamente distribuida" },
                    { src: "Imagenes/Servicios/GLP/IMG20230914162300.jpg", alt: "Cilindros conectados a un sistema centralizado de gas GLP", caption: "Conexiones, regulación y señalización preventiva" },
                    { src: "Imagenes/Servicios/GLP/IMG20230801111353.jpg", alt: "Tuberías, válvulas y reguladores preparados para instalación de gas", caption: "Preparación técnica de componentes" },
                    { src: "Imagenes/Servicios/GLP/IMG20230801144409.jpg", alt: "Cilindros de gas conectados mediante tuberías centralizadas", caption: "Distribución centralizada hacia puntos de consumo" },
                    { src: "Imagenes/Servicios/GLP/IMG20240320181253.jpg", alt: "Técnicos trabajando en el recorrido de una tubería de gas GLP", caption: "Instalación y revisión de recorridos" },
                    { src: "Imagenes/Servicios/GLP/ChatGPT Image 4 ago 2026, 21_55_55.png", alt: "Herramientas y componentes utilizados en instalaciones de gas GLP", caption: "Componentes para montaje y mantenimiento" }
                ],
                cta: { label: "Consultar servicio GLP", whatsapp: "Diseño, instalación o mantenimiento de sistema centralizado de gas GLP" }
            }
        ]
    },
    "emergency-plans": {
        kicker: "Preparación organizacional",
        title: "PLANES DE EMERGENCIA",
        intro: "Documentación clara para organizar la prevención, preparación y respuesta del establecimiento.",
        direct: true,
        items: [
            {
                id: "planes-emergencia",
                eyebrow: "Elaboración · Actualización · Organización",
                title: "Planes de emergencia",
                summary: "Elaboración y actualización de procedimientos para responder ante diferentes escenarios.",
                lead: "Desarrollamos planes ajustados a la actividad, ocupación, distribución y riesgos presentes en cada organización.",
                description: [
                    "Levantamos información del establecimiento para definir responsables, recursos, procedimientos, rutas de evacuación y medidas de respuesta.",
                    "Cuando existe un documento previo, revisamos su contenido y actualizamos los cambios necesarios para mantenerlo alineado con la operación actual."
                ],
                highlights: [
                    { title: "Levantamiento de información", description: "Revisión de instalaciones, ocupación, recursos y escenarios de riesgo." },
                    { title: "Procedimientos organizados", description: "Definición de funciones, comunicación, evacuación y respuesta." },
                    { title: "Actualización documental", description: "Incorporación de cambios operativos, físicos y organizacionales." }
                ],
                galleryNote: "Levantamiento de información y elaboración documental en establecimientos.",
                images: [
                    { src: "Imagenes/Servicios/Mapas/mapas_riesgos_recursos_evacuacion.png", alt: "Mapas de riesgos, recursos y evacuación elaborados para diferentes establecimientos", caption: "Mapas de riesgos, recursos y evacuación" },
                    { src: "Imagenes/Servicios/Mapas/planes_de_emergencia.png", alt: "Planes de emergencia preparados y actualizados para diferentes organizaciones", caption: "Planes adaptados a cada establecimiento" },
                    { src: "Imagenes/Servicios/Mapas/WhatsApp Image 2026-08-04 at 21.41.46.jpeg", alt: "Levantamiento técnico para elaborar un plan de emergencia", caption: "Revisión de instalaciones y recursos disponibles" },
                    { src: "Imagenes/Servicios/Mapas/WhatsApp Image 2026-08-04 at 21.43.33.jpeg", alt: "Registro de información para actualizar un plan de emergencia", caption: "Documentación de condiciones y cambios del establecimiento" }
                ],
                cta: { label: "Solicitar elaboración", whatsapp: "Elaboración o actualización de planes de emergencia" }
            }
        ]
    },
    "security-cameras": {
        kicker: "Monitoreo y protección",
        title: "INSTALACIÓN DE CÁMARAS DE SEGURIDAD",
        intro: "Soluciones de videovigilancia para mejorar el control y monitoreo de instalaciones.",
        direct: true,
        items: [
            {
                id: "camaras-seguridad",
                eyebrow: "Evaluación · Instalación · Configuración",
                title: "Cámaras de seguridad",
                summary: "Instalación de sistemas de videovigilancia según las necesidades del espacio.",
                lead: "Orientamos la selección y ubicación de cámaras para obtener una cobertura útil de los puntos prioritarios.",
                description: [
                    "Revisamos accesos, áreas de circulación, zonas operativas y condiciones de iluminación antes de plantear la distribución de los equipos.",
                    "Realizamos instalación, configuración y pruebas de visualización, dejando al cliente una explicación clara sobre el uso básico del sistema."
                ],
                highlights: [
                    { title: "Evaluación de cobertura", description: "Identificación de áreas prioritarias y puntos adecuados de instalación." },
                    { title: "Montaje y configuración", description: "Instalación de cámaras, conexiones y parámetros principales." },
                    { title: "Pruebas y orientación", description: "Verificación de imagen y explicación básica del sistema al cliente." }
                ],
                galleryNote: "Soluciones de videovigilancia para diferentes tipos de instalaciones.",
                images: [
                    { src: "Imagenes/Servicios/Portadas/camaras.png", alt: "Cámara para sistema de videovigilancia", caption: "Monitoreo y protección de instalaciones" }
                ],
                cta: { label: "Consultar instalación", whatsapp: "Instalación de cámaras de seguridad" }
            }
        ]
    }
};

const serviceDialogTriggers = [...document.querySelectorAll("[data-service-dialog]")];
const serviceDialog = document.querySelector("#service-dialog");
const serviceDialogClose = serviceDialog?.querySelector(".service-dialog-close");
const serviceDialogBack = document.querySelector("#service-dialog-back");
const serviceDialogKicker = document.querySelector("#service-dialog-kicker");
const serviceDialogTitle = document.querySelector("#service-dialog-title");
const serviceDialogIntro = document.querySelector("#service-dialog-intro");
const serviceOptionsView = document.querySelector("#service-options-view");
const serviceOptionsGrid = document.querySelector("#service-options-grid");
const serviceDetailView = document.querySelector("#service-detail-view");
const serviceGalleryStage = document.querySelector("#service-gallery-stage");
const serviceGalleryControls = document.querySelector("#service-gallery-controls");
const serviceGalleryDots = document.querySelector("#service-gallery-dots");
const serviceGalleryNote = document.querySelector("#service-gallery-note");
const serviceDetailEyebrow = document.querySelector("#service-detail-eyebrow");
const serviceDetailTitle = document.querySelector("#service-detail-title");
const serviceDetailLead = document.querySelector("#service-detail-lead");
const serviceDetailDescription = document.querySelector("#service-detail-description");
const serviceDetailHighlights = document.querySelector("#service-detail-highlights");
const serviceDetailCta = document.querySelector("#service-detail-cta");
let activeServiceCategory = null;
let activeServiceImage = 0;
let activeServiceImages = [];
let serviceDialogOpener = null;
let serviceGalleryTimer = null;
const SERVICE_GALLERY_INTERVAL = 4200;

function createServiceWhatsAppLink(serviceName) {
    const message = `Hola EXTINT S.E.E.D, deseo información y una cotización para: ${serviceName}.`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function renderServiceHeader(category) {
    serviceDialogKicker.textContent = category.kicker;
    serviceDialogTitle.textContent = category.title;
    serviceDialogIntro.textContent = category.intro;
}

function renderServiceOptions(category) {
    renderServiceHeader(category);
    serviceDialogBack.hidden = true;
    serviceOptionsView.hidden = false;
    serviceOptionsGrid.innerHTML = category.items.map((item, index) => `
        <button class="service-option-card" type="button" data-service-option="${escapeHTML(item.id)}"
            aria-controls="service-detail-view" aria-pressed="false">
            <span class="service-option-media">
                <img src="${escapeHTML(optimizedAssetPath(item.images[0].src))}" alt="" loading="lazy"
                    decoding="async">
                <small>${String(index + 1).padStart(2, "0")}</small>
            </span>
            <span class="service-option-content">
                <strong>${escapeHTML(item.title)}</strong>
                <span>${escapeHTML(item.summary)}</span>
            </span>
        </button>
    `).join("");

    if (category.masterDetail) {
        renderServiceDetail(category.items[0]);
    } else {
        serviceDetailView.hidden = true;
    }
}

function showServiceImage(index) {
    if (!activeServiceImages.length) {
        return;
    }

    activeServiceImage = (index + activeServiceImages.length) % activeServiceImages.length;
    [...serviceGalleryStage.querySelectorAll("[data-service-slide]")].forEach((slide, slideIndex) => {
        const isActive = slideIndex === activeServiceImage;
        slide.classList.toggle("is-active", isActive);
        slide.setAttribute("aria-hidden", String(!isActive));
    });
    const imageSelectors = [...serviceGalleryDots.querySelectorAll("[data-service-image]")];
    imageSelectors.forEach((dot, dotIndex) => {
        const isActive = dotIndex === activeServiceImage;
        dot.classList.toggle("is-active", isActive);
        dot.setAttribute("aria-selected", String(isActive));
    });

    if (serviceGalleryDots.classList.contains("has-thumbnails")) {
        const activeThumbnail = imageSelectors[activeServiceImage];
        if (activeThumbnail) {
            const centeredPosition = activeThumbnail.offsetLeft
                - ((serviceGalleryDots.clientWidth - activeThumbnail.offsetWidth) / 2);
            serviceGalleryDots.scrollTo({ left: Math.max(0, centeredPosition), behavior: "smooth" });
        }
    }
}

function stopServiceGalleryAutoplay() {
    if (serviceGalleryTimer) {
        window.clearInterval(serviceGalleryTimer);
        serviceGalleryTimer = null;
    }
}

function startServiceGalleryAutoplay() {
    stopServiceGalleryAutoplay();
    if (activeServiceImages.length < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
    }

    serviceGalleryTimer = window.setInterval(() => {
        showServiceImage(activeServiceImage + 1);
    }, SERVICE_GALLERY_INTERVAL);
}

function renderServiceDetail(item) {
    const category = serviceDialogCatalog[activeServiceCategory];
    const keepsOptionsVisible = Boolean(category.masterDetail);
    renderServiceHeader(category);
    serviceOptionsView.hidden = !keepsOptionsVisible;
    serviceDetailView.hidden = false;
    serviceDialogBack.hidden = Boolean(category.direct || keepsOptionsVisible);

    [...serviceOptionsGrid.querySelectorAll("[data-service-option]")].forEach((option) => {
        const isActive = option.dataset.serviceOption === item.id;
        option.classList.toggle("is-active", isActive);
        option.setAttribute("aria-pressed", String(isActive));
    });

    activeServiceImages = item.images;
    serviceGalleryStage.innerHTML = item.images.map((image, index) => `
        <figure class="training-slide${index === 0 ? " is-active" : ""}" data-service-slide="${index}"
            aria-hidden="${index === 0 ? "false" : "true"}">
            <img src="${escapeHTML(optimizedAssetPath(image.src))}" alt="${escapeHTML(image.alt)}"
                decoding="async"${index ? ' loading="lazy"' : ' fetchpriority="high"'}>
            <figcaption>${escapeHTML(image.caption)}</figcaption>
        </figure>
    `).join("");
    const useGalleryThumbnails = item.images.length > 1;
    serviceGalleryDots.classList.toggle("has-thumbnails", useGalleryThumbnails);
    serviceGalleryDots.classList.toggle("is-scrollable", item.images.length > 8);
    serviceGalleryDots.innerHTML = item.images.map((image, index) => `
        <button class="${index === 0 ? "is-active" : ""}" type="button" data-service-image="${index}"
            role="tab" aria-selected="${index === 0}" aria-label="Mostrar fotografía ${index + 1}">
            ${useGalleryThumbnails ? `<img src="${escapeHTML(optimizedAssetPath(image.src))}" alt="" loading="lazy" decoding="async">` : ""}
        </button>
    `).join("");
    serviceGalleryControls.hidden = item.images.length < 2;
    serviceGalleryNote.textContent = item.galleryNote;

    serviceDetailEyebrow.textContent = item.eyebrow;
    serviceDetailTitle.textContent = item.title;
    serviceDetailLead.textContent = item.lead;
    serviceDetailDescription.innerHTML = item.description.map((paragraph) => `<p>${escapeHTML(paragraph)}</p>`).join("");
    serviceDetailHighlights.innerHTML = item.highlights.map((highlight) => {
        if (typeof highlight === "string") {
            return `<li>${escapeHTML(highlight)}</li>`;
        }
        return `<li class="${highlight.featured ? "is-featured" : ""}"><strong>${escapeHTML(highlight.title)}</strong><span>${escapeHTML(highlight.description)}</span></li>`;
    }).join("");
    serviceDetailCta.textContent = item.cta.label;
    serviceDetailCta.href = item.cta.whatsapp ? createServiceWhatsAppLink(item.cta.whatsapp) : item.cta.href;
    serviceDetailCta.target = item.cta.whatsapp ? "_blank" : "";
    serviceDetailCta.rel = item.cta.whatsapp ? "noopener noreferrer" : "";
    serviceDetailCta.dataset.closeDialog = item.cta.href?.startsWith("#") ? "true" : "false";

    showServiceImage(0);
    if (!keepsOptionsVisible) {
        requestAnimationFrame(() => serviceDetailTitle.focus({ preventScroll: true }));
    }
}

function openServiceDialog(trigger) {
    stopServiceGalleryAutoplay();
    activeServiceCategory = trigger.dataset.serviceDialog;
    const category = serviceDialogCatalog[activeServiceCategory];
    if (!category) {
        return;
    }

    serviceDialogOpener = trigger;
    serviceDialog.dataset.serviceCategory = activeServiceCategory;
    if (category.direct) {
        renderServiceDetail(category.items[0]);
    } else {
        renderServiceOptions(category);
    }

    document.body.classList.add("dialog-open");
    if (typeof serviceDialog.showModal === "function") {
        serviceDialog.showModal();
    } else {
        serviceDialog.setAttribute("open", "");
    }
    startServiceGalleryAutoplay();
    serviceDialogClose.focus({ preventScroll: true });
}

function closeServiceDialog() {
    if (typeof serviceDialog.close === "function") {
        serviceDialog.close();
    } else {
        serviceDialog.removeAttribute("open");
        serviceDialog.dispatchEvent(new Event("close"));
    }
}

if (serviceDialogTriggers.length && serviceDialog && serviceDialogClose) {
    serviceDetailTitle.tabIndex = -1;
    serviceDialogTriggers.forEach((trigger) => {
        trigger.addEventListener("click", () => openServiceDialog(trigger));
        trigger.addEventListener("keydown", (event) => {
            if (!["Enter", " "].includes(event.key)) {
                return;
            }
            event.preventDefault();
            openServiceDialog(trigger);
        });
    });

    serviceDialog.addEventListener("click", (event) => {
        if (event.target === serviceDialog || event.target.closest(".service-dialog-close")) {
            closeServiceDialog();
            return;
        }

        if (event.target.closest("#service-dialog-back")) {
            renderServiceOptions(serviceDialogCatalog[activeServiceCategory]);
            requestAnimationFrame(() => serviceOptionsGrid.querySelector(".service-option-card")?.focus());
            return;
        }

        const option = event.target.closest("[data-service-option]");
        if (option) {
            const item = serviceDialogCatalog[activeServiceCategory].items.find((entry) => entry.id === option.dataset.serviceOption);
            if (item) {
                renderServiceDetail(item);
                startServiceGalleryAutoplay();
            }
            return;
        }

        const imageDot = event.target.closest("[data-service-image]");
        if (imageDot) {
            showServiceImage(Number(imageDot.dataset.serviceImage));
            startServiceGalleryAutoplay();
            return;
        }

        const imageDirection = event.target.closest("[data-service-image-direction]");
        if (imageDirection) {
            showServiceImage(activeServiceImage + Number(imageDirection.dataset.serviceImageDirection));
            startServiceGalleryAutoplay();
        }
    });

    serviceDetailCta.addEventListener("click", (event) => {
        if (serviceDetailCta.dataset.closeDialog !== "true") {
            return;
        }
        event.preventDefault();
        const target = document.querySelector(serviceDetailCta.getAttribute("href"));
        closeServiceDialog();
        requestAnimationFrame(() => target?.scrollIntoView({ behavior: "smooth", block: "start" }));
    });

    serviceDialog.addEventListener("keydown", (event) => {
        if (serviceDetailView.hidden || !["ArrowLeft", "ArrowRight"].includes(event.key)) {
            return;
        }
        event.preventDefault();
        showServiceImage(activeServiceImage + (event.key === "ArrowLeft" ? -1 : 1));
        startServiceGalleryAutoplay();
    });

    serviceDialog.addEventListener("close", () => {
        stopServiceGalleryAutoplay();
        document.body.classList.remove("dialog-open");
        activeServiceCategory = null;
        activeServiceImages = [];
        delete serviceDialog.dataset.serviceCategory;
        serviceDialogOpener?.focus({ preventScroll: true });
    });
}

// Product dialog
const productDialog = document.querySelector("#product-dialog");
const dialogClose = productDialog.querySelector(".dialog-close");
const dialogProductPrev = document.querySelector("#dialog-product-prev");
const dialogProductNext = document.querySelector("#dialog-product-next");
const dialogMedia = document.querySelector("#dialog-media");
const dialogContent = productDialog.querySelector(".dialog-content");
const dialogCategory = document.querySelector("#dialog-category");
const dialogProductName = document.querySelector("#dialog-product-name");
const dialogPrice = document.querySelector("#dialog-price");
const dialogRegularPrice = document.querySelector("#dialog-regular-price");
const dialogSalePrice = document.querySelector("#dialog-sale-price");
const dialogPriceNote = document.querySelector("#dialog-price-note");
const dialogDescription = document.querySelector("#dialog-description");
const dialogSpecs = document.querySelector("#dialog-specs");
const dialogQuoteLink = document.querySelector("#dialog-quote-link");
let dialogOpener = null;
let dialogFitFrame = 0;
let activeDialogProductId = null;
let dialogImageIndex = 0;

function fitProductDialog() {
    cancelAnimationFrame(dialogFitFrame);
    productDialog.classList.remove("is-compact", "is-ultra-compact");
    dialogContent.scrollTop = 0;

    dialogFitFrame = requestAnimationFrame(() => {
        const isOpen = productDialog.open || productDialog.hasAttribute("open");
        if (!isOpen || dialogContent.scrollHeight <= dialogContent.clientHeight + 1) {
            return;
        }

        productDialog.classList.add("is-compact");
        dialogFitFrame = requestAnimationFrame(() => {
            if (dialogContent.scrollHeight > dialogContent.clientHeight + 1) {
                productDialog.classList.add("is-ultra-compact");
            }
        });
    });
}

function showDialogImage(index) {
    const slides = [...dialogMedia.querySelectorAll(".dialog-image-slide")];
    if (slides.length === 0) {
        dialogImageIndex = 0;
        return;
    }

    dialogImageIndex = (index + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => {
        const isActive = slideIndex === dialogImageIndex;
        slide.classList.toggle("is-active", isActive);
        slide.setAttribute("aria-hidden", String(!isActive));
    });

    dialogMedia.querySelectorAll("[data-image-index]").forEach((dot, dotIndex) => {
        const isActive = dotIndex === dialogImageIndex;
        dot.classList.toggle("is-active", isActive);
        if (isActive) {
            dot.setAttribute("aria-current", "true");
        } else {
            dot.removeAttribute("aria-current");
        }
    });
}

function navigateDialogProduct(direction) {
    const entry = productIndex.get(activeDialogProductId);
    if (!entry || entry.category.products.length < 2) {
        return;
    }

    const currentIndex = entry.category.products.findIndex((product) => product.id === activeDialogProductId);
    const nextIndex = (currentIndex + direction + entry.category.products.length) % entry.category.products.length;
    openProductDialog(entry.category.products[nextIndex].id, { preserveOpener: true });
}

function openProductDialog(productId, { preserveOpener = false } = {}) {
    const entry = productIndex.get(productId);
    if (!entry) {
        return;
    }

    const { product, category } = entry;
    const isAlreadyOpen = productDialog.open || productDialog.hasAttribute("open");
    if (!preserveOpener) {
        dialogOpener = document.activeElement;
    }
    activeDialogProductId = product.id;
    dialogImageIndex = 0;
    dialogMedia.dataset.product = product.id;
    dialogMedia.innerHTML = `
        <span class="dialog-offer-badge">¡OFERTA!</span>
        ${createMediaMarkup(product, true)}
    `;
    showDialogImage(0);
    dialogCategory.textContent = category.name;
    dialogProductName.innerHTML = createProductNameMarkup(product);
    dialogProductName.classList.toggle("has-name-lines", product.displayNames.length > 1);

    const productPosition = category.products.findIndex((item) => item.id === product.id);
    const previousProduct = category.products[(productPosition - 1 + category.products.length) % category.products.length];
    const nextProduct = category.products[(productPosition + 1) % category.products.length];
    const hasProductNavigation = category.products.length > 1;
    dialogProductPrev.hidden = !hasProductNavigation;
    dialogProductNext.hidden = !hasProductNavigation;
    dialogProductPrev.setAttribute("aria-label", `Ver producto anterior: ${previousProduct.name}`);
    dialogProductNext.setAttribute("aria-label", `Ver producto siguiente: ${nextProduct.name}`);

    const hasPrice = Boolean(product.regularPrice && product.salePrice);
    dialogPrice.hidden = false;
    dialogPrice.classList.toggle("is-on-request", !hasPrice);
    dialogRegularPrice.hidden = !hasPrice;
    dialogSalePrice.hidden = !hasPrice;
    dialogPriceNote.hidden = hasPrice;
    dialogRegularPrice.textContent = product.regularPrice || "";
    dialogSalePrice.textContent = product.salePrice || "";

    dialogDescription.textContent = product.detailDescription;

    const featureSpecs = product.features.map((feature, index) => ({
        label: feature.label || `Característica ${index + 1}`,
        value: feature.text,
        href: feature.href || null
    }));
    const displayedSpecs = [
        ...featureSpecs,
        ...Object.entries(product.specs).map(([label, value]) => ({ label, value, href: null }))
    ];

    dialogSpecs.innerHTML = displayedSpecs.map(({ label, value, href }) => `
        <div class="dialog-spec-row">
            <span>${escapeHTML(label)}</span>
            <strong>${href
                ? `<a href="${escapeHTML(href)}" target="_blank" rel="noopener noreferrer">${escapeHTML(value)}</a>`
                : escapeHTML(value)}</strong>
        </div>
    `).join("");
    const priceMessage = hasPrice
        ? `Precio publicado: ${product.salePrice} (no incluye IVA)`
        : "Precio: bajo cotización";
    const message = [
        "Hola, equipo de EXTINT S.E.E.D.",
        "Deseo recibir asesoría e información sobre el siguiente producto:",
        `Producto: ${product.name}`,
        priceMessage,
        "Origen de la consulta: página web de EXTINT S.E.E.D.",
        "Por favor, ayúdenme a confirmar disponibilidad, especificaciones y condiciones de entrega. Gracias."
    ].join("\n");
    dialogQuoteLink.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    document.body.classList.add("dialog-open");
    if (!isAlreadyOpen) {
        if (typeof productDialog.showModal === "function") {
            productDialog.showModal();
        } else {
            productDialog.setAttribute("open", "");
        }
    }

    fitProductDialog();
}

function closeProductDialog() {
    if (typeof productDialog.close === "function") {
        productDialog.close();
    } else {
        productDialog.removeAttribute("open");
    }
}

productGrid.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-product]");
    if (trigger) {
        trigger.focus({ preventScroll: true });
        openProductDialog(trigger.dataset.product);
    }
});

productGrid.addEventListener("keydown", (event) => {
    const trigger = event.target.closest("[data-product]");
    if (!trigger || !["Enter", " "].includes(event.key)) {
        return;
    }

    event.preventDefault();
    openProductDialog(trigger.dataset.product);
});

dialogClose.addEventListener("click", closeProductDialog);

dialogProductPrev.addEventListener("click", () => navigateDialogProduct(-1));
dialogProductNext.addEventListener("click", () => navigateDialogProduct(1));

dialogMedia.addEventListener("click", (event) => {
    const imageDot = event.target.closest("[data-image-index]");
    if (imageDot) {
        showDialogImage(Number(imageDot.dataset.imageIndex));
        return;
    }

    const imageButton = event.target.closest("[data-image-direction]");
    if (!imageButton) {
        return;
    }

    showDialogImage(dialogImageIndex + Number(imageButton.dataset.imageDirection));
});

productDialog.addEventListener("click", (event) => {
    if (event.target === productDialog) {
        closeProductDialog();
    }
});

productDialog.addEventListener("close", () => {
    document.body.classList.remove("dialog-open");
    productDialog.classList.remove("is-compact", "is-ultra-compact");
    activeDialogProductId = null;
    dialogImageIndex = 0;
    dialogOpener?.focus();
});

productDialog.addEventListener("keydown", (event) => {
    if (!["ArrowLeft", "ArrowRight"].includes(event.key)) {
        return;
    }

    event.preventDefault();
    const direction = event.key === "ArrowLeft" ? -1 : 1;
    if (event.target.closest(".dialog-image-carousel")) {
        showDialogImage(dialogImageIndex + direction);
    } else {
        navigateDialogProduct(direction);
    }
});

window.addEventListener("resize", () => {
    if (productDialog.open || productDialog.hasAttribute("open")) {
        fitProductDialog();
    }
}, { passive: true });

// Show the floating social links once the "Quiénes somos" section begins
const floatingSocials = document.querySelector(".floating-socials");
const aboutSection = document.querySelector("#nosotros");
let socialRailFrame = null;

function updateFloatingSocials() {
    const headerHeight = Number.parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--header-height")) || 0;
    const isVisible = window.scrollY >= aboutSection.offsetTop - headerHeight - 8;
    floatingSocials.classList.toggle("is-visible", isVisible);
    floatingSocials.setAttribute("aria-hidden", String(!isVisible));
    socialRailFrame = null;
}

function scheduleFloatingSocialsUpdate() {
    if (socialRailFrame === null) {
        socialRailFrame = window.requestAnimationFrame(updateFloatingSocials);
    }
}

window.addEventListener("scroll", scheduleFloatingSocialsUpdate, { passive: true });
window.addEventListener("resize", scheduleFloatingSocialsUpdate);
updateFloatingSocials();

// Mobile navigation
const menuToggle = document.querySelector(".menu-toggle");
const mainNavigation = document.querySelector(".main-navigation");

function closeMenu() {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menú");
    mainNavigation.classList.remove("is-open");
    document.body.classList.remove("menu-open");
}

menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Abrir menú" : "Cerrar menú");
    mainNavigation.classList.toggle("is-open", !isOpen);
    document.body.classList.toggle("menu-open", !isOpen);
});

mainNavigation.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
        closeMenu();
    }
});

window.addEventListener("resize", () => {
    if (window.innerWidth > 820) {
        closeMenu();
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && mainNavigation.classList.contains("is-open")) {
        closeMenu();
        menuToggle.focus();
    }
});

// Hero carousel
const slides = [...document.querySelectorAll(".hero-slide")];
const dots = [...document.querySelectorAll(".carousel-dot")];
const previousButton = document.querySelector(".carousel-prev");
const nextButton = document.querySelector(".carousel-next");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let currentSlide = 0;
let carouselTimer = null;

function showSlide(index) {
    currentSlide = (index + slides.length) % slides.length;

    slides.forEach((slide, slideIndex) => {
        slide.classList.toggle("is-active", slideIndex === currentSlide);
        slide.setAttribute("aria-hidden", String(slideIndex !== currentSlide));
    });

    dots.forEach((dot, dotIndex) => {
        const isActive = dotIndex === currentSlide;
        dot.classList.toggle("is-active", isActive);
        dot.setAttribute("aria-selected", String(isActive));
    });

}

function stopCarouselTimer() {
    window.clearInterval(carouselTimer);
    carouselTimer = null;
}

function startCarouselTimer() {
    stopCarouselTimer();
    if (!reduceMotion.matches && !document.hidden) {
        carouselTimer = window.setInterval(() => showSlide(currentSlide + 1), 8000);
    }
}

function resetCarouselTimer() {
    startCarouselTimer();
}

previousButton.addEventListener("click", () => {
    showSlide(currentSlide - 1);
    resetCarouselTimer();
});

nextButton.addEventListener("click", () => {
    showSlide(currentSlide + 1);
    resetCarouselTimer();
});

dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
        showSlide(index);
        resetCarouselTimer();
    });
});

document.addEventListener("visibilitychange", startCarouselTimer);

showSlide(0);
startCarouselTimer();

// About gallery: small automatic sequence that preserves the two-column layout.
const aboutGallery = document.querySelector("[data-about-gallery]");
const aboutSlides = [...document.querySelectorAll("[data-about-slide]")];
let currentAboutImage = 0;
let aboutGalleryTimer = null;

function showAboutImage(index) {
    if (!aboutSlides.length) {
        return;
    }

    currentAboutImage = (index + aboutSlides.length) % aboutSlides.length;
    aboutSlides.forEach((slide, slideIndex) => {
        const isActive = slideIndex === currentAboutImage;
        slide.classList.toggle("is-active", isActive);
        slide.setAttribute("aria-hidden", String(!isActive));
    });
}

function startAboutGallery() {
    window.clearInterval(aboutGalleryTimer);
    if (!aboutGallery || aboutSlides.length < 2 || reduceMotion.matches || document.hidden) {
        return;
    }
    aboutGalleryTimer = window.setInterval(() => showAboutImage(currentAboutImage + 1), 5200);
}

if (aboutGallery) {
    document.addEventListener("visibilitychange", startAboutGallery);
    showAboutImage(0);
    startAboutGallery();
}

// Compact Google reviews carousel: advances one review at a time
const reviewItems = [...document.querySelectorAll(".review-item")];
const reviewTrack = document.querySelector(".reviews-track");
const reviewsViewport = document.querySelector(".reviews-viewport");
const reviewsCarousel = document.querySelector(".reviews-carousel");
let currentReviewIndex = 0;
let reviewCarouselTimer = null;
let reviewResizeFrame = null;

function getReviewCarouselMetrics() {
    const viewportStyles = getComputedStyle(reviewsViewport);
    const trackStyles = getComputedStyle(reviewTrack);
    const visibleItems = Math.max(1, Number.parseInt(viewportStyles.getPropertyValue("--reviews-visible"), 10) || 1);
    const gap = Number.parseFloat(trackStyles.columnGap) || 0;
    const itemWidth = reviewItems[0]?.getBoundingClientRect().width || 0;

    return {
        visibleItems: Math.min(visibleItems, reviewItems.length),
        step: itemWidth + gap
    };
}

function showReview(index, instant = false) {
    const { visibleItems, step } = getReviewCarouselMetrics();
    const lastStartIndex = Math.max(0, reviewItems.length - visibleItems);

    if (index > lastStartIndex) {
        currentReviewIndex = 0;
    } else if (index < 0) {
        currentReviewIndex = lastStartIndex;
    } else {
        currentReviewIndex = index;
    }

    reviewTrack.classList.toggle("is-jumping", instant);
    reviewTrack.style.transform = `translate3d(-${currentReviewIndex * step}px, 0, 0)`;
    reviewItems.forEach((item, itemIndex) => {
        const isVisible = itemIndex >= currentReviewIndex && itemIndex < currentReviewIndex + visibleItems;
        item.setAttribute("aria-hidden", String(!isVisible));
    });
    if (instant) {
        requestAnimationFrame(() => reviewTrack.classList.remove("is-jumping"));
    }
}

function stopReviewCarousel() {
    window.clearInterval(reviewCarouselTimer);
    reviewCarouselTimer = null;
}

function startReviewCarousel() {
    stopReviewCarousel();
    if (!reduceMotion.matches && !document.hidden) {
        reviewCarouselTimer = window.setInterval(() => showReview(currentReviewIndex + 1), 5200);
    }
}

if (reviewItems.length && reviewTrack && reviewsViewport && reviewsCarousel) {
    window.addEventListener("resize", () => {
        window.cancelAnimationFrame(reviewResizeFrame);
        reviewResizeFrame = requestAnimationFrame(() => showReview(currentReviewIndex, true));
    });

    document.addEventListener("visibilitychange", startReviewCarousel);

    showReview(0, true);
    startReviewCarousel();
}

// Accessible accordions
document.querySelectorAll(".accordion-trigger").forEach((trigger) => {
    trigger.addEventListener("click", () => {
        const isExpanded = trigger.getAttribute("aria-expanded") === "true";
        const panel = document.getElementById(trigger.getAttribute("aria-controls"));
        trigger.setAttribute("aria-expanded", String(!isExpanded));
        trigger.querySelector(".accordion-icon").textContent = isExpanded ? "+" : "−";
        panel.hidden = isExpanded;
    });
});

// Quote form: sends the request to the company email through FormSubmit
const quoteForm = document.querySelector("#quote-form");
const quoteSubmitButton = quoteForm.querySelector('button[type="submit"]');
const quoteSubmitLabel = quoteSubmitButton.querySelector(".form-submit-label");
const formStatus = document.querySelector("#form-status");
const FORM_ENDPOINT = "https://formsubmit.co/ajax/c73bc4eb825d6e7561b7ff9d85f12b3b";

function setFormStatus(message, state = "") {
    formStatus.textContent = message;
    formStatus.classList.toggle("is-success", state === "success");
    formStatus.classList.toggle("is-error", state === "error");
}

quoteForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(quoteForm);

    if (formData.get("_honey")) {
        quoteForm.reset();
        return;
    }

    if (window.location.protocol === "file:") {
        setFormStatus("Para enviar la solicitud, abre la página desde http://localhost:8080 y vuelve a intentarlo.", "error");
        return;
    }

    const submission = {
        _subject: "SOLICITUD PRIORITARIA | Nueva cotización web | EXTINT S.E.E.D",
        _template: "table",
        _captcha: "false",
        _replyto: formData.get("email"),
        "Nombres y apellidos": formData.get("name"),
        Correo: formData.get("email"),
        Teléfono: formData.get("phone"),
        Ciudad: formData.get("city"),
        Sector: formData.get("sector"),
        Necesidad: formData.get("message")
    };

    quoteSubmitButton.disabled = true;
    quoteSubmitLabel.textContent = "Enviando solicitud…";
    setFormStatus("Estamos procesando tu solicitud.");

    try {
        const response = await fetch(FORM_ENDPOINT, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(submission)
        });

        const result = await response.json().catch(() => ({}));
        if (!response.ok || result.success === false || result.success === "false") {
            throw new Error(result.message || `El servicio respondió con estado ${response.status}`);
        }

        quoteForm.reset();
        setFormStatus("Solicitud enviada correctamente. Nuestro equipo se comunicará contigo.", "success");
    } catch (error) {
        console.error("No se pudo enviar la solicitud:", error);
        setFormStatus("No fue posible enviar la solicitud. Inténtalo nuevamente o escríbenos a extintseed@hotmail.com.", "error");
    } finally {
        quoteSubmitButton.disabled = false;
        quoteSubmitLabel.textContent = "Enviar solicitud";
    }
});
