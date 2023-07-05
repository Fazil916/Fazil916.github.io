// Fetch the data from data/brand.json
fetch('data/brand.json')
  .then(response => response.json())
  .then(data => {
    // Populate the brand dropdown
    const brandDropdown = document.getElementById('luminaire-brand');

    data.brands.forEach(brand => {
      const option = document.createElement('option');
      option.value = brand;
      option.textContent = brand;
      brandDropdown.appendChild(option);
    });

    // Populate the category dropdown
    const categoryDropdown = document.getElementById('luminaire-category');

    data.categories.forEach(category => {
      const option = document.createElement('option');
      option.value = category;
      option.textContent = category;
      categoryDropdown.appendChild(option);
    });

    // Populate the model dropdown
    const modelDropdown = document.getElementById('luminaire-model');

    data.models.forEach(model => {
      const option = document.createElement('option');
      option.value = model;
      option.textContent = model;
      modelDropdown.appendChild(option);
    });
  })
  .catch(error => {
    console.log('Error fetching brand data:', error);
  });
