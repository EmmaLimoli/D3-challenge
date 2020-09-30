// create a responsive, animated scatter plot
// scatter plot has two data variables to compare such as Smover vs. Age
// use d3 technicque to rep each state with circle element
// pull in data from data.csv by using d3.csv
// include state abs in circle, create axes and labels for bottom and left of chart
// run in python server
// study the relationship between high obesity and smoking
// @TODO: YOUR CODE HERE!

var svgWidth = 960;
var svgHeight = 500;

var margin = {
    top: 20,
    right: 40,
    bottom: 60,
    left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

var svg = d3.select(".chart")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`)

d3.csv("assets/data/data.csv").then(function(stateData) {
    stateData.forEach(function(data) {
        data.obesity = +data.obesity;
        data.smokes = +data.smokes;
    });

    var xLinearScale = d3.scaleLinear()
        .domain([20, d3.max(stateData, d => d.obesity)])
        .range([0, width]);
    
    var yLinearScale = d3.scaleLinear()
        .domain([0, d3.max(stateData, d => d.smokes)])
        .range([height, 0]);

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
    .attr("cx", d => xLinearScale(d.obesity))
    .attr("cy", d => yLinearScale(d.smokes))
    .attr("r", "15")
    .attr("fill", "pink")
    .attr("opacity", ".5");

    var toolTip = d3.tip()
        .attr("class", "tooltip")
        .offset([80, -60])
        .html(function(d) {
            return(`${d.abb}`)
        });

    chartGroup.call(toolTip);

    circlesGroup.on("click", function(data) {
        toolTip.hide(data, this);
    })
        .on("mouseout", function(data, index) {
            toolTip.hide(data);
        });
    chartGroup.append("text")
        .attr("transform", "rotate(-90")
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

