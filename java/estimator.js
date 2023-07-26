var svg = d3.select("#svg-container");
document.addEventListener('DOMContentLoaded', function () {
    // Get all keys from local storage
    var keys = Object.keys(localStorage);

    // Loop through all keys
    for (var i = 0; i < keys.length; i++) {
        // Check if the key is a room name
        if (keys[i].startsWith('Room')) {
            // Get room data from local storage
            var roomData = JSON.parse(localStorage.getItem(keys[i]));

            // Create a new div element for the room report
            var div = document.createElement('div');
            div.className = 'room-report';

            // Add room data to the div
            div.innerHTML = `
            <h1>${roomData.name}</h1>
            <table style="border-collapse: collapse; width: 100%;">
              <tr><td style="border: none;">Length:</td><td style="border: none;">${roomData.length}</td></tr>
              <tr><td style="border: none;">Width:</td><td style="border: none;">${roomData.width}</td></tr>
              <tr><td style="border: none;">Height:</td><td style="border: none;">${roomData.height}</td></tr>
              <tr><td style="border: none;">Illumination:</td><td style="border: none;">${roomData.illumination}</td></tr>
              <tr><td style="border: none;">Brand:</td><td style="border: none;">${roomData.brand}</td></tr>
              <tr><td style="border: none;">Model:</td><td style="border: none;">${roomData.model.name}</td></tr>
              <tr><td style="border: none;">Required Luminaire:</td><td style="border: none;">${roomData.requiredLuminaire}</td></tr>
              <tr><td style="border: none;">Row:</td><td style="border: none;">${roomData.row}</td></tr>
              <tr><td style="border: none;">Column:</td><td style="border: none;">${roomData.column}</td></tr>
            </table>
          `;

            // Append the div to the body
            document.body.appendChild(div);
        }
        function createLuminaireTable(roomData) {
            // Fetch the JSON file based on the brand value
            fetch(`/data/${roomData.brand}.json`)
                .then(response => response.json())
                .then(data => {
                    var table = document.createElement('table');
                    var thead = document.createElement('thead');
                    var tbody = document.createElement('tbody');

                    // Create table headers
                    var headers = ['Name', 'Lumen', 'Power', 'Beam', 'Color Temp', 'Cri'];
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

                    // Append the table to the document body or a specific div
                    document.body.appendChild(table);
                });
        }
    }
    // Call the function with the room data
    createLuminaireTable(roomData);


});


