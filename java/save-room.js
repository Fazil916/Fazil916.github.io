document.addEventListener('DOMContentLoaded', function () {
  var currentRoomName = ""; // store the current room name globally

  function createRoomElement(roomName, length, width, height) {
    // Create new room data object
    var roomData = {
      name: roomName,
      length: length,
      width: width,
      height: height
    };

    // Save room data object to local storage
    localStorage.setItem(roomName, JSON.stringify(roomData));

    // Create new room element
    var roomElement = document.createElement('div');
    roomElement.textContent = roomName;
    roomElement.className = 'saved-room';
    roomElement.id = roomName;

    // Attach event listener to room element
    roomElement.addEventListener('click', function () {
      currentRoomName = roomName; // update the global room name

      // Open edit room modal
      document.getElementById('modal').style.display = 'flex';

      // Load current room data into modal
      var roomData = JSON.parse(localStorage.getItem(roomName));
      document.getElementById('edit-room-name').value = roomData.name;
      document.getElementById('edit-room-length').value = roomData.length;
      document.getElementById('edit-room-width').value = roomData.width;
      document.getElementById('edit-room-height').value = roomData.height;
    });

    // Append new room element to saved rooms
    document.getElementById('saved-rooms').appendChild(roomElement);
  }

  // Event listener for the 'save-room' button
  document.getElementById('save-room').addEventListener('click', function () {
    // Default room parameters
    var roomName = "default";
    var length = 5.0;
    var width = 5.0;
    var height = 3.0;

    createRoomElement(roomName, length, width, height);
  });

  // Event listener for the 'edit-room' button
  document.getElementById('edit-room').addEventListener('click', function () {
    // Save edited room data to local storage
    var newRoomData = {
      name: document.getElementById('edit-room-name').value,
      length: document.getElementById('edit-room-length').value,
      width: document.getElementById('edit-room-width').value,
      height: document.getElementById('edit-room-height').value
    };

    // Remove the old room data from local storage
    localStorage.removeItem(currentRoomName);

    // Save the new room data to local storage
    localStorage.setItem(newRoomData.name, JSON.stringify(newRoomData));

    // Update the room element
    var roomElement = document.getElementById(currentRoomName);
    roomElement.id = newRoomData.name;
    roomElement.textContent = newRoomData.name;

    // Close edit room modal
    document.getElementById('modal').style.display = 'none';

    // Update the global room name
    currentRoomName = newRoomData.name;
  });

  // Event listener for the 'delete-room' button
  document.getElementById('delete-room').addEventListener('click', function () {
    // Delete room data from local storage
    localStorage.removeItem(currentRoomName);

    // Remove the room element from the document
    var roomElement = document.getElementById(currentRoomName);
    roomElement.parentNode.removeChild(roomElement);

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
});
