function calcWeekly() {
        const reg = REGION_DB[globalState.region];
        const mIdx = globalState.month - 1;
        let points = 0, commission = 0;
        
        globalState.weekSales.forEach(pid => {
            const p = getPlan(pid);
            // Asignación de puntos para cuota (Base unlock)
            if(p.type === 'BASICO') points += 0.5;
            if(p.type === 'PLUS') points += 1; 
            if(p.type === 'SIMPLE_C') points += 0.5;

            // Determinación del factor de pago según región
            let factor = 0;
            if(reg.is_mty || globalState.region === 'ENS') {
                factor = 0.5; // MTY y ENS pagan 0.5x fijo semanal
            }

function calcMonthly() {
        const reg = REGION_DB[globalState.region];
        const mIdx = globalState.month - 1;
        
        const inputs = ['m_azul1', 'm_azul2', 'm_black', 'm_oro'];
        const ids = ['AZUL1', 'AZUL2', 'BLACK', 'ORO'];
        
        let totalPoints = 0, weeklyPaidComm = 0, recalcTargetComm = 0;

        inputs.forEach((inp, idx) => {
            const qty = parseInt(document.getElementById(inp).value) || 0;
            const p = getPlan(ids[idx]);
            
            if(qty > 0) {
                totalPoints += (qty * (p.type==='BASICO' ? 0.5 : 1));
                
                // 1. Simular cuánto se pagó semanalmente
                let wFactor = 0;
                if(reg.is_mty || globalState.region === 'ENS') wFactor = 0.5;
                else wFactor = (p.type==='BASICO' ? reg.f_basic : reg.f_plus[mIdx]);
                weeklyPaidComm += (qty * p.rent * wFactor);

                // 2. Calcular cuánto se DEBERÍA pagar si se llega a la meta mensual
                if(reg.r_quotas[0] < 100) { 
                    // Si hay recálculo, el target suele ser 1.0x o 1.5x
                    let rFactor = (p.type==='BASICO' ? 1.0 : 1.5);
                    recalcTargetComm += (qty * p.rent * rFactor);
                }

function addSale() {
        const planId = document.getElementById('s3_plan').value;
        const qty = parseInt(document.getElementById('s3_qty').value);
        if(qty > 0) {
            for(let i=0; i<qty; i++) globalState.weekSales.push(planId);
            renderSalesList();
            calcWeekly();
        }

function clearSales() {
        globalState.weekSales = [];
        renderSalesList();
        calcWeekly();
    }

function renderSalesList() {
        const container = document.getElementById('s3_sales_list');
        container.innerHTML = `<table class="data-table"><thead><tr><th>Plan</th><th>Tipo</th><th>Renta</th></tr></thead><tbody></tbody></table>`;
        const tbody = container.querySelector('tbody');
        globalState.weekSales.forEach(pid => {
            const p = getPlan(pid);
            const tr = document.createElement('tr');
            tr.innerHTML = `<td>${p.name}

