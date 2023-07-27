function createLuminaireTable(roomData, roomReportElement) {
    // Fetch the JSON file based on the brand value
    fetch(`/data/${roomData.brand}.json`)
        .then(response => response.json())
        .then(data => {
            var table = document.createElement('table');
            var thead = document.createElement('thead');
            var tbody = document.createElement('tbody');

            // Create table headers
            var headers = ['Name', 'Lumen', 'Power', 'Beam', 'ColorTemp', 'Cri'];
            var tr = document.createElement('tr');
            headers.forEach(header => {
                var th = document.createElement('th');
                th.textContent = header;
                tr.appendChild(th);
            });
            thead.appendChild(tr);
            table.appendChild(thead);

            // Create table body
            data.models.forEach(model => {
                // Check if the model name matches the selected model in the room data
                if (model.name === roomData.model.name) {
                    var tr = document.createElement('tr');
                    headers.forEach(header => {
                        var td = document.createElement('td');
                        td.textContent = model[header.toLowerCase()];
                        tr.appendChild(td);
                    });
                    tbody.appendChild(tr);

                    // Add brand picture to the table
                    var brandPicTr = document.createElement('tr');
                    var brandPicTd = document.createElement('td');
                    var brandPic = document.createElement('img');
                    brandPic.src = model.modelPic;
                    brandPic.alt = `${roomData.brand} logo`;
                    brandPicTd.colSpan = headers.length; // To span the image across all columns
                    brandPicTd.appendChild(brandPic);
                    brandPicTr.appendChild(brandPicTd);
                    tbody.appendChild(brandPicTr);
                }
            });
            table.appendChild(tbody);

            // Append the table to the room report element
            roomReportElement.appendChild(table);
        });
}

document.addEventListener('DOMContentLoaded', function () {
    // Get all keys from local storage
    var keys = Object.keys(localStorage);

    // Get the room report template and container
    var template = document.getElementById('room-report-template');
    var container = document.getElementById('room-reports-container');

    // Loop through all keys
    for (var i = 0; i < keys.length; i++) {
        // Check if the key is a room name
        if (keys[i].startsWith('Room')) {
            // Get room data from local storage
            var roomData = JSON.parse(localStorage.getItem(keys[i]));

            // Clone the template
            var clone = template.cloneNode(true);
            clone.style.display = 'block'; // Make it visible

            // Populate the data
            clone.querySelector('.room-name').textContent = roomData.name;
            clone.querySelector('.room-length').textContent = roomData.length;
            clone.querySelector('.room-width').textContent = roomData.width;
            // Populate other data...

            // Append the clone to the container
            container.appendChild(clone);

            // Create the luminaire table for this room
            createLuminaireTable(roomData, clone);
        }
    }
});
