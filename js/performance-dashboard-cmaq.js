// CSV parser for CMAQ (congestion management and air quality 'mpo' CSV file
var cmaq_mpo_RowConverter = function(d) {
	// These cells in the spreadsheet contain '%' symbols for some reason
	var retval = {
		perf_meas:		d['Performance Measure'],
		baseline:		+(d['Baseline'].replace('%','')),
		targ_2025:		+(d['Four Year Target (2025)'].replace('%','')),
		targ_2023:		+(d['Two Year Target (2023)'].replace('%','')),
		targ_2021:		+(d['Two Year Target (2019)'].replace('%','')),
		perf_2021:		+(d['Four Year Performance (2021)'].replace('%','')),
		perf_2020:		+(d['Performance 2020'].replace('%','')),
		perf_2019:		+(d['Two Year Performance (2019)'].replace('%','')),
		perf_2018:		+(d['Performance 2018'].replace('%','')),
		perf_2017:		+(d['Performance 2017'].replace('%',''))
	}
	return retval;
};


function generate_cmaq_viz(xValues, yValues_targ, yValues_perf, canvas_id, chart_title, xAxis_label, yAxis_label) {
	// Generate a line chart for CMAQ data
	var perf_dataset = { 	label: 'Performance (State)',
							backgroundColor: 'rgba(58,200,225,.75)',
							borderWidth: 1.5,
							borderColor:  'rgb(58,200,255)',
							spanGaps: true,
							data: yValues_perf
						};
	var targ_dataset = { 	label: 'Target (State)',
							backgroundColor: 'rgb(0,204,107,.75)',
							borderWidth: 1.5,
							borderColor: 'rgb(0,204,107)',
							spanGaps: true,
							data: yValues_targ
							};

	var aDatasets = [  perf_dataset, targ_dataset ];

	var ctx = document.getElementById(canvas_id);
	var cfg = {
		type: 'line',
		data: {
			datasets: aDatasets,
			labels: xValues
		},
		options: {
			plugins: {
				title: { display: true,
				         text: chart_title 
				}
			},
			scales: {
				x: { title: { display: true,  text: xAxis_label } },
				y: { title: { display: true,  text: yAxis_label } }
			}
		}
	}
	new Chart(ctx, cfg);
} // generate_cmaq_viz



function cmaq_viz(cmaq_mpo_data) {
	console.log('Entered cmaq_viz');
	
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
	yValues_targ = [ null, null, non_sov.targ_2019, null, null, null, non_sov.targ_2023, null, non_sov.targ_2025 ];
	
	generate_cmaq_viz(xValues, yValues_targ, yValues_perf, canvas_id, title, xAxis_label, yAxis_label);
	
	
	// Generate a line chart for the annual hours of PHED
	canvas_id = 'phed-viz';
	titie = 'Annual Hours of Peak Hour Excessive Delay';
	xAxis_label = 'Year';
	xAxis_label = 'Hours';
	
	var phed = _.find(cmaq_mpo_data, function(o) { return o.perf_meas == 'Annual hours of peak hour excessive delay per capita (for travel on NHS roadways)'; });
	
	yValues_perf = [ phed.perf_2017, phed.perf_2018, phed.perf_2019, phed.perf_2020, phed.perf_2021, null, null, null, null ];
	yValues_targ = [ null, null, phed.targ_2019, null, null, null, phed.targ_2023, null, phed.targ_2025 ];
	
	generate_cmaq_viz(xValues, yValues_targ, yValues_perf, canvas_id, title, xAxis_label, yAxis_label);
	
	
	// Generate a line chart for emissions reductions
	canvas_id = 'emissions-reductions-viz';
	titie = 'Total emissions reduction for applicable pollutants and precursors for CMAQ funded projects in designated nonattainment and maintenance areas';
	xAxis_label = 'Year';
	xAxis_label = 'Percent';
	
	var emissions = _.find(cmaq_mpo_data, 
	                       function(o) { return o.perf_meas == 'Total emissions reduction for applicable pollutants and precursors for CMAQ funded projects in designated nonattainment and maintenance areas'; });
	
	yValues_perf = [ emissions.perf_2017, emissions.perf_2018, emissions.perf_2019, emissions.perf_2020, emissions.perf_2021, null, null, null, null ];
	yValues_targ = [ null, null, emissions.targ_2019, null, null, null, emissions.targ_2023, null, emissions.targ_2025 ];
	
	generate_cmaq_viz(xValues, yValues_targ, yValues_perf, canvas_id, title, xAxis_label, yAxis_label);
} // cmaq_viz

