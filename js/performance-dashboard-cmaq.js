// CSV parser for CMAQ (congestion management and air quality 'mpo' CSV file
var cmaq_mpo_RowConverter = function(d) {
	var temp = {};
/*
	temp = {
		perf_meas:		d['Performance Measure'],
		baseline:		+d['Baseline'].replace('%',''),
		targ_2025:		+d['Four Year Target (2025)'].replace('%',''),
		targ_2023:		+d['Two Year Target (2023)'].replace('%',''),
		targ_2021:		+d['Four Year Target (2021)'].replace('%',''),
		targ_2019:		+d['Two Year Target (2019)'].replacce('%',''),
		
		perf_2021:		+d['Four Year Performance (2021)'].replace('%',''),
		perf_2020:		+d['Performance 2020'].replace('%',''),
		perf_2019:		+d['Two Year Performance (2019)'].replace('%',''),
		perf_2018:		+d['Performance 2018'].replace('%',''),
		perf_2017:		+d['Performance 2017'].replace('%','')
	}
*/
	return temp;
};


function generate_cmaq_viz(xValues, yValues_targ, yValues_perf, canvas_id, chart_title, xAxis_label, yAxis_label) {
	
	
	
	return; // for now

} // generate_cmaq_viz



function cmaq_viz(cmaq_mpo_data) {
	console.log('Entered cmaq_viz');
	
	return; // for now
	
	var canvas_id = '';
	var title = '';
	var xAxis_label = 'Year';
	var yAxis_label = '';
	var xValues = [ 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025 ];
	var yValues_nonsov = [];	
	
	// Generate a line chart for the CMAQ non-SOV data
	canvas_id = 'percent-non-sov-viz';
	titie = 'Percentage of Non-Single Occupant Vehicle Travel';
	xAxis_label = 'Year';
	xAxis_label = 'Percent';
	
	var non_sov = _.find(cmaq_mpo_data, function(o) { return o.perf_meas == 'Percentage of non single occupant vehicle travel'; });
	
	yValues_perf = [ non_sov.perf_2017, non_sov.perf_2018, non_sov.perf_2019, non_sov.perf_2020, non_sov.perf_2021, null, null, null, null ];
	yValue_targ = [ null, null, non_sov.targ_2019, null, null, null, non_sov.targ_2023, null, non_sov.targ_2025 ];
	
	generate_cmaq_viz(xValues, yValues_targ, yValues_perf, canvas_id, title, xAxis_label, yAxis_label);

	return; // for now
	
	
	
	// Generate a line chart for the annual hours of PHED
	canvas_id = 'phed-viz';
	titie = 'Annual Hours of Peak Hour Excessive Delay';
	xAxis_label = 'Year';
	xAxis_label = 'Hours';
	
	generate_cmaq_viz(xValues, yValues_nonsov_targ, yValues_nonsov_perf, canvas_id, title, xAxis_label, yAxis_label);
	
	
	// Generate a line chart for emissions reductions
	canvas_id = 'emissions-reductions-viz';
	titie = 'Total emissions reduction for applicable pollutants and precursors for CMAQ funded projects in designated nonattainment and maintenance areas';
	xAxis_label = 'Year';
	xAxis_label = 'Percent';
	
	generate_cmaq_viz(xValues, yValues_nonsov_targ, yValues_nonsov_perf, canvas_id, title, xAxis_label, yAxis_label);
	
} // cmaq_viz

