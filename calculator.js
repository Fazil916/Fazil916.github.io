document.addEventListener('DOMContentLoaded', (event) => {
  const calculateButton = document.getElementById('calculate');

  calculateButton.addEventListener('click', () => {
    // Get input values
    const length = parseFloat(document.getElementById('length').value);
    const width = parseFloat(document.getElementById('width').value);
    const height = parseFloat(document.getElementById('height').value);
    const requiredLuxLevel = parseFloat(document.getElementById('required-lux-level').value);
    const luminaireLumen = parseFloat(document.getElementById('luminaire-lumen').value);
    const luminaireWattage = parseFloat(document.getElementById('luminaire-wattage').value);

    // Perform calculations
    let totalRequiredLuminaires = (length * width * requiredLuxLevel) / luminaireLumen;
    totalRequiredLuminaires = Math.round(totalRequiredLuminaires);
    const totalConsumption = totalRequiredLuminaires * luminaireWattage;
    const lumenPerSqm = (totalRequiredLuminaires * luminaireLumen) / (length * width);

    // Store input values and results in localStorage
    localStorage.setItem('length', length);
    localStorage.setItem('width', width);
    localStorage.setItem('height', height);
    localStorage.setItem('required-lux-level', requiredLuxLevel);
    localStorage.setItem('luminaire-lumen', luminaireLumen);
    localStorage.setItem('luminaire-wattage', luminaireWattage);
    localStorage.setItem('totalRequiredLuminaires', totalRequiredLuminaires);
    localStorage.setItem('totalConsumption', totalConsumption.toFixed(2));
    localStorage.setItem('lumenPerSqm', lumenPerSqm.toFixed(2));

    // Display results
    document.getElementById('total-required-luminaires').textContent = `Total Required Luminaires: ${totalRequiredLuminaires}`;
    document.getElementById('total-consumption').textContent = `Total Consumption: ${totalConsumption.toFixed(2)}`;
    document.getElementById('lumen-per-sqm').textContent = `Lumen per sqm: ${lumenPerSqm.toFixed(2)}`;
  });

  const reportButton = document.getElementById('report');

  reportButton.addEventListener('click', () => {
    window.location.href = "report.html";
  });
});
