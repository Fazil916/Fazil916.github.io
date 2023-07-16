// Event listener for the 'save-room' button
document.getElementById('save-room').addEventListener('click', function() {
  // Retrieve values
  var roomName = document.getElementById('room').value;
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

  // Create new element for the saved room
  var roomElement = document.createElement('div');
  roomElement.textContent = roomName;
  roomElement.className = 'saved-room'; // For styling purposes
  roomElement.id = roomName; // To uniquely identify the element

  // Append the new element to a designated area
  document.getElementById('saved-rooms').appendChild(roomElement);
});

// Event delegation for the 'saved-room' elements
document.getElementById('saved-rooms').addEventListener('click', function(e) {
  if (e.target && e.target.classList.contains('saved-room')) {
    // Retrieve room data
    var roomName = e.target.id;
    var roomData = JSON.parse(localStorage.getItem(roomName));

    // Repopulate input fields or recalculate as necessary
    document.getElementById('room').value = roomName;
    document.getElementById('length').value = roomData.length;
    document.getElementById('width').value = roomData.width;
    document.getElementById('row').textContent = roomData.rows;
    document.getElementById('column').textContent = roomData.cols;
    document.getElementById('illumination').value = roomData.illumination;

    // Call the function to create the room
    createRoom(roomData.length, roomData.width, roomData.rows, roomData.cols);
  }
});