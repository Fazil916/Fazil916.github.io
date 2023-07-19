document.getElementById('cameraIcon').addEventListener('click', function() {
    document.getElementById('cameraInput').click();
});

// Initialize Dexie.js and create a new database
var db = new Dexie('ImageDB');
db.version(1).stores({images: ''});

document.getElementById('cameraIcon').addEventListener('click', function() {
    document.getElementById('cameraInput').click();
});

// When a new file is selected...
document.getElementById('cameraInput').addEventListener('change', function (event) {
    // Use a FileReader to read the file data
    var reader = new FileReader();
    reader.onload = function () {
        var data = reader.result;
        // Use Dexie.js to store the data in IndexedDB
        db.images.put({id: "image" + roomName, image: data}).then(function(){
            console.log("Image stored successfully!");
        }).catch(function(error) {
            console.error("Error storing image: ", error);
        });
    };
    reader.readAsDataURL(event.target.files[0]);
});


