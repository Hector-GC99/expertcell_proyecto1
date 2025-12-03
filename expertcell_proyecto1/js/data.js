const PLAN_DB = [
        { id: 'AZUL1', name: 'AT&T Azul 1', type: 'BASICO', rent: 266.99 },
        { id: 'LITE1', name: 'AT&T Lite 1', type: 'BASICO', rent: 266.99 },
        { id: 'AZUL2', name: 'AT&T Azul 2', type: 'PLUS', rent: 350.68 },
        { id: 'AZUL3', name: 'AT&T Azul 3', type: 'PLUS', rent: 442.75 },
        { id: 'BLACK', name: 'AT&T Black', type: 'PLUS', rent: 668.73 },
        { id: 'ORO', name: 'AT&T Oro', type: 'PLUS', rent: 585.03 },
        { id: 'PLATA', name: 'AT&T Plata', type: 'PLUS', rent: 526.44 },
        { id: 'DIAMANTE', name: 'AT&T Diamante', type: 'PLUS', rent: 1053.73 },
        // Planes sin renta (Simples)
        { id: 'SIMPLE_12', name: 'Simple (12 Meses)', type: 'SIMPLE_NC', rent: 0 },
        { id: 'SIMPLE_24', name: 'Simple (18/24 Meses)', type: 'SIMPLE_C', rent: 0 }
    ];

    // --- BASE DE DATOS DE REGIONES (Reglas de negocio variables) ---
    // Cada llave (ej. 'CDMX') contiene la configuración específica de esa zona.
    const REGION_DB = {
        "CDMX": { 
            name: "Centro / Sur / Puebla / Veracruz", 
            base: 2000,                  // Sueldo base semanal
            w_quotas: [1.5, 2, 2.5],     // Cuotas semanales por mes (Mes 1, 2, 3)
            r_quotas: [6, 8, 10],        // Cuotas de recálculo mensual
            f_basic: 0.5,                // Factor de pago para planes básicos (50% de renta)
            f_plus: [1, 1.2, 1.5],       // Factor de pago para planes plus (progresivo por mes)
            rules: [                     // Textos explicativos para la UI
                "Pago semanal: Básico 0.5x, Plus según mes (1x, 1.2x, 1.5x).",
                "Recálculo Mensual: Si se llega a cuota, se paga el remanente.",
                "Simples: 12 meses paga fijo, 18/24 meses paga factor."
            ]
        },
        "MTY": { 
            name: "Norte (Monterrey)", 
            base: 2500,                  // Base más alta en Monterrey
            w_quotas: [0.5, 0.5, 0.5],   // Cuota semanal muy baja (0.5 activaciones)
            r_quotas: [10, 18, 18],      // Cuota mensual muy alta (Recálculo agresivo)
            f_basic: 0.5, 
            f_plus: [0.5, 0.5, 0.5],     // Factor fijo bajo semanalmente
            is_mty: true,                // Bandera especial para lógica de código
            rules: [
                "Pago Semanal FIJO: 0.5x por venta (Básico y Plus).",
                "Recálculo Mensual FUERTE: Se paga a 1x/1.5x si se cumple la cuota alta (10/18).",
                "Simples 6 meses: NO comisionan.",
                "Simples 12 meses: $100."
            ]
        },
        "GDL": { 
            name: "Guadalajara (Pacífico - Bajío)", 
            base: 2000, 
            w_quotas: [1.5, 2, 2.5], 
            r_quotas: [8, 10, 12],       // Cuotas de recálculo específicas de GDL
            f_basic: 0.5, f_plus: [1, 1.2, 1.5],
            rules: [
                "Similares a CDMX pero con cuotas de recálculo ligeramente mayores (8/10/12).",
                "Recálculo paga remanente a fin de mes."
            ]
        },
        "MXL": { 
            name: "Baja Nor (Mexicali / SLRC)", 
            base: 3000,                  // Base más alta
            w_quotas: [1.5, 2, 2.5], 
            r_quotas: [6, 8, 10], 
            f_basic: 0.5, f_plus: [1, 1.2, 1.5],
            rules: [
                "Sueldo Base más alto ($3,000).",
                "Esquema de factores estándar (0.5x / 1.x).",
                "Pago semanal condicionado a cuota."
            ]
        },
        "ENS": { 
            name: "Baja Nor (Ensenada)", 
            base: 3000, 
            w_quotas: [1.5, 2, 2.5], 
            r_quotas: [999, 999, 999],   // 999 indica que NO aplica recálculo (N/A)
            f_basic: 0.5, f_plus: [0.5, 0.5, 0.5],
            rules: [
                "SIN Recálculo Mensual.",
                "Pago plano semanal 0.5x.",
                "Sueldo Base $3,000."
            ]
        }
    };

const REGION_DB = {
        "CDMX": { 
            name: "Centro / Sur / Puebla / Veracruz", 
            base: 2000,                  // Sueldo base semanal
            w_quotas: [1.5, 2, 2.5],     // Cuotas semanales por mes (Mes 1, 2, 3)
            r_quotas: [6, 8, 10],        // Cuotas de recálculo mensual
            f_basic: 0.5,                // Factor de pago para planes básicos (50% de renta)
            f_plus: [1, 1.2, 1.5],       // Factor de pago para planes plus (progresivo por mes)
            rules: [                     // Textos explicativos para la UI
                "Pago semanal: Básico 0.5x, Plus según mes (1x, 1.2x, 1.5x).",
                "Recálculo Mensual: Si se llega a cuota, se paga el remanente.",
                "Simples: 12 meses paga fijo, 18/24 meses paga factor."
            ]
        },
        "MTY": { 
            name: "Norte (Monterrey)", 
            base: 2500,                  // Base más alta en Monterrey
            w_quotas: [0.5, 0.5, 0.5],   // Cuota semanal muy baja (0.5 activaciones)
            r_quotas: [10, 18, 18],      // Cuota mensual muy alta (Recálculo agresivo)
            f_basic: 0.5, 
            f_plus: [0.5, 0.5, 0.5],     // Factor fijo bajo semanalmente
            is_mty: true,                // Bandera especial para lógica de código
            rules: [
                "Pago Semanal FIJO: 0.5x por venta (Básico y Plus).",
                "Recálculo Mensual FUERTE: Se paga a 1x/1.5x si se cumple la cuota alta (10/18).",
                "Simples 6 meses: NO comisionan.",
                "Simples 12 meses: $100."
            ]
        },
        "GDL": { 
            name: "Guadalajara (Pacífico - Bajío)", 
            base: 2000, 
            w_quotas: [1.5, 2, 2.5], 
            r_quotas: [8, 10, 12],       // Cuotas de recálculo específicas de GDL
            f_basic: 0.5, f_plus: [1, 1.2, 1.5],
            rules: [
                "Similares a CDMX pero con cuotas de recálculo ligeramente mayores (8/10/12).",
                "Recálculo paga remanente a fin de mes."
            ]
        },
        "MXL": { 
            name: "Baja Nor (Mexicali / SLRC)", 
            base: 3000,                  // Base más alta
            w_quotas: [1.5, 2, 2.5], 
            r_quotas: [6, 8, 10], 
            f_basic: 0.5, f_plus: [1, 1.2, 1.5],
            rules: [
                "Sueldo Base más alto ($3,000).",
                "Esquema de factores estándar (0.5x / 1.x).",
                "Pago semanal condicionado a cuota."
            ]
        },
        "ENS": { 
            name: "Baja Nor (Ensenada)", 
            base: 3000, 
            w_quotas: [1.5, 2, 2.5], 
            r_quotas: [999, 999, 999],   // 999 indica que NO aplica recálculo (N/A)
            f_basic: 0.5, f_plus: [0.5, 0.5, 0.5],
            rules: [
                "SIN Recálculo Mensual.",
                "Pago plano semanal 0.5x.",
                "Sueldo Base $3,000."
            ]
        }
    };
