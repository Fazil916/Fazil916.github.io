document.getElementById('custom-button').addEventListener('click', function () {
    // Start camera preview
    let videoElement = document.getElementById('camera-preview');
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
            videoElement.srcObject = stream;
            videoElement.style.display = 'block';
            videoElement.play();
        })
        .catch(error => console.error('Error accessing camera:', error));

    // Fetch comments from a JSON file
    fetch('data/comments.json')
        .then(response => response.json())
        .then(comments => {
            let commentsList = document.getElementById('comments-list');
            commentsList.innerHTML = ''; // Clear previous comments

            // Append comments to the list
            comments.forEach(comment => {
                let listItem = document.createElement('li');
                listItem.textContent = comment.text;
                commentsList.appendChild(listItem);
            });

            // Show the comments popup
            document.getElementById('comments-popup').style.display = 'block';
        });
});

function closePopup() {
    // Stop the camera preview
    let videoElement = document.getElementById('camera-preview');
    let stream = videoElement.srcObject;
    if (stream) {
        let tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
    }
    videoElement.style.display = 'none';

    // Hide the comments popup
    document.getElementById('comments-popup').style.display = 'none';
}
