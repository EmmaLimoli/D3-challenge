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
    bottom: 90,
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
}        // .range([0, width]);
// yLinearScale variable
// var yLinearScale = d3.scaleLinear()
//  .domain([0, d3.max(stateData, d => d.obesity)])
//  .range([height, 0]);


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
// renderXAxes function to call on newXScale and xAxis
function renderXAxes(newXScale, xAxis) {
    var bottomAxis = d3.axisBottom(newXScale);
    xAxis.transition()
        .duration(500)
        .call(bottomAxis);
    return xAxis
}

// function for y axes. RenderYAxes and call on newYScale, yAxis
function renderYAxes(newYScale, yAxis) {
    var leftAxis = d3.axisLeft(newYScale);
    yAxis.transition()
        .duration(500)
        .call(leftAxis);
    return yAxis;
}

// function for new circles in render circles for circle group call on xAxis and chosen
function renderCircles(circlesGroup, newXScale, chosenXAxis, newYScale, chosenYAxis) {
    // circles
    circlesGroup
        .transition()
        .duration(500)
        .attr("cx", d => newXScale(d[chosenXAxis]))
        .attr("cy", d => newYScale(d[chosenYAxis]));
    return circlesGroup;
}
// create function for text
function renderText(textGroup, newXScale, chosenXAxis, newYScale, chosenYAxis) {
    // text
    textGroup
        .transition()
        .duration(500)
        .attr("x", d => newXScale(d[chosenXAxis]))
        .attr("y", d => newYScale(d[chosenYAxis]))
        .attr("text-anchor", "middle");
    return textGroup;
}


// function for updating circles create a conditional for all six data points
function updateToolTip(chosenXAxis, chosenYAxis, circlesGroup, textGroup) {
    if (chosenXAxis === "poverty") {
        var xLabel = "Percentage of Poverty";
    }
    else if (chosenXAxis === "age") {
        var xLabel = "Median Age";
    }
    else {
        var xLabel = "Household Income";
    }
    if (chosenYAxis === "healthcare") {
        var yLabel = "Percentage of the Lack of Healthcare";
    }
    else if (chosenYAxis === "obesity") {
        var yLabel = "Percentage of Obesity";
    }
    else {
        var yLabel = "Percentage of Smokers";
    }

        // use data.abbr to bring up state abbr, insert d3 tip url into index.html
    var toolTip = d3
        .tip()
        .attr("class", "tooltip")
        .offset([80, -60])
        .html(function(data) {
            return(`<br>State Abbr: ${data.abbr}</br>`)
        });
    // call on toolTip
    circlesGroup.call(toolTip);
    // implement mouseover for the mouse to hover over and provide data. Don't forget to close with hide
    circlesGroup.on("mouseover", function(data) {
        toolTip.show(data, this);
    })
        .on("mouseout", function(data) {
            toolTip.hide(data);
        });
    // call on textgroup tool tip for text
    textGroup.call(toolTip);
    // copy what was done for circles so that the text shows up with mouseover 
    textGroup.on("mouseover", function(data) {
        toolTip.show(data, this);
    })
        .on("mouseout", function(data) {
            toolTip.hide(data);
        });
    return circlesGroup;
}

// create a filepath to data.csv using d3.csv, use then function
d3.csv("assets/data/data.csv").then(function(stateData, err) {
    console.log(stateData);
    if (err) throw err;
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
    // create linear scale, bottomAxis, and leftAxis
    var xLinearScale = xScale(stateData, chosenXAxis);
    var yLinearScale = yScale(stateData, chosenYAxis);

    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);
    // create chartGroup appends for xAxis
    var xAxis = chartGroup.append("g")
        .classed("x-axis", true)
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);
     // create chartGroup appends for yAxis
    var yAxis = chartGroup.append("g")
        .classed("y-axis", true)
        .call(leftAxis);
     // create chartGroup appends for circlesGroups
    var circlesGroup = chartGroup.selectAll("circle")
        .data(stateData)
        .enter()
        .append("circle")

        .attr("cx", d => xLinearScale(d[chosenXAxis]))
        .attr("cy", d => yLinearScale(d[chosenYAxis]))
    
        .attr("r", 10)
        .attr("fill", "blue")
        .attr("opacity", ".5")

     // create chartGroup appends for textGroup
    var textGroup = chartGroup.selectAll("text")
        .data(stateData)
        .enter()
        .append("text")
        .attr("x", d => xLinearScale(d[chosenXAxis]))
        .attr("y", d => yLinearScale(d[chosenYAxis]))
        // .text(d => (d.abbr))
        // .attr("class", "stateText")

    // create label appends for x axis
    var xLabelGroup = chartGroup.append("g")
        .attr("transform", `translate(${width /2}, ${height + 20})`);
        
        // poverty x axis line income,age, poverty
    var povLabel = xLabelGroup.append("text")
        // .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
        .attr("x", 0)
        .attr("y", 30)
        .attr("value", "poverty")
        .classed("active", true)
        .text("Poverty");

    // income variable
    var inLabel = xLabelGroup.append("text")
        // .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
        .attr("x", 0)
        .attr("y", 50)
        .attr("value", "age")
        .classed("inactive", true)
        .text("Income");
    // age variable
    var ageLabel = xLabelGroup.append("text")
        // .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
        .attr("x", 0)
        .attr("y", 70)
        .attr("value", "income")
        .classed("inactive", true)
        .text("Median Age");

        
    // create label appends for y axis, healthcare, obesity, healthcare
    var yLabelGroup = chartGroup.append("g")
        .attr("transform", `translate(${width /2}, ${height + 20})`);
    // healthcare variable, follow same as poverty  
    var heaLabel = yLabelGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", -30)
        .attr("x", 0)
        .attr("value", "healthcare")
        // .classed("axisText", true)
        .classed("active", true)
        // .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
        // .attr("class", "axisText")
        .text("Healthcare");
    
    //obesity label
    var obLabel = yLabelGroup.append("text")
        .attr("transform", "rotate(-70)")
        .attr("y", -50)
        .attr("x", 0)
        .attr("value", "healthcare")
        // .classed("axisText", true)
        .classed("inactive", true)
        // .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
        // .attr("class", "axisText")
        .text("Obesity");
    
    // smoke variable
    var smLabel = yLabelGroup.append("text")
        .attr("transform", "rotate(-50)")
        .attr("y", -40)
        .attr("x", 0)
        .attr("value", "healthcare")
        // .classed("axisText", true)
        .classed("inactive", true)
        // .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
        // .attr("class", "axisText")
        .text("Smoking");
    
    // update circlesGroups with updateToolTip 
    var circlesGroup = updateToolTip(chosenXAxis, chosenYAxis, circlesGroup, textGroup);

        // events x axis
    xLabelGroup.selectAll("text")
        .on("click", function() {
            // create conditional
            var value = d3.select(this).attr("value");
            if (value !== chosenXAxis) {
                chosenXAxis = value;
                console.log(chosenXAxis)
                xLinearScale = xScale(stateData, chosenXAxis);
                xAxis = renderXAxes(xLinearScale, xAxis);
                circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis);
                circlesGroup = updateToolTip(chosenXAxis, circlesGroup);
                // create new conditional for x axis for each label
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
    // events y axis 
    yLabelGroup.selectAll("text")
        .on("click", function() {
            // create conditionals
            var value = d3.select(this).attr("value");
            if (value !== chosenYAxis) {
                chosenYAxis = value;
                console.log(chosenYAxis)
                yLinearScale = yScale(stateData, chosenYAxis);
                yAxis = renderYAxes(yLinearScale, yAxis);
                circlesGroup = renderCircles(circlesGroup, yLinearScale, chosenYAxis);
                circlesGroup = updateToolTip(chosenYAxis, circlesGroup);
                // create new conditional for y axis for each label
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
});
// }).catch(function(error) {
//     console.log(error);
// });


