document.getElementById('custom-button').addEventListener('click', function() {
    // Fetching comments from a JSON file
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

            // Show the popup
            document.getElementById('comments-popup').style.display = 'block';
        });
});

function closePopup() {
    document.getElementById('comments-popup').style.display = 'none';
}
