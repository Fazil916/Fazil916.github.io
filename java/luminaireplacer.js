document.getElementById('arrangment').addEventListener('click', function () {
  var length = parseFloat(document.getElementById('edit-room-length').value);
  var width = parseFloat(document.getElementById('edit-room-width').value);
  var illumination = parseFloat(document.getElementById('illumination').value);

  // fetch the model from the dropdown button
  var dropdownButtonModel = document.querySelector('.dropdown-model .dropdown-button');
  var selectedModel = JSON.parse(dropdownButtonModel.dataset.value); // get the selected model as an object

  // Model lumen is directly accessible from the selected model
  var modelLumen = selectedModel.lumen;

  // Check if the inputs are too large
  if (length > 2000 || width > 2000 || illumination > 10000) {
    alert("The input values are too large. Please enter smaller values.");
    return;
  }

  // Calculate required luminaire
  var requiredLuminaire = Math.ceil((length * width * illumination) / modelLumen);
  // Calculate x and y (row and column)
  var x = Math.ceil(Math.sqrt(requiredLuminaire));
  var y = Math.ceil(requiredLuminaire / x);

  // Store in input fields
  document.getElementById('row').textContent = x;
  document.getElementById('column').textContent = y;

  // Store the input values in localStorage
  localStorage.setItem('Length', length);
  localStorage.setItem('Width', width);
  localStorage.setItem('Row', x);
  localStorage.setItem('Column', y);
});
