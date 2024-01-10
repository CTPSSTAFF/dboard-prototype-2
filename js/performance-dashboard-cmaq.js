// CSV parser for CMAQ (congestion management and air quality 'mpo' CSV file
var cmaq_mpo_RowConverter = function(d) {
	temp = {
		perf_meas:		d['Performance Measure'],
		baseline:		+d['Baseline'],
		targ_2025:		+d['Four-Year Target (2025)'],
		targ_2023:		+d['Two-Year Target (2023)'],
		targ_2019:		+d['Two Year Target (2019)'],
		
		perf_2021:		+d['Four Year Performance (2021)'],
		perf_2020:		+d['Performance 2020'],
		perf_2019:		+d['Two Year Performance (2019)'],
		perf_2018:		+d['Performance 2018'],
		perf_2017:		+d['Performance 2017']
	}
	return temp;
};


function generate_cmaq_viz(xValues, yValues_state_targ, yValues_state_perf, yValues_mpo_perf, canvas_id, chart_title, xAxis_label, yAxis_label) {
	
	return; // for now

} // generate_cmaq_viz



function cmaq_viz(cmaq_mpo_data) {
	console.log('Entered cmaq_viz');
	return; // for now
	
	// Generate a line chart for the CMAQ data

	// generate_cmaq_viz(xValues, yValues_state_targ, yValues_state_perf, yValues_mpo_perf, canvas_id, chart_title, xAxis_label, yAxis_label);
} // cmaq_viz

