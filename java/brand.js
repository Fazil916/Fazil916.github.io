document.addEventListener('DOMContentLoaded', function () {
  let dropdownButtonBrand = document.querySelector('.dropdown .dropdown-button');
  let dropdownContentBrand = document.querySelector('#dropdown-content');

  let dropdownButtonModel = document.querySelector('.dropdown + .dropdown .dropdown-button');
  let dropdownContentModel = document.querySelector('#dropdown-model');



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
          dropdownButtonBrand.innerText = this.getAttribute('data-value');
          dropdownButtonBrand.dispatchEvent(new Event('change'));
          dropdownContentBrand.style.display = "none"; // hide dropdown content after selection
        });

        dropdownContentBrand.appendChild(dropdownItem);
      });
    });


  // Populate the model dropdown when a brand is selected
  dropdownButtonBrand.addEventListener('change', function () {
    let brand = this.innerText;
    fetch('data/' + brand + '.json')
      .then(response => response.json())
      .then(data => {
        dropdownContentModel.innerHTML = '';
        data.models.forEach(function (model) {
          let dropdownItem = document.createElement('div');
          dropdownItem.dataset.value = model;
          let textNode = document.createTextNode(model);
          dropdownItem.appendChild(textNode);

          dropdownItem.addEventListener('click', function () {
            dropdownButtonModel.innerText = this.getAttribute('data-value');
            dropdownContentModel.style.display = "none"; // hide dropdown content after selection
          });

          dropdownContentModel.appendChild(dropdownItem);
        });
      })
      .catch(error => console.error('Error:', error));
  });

  // Show or hide brand dropdown on button click
  dropdownButtonBrand.addEventListener('click', function () {
    if (dropdownContentBrand.style.display === "none") {
      dropdownContentBrand.style.display = "block";
    } else {
      dropdownContentBrand.style.display = "none";
    }
  });

  // Show or hide model dropdown on button click
  dropdownButtonModel.addEventListener('click', function () {
    if (dropdownContentModel.style.display === "none") {
      dropdownContentModel.style.display = "block";
    } else {
      dropdownContentModel.style.display = "none";
    }
  });
});
