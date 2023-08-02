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

            console.log(roomData); // Debug statement

            // Calculate the illuminance for the room
            var illuminance = calculateIlluminance(roomData);

            // Clone the template
            var clone = template.cloneNode(true);
            clone.style.display = 'block'; // Make it visible

            // Populate the data
            clone.querySelector('.room-name').textContent = roomData.name;
            clone.querySelector('.room-length').textContent = roomData.length;
            clone.querySelector('.room-width').textContent = roomData.width;
            clone.querySelector('.room-height').textContent = roomData.height;
            clone.querySelector('.calculated-illuminance').textContent = illuminance; // Add the calculated illuminance
            clone.querySelector('.target-illuminance').textContent = roomData.illumination;
            clone.querySelector('.check-illuminance').textContent = illuminance >= roomData.illumination ? '✅' : '❌';
            // Populate other data...

            // Append the clone to the container
            container.appendChild(clone);

            // Create the luminaire table for this room
            createLuminaireTable(roomData, clone);

            // Create the luminaire table for this room
            createLuminaireQuotation(roomData, clone);
        }

        function createLuminaireTable(roomData, roomReportElement) {
            // Fetch the JSON file based on the brand value
            fetch(`/data/${roomData.brand}.json`)
                .then(response => response.json())
                .then(data => {
                    var table = document.createElement('table');
                    table.className = "luminaire-table"; // Add a class to the table
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

                    // Append the table to the luminaire table container
                    var tableContainer = roomReportElement.querySelector("#luminaire-table-container");
                    tableContainer.appendChild(table);
                });
        }
        function calculateIlluminance(roomData) {
            // Get grid size from room data
            var gridSize = roomData.row * roomData.column;
            console.log(gridSize);

            // Create a grid based on the grid size
            var grid = [];
            for (var i = 0; i < roomData.row; i++) {
                grid[i] = [];
                for (var j = 0; j < roomData.column; j++) {
                    // Calculate the distance from this grid point to each luminaire
                    var distances = roomData.luminaires.map(function (luminaire) {
                        var dx = luminaire.x - i;
                        var dy = luminaire.y - j;
                        return Math.sqrt(dx * dx + dy * dy);
                    });

                    // Calculate the illuminance at this grid point from each luminaire
                    var illuminances = distances.map(function (distance, index) {
                        return roomData.luminaires[index].lumen / (4 * Math.PI * distance * distance);
                    });

                    // Sum the illuminances to get the total illuminance at this grid point
                    grid[i][j] = illuminances.reduce(function (a, b) { return a + b; }, 0);
                }
            }

            // Calculate the average illuminance
            var totalIlluminance = 0;
            for (var i = 0; i < roomData.row; i++) {
                for (var j = 0; j < roomData.column; j++) {
                    totalIlluminance += grid[i][j];
                }
            }
            var averageIlluminance = Math.floor(totalIlluminance / gridSize);

            return averageIlluminance;
        }

        function createLuminaireQuotation(roomData) {
            var table = document.querySelector("#quotations-container > table");

            // Create a new row
            var tr = document.createElement('tr');

            // Add cells for sl no, model, description, image, quantity, and price
            var tdSlNo = document.createElement('td');
            tdSlNo.textContent = 1;  // Only one model
            tr.appendChild(tdSlNo);

            var tdModel = document.createElement('td');
            tdModel.textContent = roomData.model.name;
            tr.appendChild(tdModel);

            var tdDescription = document.createElement('td');
            tdDescription.textContent = `Lumen: ${roomData.model.lumen}, Power: ${roomData.model.power}, Beam: ${roomData.model.beam}`;
            tr.appendChild(tdDescription);

            var tdImage = document.createElement('td');
            var img = document.createElement('img');
            img.src = roomData.model.modelPic;
            img.alt = roomData.model.name + ' image';
            img.className = 'quotations-image';  // set CSS class
            tdImage.appendChild(img);
            tr.appendChild(tdImage);

            var tdQuantity = document.createElement('td');
            tdQuantity.textContent = roomData.requiredLuminaire; // replace with the appropriate field
            tr.appendChild(tdQuantity);

            var tdPrice = document.createElement('td');
            var priceInput = document.createElement('input');
            priceInput.type = 'number';
            priceInput.value = roomData.model.price || 0;  // set default value if price is already set
            priceInput.className = 'price-input';
            priceInput.addEventListener('click', handlePriceClick);
            tdPrice.appendChild(priceInput);
            tr.appendChild(tdPrice);
            
            function handlePriceClick(event) {
                var unitPrice = prompt("Enter the unit price:");
                if (unitPrice) {
                    var totalPrice = unitPrice * roomData.model.tdQuantity;
                    event.target.value = totalPrice;
                }
            }
            
            // Add the row to the table
            table.appendChild(tr);

        }
    }
            
});
