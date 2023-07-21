document.getElementById('arrangment').addEventListener('click', function () {
  var length = parseFloat(document.getElementById('edit-room-length').value);
  var width = parseFloat(document.getElementById('edit-room-width').value);
  var illumination = parseFloat(document.getElementById('illumination').value);
  var modelSelect = document.getElementById('model-select'); // select element for model
  var selectedModel = modelSelect.options[modelSelect.selectedIndex].value; // selected model

  // Fetch the JSON file and get the modelLumen for the selected model
  // Replace 'path_to_json_file' with the actual path to your JSON file
  fetch('path_to_json_file')
    .then(response => response.json())
    .then(data => {
      var modelLumen = data[selectedModel].lumen; // assuming each model has a 'lumen' property

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
});
