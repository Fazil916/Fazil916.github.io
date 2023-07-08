var svgContainer = d3.select("#svg-container");

d3.select("#calculate").on("click", function() {
    // Clear any existing SVG
    svgContainer.selectAll("svg").remove();

    // Now append a new SVG
    var svg = svgContainer.append("svg")
        .attr("width", 200)
        .attr("height", 200);

    var length = d3.select("#length").property("value");
    var width = d3.select("#width").property("value");

    // Assume 1m = 50px for this example
    var scaleFactor = 100;

    svg.append("rect")
        .attr("width", length * scaleFactor)
        .attr("height", width * scaleFactor)
        .attr("x", 50)
        .attr("y", 50)
        .attr("fill", "steelblue");

    svg.append("text")
        .attr("x", length * scaleFactor / 2 + 50)
        .attr("y", width * scaleFactor / 2 + 50)
        .text(length + "m x " + width + "m")
        .attr("fill", "white");

    d3.select("#svg-container").style("display", "flex");
});
