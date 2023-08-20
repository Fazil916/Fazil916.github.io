let projectType, projectSubType;

document.getElementById('project').addEventListener('change', function () {
  projectType = this.value;
  maybeCreateRooms();
});

document.getElementById('project-subtype').addEventListener('change', function () {
  projectSubType = this.value;
  maybeCreateRooms();
});

function maybeCreateRooms() {
  if (!projectType || !projectSubType) return; // If one of the selections is missing, do nothing.

  const roomConfig = {
    'Apartment': {
      'Studio': ["Kitchen Area", "Bed Area", "Bathroom"],
      '1BHK': ["Kitchen", "Bedroom", "Hall", "Bathroom"],
      '2BHK': ["Kitchen", "Hall", "Guest Bathroom", "Master Bedroom", "Master Bathroom", "Bedroom"],
      // Add other subtypes here
    },
    'Villa': {
      '2BHK': ["Kitchen", "Hall", "Guest Bathroom", "Master Bedroom", "Master Bathroom", "Bedroom"],

    },
    'Office': {
      'Micro Office': ["Entrance", "Workspace", "Manager Room"],
      'Small Office': ["Entrance", "Workspace", "Manager Room"],
      'One Floor': ["Entrance", "Workspace", "Manager Room"],

    },
  };

  let roomNames = roomConfig[projectType] ? roomConfig[projectType][projectSubType] || [] : [];

  roomNames.forEach(function (roomName) {

    var roomData = {
      roomName: roomName,

    };

    // Retrieve existing room data array from local storage (or create an empty array if it doesn't exist)
    var roomDataArray = JSON.parse(localStorage.getItem('rooms')) || [];

    // Add new room data to the array
    roomDataArray.push(roomData);

    // Save the updated room data array back to local storage
    localStorage.setItem('rooms', JSON.stringify(roomDataArray));

    createRoomElement(roomName);
  });

  function createRoomElement(roomName) {
    // Create new room data object
    var roomData = {
      name: roomName,

    };

    // Retrieve existing room data array from local storage (or create an empty array if it doesn't exist)
    var roomDataArray = JSON.parse(localStorage.getItem('rooms')) || [];

    // Add new room data to the array
    roomDataArray.push(roomData);

    // Save the updated room data array back to local storage
    localStorage.setItem('rooms', JSON.stringify(roomDataArray));


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
      var roomDataArray = JSON.parse(localStorage.getItem('rooms'));
      var roomData = roomDataArray.find(room => room.roomName === roomName);

      // Set the value of the input field with the roomName
      document.getElementById('edit-room-name').value = roomName;

    });
    // Append new room element to saved rooms
    document.getElementById('saved-rooms').appendChild(roomElement);

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

    // Event listener for the 'save-room' button
    document.getElementById('save-room').addEventListener('click', function () {
      // Close edit room modal
      document.getElementById('modal').style.display = 'none';

    });
  }
}