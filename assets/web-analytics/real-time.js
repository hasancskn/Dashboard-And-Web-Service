$(function () {


	var activeUsers = 0,
	    gazeUsers = 0,
			pageViewsPerSecondLowerLimit,
			pageViewsPerSecondUpperLimit,
			yValuePageViewsPerSecond,
			sumYValuePageViewsPerSecond = 0,
			numberOfSeconds = 1,
			updateChartsInterval,
			updateChartsIntervalLowerLimit = 100, // milliseconds
			updateChartsIntervalUpperLimit = 2000, // milliseconds
			timeoutIdUpdateCharts;
	
	var pageViewsPerSecondDataPoints = [];
	var pageViewsPerMinuteDataPoints = [];
	
	// data for demo only
	var initialDataPageViewsPerSecond = [0];
	var initialDataPageViewsPerMinute = [0];
	
	// data for demo only
	var data = [
		{
			activeUsers: 0,
			pageViewsPerSecondLowerLimit: 0,
			pageViewsPerSecondUpperLimit: 0,

			device: [
				{ name: "views", users: 0},
				{ name: "nonviews", users: 0 },
				
			],
			gender: [
				{ name: "Male", users: 0 },
				{ name: "Female", users: 0 },
				
			],
			emotions: [
				{ name: "Happy", users: 0 },
				{ name: "Disgust", users: 0 },
				{ name: "Suprised", users: 0 },
				{ name: "Confused", users: 0 },
				{ name: "Angry", users: 0 }
			],
			agerange: [
				{ name: "0-17", users: 0 },
				{ name: "18-35", users: 0 },
				{ name: "35-55", users: 0 },
				{ name: "55-65", users: 0 },
				{ name: "65+", users: 0 },
			]
		}
		
	]
    CanvasJS.addColorSet("customColorSet", [
		"#e05850",
		"#ffb367",
		"#e5d8B0",
		"#393f63",
		"#d9695f",
		"#f98461",
	]);
	
	// CanvasJS doughnut chart to show device type of active users
	var usersDeviceDoughnutChart = new CanvasJS.Chart("users-device-doughnut-chart", {
		animationDuration: 800,
		animationEnabled: true,
		backgroundColor: "transparent",
		colorSet: "customColorSet",
		theme: "theme2",
		legend: {
			fontFamily: "calibri",
			fontSize: 14,
			horizontalAlign: "left",
			verticalAlign: "center",
			itemTextFormatter: function (e) {
				return e.dataPoint.name + ": " + Math.round(e.dataPoint.y / gazeUsers * 100) + "%";  
			} 
		},
		title: {
			dockInsidePlotArea: true,
			fontSize: 55,
			fontWeight: "normal",
			horizontalAlign: "center",
			verticalAlign: "center",
			text: "55"
		},
		toolTip: {
			cornerRadius: 0,
			fontStyle: "normal",
			contentFormatter: function (e) {
				return e.entries[0].dataPoint.name + ": " + Math.round(e.entries[0].dataPoint.y / gazeUsers * 100) + "% (" + e.entries[0].dataPoint.y  + ")";
			} 
		},
		data: [
			{
				innerRadius: "80%",
				radius: "90%",
				legendMarkerType: "square",
				showInLegend: true,
				startAngle: 90,
				type: "doughnut",
				dataPoints: [
					{  y: 0, name: "views" },
					{  y: 0, name: "nonviews" },
					
				
				]
			}
		]
	});
	
	
	
	// CanvasJS pie chart to traffic medium of active users
	var usersMediumPieChart = new CanvasJS.Chart("users-medium-pie-chart", {
		animationDuration: 800,
		animationEnabled: true,
		backgroundColor: "transparent",
		colorSet: "customColorSet",
		legend: {
			fontFamily: "calibri",
			fontSize: 14,
			horizontalAlign: "left",
			verticalAlign: "center",
			itemTextFormatter: function (e) {
				return e.dataPoint.name + ": " + Math.round(e.dataPoint.y / activeUsers * 100) + "%";  
			}
		},
		toolTip: {
			cornerRadius: 0,
			fontStyle: "normal",
			contentFormatter: function (e) {
				return e.entries[0].dataPoint.name + ": " + Math.round(e.entries[0].dataPoint.y / activeUsers * 100) + "% (" + e.entries[0].dataPoint.y  + ")";  
			} 
		},
		data: [
			{
				legendMarkerType: "square",
				radius: "90%",
				showInLegend: true,
				startAngle: 90,
				type: "pie",
				dataPoints: [
					{  y: 0, name:"Male" },
					{  y: 0, name:"Female" },
					
				]
			}
		]
	});

	// CanvasJS pie chart to active users by category
	var usersCategoryPieChart = new CanvasJS.Chart("users-category-pie-chart", {
		animationDuration: 800,
		animationEnabled: true,
		backgroundColor: "transparent",
		colorSet: "customColorSet",
		legend: {
			fontFamily: "calibri",
			fontSize: 14,
			horizontalAlign: "left",
			verticalAlign: "center",
			maxWidth: null,
			itemTextFormatter: function (e) {

				// 80 yerine activeUsers olacak
				return e.dataPoint.name + ": " + Math.round(e.dataPoint.y / 80 * 100) + "%";  
			}
		},
		toolTip: {
			cornerRadius: 0,
			fontStyle: "normal",
			contentFormatter: function (e) {
				return e.entries[0].dataPoint.name + ": " + Math.round(e.entries[0].dataPoint.y / 80 * 100) + "% (" + e.entries[0].dataPoint.y  + ")";
			} 
		},
		data: [
			{
				legendMarkerType: "square",
				radius: "90%",
				showInLegend: true,
				startAngle: 90,
				type: "pie",
				dataPoints: [
					{ y: 0, name:"Happy" },
					{ y: 0, name:"Disgust" },
					{ y: 0, name:"Suprised" },
					{ y: 0, name:"Confused" },
					{ y: 0, name:"Angry" }
				
				]
			}
		]
	});
			
	// CanvasJS column chart to show live page views per minute
	/*var pageViewsPerMinuteColumnChart = new CanvasJS.Chart("page-views-per-minute-column-chart", {
		animationDuration: 800,
		animationEnabled: true,
		backgroundColor: "transparent",
		axisX: {
			interval: 1,
			intervalType: "minute",
			labelAutoFit: false,
			labelFontColor: "#717171",
			lineColor: "#a2a2a2",
			tickColor: "transparent",
			tickLength: 2,
			labelFormatter: function(e) {
				var diff, currentTime = (new Date()).getTime();
				diff = Math.floor((e.value.getTime() - currentTime) / (1000 * 60));
				return diff % 15 < 0 ? "" : diff + " min";
			}
		},
		axisY: {
			includeZero: false,
			gridThickness: 0,
			labelFontColor: "#717171",
			lineColor: "#a2a2a2",
			tickColor: "#a2a2a2"
		},
		toolTip: {
			cornerRadius: 0,
			fontStyle: "normal"
		},
		data: [
			{
				color: "#424973",
				xValueFormatString: "hh:mm TT",
				type: "column",
				dataPoints : pageViewsPerMinuteDataPoints
			}
		]
	});
	*/
	var chart = new CanvasJS.Chart("chartContainer", {
	exportEnabled: true,
	animationEnabled: true,
	title:{
		text: "Gender distribution per age"
	},
	axisX: {
		title: "Age Range"
	},
	axisY: {
		title: "Unique Person Count",
		titleFontColor: "#717171",
		lineColor: "#4F81BC",
		labelFontColor: "#4F81BC",
		tickColor: "#4F81BC"
	},
	
	toolTip: {
		shared: true
	},
	legend: {
		cursor: "pointer",
		//itemclick: toggleDataSeries
	},
	data: [
	{
		type: "column",
		name: "Male",
		showInLegend: true,
		yValueFormatString: "#,##0.#",
		dataPoints: [
			{ label: "0-17",  y: 0 },
			{ label: "18-35", y: 0 },
			{ label: "35-55", y: 0 },
			{ label: "55-65",  y: 0 },
			{ label: "65+",  y: 0 }
		]
	},
	{
		type: "column",
		name: "Female",
		showInLegend: true,
		yValueFormatString: "#,##0.#",
		dataPoints: [
			{ label: "0-17", y: 0 },
			{ label: "18-35", y: 0 },
			{ label: "35-55", y: 0 },
			{ label: "55-65", y: 0 },
			{ label: "65+", y: 0 }
		]
	}]
});
chart.render();

	// CanvasJS column chart to show live page views per second
	var pageViewsPerSecondColumnChart = new CanvasJS.Chart("page-views-per-second-column-chart", {
		animationDuration: 800,
		animationEnabled: true,
		backgroundColor: "transparent",
		axisX: {						
			interval: 1,
			intervalType: "second",
			labelAutoFit: false,
			labelFontColor: "#717171",
			lineColor: "#a2a2a2",
			tickColor: "transparent",
			tickLength: 2,
			labelFormatter: function(e) {
				var diff, currentTime = (new Date()).getTime();
				diff = Math.floor((e.value.getTime() - currentTime) / 1000);
				return diff % 15 < 0 ? "" : diff + " sec";
			}
		},
		axisY: {
			gridThickness: 0,
			labelFontColor: "#717171",
			lineColor: "#a2a2a2",
			tickColor: "#a2a2a2"
		},
		toolTip: {
			cornerRadius: 0,
			fontStyle: "normal",
		},
		data: [
			{
				color: "#CD5740",
				xValueFormatString: "hh:mm:ss TT",
				type: "column",
				dataPoints : pageViewsPerSecondDataPoints
			}
		]
	});

	// CanvasJS bar chart to show active users by state
	var usersStateBarChart = new CanvasJS.Chart("users-state-bar-chart", {
		animationDuration: 800,
		animationEnabled: true,
		backgroundColor: "transparent",
		colorSet: "customColorSet",
		axisX: {
			labelFontColor: "#717171",
			labelFontSize: 18,
			lineThickness: 0,
			tickThickness: 0
		},
		axisY: {
			gridThickness: 0,
			lineThickness: 0,
			tickThickness: 0,
			valueFormatString: " "
		},
		toolTip: {
			cornerRadius: 0,
			fontStyle: "normal",
			contentFormatter: function (e) {
				return e.entries[0].dataPoint.label + ": " + Math.round(e.entries[0].dataPoint.y / activeUsers * 100) + "% (" + e.entries[0].dataPoint.y  + ")";
			} 
		},
		data: [
			{
				indexLabelFontColor: "#717171",
				indexLabelFontFamily: "calibri",
				indexLabelFontSize: 18,
				indexLabelPlacement: "outside",
				indexLabelFormatter: function (e) {
					return Math.round(e.dataPoint.y / activeUsers * 100) + "%";  
				},
				type: "bar",
				dataPoints: [
					{ y: 0,  label: "0-17" },
					{ y: 0, label: "18-35" },
					{ y: 0,  label: "35-55" },
					{ y: 0, label: "55-65" },
					{ y: 0, label: "65+" }
				
				]
			}
		]
	});

	usersStateBarChart.render();
	
	//----------------------------------------------------------------------------------//
	var allCharts = [
		usersDeviceDoughnutChart,
		usersMediumPieChart,
		usersCategoryPieChart,
		pageViewsPerSecondColumnChart,
		//pageViewsPerMinuteColumnChart,
		usersStateBarChart,
		toggleDataSeries
	];
	
	// generate random number between given range
	function generateRandomNumber (minimum, maximum) {
		return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
	}
	
	function updateUsersDeviceChart(data) {
		console.log(activeUsers);

		//usersDeviceDoughnutChart.options.title.text = activeUsers.toString();
		usersDeviceDoughnutChart.options.title.text = gazeUsers.toString();
		
		for (var i = 0; i < data.device.length; i++)
			usersDeviceDoughnutChart.options.data[0].dataPoints[i].y = data.device[i].users;
		
		usersDeviceDoughnutChart.render();
	}
	
	function updateUsersMediumPieChart(data) {
		for (var i = 0; i < data.gender.length; i++)
			usersMediumPieChart.options.data[0].dataPoints[i].y = data.gender[i].users;
		
		usersMediumPieChart.render();
	}
	
	function updateUsersCategoryChart(data) {
		for (var i = 0; i < data.emotions.length; i++)
			usersCategoryPieChart.options.data[0].dataPoints[i].y = data.emotions[i].users;
		
		usersCategoryPieChart.render();
	}
	
	function updateUsersStateChart(data) {
		for (var i = 0; i < data.agerange.length; i++)
			usersStateBarChart.options.data[0].dataPoints[i].y = data.agerange[i].users;
		
		usersStateBarChart.render();
	}
	Object.size = function(obj) {
		var size = 0, key;
		for (key in obj) {
			if (obj.hasOwnProperty(key)) size++;
		}
		return size;
	};
	
	// update all charts with revelant demo data, except "Page Views Per Second" and "Page Views Per Minute" charts
	function updateCharts(data, dataIndex) {
		//document.getElementById("gaze_title").innerHTML = getCurrentDateTime();
		activeUsers = data.activeUsers;
		if (typeof data.gaze_users !== "undefined"){
			gazeUsers = data.gaze_users;
		}
		pageViewsPerSecondLowerLimit = data.pageViewsPerSecondLowerLimit;
		pageViewsPerSecondUpperLimit = data.pageViewsPerSecondUpperLimit;
		updateUsersDeviceChart(data);
		updateUsersMediumPieChart(data);
		updateUsersCategoryChart(data);
		updateUsersStateChart(data);
		toggleDataSeries(data);
		//"age_update_time": "NaN",
		//"gaze_update_time": "NaN"
		document.getElementById("age_sync_time").innerHTML = data.age_update_time;
		document.getElementById("gaze_sync_time").innerHTML = data.gaze_update_time;
	}
	
	function updateChartsAtRandomIntervals() {
		var dataIndex = generateRandomNumber(0, data.length - 1);
		updateChartsInterval = generateRandomNumber(updateChartsIntervalLowerLimit, updateChartsIntervalUpperLimit);

		$.get("http://digidoor.8goz.com:5001/get_data2", function(data){
			console.log(data);
			console.log(data.gender);
			// for (var i = 3; i < Object.size(data); i++ )
			updateCharts(data);
		});
		if (timeoutIdUpdateCharts)
			clearTimeout(timeoutIdUpdateCharts);
		
		timeoutIdUpdateCharts = setTimeout(function () {
			updateChartsAtRandomIntervals();
		}, updateChartsInterval);
	}
						
	// populate "Page Views Per Second" and "Page Views Per Minute" charts with initial data
	function populatePageViewsCharts() {
		var time1, time2;

		for (var i = 0; i < 60; i++) {
			time1 = new Date((new Date).getTime() - ((59 - i) * 1000)); // for pageViewsPerSecond chart
			time1.setMilliseconds(0);

			time2 = new Date((new Date).getTime() - ((59 - i) * 60 * 1000)); // for pageViewsPerMinute chart
			time2.setSeconds(0);

			pageViewsPerSecondDataPoints.push({ x: time1, y: initialDataPageViewsPerSecond[i] });
			//pageViewsPerSecondDataPoints.push({ x: time1, y: data.activeUsers });
			pageViewsPerMinuteDataPoints.push({ x: time2, y: initialDataPageViewsPerMinute[i] });
		}

		pageViewsPerSecondColumnChart.render();
		//pageViewsPerMinuteColumnChart.render();
	}


	function toggleDataSeries(e) {
		console.log("TOOGLE DATA: "+chart.data[0].dataPoints[0].y);
                console.log("TOOGLE DATA: "+chart.data[1].dataPoints[0].y);
		console.log("dashboard data: "+chart.data[0].dataPoints.length);

		//chart.data[0].dataPoints = Object.assign({},e.agemale);
		//chart.data[1].dataPoints = Object.create(e.agefemale);
		for (var i=0 ; i < chart.data[0].dataPoints.length; i ++){

			chart.data[0].dataPoints[i].y = e.agemale[i].y;
			chart.data[1].dataPoints[i].y = e.agefemale[i].y;
		}


		/*if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
			e.dataSeries.visible = false;
		} else {
			e.dataSeries.visible = true;
		}*/
		chart.render();
	}
	// update "Page Views Per Second" chart every second and "Page Views Per Minute" chart every minute
	function updatePageViewsCharts() {
		var time1, time2;
		time1 = new Date();
		time1.setMilliseconds(0);
		//yValuePageViewsPerSecond = generateRandomNumber(pageViewsPerSecondLowerLimit, pageViewsPerSecondUpperLimit); 
		yValuePageViewsPerSecond = activeUsers;
		pageViewsPerSecondDataPoints.push({ x: time1, y: yValuePageViewsPerSecond });
    
    if (pageViewsPerSecondDataPoints.length > 60)
    	pageViewsPerSecondDataPoints.shift();

		pageViewsPerSecondColumnChart.render();		

    sumYValuePageViewsPerSecond += yValuePageViewsPerSecond;
		
		if (numberOfSeconds >= 60) {
			time2 = new Date();
			time2.setSeconds(0);
			
    	pageViewsPerMinuteDataPoints.push({ x: time2, y: sumYValuePageViewsPerSecond });
			
			if (pageViewsPerMinuteDataPoints.length > 60) 
				pageViewsPerMinuteDataPoints.shift();
			
      //pageViewsPerMinuteColumnChart.render();
      
			sumYValuePageViewsPerSecond = 0;
      numberOfSeconds = 0;
    }
    
    numberOfSeconds++;
}
	
	// chart properties cutomized further based on screen width	
	function chartPropertiesCustomization(chart) {
		if ($(window).outerWidth() >= 1920) {			
			
			chart.options.legend.fontSize = 14;
			chart.options.legend.horizontalAlign = "left";
			chart.options.legend.verticalAlign = "center";
			chart.options.legend.maxWidth = null;
			
		}else if ($(window).outerWidth() < 1920 && $(window).outerWidth() >= 1200) {
			
			chart.options.legend.fontSize = 14;
			chart.options.legend.horizontalAlign = "left";
			chart.options.legend.verticalAlign = "center";
			chart.options.legend.maxWidth = 140;
			
		} else if ($(window).outerWidth() < 1200 && $(window).outerWidth() >= 992) {
			
			chart.options.legend.fontSize = 12;
			chart.options.legend.horizontalAlign = "center";
			chart.options.legend.verticalAlign = "top";
			chart.options.legend.maxWidth = null;
			
		} else if ($(window).outerWidth() < 992) {
			
			chart.options.legend.fontSize = 14;
			chart.options.legend.horizontalAlign = "center";
			chart.options.legend.verticalAlign = "bottom";
			chart.options.legend.maxWidth = null;
			
		}
		
		chart.render();
	}
	
	function customizeCharts() {
		chartPropertiesCustomization(usersDeviceDoughnutChart);
		chartPropertiesCustomization(usersMediumPieChart);
		chartPropertiesCustomization(usersCategoryPieChart);
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
	function getCurrentDateTime(){

	var currentdate = new Date();
	var datetime = "Last Sync: " + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/"
                + currentdate.getFullYear() + " @ "
                + currentdate.getHours() + ":"
                + currentdate.getMinutes() + ":"
                + currentdate.getSeconds();

	return datetime;

}


	(function init() {
		customizeCharts();
		$(window).resize(customizeCharts);
		populatePageViewsCharts();
		setInterval(updatePageViewsCharts, 1000);
		setTimeout(updateChartsAtRandomIntervals, 4000);
		sidebarToggleOnClick();
	})();
	
});



