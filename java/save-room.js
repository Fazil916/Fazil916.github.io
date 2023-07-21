function createRoomElement(roomName, length, width, height) {
  // Store data in an object
  var roomData = {
    name: roomName,
    length: length,
    width: width,
    height: height
  };

  // Save object to local storage
  localStorage.setItem(roomName, JSON.stringify(roomData));

  // Create new element for the saved room
  var roomElement = document.createElement('div');
  roomElement.textContent = roomName;
  roomElement.className = 'saved-room'; // For styling purposes
  roomElement.id = roomName; // To uniquely identify the element

  // Append the new element to a designated area
  document.getElementById('saved-rooms').appendChild(roomElement);

  // Add an event listener to each room element for editing
  // Add an event listener to each room element for editing
  roomElement.addEventListener('click', function () {
    // Open modal for editing
    document.getElementById('modal').style.display = "flex";
    document.getElementById('edit-room-name').value = roomElement.textContent; // use roomElement.textContent instead of roomName
    document.getElementById('edit-room-length').value = length;
    document.getElementById('edit-room-width').value = width;
    document.getElementById('edit-room-height').value = height;

    // Set an event listener for the 'edit-room' button inside the modal
    document.getElementById('edit-room').addEventListener('click', function () {
      // Retrieve values
      var newRoomName = document.getElementById('edit-room-name').value;
      var newLength = document.getElementById('edit-room-length').value;
      var newWidth = document.getElementById('edit-room-width').value;
      var newHeight = document.getElementById('edit-room-height').value;

      // Create new room data object
      var newRoomData = {
        name: newRoomName,
        length: newLength,
        width: newWidth,
        height: newHeight
      };

      // Remove old room data from local storage
      localStorage.removeItem(roomName);

      // Save new room data to local storage
      localStorage.setItem(newRoomName, JSON.stringify(newRoomData));

      // Update room element
      roomElement.textContent = newRoomName;
      roomElement.id = newRoomName;

      // Close the modal
      document.getElementById('modal').style.display = "none";
    }, { once: true }); // The {once: true} option ensures the event will only fire once per click
  });

  // Create camera icon for each saved room
  var cameraIcon = document.createElement('img'); // Create an image for the camera icon
  cameraIcon.src = '/styles/image/camico.png';
  cameraIcon.style.width = '24px';
  cameraIcon.style.height = '24px';
  cameraIcon.id = 'cameraIcon' + roomName; // Make sure the id is unique
  cameraIcon.style.display = 'none'; // Make the icon initially hidden


  // Create camera input field
  var cameraInput = document.createElement('input');
  cameraInput.type = 'file';
  cameraInput.accept = 'image/*';
  cameraInput.capture = 'camera';
  cameraInput.id = 'cameraInput' + roomName;
  cameraInput.style.display = 'none';

  // Append the camera input field to the room element
  roomElement.appendChild(cameraInput);

  // Update the event listener to use the new input field
  cameraIcon.addEventListener('click', function () {
    cameraInput.click();
  });

  roomElement.appendChild(cameraIcon);

  // Append the new element to a designated area
  document.getElementById('saved-rooms').appendChild(roomElement);
  cameraIcon.style.display = 'block';

  // Create delete icon for each saved room
  var deleteIcon = document.createElement('img'); // Create an image for the delete icon
  deleteIcon.src = '/styles/image/deleteico.png'; // Replace with your delete icon source
  deleteIcon.style.width = '24px';
  deleteIcon.style.height = '24px';
  deleteIcon.id = 'deleteIcon' + roomName; // Make sure the id is unique
  deleteIcon.style.display = 'none'; // Make the icon initially hidden

  // Append the delete icon to the room element
  roomElement.appendChild(deleteIcon);

  // Add event listener for the delete icon
  deleteIcon.addEventListener('click', function () {
    // Delete room data from local storage
    localStorage.removeItem(roomName);
    localStorage.removeItem(roomName + '_luminaires');

    // Remove the room element from the document
    document.getElementById('saved-rooms').removeChild(roomElement);
  });

  deleteIcon.style.display = 'block';
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
