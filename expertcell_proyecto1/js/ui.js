function updateGlobals() {
        const r = document.getElementById('regionSelect').value;
        const m = parseInt(document.getElementById('monthSelect').value);
        globalState.region = r;
        globalState.month = m;
        
        const regData = REGION_DB[r];
        
        // Actualizar textos en la interfaz (Base, Nombre región, Cuotas)
        document.querySelectorAll('.disp-region').forEach(el => el.innerText = regData.name);
        document.querySelectorAll('.disp-base').forEach(el => el.innerText = formatMoney(regData.base));
        
        const mIdx = m - 1; // Índice del array (0, 1, 2)
        document.querySelectorAll('.disp-wquota').forEach(el => el.innerText = regData.w_quotas[mIdx]);
        // Si la cuota es > 100 (como en Ensenada 999), mostrar "N/A"
        document.querySelectorAll('.disp-rquota').forEach(el => el.innerText = (regData.r_quotas[0] > 100 ? "N/A" : regData.r_quotas[mIdx]));

        // Llenar dinámicamente la lista de reglas en el Slide 1
        const rulesList = document.getElementById('dynamicRulesList');
        if(rulesList) {
            rulesList.innerHTML = "";
            regData.rules.forEach(rule => {
                let li = document.createElement('li');
                li.innerHTML = rule;
                li.style.marginBottom = "5px";
                rulesList.appendChild(li);
            }