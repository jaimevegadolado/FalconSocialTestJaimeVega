var hide = false;

$("#showGraphs").click(function () {

    if (hide) {
        $("#graphs").fadeOut(1000)
        hide = false;
    } else if (!hide) {

        $("#graphs").fadeIn(2000)

          hide = true;
    }

});

        var margin1 = {
            top: 70,
            right: 50,
            bottom: 30,
            left: 100
        },
            width1 = 650 - margin1.left - margin1.right,
            height1 = 400 - margin1.top - margin1.bottom;

        var parseDate = d3.time.format("%Y-%m-%dT%H:%M:%S.%L%L").parse;

        var formatPercent = d3.format(".0%");

        var x1 = d3.time.scale().range([0, width1]);


        var y1 = d3.scale.linear().range([height1, 0])

        var y2 = d3.scale.linear().range([height1, 0])

        var xAxis1 = d3.svg.axis().scale(x1).tickFormat(d3.time.format('%d-%m')).orient("bottom");

        var yAxis1 = d3.svg.axis().scale(y1).orient("left");

        var yAxis2 = d3.svg.axis().scale(y2) // new declaration for 'Right', 'y1'
        .orient("right").tickFormat(formatPercent);
        // and includes orientation .

        var line1 = d3.svg.line().x(function (d) {
            return x1(d.timestamp);
        }).y(function (d) {
            return y1(d.count);
        });

        var line2 = d3.svg.line().x(function (d) {
            return x1(d.timestamp);
        }).y(function (d) {
            return y2(d.percent);
        });

        var svg1 = d3.select("#graphs").append("svg").attr("width", width1 + margin1.left + margin1.right).attr("height", height1 + margin1.top + margin1.bottom).attr("class", "svg")

        .append("g").attr("transform", "translate(" + margin1.left + "," + margin1.top + ")");

        var svg2 = d3.select("#graphs").append("svg").attr("width", width1 + margin1.left + margin1.right).attr("height", height1 + margin1.top + margin1.bottom).attr("class", "svg2")

        .append("g").attr("transform", "translate(" + margin1.left + "," + margin1.top + ")");



        d3.json("data/error_percentage.json", function (error, data) {
            d3.json("data/zendesk_tickets.json", function (error, data1) {

                data.forEach(function (d) {
                    d.timestamp = parseDate(d.timestamp);
                    d.percent = +d.percent;
                });

                data1.forEach(function (d) {
                    d.timestamp = parseDate(d.timestamp);
                    d.count = +d.count;
                });

                x1.domain(d3.extent(data1, function (d) {
                    return d.timestamp;
                }));
                y1.domain(d3.extent(data1, function (d) {
                    return d.count;
                }));

                y2.domain(d3.extent(data, function (d) {
                    return d.percent;
                }));



                svg1.append("text").attr("x", (width1 / 2)).attr("text-anchor", "middle").style("font-size", "20px").style("text-decoration", "underline").style("font-weight", "bold").text("Zendesk Tickets vs Error Percentage");

                svg1.append("g").attr("class", "x axis").attr("transform", "translate(0," + height1 + ")").call(xAxis1);

                svg1.append("g").attr("class", "y axis").style("fill", "steelblue").call(yAxis1).append("text").attr("x", 20).attr("y", -15).attr("dy", ".71em").style("text-anchor", "end").text("Tickets");

                svg1.append("g").attr("class", "y axis").attr("transform", "translate(" + width1 + " ,0)").style("fill", "green").call(yAxis2).append("text").attr("x", 20).attr("y", -15).attr("dy", ".71em").style("text-anchor", "end").text("Error %");

                svg1.append("path").datum(data1).attr("class", "line").attr("d", line1);

                svg1.append("path").datum(data).attr("class", "line2").attr("d", line2);
            });

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

            svg2.append("text").attr("x", (width1 / 2)).attr("text-anchor", "middle").style("font-size", "20px").style("text-decoration", "underline").style("font-weight", "bold").text("Zendesk Tickets");

            svg2.append("g").attr("class", "x axis").attr("transform", "translate(0," + height1 + ")").call(xAxis1);

            svg2.append("g").attr("class", "y axis").call(yAxis1).append("text").attr("x", 20).attr("y", -15).attr("dy", ".71em").style("text-anchor", "end").text("Tickets");

            svg2.append("path").datum(data).attr("class", "line").attr("d", line1);
        });
  