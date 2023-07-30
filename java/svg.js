window.createSvg = function () {

    // Get the container to append the SVG to
    var svgContainer = d3.select("#svg-container");

    // Define the radius of the lights
    var lightRadius = 5;

    // Event listener for the 'place' button
    document.getElementById('edit-room').addEventListener('click', function () {
        // Get the current room data
        var roomData = JSON.parse(localStorage.getItem(currentRoomName));
        // Log the room data
        console.log(roomData);

        // Extract the necessary values
        var length = roomData.length;
        var width = roomData.width;
        var rows = roomData.row;
        var cols = roomData.column;

        // Call the function to create the room
        createRoom(length, width, rows, cols, roomData.name, roomData);
    });

    // Function to create the room
    function createRoom(length, width, rows, cols, roomName, roomData) {
        // Clear previous SVG if any
        svgContainer.selectAll('svg').remove();

        // Calculate the room dimensions based on input
        var svgWidth = length == width ? 300 : (length > width ? 350 : 250);
        var svgHeight = length == width ? 300 : (length > width ? 250 : 350);

        // Create scales for x and y
        var xScale = d3.scaleLinear().domain([0, length]).range([0, svgWidth]);
        var yScale = d3.scaleLinear().domain([0, width]).range([0, svgHeight]);

        // Append a new SVG to the container
        var svg = svgContainer.append("svg")
            .attr("width", svgWidth)
            .attr("height", svgHeight);

        // Add outer border to resemble a wall
        svg.append("rect")
            .attr("width", svgWidth)
            .attr("height", svgHeight)
            .attr("x", 0)
            .attr("y", 0)
            .attr("stroke", "black")
            .attr("stroke-width", 2)
            .attr("fill", "none");

        // Add inner border to resemble a wall
        svg.append("rect")
            .attr("width", svgWidth - 8)
            .attr("height", svgHeight - 8)
            .attr("x", 4)
            .attr("y", 4)
            .attr("stroke", "black")
            .attr("stroke-width", 2)
            .attr("fill", "none");

        // Draw the grid
        var grid = svg.selectAll(".grid")
            .data(d3.cross(d3.range(rows), d3.range(cols)))
            .join("rect")
            .attr("class", "grid")
            .attr("x", d => {
                console.log('x:', d[0] * (length / rows));
                return xScale(d[0] * (length / rows));
            })
            .attr("y", d => {
                console.log('y:', d[1] * (width / cols));
                return yScale(d[1] * (width / cols));
            })
            .attr("width", svgWidth / rows)
            .attr("height", svgHeight / cols)
            .attr("stroke", "white")
            .attr("stroke-width", 1)
            .attr("fill", "none");

        // Place lights in the center of each grid cell
        var lights = svg.selectAll(".light")
            .data(d3.cross(d3.range(rows), d3.range(cols)))
            .join("circle")
            .attr("class", "light")
            .attr("cx", d => {
                var cx = (d[0] + 0.5) * (length / rows);
                return xScale(cx);
            })
            .attr("cy", d => {
                var cy = (d[1] + 0.5) * (width / cols);
                return yScale(cy);
            })
            .attr("r", lightRadius)
            .attr("fill", "red");

        console.log(lights); // Add this line

        // Wrap the each function in a new Promise
        new Promise((resolve, reject) => {
            lights.each(function (d, i) {
                // Push a new object to the luminaires array
                roomData.luminaires.push({ x: (d[0] + 0.5) * (length / rows), y: (d[1] + 0.5) * (width / cols), lumen: roomData.model.lumen });
                console.log(roomData.luminaires[i]);
            });

            // Resolve the promise
            resolve();
        }).then(() => {
            // Save the updated room data to local storage
            localStorage.setItem(roomData.name, JSON.stringify(roomData));

            // Add dimension text outside the SVG
            d3.select("#length").text(`Length: ${length} m`);
            d3.select("#width").text(`Width: ${width} m`);

            // Serialize the SVG and store it in localStorage
            var serializer = new XMLSerializer();
            var svgElement = d3.select("#svg-container").node();
            var svgString = serializer.serializeToString(svgElement);
            localStorage.setItem('SVG-' + roomName, svgString);
        });
    }
}
