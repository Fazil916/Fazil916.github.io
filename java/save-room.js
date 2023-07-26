var currentRoomName = ""; // store the current room name globally

document.addEventListener('DOMContentLoaded', function () {
  // Adding Room
  let roomCounter = 1;

  document.getElementById('save-room').addEventListener('click', function () {
    // Default room parameters
    var roomName = "Room " + roomCounter;
    var length = 5.0;
    var width = 5.0;
    var height = 3.0;
    var illumination = 150;
    var selectedBrand = "";
    var selectedModel = "";
    var modelPower = 23;
    var modelLumen = 1343;
    var modelBeam = 50;
    var modelColortemp = 3000;
    var modelCri = 80;
    var row = 'x';
    var column = 'y';


    // Increment the room counter for next time
    roomCounter++;

    createRoomElement(roomName, length, width, height, illumination, selectedBrand, selectedModel, modelPower, modelLumen, modelBeam, modelColortemp, modelCri, row, column);
  });

  function createRoomElement(roomName, length, width, height, illumination, selectedBrand, selectedModel, modelPower, modelLumen, modelBeam, modelColortemp, modelCri, row, column) {
    // Create new room data object
    var roomData = {
      name: roomName,
      length: length,
      width: width,
      height: height,
      illumination: illumination,
      brand: selectedBrand,
      model: selectedModel,
      power: modelPower,
      lumen: modelLumen,
      beam: modelBeam,
      colortemp: modelColortemp,
      cri: modelCri,
      row: row,
      column: column
    };

    // Save room data object to local storage
    localStorage.setItem(roomName, JSON.stringify(roomData));

    // Create new room element
    var roomElement = document.createElement('div');
    roomElement.textContent = roomName;
    roomElement.className = 'saved-room';
    roomElement.id = "room-" + roomName;

    // Attach event listener to room element
    roomElement.addEventListener('click', function () {
      var roomName = this.innerText.trim(); // get room name from the room element
      currentRoomName = roomName; // update the global room name
      // Open edit room modal
      document.getElementById('modal').style.display = 'flex';
      // Load current room data into modal
      var roomData = JSON.parse(localStorage.getItem(roomName));
      if (roomData) { // Check if roomData is not null
        document.getElementById('edit-room-name').value = roomData.name;
        document.getElementById('edit-room-length').value = roomData.length;
        document.getElementById('edit-room-width').value = roomData.width;
        document.getElementById('edit-room-height').value = roomData.height;
        document.getElementById('illumination').value = roomData.illumination;
        document.getElementById('row').value = roomData.row;
        document.getElementById('column').value = roomData.column;

      }
    });
    // Append new room element to saved rooms
    document.getElementById('saved-rooms').appendChild(roomElement);
  }

  // Event listener for the 'edit-room' button
  document.getElementById('place').addEventListener('click', function () {
    var selectedBrand = localStorage.getItem('selectedBrand');
    var selectedModel = JSON.parse(localStorage.getItem('selectedModel'));
    // Get room dimensions and illumination from input fields
    var length = document.getElementById('edit-room-length').value;
    var width = document.getElementById('edit-room-width').value;
    var illumination = document.getElementById('illumination').value;

    // Calculate required luminaire
    var requiredLuminaire = Math.ceil((length * width * illumination) / selectedModel.lumen);

    // Calculate x and y (row and column)
    var x = Math.ceil(Math.sqrt(requiredLuminaire));
    var y = Math.ceil(requiredLuminaire / x);

    // Save edited room data to local storage
    var newRoomData = {
      name: document.getElementById('edit-room-name').value,
      length: length,
      width: width,
      height: document.getElementById('edit-room-height').value,
      illumination: illumination,
      brand: selectedBrand,
      model: selectedModel,
      requiredLuminaire: requiredLuminaire,
      row: x,
      column: y
    };


    // Save the new room data to local storage
    localStorage.setItem(newRoomData.name, JSON.stringify(newRoomData));

    // Check if the room name has been changed
    if (newRoomData.name !== currentRoomName) {
      // If yes, remove the old room data from local storage
      localStorage.removeItem(currentRoomName);

      // Update the room element
      var roomElement = document.getElementById("room-" + currentRoomName);
      if (roomElement) {
        roomElement.id = "room-" + newRoomData.name;
        roomElement.textContent = newRoomData.name;
      }

      // Update the global room name
      currentRoomName = newRoomData.name;
    }

    // Save the new room data to local storage
    localStorage.setItem(newRoomData.name, JSON.stringify(newRoomData));

  });

  // Event listener for the 'delete-room' button
  document.getElementById('delete-room').addEventListener('click', function () {
    // Get new room name from the input field
    var newRoomName = document.getElementById('edit-room-name').value;

    // Delete room data from local storage
    localStorage.removeItem(newRoomName);

    // Remove the room element from the document
    var roomElement = document.getElementById("room-" + newRoomName);
    if (roomElement) { // Check if roomElement is not null
      roomElement.parentNode.removeChild(roomElement);
    }

    // Close edit room modal
    document.getElementById('modal').style.display = 'none';
  });


  // Event listener for the custom 'Upload Image' button
  document.getElementById('custom-button').addEventListener('click', function () {
    document.getElementById('cameraInput').click();
  });

  // Event listener for the 'cameraInput' onchange
  document.getElementById('cameraInput').addEventListener('change', function (event) {
    // This will be triggered when user takes a photo
    var file = event.target.files[0]; // The taken photo

    if (file) {
      var reader = new FileReader();
      reader.onloadend = function () {
        // Here, reader.result contains the file data as a base64 encoded string
        localStorage.setItem(currentRoomName + '_photo', reader.result);
      }
      reader.readAsDataURL(file);

      // Display the chosen file's name
      document.getElementById('custom-text').innerText = file.name;
    } else {
      // If no file is chosen
      document.getElementById('custom-text').innerText = 'No file chosen, yet.';
    }

  });

  // Call the function from svg.js
  window.createSvg();
});

// Event listener for the 'edit-room' button
document.getElementById('edit-room').addEventListener('click', function () {
  // Close edit room modal
  document.getElementById('modal').style.display = 'none';

});

document.getElementById('calculate').addEventListener('click', function () {
  window.location.href = 'estimator.html';
});
