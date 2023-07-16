// Retrieve the data from localStorage
var originalDimensions = JSON.parse(localStorage.getItem('originalDimensions'));

// Calculate the new dimensions
var reportWidth = originalDimensions.width;
var reportHeight = originalDimensions.height;

// Create a new SVG with the report dimensions
var svg = d3.select("#svg-container")
  .append("svg")
  .attr("width", '100%')
  .attr("height", '100%')
  .attr("viewBox", `0 0 ${reportWidth} ${reportHeight}`);

// Add the lights to the SVG, scaling their positions by the same factor as the SVG
lights.forEach(function (light) {
  svg.append("circle")
    .attr("cx", light.cx * 2)
    .attr("cy", light.cy * 2)
    .attr("r", light.r)
    .attr("fill", "red");
});
