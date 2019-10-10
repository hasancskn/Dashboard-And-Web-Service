$(function () {
	var totalRevenue = 2781450,
			totalVisitors = 883000;
	

	// data for drilldown charts
	var dataMonthlyRevenueByCategory = {
		"Happy": {
			color: "#393f63",
			markerSize: 0,
			name: "Happy",
			type: "column",
			yValueFormatString: "$###,###.00",
			dataPoints: [
				{ x: new Date("1 Jan 2018"), y: 25987.50 },
				{ x: new Date("1 Feb 2018"), y: 23436.00 },
				{ x: new Date("1 Mar 2018"), y: 29988.00 },
				{ x: new Date("1 Apr 2018"), y: 20790.00 },
				{ x: new Date("1 May 2018"), y: 36288.00 },
				{ x: new Date("1 Jun 2018"), y: 30870.00 },
				{ x: new Date("1 Jul 2018"), y: 28728.00 },
				{ x: new Date("1 Aug 2018"), y: 30996.00 },
				{ x: new Date("1 Sep 2018"), y: 25200.00 },
				{ x: new Date("1 Oct 2018"), y: 21168.00 },
				{ x: new Date("1 Nov 2018"), y: 30996.00 },
				{ x: new Date("1 Dec 2018"), y: 37926.00 }
			]
		},
		"Disgust": {
			color: "#e5d8b0",
			markerSize: 0,
			name: "Disgust",
			type: "column",
			yValueFormatString: "$###,###.00",
			dataPoints: [
				{ x: new Date("1 Jan 2018"), y: 25987.50 },
				{ x: new Date("1 Feb 2018"), y: 23436.00 },
				{ x: new Date("1 Mar 2018"), y: 29988.00 },
				{ x: new Date("1 Apr 2018"), y: 20790.00 },
				{ x: new Date("1 May 2018"), y: 36288.00 },
				{ x: new Date("1 Jun 2018"), y: 30870.00 },
				{ x: new Date("1 Jul 2018"), y: 28728.00 },
				{ x: new Date("1 Aug 2018"), y: 30996.00 },
				{ x: new Date("1 Sep 2018"), y: 25200.00 },
				{ x: new Date("1 Oct 2018"), y: 21168.00 },
				{ x: new Date("1 Nov 2018"), y: 30996.00 },
				{ x: new Date("1 Dec 2018"), y: 37926.00 }
			]
		},
		"Suprised": {
			color: "#ffb367",
			markerSize: 0,
			name: "Suprised",
			type: "column",
			yValueFormatString: "$###,###.00",
			dataPoints: [
				{ x: new Date("1 Jan 2018"), y: 25987.50 },
				{ x: new Date("1 Feb 2018"), y: 23436.00 },
				{ x: new Date("1 Mar 2018"), y: 29988.00 },
				{ x: new Date("1 Apr 2018"), y: 20790.00 },
				{ x: new Date("1 May 2018"), y: 36288.00 },
				{ x: new Date("1 Jun 2018"), y: 30870.00 },
				{ x: new Date("1 Jul 2018"), y: 28728.00 },
				{ x: new Date("1 Aug 2018"), y: 30996.00 },
				{ x: new Date("1 Sep 2018"), y: 25200.00 },
				{ x: new Date("1 Oct 2018"), y: 21168.00 },
				{ x: new Date("1 Nov 2018"), y: 30996.00 },
				{ x: new Date("1 Dec 2018"), y: 37926.00 }
			]
		},
		"Confused": {
			color: "#f98461",
			markerSize: 0,
			name: "Confused",
			type: "column",
			yValueFormatString: "$###,###.00",
			dataPoints: [
				{ x: new Date("1 Jan 2018"), y: 25987.50 },
				{ x: new Date("1 Feb 2018"), y: 23436.00 },
				{ x: new Date("1 Mar 2018"), y: 29988.00 },
				{ x: new Date("1 Apr 2018"), y: 20790.00 },
				{ x: new Date("1 May 2018"), y: 36288.00 },
				{ x: new Date("1 Jun 2018"), y: 30870.00 },
				{ x: new Date("1 Jul 2018"), y: 28728.00 },
				{ x: new Date("1 Aug 2018"), y: 30996.00 },
				{ x: new Date("1 Sep 2018"), y: 25200.00 },
				{ x: new Date("1 Oct 2018"), y: 21168.00 },
				{ x: new Date("1 Nov 2018"), y: 30996.00 },
				{ x: new Date("1 Dec 2018"), y: 37926.00 }
			]
		},
		"Angry": {
			color: "#d9695f",
			markerSize: 0,
			name: "Angry",
			type: "column",
			yValueFormatString: "$###,###.00",
			dataPoints: [
				{ x: new Date("1 Jan 2018"), y: 25987.50 },
				{ x: new Date("1 Feb 2018"), y: 23436.00 },
				{ x: new Date("1 Mar 2018"), y: 29988.00 },
				{ x: new Date("1 Apr 2018"), y: 20790.00 },
				{ x: new Date("1 May 2018"), y: 36288.00 },
				{ x: new Date("1 Jun 2018"), y: 30870.00 },
				{ x: new Date("1 Jul 2018"), y: 28728.00 },
				{ x: new Date("1 Aug 2018"), y: 30996.00 },
				{ x: new Date("1 Sep 2018"), y: 25200.00 },
				{ x: new Date("1 Oct 2018"), y: 21168.00 },
				{ x: new Date("1 Nov 2018"), y: 30996.00 },
				{ x: new Date("1 Dec 2018"), y: 37926.00 }
			]
		}
	};
	
	// data for drilldown charts
	$.get("http://localhost:5000/get_overview", function(dataVisitors){	
		totalVisitors = dataVisitors["totalVisitors"];
		visitorsChart.options.data = dataVisitors["New vs Returning Visitors"];
		visitorsChart.render();
	});
	var dataVisitors = {
		"New vs Returning Visitors": [
			{
				click: visitorsChartDrilldownHandler,
				cursor: "pointer",
				explodeOnClick: false,
				innerRadius: "75%",
				legendMarkerType: "square",
				name: "New vs Returning Visitors",
				radius: "100%",
				showInLegend: true,
				startAngle: 90,
				type: "doughnut",
				dataPoints: [
					{ y: 519960, name: "New Visitors", color: "#393f63" },
					{ y: 363040, name: "Returning Visitors", color: "#f98461" }
				]
			}
		],
		"New Visitors": [
			{
				color: "#393f63",
				name: "New Visitors",
				type: "column",
				dataPoints: [
					{ x: new Date("1 Jan 2018"), y: 25987.50 },
					{ x: new Date("1 Feb 2018"), y: 23436.00 },
					{ x: new Date("1 Mar 2018"), y: 29988.00 },
					{ x: new Date("1 Apr 2018"), y: 20790.00 },
					{ x: new Date("1 May 2018"), y: 36288.00 },
					{ x: new Date("1 Jun 2018"), y: 30870.00 },
					{ x: new Date("1 Jul 2018"), y: 28728.00 },
					{ x: new Date("1 Aug 2018"), y: 30996.00 },
					{ x: new Date("1 Sep 2018"), y: 25200.00 },
					{ x: new Date("1 Oct 2018"), y: 21168.00 },
					{ x: new Date("1 Nov 2018"), y: 30996.00 },
					{ x: new Date("1 Dec 2018"), y: 37926.00 }
				]
			}
		],
		"Returning Visitors": [
			{
				color: "#f98461",
				name: "Returning Visitors",
				type: "column",
				dataPoints: [
					{ x: new Date("1 Jan 2018"), y: 25987.50 },
					{ x: new Date("1 Feb 2018"), y: 23436.00 },
					{ x: new Date("1 Mar 2018"), y: 29988.00 },
					{ x: new Date("1 Apr 2018"), y: 20790.00 },
					{ x: new Date("1 May 2018"), y: 36288.00 },
					{ x: new Date("1 Jun 2018"), y: 30870.00 },
					{ x: new Date("1 Jul 2018"), y: 28728.00 },
					{ x: new Date("1 Aug 2018"), y: 30996.00 },
					{ x: new Date("1 Sep 2018"), y: 25200.00 },
					{ x: new Date("1 Oct 2018"), y: 21168.00 },
					{ x: new Date("1 Nov 2018"), y: 30996.00 },
					{ x: new Date("1 Dec 2018"), y: 37926.00 }
				]
			}
		]
	};

	// CanvasJS spline area chart to show revenue from Jan 2015 - Dec 2015
	var revenueSplineAreaChart = new CanvasJS.Chart("revenue-spline-area-chart", {
		animationEnabled: true,
		backgroundColor: "transparent",
		axisX: {
			interval: 2,
			intervalType: "month",
			labelFontColor: "#717171",
			labelFontSize: 16,
			lineColor: "#a2a2a2",
			minimum: new Date("1 Jan 2018"),
			tickColor: "#a2a2a2",
			valueFormatString: "MMM YYYY"
		},
		axisY: {
			gridThickness: 0,
			includeZero: false,
			labelFontColor: "#717171",
			labelFontSize: 16,
			lineColor: "#a2a2a2",
			prefix: "$",
			tickColor: "#a2a2a2"
		},
		toolTip: {
			borderThickness: 0,
			cornerRadius: 0,
			fontStyle: "normal"
		},
		data: []
	});
	$.get("http://localhost:5000/get_overview_revenue", function(data){
		revenueSplineAreaChart.options.axisX.minimum = eval(data[0]["dataPoints"][0]["x"]);
		for ( var i = 0; i < data[0]["dataPoints"].length; i++ )
			data[0]["dataPoints"][i]["x"] = eval(data[0]["dataPoints"][i]["x"]);
		revenueSplineAreaChart.options.data = data;
		revenueSplineAreaChart.render();
	})
	

	
	// CanvasJS multiseries column chart to show monthly revenue by category
	

	var visitorsDrilldownedChartOptions = {
		animationEnabled: true,
		backgroundColor: "transparent",
		axisX: {
			labelFontColor: "#717171",
			lineColor: "#a2a2a2",
			tickColor: "#a2a2a2"
		},
		axisY: {
			gridThickness: 0,
			includeZero: false,
			labelFontColor: "#717171",
			lineColor: "#a2a2a2",
			tickColor: "#a2a2a2"
		},
		toolTip: {
			cornerRadius: 0,
			fontStyle: "normal"
		},
		data: []
	};
	
	var newVsReturningVisitorsChartOptions = {
		animationEnabled: true,
		backgroundColor: "transparent",
		legend: {
			fontFamily: "calibri",
			fontSize: 14,
			itemTextFormatter: function (e) {
				return e.dataPoint.name + ": " + Math.round(e.dataPoint.y / totalVisitors * 100) + "%";  
			}
		},
		toolTip: {
			cornerRadius: 0,
			fontStyle: "normal",
			contentFormatter: function (e) {
				return e.entries[0].dataPoint.name + ": " + CanvasJS.formatNumber(e.entries[0].dataPoint.y, "###,###") + " - " + Math.round(e.entries[0].dataPoint.y / totalVisitors * 100) + "%";  
			} 
		},
		data: []
	};	

	// CanvasJS doughnut chart to show new vs returning visitors
	var visitorsChart = new CanvasJS.Chart("visitors-chart", newVsReturningVisitorsChartOptions);

	// CanvasJS spline chart to show users from Jan 2015 - Dec 2015
	var usersSplineChart = new CanvasJS.Chart("users-spline-chart", {
		animationEnabled: true,
		backgroundColor: "transparent",
		axisX: {
			labelFontColor: "#717171",
			lineColor: "#a2a2a2",
			tickColor: "#a2a2a2"
		},
		axisY: {
			gridThickness: 0,
			includeZero: false,
			labelFontColor: "#717171",
			lineColor: "#a2a2a2",
			tickColor: "#a2a2a2"
		},
		toolTip: {
			borderThickness: 1,
			cornerRadius: 0,
			fontStyle: "normal"
		},
		data: []
	});
	$.get("http://localhost:5000/get_overview_peak", function(data){
		usersSplineChart.options.axisX.minimum = eval(data[0]["dataPoints"][0]["x"]);
		for ( var i = 0; i < data[0]["dataPoints"].length; i++ )
			data[0]["dataPoints"][i]["x"] = eval(data[0]["dataPoints"][i]["x"]);
		usersSplineChart.options.data = data;
		usersSplineChart.render();
	})
	
	//----------------------------------------------------------------------------------//
	var allCharts = [
		revenueSplineAreaChart,
		visitorsChart,
		usersSplineChart
	];
	

	
	var visitorsChartHeadingDOM = $("#visitors-chart-heading"),
			visitorsChartBackButtonDOM = $("#visitors-chart-back-button"),
			visitorsChartTagDOM = $("#visitors-chart-tag");
	
	function visitorsChartDrilldownHandler (e) {
		visitorsChart = new CanvasJS.Chart("visitors-chart", visitorsDrilldownedChartOptions);
		visitorsChart.options.data = dataVisitors[e.dataPoint.name];
		visitorsChart.render();
		
		// DOM Manipulations
		visitorsChartHeadingDOM.html(e.dataPoint.name);
		visitorsChartBackButtonDOM.toggleClass("invisible");
		visitorsChartTagDOM.toggleClass("invisible");
	}
	
	// binding click event to visitors chart back button to drill up to "New Vs Returning Visitors" doughnut chart
	visitorsChartBackButtonDOM.on("click", function () {
		visitorsChart = new CanvasJS.Chart("visitors-chart", newVsReturningVisitorsChartOptions);
		visitorsChart.options.data = dataVisitors["New vs Returning Visitors"];
		visitorsChart.render();
		
		// DOM Manipulations
		visitorsChartHeadingDOM.html("New vs Returning Visitors");
		visitorsChartBackButtonDOM.toggleClass("invisible");
		visitorsChartTagDOM.toggleClass("invisible");
	});
	
	// chart properties cutomized further based on screen width
	function chartPropertiesCustomization () {
		if ($(window).outerWidth() >= 1200 ) {
			

			
			visitorsChartTagDOM.css("position", "absolute");
			
		} else if ($(window).outerWidth() < 1200) {

			
			visitorsChartTagDOM.css("position", "static");
			
		}
	}
	
	function renderAllCharts() {
		for (var i = 0; i < allCharts.length; i++)
			allCharts[i].render();
	}
	
	function sidebarToggleOnClick() {
		$('#sidebar-toggle-button').on('click', function () {
			$('#sidebar').toggleClass('sidebar-toggle');
			$('#page-content-wrapper').toggleClass('page-content-toggle');
			renderAllCharts();
		});	
	}
	
	(function init() {
		chartPropertiesCustomization();
		$(window).resize(chartPropertiesCustomization);
		sidebarToggleOnClick();
	})();
	
});