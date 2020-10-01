// create a responsive, animated scatter plot
// scatter plot has two data variables to compare such as Smover vs. Age
// use d3 technicque to rep each state with circle element
// pull in data from data.csv by using d3.csv
// include state abs in circle, create axes and labels for bottom and left of chart
// run in python server
// study the relationship between high obesity and smoking
// @TODO: YOUR CODE HERE!

//create variables for svg
var svgWidth = 960;
var svgHeight = 500;

// create a margin
var margin = {
    top: 20,
    right: 40,
    bottom: 80,
    left: 100
};

// create width and height
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// create svg, use scatter not chart
var svg = d3
    .select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

// create chartGroup, use svg.append "g" and translate
var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`)

// create a filepath to data.csv using d3.csv, use then function
d3.csv("assets/data/data.csv").then(function(stateData) {
    console.log(stateData);
        // forEach loop, +measurement data
        stateData.forEach(function(data) {
            data.obesity = +data.obesity;
            data.smokes = +data.smokes;
            // add age
        });
        // xLinearScale variable
        var xLinearScale = d3.scaleLinear()
            .domain([8, d3.max(stateData, d => d.smokes)])
            .range([0, width]);
        // yLinearScale variable
        var yLinearScale = d3.scaleLinear()
            .domain([0, d3.max(stateData, d => d.obesity)])
            .range([height, 0]);
        // bottom and left axis
        var bottomAxis = d3.axisBottom(xLinearScale);
        var leftAxis = d3.axisLeft(yLinearScale);

        chartGroup.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(bottomAxis);

        chartGroup.append("g")
            .call(leftAxis);
    
        var circlesGroup = chartGroup.selectAll("circle")
        .data(stateData)
        .enter()
        .append("circle")

        .attr("cx", d => xLinearScale(d.smokes))
        .attr("cy", d => yLinearScale(d.obesity))
        
        .attr("r", "10")
        .attr("fill", "blue")
        .attr("opacity", ".5")
        // .classed("stateCircle", true);

        // use data.abb to bring up state abb, insert d3 tip url into index.html
        var toolTip = d3
            .tip()
            .attr("class", "tooltip")
            .offset([80, -60])
            .html(function(data) {
                return(`<br>State Abbr: ${data.abbr}</br>`)
            });

        chartGroup.call(toolTip);

        circlesGroup.on("mouseover", function(data) {
        toolTip.show(data);
        })
            .on("mouseout", function(data, index) {
                toolTip.hide(data);
            });
        
        chartGroup.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left + 40)
            .attr("x", 0 - (height / 2))
            .attr("dy", "1em")
            .attr("class", "axisText")
            .text("Obesity in Percentage");

        chartGroup.append("text")
            .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
            .attr("class", "axisText")
            .text("Smoking in Percentage");
    }).catch(function(error) {
        console.log(error);
    });

