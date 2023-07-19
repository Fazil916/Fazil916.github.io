// Event listener for the 'save-room' button
document.getElementById('save-room').addEventListener('click', function () {
  // Retrieve values
  var roomName = document.getElementById('room').value || 'Room-' + Date.now();
  var length = parseFloat(localStorage.getItem('Length'));
  var width = parseFloat(localStorage.getItem('Width'));
  var rows = parseInt(localStorage.getItem('Row'));
  var cols = parseInt(localStorage.getItem('Column'));
  var illumination = parseFloat(document.getElementById('illumination').value);

  // Store data in an object
  var roomData = {
    length: length,
    width: width,
    rows: rows,
    cols: cols,
    illumination: illumination
  };

  // Save object to local storage
  localStorage.setItem(roomName, JSON.stringify(roomData));

  // Retrieve and save the luminaire data
  var luminaires = createRoom(length, width, rows, cols);
  localStorage.setItem(roomName + '_luminaires', JSON.stringify(luminaires));

  // Create new element for the saved room
  var roomElement = document.createElement('div');
  roomElement.textContent = roomName;
  roomElement.className = 'saved-room'; // For styling purposes
  roomElement.id = roomName; // To uniquely identify the element

  // Create camera icon for each saved room
  var cameraIcon = document.createElement('img'); // Create an image for the camera icon
  cameraIcon.src = '/styles/image/camico.png';
  cameraIcon.style.width = '24px';
  cameraIcon.style.height = '24px';
  cameraIcon.id = 'cameraIcon' + roomName; // Make sure the id is unique
  cameraIcon.style.display = 'none'; // Make the icon initially hidden


  cameraIcon.addEventListener('click', function () {
    document.getElementById('cameraInput' + roomName).click();
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
});
