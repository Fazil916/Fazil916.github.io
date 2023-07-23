document.getElementById('arrangment').addEventListener('click', function () {
  // Get the current room data
  var roomData = JSON.parse(localStorage.getItem(currentRoomName));
  var selectedModel = JSON.parse(localStorage.getItem('selectedModel'));
  // Get the room dimensions and illumination
  var length = roomData.length;
  var width = roomData.width;
  var illumination = roomData.illumination;
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

  // Store row and column in room data
  roomData.row = x;
  roomData.column = y;

  // Update the room data in localStorage
  localStorage.setItem(currentRoomName, JSON.stringify(roomData));
});