document.addEventListener('DOMContentLoaded', function () {
  let dropdownButton = document.querySelector('.dropdown .dropdown-button');
  let dropdownContentBrand = document.querySelector('.dropdown .dropdown-content-brand');
  let dropdownContentModel = document.querySelector('.dropdown .dropdown-content-model');

  // Populate the brand dropdown
  fetch('data/brand.json')
    .then(response => response.json())
    .then(data => {
      data.forEach(item => {
        let dropdownItem = document.createElement('div');
        dropdownItem.dataset.value = item.brand;

        let img = document.createElement('img');
        img.src = item.logo;
        img.alt = item.brand;
        dropdownItem.appendChild(img);

        let textNode = document.createTextNode(` ${item.brand}`);
        dropdownItem.appendChild(textNode);

        dropdownItem.addEventListener('click', function () {
          dropdownButton.innerText = this.getAttribute('data-value');
          dropdownButton.dispatchEvent(new Event('change'));
          dropdownContentBrand.style.display = "none"; // hide dropdown content after selection
        });

        dropdownContentBrand.appendChild(dropdownItem);
      });
    });

  // Populate the model dropdown when a brand is selected
  dropdownButton.addEventListener('change', function () {
    let brand = this.innerText;
    fetch('data/' + brand + '.json')
      .then(response => response.json())
      .then(data => {
        dropdownContentModel.innerHTML = '';
        data.models.forEach(function (model) {
          let dropdownItem = document.createElement('div');
          dropdownItem.dataset.value = JSON.stringify(model); // store the model object as a string

          let combinedName = brand + " / " + model.name;
          let textNode = document.createTextNode(combinedName); // combine brand and model for display
          dropdownItem.appendChild(textNode);

          dropdownItem.addEventListener('click', function () {
            dropdownButton.innerText = combinedName; // set the button's text to the combined brand and model
            dropdownButton.dataset.value = JSON.stringify(model); // store the model object as a string
            dropdownContentModel.style.display = "none"; // hide dropdown content after selection
          });

          dropdownContentModel.appendChild(dropdownItem);
        });
      })
      .catch(error => console.error('Error:', error));
  });

  // Show or hide dropdown on button click
  dropdownButton.addEventListener('click', function () {
    if (dropdownContentBrand.style.display === "none") {
      dropdownContentBrand.style.display = "block";
      dropdownContentModel.style.display = "none"; // Always hide model dropdown
    } else {
      dropdownContentBrand.style.display = "none";
    }
  });

  // Show model dropdown only after a brand is selected
  dropdownButton.addEventListener('change', function () {
    if (dropdownContentModel.style.display === "none") {
      dropdownContentModel.style.display = "block";
      dropdownContentBrand.style.display = "none"; // Always hide brand dropdown
    } else {
      dropdownContentModel.style.display = "none";
    }
  });

});
