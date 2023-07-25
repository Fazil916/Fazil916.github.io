document.getElementById('place').addEventListener('click', function () {
  // Get the current room data
  var roomData = JSON.parse(localStorage.getItem(currentRoomName));
  var selectedModel = JSON.parse(localStorage.getItem('selectedModel'));
  // Get the room dimensions and illumination
  var length = roomData.length;
  var width = roomData.width;
  var illumination = roomData.illumination;
  var modelLumen = selectedModel.lumen;




});
