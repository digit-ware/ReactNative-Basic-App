export default `
<!DOCTYPE html>
<html>
<head>
<script>
function renderChart(dataValues) {
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
			dataPoints: dataValues
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


function documentLoad() {
	window.ReactNativeWebView.postMessage(JSON.stringify({
		type: 'DOCUMENT_LOAD',
	}))
}
</script>
</head>
<body onLoad="documentLoad();" style="height: 100%; width: 100%; background-color: #F0F0F0">
<div id="chartContainer" style="height: 300px; width: 100%;"></div>
<script src="https://canvasjs.com/assets/script/canvasjs.min.js"></script>
</body>
</html>
`;
