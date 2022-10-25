export default `
<!DOCTYPE html>
<html>
<head>
<script>

window.onmessage = function getMessage(message) {
	const action = JSON.parse(message.data);
	console.log('received action with type ' + action.type);
	console.log(action.payload)
	switch (action.type) {
		case 'ADD_DATA':
			debugger
			renderChart(action.payload);
			break;
	}
}


function renderChart(dataValues) () {
	var chart = new CanvasJS.Chart("chartContainer", {
		exportEnabled: true,
		animationEnabled: true,
		title:{
			text: "Car Parts Sold in Different States"
		},
		subtitles: [{
			text: "Click Legend to Hide or Unhide Data Series"
		}], 
		axisX: {
			title: "States"
		},
		axisY: {
			title: "Oil Filter - Units",
			titleFontColor: "#4F81BC",
			lineColor: "#4F81BC",
			labelFontColor: "#4F81BC",
			tickColor: "#4F81BC",
			includeZero: true
		},
		axisY2: {
			title: "Clutch - Units",
			titleFontColor: "#C0504E",
			lineColor: "#C0504E",
			labelFontColor: "#C0504E",
			tickColor: "#C0504E",
			includeZero: true
		},
		toolTip: {
			shared: true
		},
		legend: {
			cursor: "pointer",
			itemclick: toggleDataSeries
		},
		data: [{
			type: "column",
			name: "Oil Filter",
			showInLegend: true,      
			yValueFormatString: "#,##0.# Units",
			dataPoints: valueData
		}]
	});
	chart.render();

	function toggleDataSeries(e) {
		if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
			e.dataSeries.visible = false;
		} else {
			e.dataSeries.visible = true;
		}
		e.chart.render();
	}
}
</script>
</head>
<body>
<div id="chartContainer" style="height: 300px; width: 100%;"></div>
<script src="https://canvasjs.com/assets/script/canvasjs.min.js"></script>
</body>
</html>
`;
