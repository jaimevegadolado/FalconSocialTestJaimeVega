var margin1 = {
    top: 100,
    right: 0,
    bottom: 20,
    left: 100
},
    width1 = 700 - margin1.left - margin1.right,
    height1 = 500 - margin1.top - margin1.bottom;

var parseDate = d3.time.format("%Y-%m-%dT%H:%M:%S.%L%L").parse;

var formatPercent = d3.format(".0%");

var x1 = d3.time.scale()
    .range([0, width1]);


var y1 = d3.scale.linear()
    .range([height1, 0])


var xAxis1 = d3.svg.axis()
    .scale(x1)
    .tickFormat(d3.time.format('%d-%B'))
    .orient("bottom");
   

var yAxis1 = d3.svg.axis()
    .scale(y1)
    .orient("left");


var yAxis2 = d3.svg.axis()
    .scale(y1)
    .orient("left")
    .tickFormat(formatPercent);


var line1 = d3.svg.line()
    .x(function (d) {
        return x1(d.timestamp);
    })
    .y(function (d) {
        return y1(d.count);
    });

var line2 = d3.svg.line()
    .x(function (d) {
        return x1(d.timestamp);
    })
    .y(function (d) {
        return y1(d.percent);
    });

var svg1 = d3.select("body").append("svg")
    .attr("width", width1 + margin1.left + margin1.right)
    .attr("height", height1 + margin1.top + margin1.bottom)
    .attr("class", "svg")

.append("g")
    .attr("transform", "translate(" + margin1.left + "," + margin1.top + ")");

var svg2 = d3.select("body").append("svg")
    .attr("width", width1 + margin1.left + margin1.right)
    .attr("height", height1 + margin1.top + margin1.bottom)
    .attr("class", "svg2")

.append("g")
    .attr("transform", "translate(" + margin1.left + "," + margin1.top + ")");


var svg3 = d3.select("body").append("svg")
    .attr("width", width1 + margin1.left + margin1.right)
    .attr("height", height1 + margin1.top + margin1.bottom)
    .attr("class", "svg3")

.append("g")
    .attr("transform", "translate(" + margin1.left + "," + margin1.top + ")");

d3.json("data/usage.json", function (error, data) {
    data.forEach(function (d) {
        d.timestamp = parseDate(d.timestamp);
        d.count = +d.count;
    });

    x1.domain(d3.extent(data, function (d) {
        return d.timestamp;
    }));
    y1.domain(d3.extent(data, function (d) {
        return d.count;
    }));

    svg1.append("text")
        .attr("x", (width1 / 2))
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("text-decoration", "underline")
        .text("Usage of the System");

    svg1.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height1 + ")")
        .call(xAxis1);

    svg1.append("g")
        .attr("class", "y axis")
        .call(yAxis1)
        .append("text")
        .attr("x", -margin1.right)
        .attr("y", -1)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Usage");

    svg1.append("path")
        .datum(data)
        .attr("class", "line")
        .attr("d", line1);
});




d3.json("data/zendesk_tickets.json", function (error, data) {
    data.forEach(function (d) {
        d.timestamp = parseDate(d.timestamp);
        d.count = +d.count;
    });

    x1.domain(d3.extent(data, function (d) {
        return d.timestamp;
    }));
    y1.domain(d3.extent(data, function (d) {
        return d.count;
    }));

    svg2.append("text")
        .attr("x", (width1 / 2))
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("text-decoration", "underline")
        .text("Zendesk Tickets");

    svg2.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height1 + ")")
        .call(xAxis1);

    svg2.append("g")
        .attr("class", "y axis")
        .call(yAxis1)
        .append("text")
        .attr("x", -margin1.right)
        .attr("y", -1)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Tickets");

    svg2.append("path")
        .datum(data)
        .attr("class", "line")
        .attr("d", line1);
});


d3.json("data/error_percentage.json", function (error, data) {
    data.forEach(function (d) {
        d.timestamp = parseDate(d.timestamp);
        d.percent = +d.percent;
    });

    x1.domain(d3.extent(data, function (d) {
        return d.timestamp;
    }));
    y1.domain(d3.extent(data, function (d) {
        return d.percent;
    }));

    svg3.append("text")
        .attr("x", (width1 / 2))
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("text-decoration", "underline")
        .text("Error Percentage");

    svg3.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height1 + ")")
        .call(xAxis1);

    svg3.append("g")
        .attr("class", "y axis")
        .call(yAxis2)
        .append("text")
        .attr("x", -margin1.right)
        .attr("y", -1)

    .style("text-anchor", "end")
        .text("Error Percentage");

    svg3.append("path")
        .datum(data)
        .attr("class", "line")
        .attr("d", line2);
});