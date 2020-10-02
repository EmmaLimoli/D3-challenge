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

// params
var chosenXAxis = "poverty";
var chosenYAxis = "healthcare";


// create function for scales
function xScale(stateData, chosenXAxis) {
 // xLinearScale variable
    var xLinearScale = d3.scaleLinear()
        .domain([d3.min(stateData, d => d[chosenXAxis]) * 0.8,
            d3.max(stateData, d => d[chosenXAxis]) * 1.2    
    ])
        .range([0, width]);

    return xLinearScale;

        // .domain([8, d3.max(stateData, d => d.smokes)])
        // .range([0, width]);
// yLinearScale variable
// var yLinearScale = d3.scaleLinear()
//  .domain([0, d3.max(stateData, d => d.obesity)])
//  .range([height, 0]);
}

// function yscale
function yScale(stateData, chosenYAxis) {
    var yLinearScale = d3.scaleLinear()
        .domain([d3.min(stateData, d => d[chosenYAxis]) * 0.8,
            d3.max(stateData, d => d[chosenYAxis]) * 1.2
    ])
        .range([height, 0]);
    return yLinearScale;
}

// function for axes
function renderXAxes(newXScale, xAxis) {
    var bottomAxis = d3.axisBottom(newXScale);
    xAxis.transition()
        .duration(1000)
        .call(bottomAxis);
    return xAxis
}

function renderYAxes(newYScale, yAxis) {
    var leftAxis = d3.axisLeft(newYScale);
    yAxis.transition()
        .duration(1000)
        .call(leftAxis);
    return yAxis;
}

// function for new circles
function renderCircles(circlesGroup, newXScale, chosenXAxis, newYScale, chosenYAxis) {
    
    circlesGroup.transition(1000)
        .attr("cx", d => newXScale(d[chosenXAxis]))
        .attr("cy", d => newXScale(d[chosenYAxis]));
    return circlesGroup;
}

function renderText(textGroup, newXScale, chosenXAxis, newYScale, chosenYAxis) {
    
    textGroup.transition(1000)
        .attr("x", d => newXScale(d[chosenXAxis]))
        .attr("y", d => newXScale(d[chosenYAxis]))
        .attr("text-anchor", "middle");
    return textGroup;
}


// function for updating circles
function updateToolTip(chosenXAxis, chosenYAxis, circlesGroup, textGroup) {
    if (chosenXAxis === "poverty") {
        var xLabel = "Poverty";
    }
    else if (chosenXAxis === "age") {
        var xLabel = "Age";
    }
    else {
        var xLabel = "Household Income";
    }
    if (chosenYAxis === "healthcare") {
        var yLabel = "Lack of Healthcare";
    }
    else if (chosenYAxis === "obesity") {
        var yLabel = "Percentage of Obesity";
    }
    else {
        var yLabel = "Percentage of Smokers";
    }

// onmouse event


    // xLinearScale function
    
    // create yscale function

    // bottom and left axis


// give variables

        // use data.abb to bring up state abb, insert d3 tip url into index.html
    var toolTip = d3
        .tip()
        .attr("class", "tooltip")
        .offset([90, 90])
        .html(function(data) {
            return(`<br>State Abbr: ${data.abbr}</br>`)
        });

    circlesGroup.call(toolTip);

    circlesGroup.on("mouseover", function(data) {
        toolTip.show(data);
    })
        .on("mouseout", function(data, index) {
            toolTip.hide(data);
        });
        
    textGroup.call(toolTip);
        
    textGroup.on("mouseover", function(data) {
        toolTip.show(data);
    })
        .on("mouseout", function(data) {
            toolTip.hide(data);
        });
    return circlesGroup;
}

// create a filepath to data.csv using d3.csv, use then function
d3.csv("assets/data/data.csv").then(function(stateData) {
    console.log(stateData);
        // forEach loop, +measurement data
        // parse data
    stateData.forEach(function(data) {
        // obesity vs. smokes
        data.obesity = +data.obesity;
        data.smokes = +data.smokes;
            // add age > healthcare
        data.age = +data.age;
        data.healthcare = +data.healthcare;
            // income and poverty
        data.income = +data.income;
        data.poverty = + data.poverty;
    });

    var xLinearScale = xScale(stateData, chosenXAxis);
    var yLinearScale = yScale(stateData, chosenYAxis);

    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    var xAxis = chartGroup.append("g")
        .classed("x-axis", true)
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);

    var yAxis = chartGroup.append("g")
        .classed("y-axis", true)
        .call(leftAxis);

    var circlesGroup = chartGroup.selectAll("circle")
        .data(stateData)
        .enter()
        .append("circle")

        .attr("cx", d => xLinearScale(d[chosenXAxis]))
        .attr("cy", d => yLinearScale(d[chosenYAxis]))
    
        .attr("r", 10)
        .attr("fill", "blue")
        .attr("opacity", ".5")

    var textGroup = chartGroup.selectAll("text")
        .data(stateData)
        .enter()
        .append("text")
        .attr("x", d => xLinearScale(d[chosenXAxis]))
        .attr("y", d => yLinearScale(d[chosenYAxis]))
        // .text(d => (d.abbr))
        // .attr("class", "stateText")


    var xLabelGroup = chartGroup.append("g")
        .attr("transform", `translate(${width /2}, ${height + 20})`);
        
        // poverty x axis line income,age, poverty
    var povLabel = chartGroup.append("text")
        .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
        .attr("class", "axisText")
        .text("Poverty");

    var inLabel = chartGroup.append("text")
        .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
        .attr("class", "axisText")
        .text("Income");

    var ageLabel = chartGroup.append("text")
        .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
        .attr("class", "axisText")
        .text("Median Age");

        
                // healthcare, y axis smoking, obesity, healthcare
    var yLabelGroup = chartGroup.append("g")
        .attr("transform", `translate(${width /2}, ${height + 20})`);
        
    var heaLabel = chartGroup.append("text")
        .attr("transform", "rorate(-90)")
        .attr("y", -40)
        .attr("x", 0)
        .attr("value", "healthcare")
        .classed("axisText", true)
        .classed("active", true)
        .text("Healthcare");
        
    var obLabel = chartGroup.append("text")
        .attr("transform", "rorate(-90)")
        .attr("y", -40)
        .attr("x", 0)
        .attr("value", "healthcare")
        .classed("axisText", true)
        .classed("inactive", true)
        .text("Obesity in Percentage");
    
    var smLabel = chartGroup.append("text")
        .attr("transform", "rorate(-90)")
        .attr("y", -40)
        .attr("x", 0)
        .attr("value", "healthcare")
        .classed("axisText", true)
        .classed("inactive", true)
        .text("Smoking in Percentage");
            
    var circlesGroup = updateToolTip(chosenXAxis, circlesGroup);

        // events x axis
    xLabelGroup.selectAll("text")
        .on("click", function() {
    
    var value = d3.select(this).attr("value");
        if (value !== chosenXAxis) {
            chosenXAxis = value;
            console.log(chosenXAxis)
            xLinearScale = xScale(stateData, chosenXAxis);
            xAxis = renderXAxes(xLinearScale, xAxis);
            circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis);
            circlesGroup = updateToolTip(chosenXAxis, circlesGroup);

            if (chosenXAxis === "poverty") {
                povLabel
                    .classed("active", true)
                    .classed("inactive", false);
                ageLabel
                    .classed("active", false)
                    .classed("inactive", true);
                inLabel
                    .classed("active", false)
                    .classed("inactive", true);
            }
            else if (chosenXAxis === "age")
                povLabel
                    .classed("active", false)
                    .classed("inactive", true);
                ageLabel
                    .classed("active", true)
                    .classed("inactive", false);
                inLabel
                    .classed("active", false)
                    .classed("inactive", true);
            }
            else {
                povLabel
                    .classed("active", false)
                    .classed("inactive", true);
                ageLabel
                    .classed("active", false)
                    .classed("inactive", true);
                inLabel
                    .classed("active", true)
                    .classed("inactive", false);
            }
        })
    });
    yLabelGroup.selectAll("text")
        .on("click", function() {

    
    var value = d3.select(this).attr("value");
        if (value !== chosenYAxis) {
            chosenYAxis = value;
            console.log(chosenYAxis)
            yLinearScale = yScale(stateData, chosenYAxis);
            yAxis = renderYAxes(yLinearScale, yAxis);
            circlesGroup = renderCircles(circlesGroup, yLinearScale, chosenYAxis);
            circlesGroup = updateToolTip(chosenYAxis, circlesGroup);

            if (chosenYAxis === "healthcare") {
                heaLabel
                    .classed("active", true)
                    .classed("inactive", false);
                obLabel
                    .classed("active", false)
                    .classed("inactive", true);
                smLabel
                    .classed("active", false)
                    .classed("inactive", true);
            }
            else if (chosenYAxis === "obesity")
                heaLabel
                    .classed("active", false)
                    .classed("inactive", true);
                obLabel
                    .classed("active", true)
                    .classed("inactive", false);
                smLabel
                    .classed("active", false)
                    .classed("inactive", true);
            }
            else {
                heaLabel
                    .classed("active", false)
                    .classed("inactive", true);
                obLabel
                    .classed("active", false)
                        .classed("inactive", true);
                smLabel
                    .classed("active", true)
                    .classed("inactive", false);
            }
        });
// }).catch(function(error) {
//     console.log(error);
// });



    //     if (chosenXAxis === "poverty") {
    //     var xlabel = "Poverty";
    // }
    // else if (chosenXAxis === "age") {
    //     var xLabel = "Age";
    // }
    // else (chosenXAxis === "income") {
    //     var xLabel = "Household Income";
    // }
    // if (chosenYAxis === "healthcare") {
    //     var yLabel = "Lack of Healthcare";
    // }
    // else if (chosenYAxis === "obesity") {
    //     var yLabel = "Percentage of Obesity";
    // }
    // else (chosenYAxis === "smokes") {
    //     var yLabel = "Percentage of Smokers";
    // }

