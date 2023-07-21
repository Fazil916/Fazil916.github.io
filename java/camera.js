// Initialize Dexie.js and create a new database
var db = new Dexie('ImageDB');
db.version(1).stores({ images: '' });

document.addEventListener('click', function (event) {
    if (event.target && event.target.matches('[id^="cameraIcon"]')) {
        var roomName = event.target.id.replace('cameraIcon', ''); // Extract roomName from id
        document.getElementById('cameraInput' + roomName).click();
    }
});

document.addEventListener('change', function (event) {
    if (event.target && event.target.matches('[id^="cameraInput"]')) {
        var roomName = event.target.id.replace('cameraInput', ''); // Extract roomName from id
        handleCameraInput(roomName, event.target);
    }
});

function handleCameraInput(roomName, inputElement) {
    var reader = new FileReader();
    reader.onload = function () {
        var data = reader.result;
        // Use Dexie.js to store the data in IndexedDB
        db.images.put({ id: "image" + roomName, image: data }).then(function () {
            console.log("Image stored successfully!");
        }).catch(function (error) {
            console.error("Error storing image: ", error);
        });
    };
    reader.readAsDataURL(inputElement.files[0]);
}
