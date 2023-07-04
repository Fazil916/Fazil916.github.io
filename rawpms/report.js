window.onload = function () {
  // Get the elements where we want to insert the values
  const lengthElement = document.getElementById('length');
  const widthElement = document.getElementById('width');
  const heightElement = document.getElementById('height');
  const productDetailsElement = document.getElementById('product-details');
  const luminaireLumenElement = document.getElementById('luminaire-lumen');
  const luminaireWattageElement = document.getElementById('luminaire-wattage');
  const requiredLuxElement = document.getElementById('required-lux');
  const requiredLuxLevelElement = document.getElementById('required-lux-level');
  const totalRequiredLuminairesElement = document.getElementById('total-required-luminaires');
  const totalConsumptionElement = document.getElementById('total-consumption');
  const lumenPerSqmElement = document.getElementById('lumen-per-sqm');

  // Get values from localStorage
  const length = localStorage.getItem('length');
  const width = localStorage.getItem('width');
  const height = localStorage.getItem('height');
  const productDetails = localStorage.getItem('product-details');
  const luminaireLumen = localStorage.getItem('luminaire-lumen');
  const luminaireWattage = localStorage.getItem('luminaire-wattage');
  const requiredLux = localStorage.getItem('required-lux');
  const requiredLuxLevel = localStorage.getItem('required-lux-level');
  const totalRequiredLuminaires = localStorage.getItem('totalRequiredLuminaires');
  const totalConsumption = localStorage.getItem('totalConsumption');
  const lumenPerSqm = localStorage.getItem('lumenPerSqm');

  // Set the values in the HTML elements
  lengthElement.textContent = `Length: ${length}`;
  widthElement.textContent = `Width: ${width}`;
  heightElement.textContent = `Height: ${height}`;
  productDetailsElement.textContent = `Product Details: ${productDetails}`;
  luminaireLumenElement.textContent = `Luminaire Lumen: ${luminaireLumen}`;
  luminaireWattageElement.textContent = `Luminaire Wattage: ${luminaireWattage}`;
  requiredLuxElement.textContent = `Required Lux: ${requiredLux}`;
  requiredLuxLevelElement.textContent = `Required Lux Level: ${requiredLuxLevel}`;
  totalRequiredLuminairesElement.textContent = `Total Required Luminaires: ${totalRequiredLuminaires}`;
  totalConsumptionElement.textContent = `Total Consumption: ${totalConsumption}`;
  lumenPerSqmElement.textContent = `Lumen per sqm: ${lumenPerSqm}`;
}
