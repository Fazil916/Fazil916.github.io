// Get the container to append the SVG to
var svgContainer = d3.select("#svg-container");

// Define the radius of the lights
var lightRadius = 5;

// Event listener for the 'place' button
document.getElementById('place').addEventListener('click', function () {
    // Get the current room data
    var roomData = JSON.parse(localStorage.getItem(currentRoomName));

    // Extract the necessary values
    var length = roomData.length;
    var width = roomData.width;
    var rows = roomData.row;
    var cols = roomData.column;

    // Call the function to create the room
    createRoom(length, width, rows, cols);
});

// Function to create the room
function createRoom(length, width, rows, cols) {
    // Clear previous SVG if any
    svgContainer.selectAll('svg').remove();

    // Calculate the room dimensions based on input
    var svgWidth = length == width ? 300 : (length > width ? 500 : 300);
    var svgHeight = length == width ? 300 : (length > width ? 300 : 500);

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
        .attr("x", d => xScale(d[0] * (length / rows)))
        .attr("y", d => yScale(d[1] * (width / cols)))
        .attr("width", svgWidth / rows)
        .attr("height", svgHeight / cols)
        .attr("stroke", "white")
        .attr("stroke-width", 1)
        .attr("fill", "none");

    var luminaires = [];

    // Place lights in the center of each grid cell
    var lights = svg.selectAll(".light")
        .data(d3.cross(d3.range(rows), d3.range(cols)))
        .join("circle")
        .attr("class", "light")
        .attr("cx", d => {
            var cx = (d[0] + 0.5) * (length / rows);
            luminaires.push({ x: cx });
            return xScale(cx);
        })
        .attr("cy", d => {
            var cy = (d[1] + 0.5) * (width / cols);
            luminaires[luminaires.length - 1].y = cy;
            return yScale(cy);
        })
        .attr("r", lightRadius)
        .attr("fill", "red");

    // Add dimension text outside the SVG
    d3.select("#length").text(`Length: ${length} m`);
    d3.select("#width").text(`Width: ${width} m`);

    return luminaires;
}

// Event listener for the 'place' button
document.getElementById('place').addEventListener('click', function () {
    // Get the current room data
    var roomData = JSON.parse(localStorage.getItem(currentRoomName));

    // Extract the necessary values
    var length = roomData.length;
    var width = roomData.width;
    var rows = roomData.row;
    var cols = roomData.column;

    // Call the function to create the room
    createRoom(length, width, rows, cols);
});