// CSV parser for bridge and pavement 'state' CSV file
var b_and_p_state_RowConverter = function(d) {
	return {
		perf_meas:	 	d['Performance Measure'],
		baseline:		+d['Baseline'],
		targ_2023:		+d['Two-Year Target (CY 2023)'],
		targ_2025:		+d['Four-Year Target (CY 2025)']
	}
};

var b_and_p_mpo_RowConverter = function(d) {
	return {
		perf_meas:	 	d['Performance Measure'],
		cond_2021:		+d['2021 Conditions']
	}
};



function generate_bridge_viz(xValues, yValues_state_good, yValues_state_poor, yValues_mpo_good, yValues_mpo_poor,
                             canvas_id, chart_title, xAxis_label, yAxis_label) {
	// Generate a bar chart for bridge condition data
	// Although Sam suggested a line chart, it doesn't look very effective in practice
	var state_good_dataset = { 	label: 'Percent in Good Condition by Deck Area (State)',
								backgroundColor: 'rgba(0,255,0,.75)',
								borderWidth: 1.5,
								borderColor:  'rgb(8,48,107)',
								spanGaps: true,
								data: yValues_state_good
						};
	var state_poor_dataset = { 	label: 'Percent in Poor Condition by Deck Area (State)',
								backgroundColor: 'rgb(255,0,0,.75)',
								borderWidth: 1.5,
								borderColor: 'rgb(8,48,107)',
								spanGaps: true,
								data: yValues_state_poor
							};
	var mpo_good_dataset = 	{ 	label: 'Percent in Good Condition by Deck Area (MPO)',
								backgroundColor: 'rgba(0,0,255,.75)',
								borderWidth: 1.5,
								borderColor: 'rgb(8,48,107)',
								spanGaps: true,
								data: yValues_mpo_good
							};
	var mpo_poor_dataset = 	{ 	label: 'Percent in Poor Condition by Deck Area (MPO)',
								backgroundColor: 'rgba(255,165,0,.75)',
								borderWidth: 1.5,
								borderColor: 'rgb(8,48,107)',
								spanGaps: true,
								data: yValues_mpo_poor
							};	
	
	var aDatasets = [ state_good_dataset, state_poor_dataset, mpo_good_dataset, mpo_poor_dataset ];
	var ctx = document.getElementById(canvas_id);
	var cfg = {
		type: 'bar',
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
	};
	new Chart(ctx, cfg);	
} // generate_bridge_viz

function generate_pavement_viz(xValues, yValues_state_good, yValues_state_poor, yValues_mpo_good, yValues_mpo_poor,
                               canvas_id, chart_title, xAxis_label, yAxis_label) {
	// Generate a bar chart for pavement condition data
	// Although Sam suggested a line chart, it doesn't look very effective in practice
	var state_good_dataset = { 	label: 'Percent of Pavement in Good Condition (State)',
								backgroundColor: 'rgba(0,255,0,.75)',
								borderWidth: 1.5,
								borderColor:  'rgb(8,48,107)',
								spanGaps: true,
								data: yValues_state_good
						};
	var state_poor_dataset = { 	label: 'Percent of Pavement in Poor Condition (State)',
								backgroundColor: 'rgb(255,0,0,.75)',
								borderWidth: 1.5,
								borderColor: 'rgb(8,48,107)',
								spanGaps: true,
								data: yValues_state_poor
							};
	var mpo_good_dataset = 	{ 	label: 'Percent of Pavement in Good Condition (MPO)',
								backgroundColor: 'rgba(0,0,255,.75)',
								borderWidth: 1.5,
								borderColor: 'rgb(8,48,107)',
								spanGaps: true,
								data: yValues_mpo_good
							};
	var mpo_poor_dataset = 	{ 	label: 'Percent of Pavement in Poor Condition (MPO)',
								backgroundColor: 'rgba(255,165,0,.75)',
								borderWidth: 1.5,
								borderColor: 'rgb(8,48,107)',
								spanGaps: true,
								data: yValues_mpo_poor
							};	
	
	// Note that there are some metrics for which there is no MPO-specific data. Take this into account
	var aDatasets = [];
	if (yValues_mpo_good != null) {
		aDatasets = [ state_good_dataset, state_poor_dataset, mpo_good_dataset, mpo_poor_dataset ];
	} else {
		aDatasets = [ state_good_dataset, state_poor_dataset ];
	}
	
	var ctx = document.getElementById(canvas_id);
	var cfg = {
		type: 'bar',
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
	};
	new Chart(ctx, cfg);
} // generate_pavement_viz


function bridge_pavement_viz(bp_state_data, bp_mpo_data) {
	var canvas_id = '';
	var title = '';
	var xAxis_label = 'Year';
	var yAxis_label = '';
	var xValues = [ 2020, 2021, 2022, 2023, 2024, 2025 ];
	var yValues_state_good = [], yValues_state_poor = [], yValues_mpo_good = [], yValues_mpo_poor = [];
	
	
	// Percent of NHS bridges in GOOD or POOR condition
	var canvas_id = 'bridge-viz';
	var title = 'Condition of Bridges on NHS Roadways';
	var xAxis_label = 'Year';
	var yAxis_label = 'Percent';
	
	var bridge_state_good = _.find(bp_state_data, function(o) { return o.perf_meas == 'Percent of NHS bridges by deck area classified as in good condition'; });
	var bridge_state_poor = _.find(bp_state_data, function(o) { return o.perf_meas == 'Percent of NHS bridges by deck area classified as in poor condition'; });
	var bridge_mpo_good   = _.find(bp_mpo_data,   function(o) { return o.perf_meas == 'Percent of NHS bridges by deck area classified as in good condition'; });
	var bridge_mpo_poor   = _.find(bp_mpo_data,   function(o) { return o.perf_meas == 'Percent of NHS bridges by deck area classified as in poor condition'; })
	
	                       // baseline == 2020
	yValues_state_good = [ bridge_state_good.baseline, null, null, bridge_state_good.targ_2023, null, bridge_state_good.targ_2025 ];
	yValues_state_poor = [ bridge_state_poor.baseline, null, null, bridge_state_poor.targ_2023, null, bridge_state_poor.targ_2025 ];
	yValues_mpo_good   = [ null, bridge_mpo_good.cond_2021, null, null, null, null ];
	yValues_mpo_poor   = [ null, bridge_mpo_poor.cond_2021, null, null, null, null ];
	

	generate_bridge_viz(xValues, yValues_state_good, yValues_state_poor, yValues_mpo_good, yValues_mpo_poor,
                        canvas_id, title, xAxis_label, yAxis_label);
	
	
	// Interstate pavement in GOOD or POOR condition
	// NOTE: There is **NO** interstate pavement condition data for the MPO only
	var canvas_id = 'interstate-pavement-viz';
	var title = 'Pavement Condition on Interstate Roads';
	var xAxis_label = 'Year';
	var yAxis_label = 'Percent';
	
	var interstate_state_good = _.find(bp_state_data, function(o) { return o.perf_meas == 'Percent of pavements on the Interstate System in good condition'; });
	var interstate_state_poor = _.find(bp_state_data, function(o) { return o.perf_meas == 'Percent of pavements on the Interstate System in poor condition'; });
	
	yValues_state_good = [ interstate_state_good.baseline, null, null, interstate_state_good.targ_2023, null, interstate_state_good.targ_2025 ];
	yValues_state_poor = [ interstate_state_poor.baseline, null, null, interstate_state_poor.targ_2023, null, interstate_state_poor.targ_2025 ];
	
	generate_pavement_viz(xValues, yValues_state_good, yValues_state_poor, null, null, canvas_id, title, xAxis_label, yAxis_label);
	
	
	// Non-interstate NHS pavement in GOOD or POOR condition
	var canvas_id = 'non-interstate-pavement-viz';
	var title = 'Pavement Condition on Non-Interstate NHS Roads';
	var xAxis_label = 'Year';
	var yAxis_label = 'Percent';

	var noninterstate_good_state = _.find(bp_state_data, function(o) { return o.perf_meas == 'Percent of pavements on the non-Interstate NHS in good condition'; });  
	var noninterstate_poor_state = _.find(bp_state_data, function(o) { return o.perf_meas == 'Percent of pavements on the non-Interstate NHS in poor condition'; });
	var noninterstate_good_mpo   = _.find(bp_mpo_data, function(o) { return o.perf_meas == 'Percent of pavements on the non-Interstate NHS in good condition'; });
	var noninterstate_poor_mpo   = _.find(bp_mpo_data, function(o) { return o.perf_meas == 'Percent of pavements on the non-Interstate NHS in poor condition'; });
	
	yValues_state_good = [ noninterstate_good_state.baseline, null, null, noninterstate_good_state.targ_2023, null, noninterstate_good_state.targ_2025 ];
	yValues_state_poor = [ noninterstate_poor_state.baseline, null, null, noninterstate_poor_state.targ_2023, null, noninterstate_poor_state.targ_2025 ];
	yValues_mpo_good   = [ noninterstate_good_mpo.baseline, null, null, noninterstate_good_mpo.targ_2023, null, noninterstate_good_mpo.targ_2025 ];
	yValues_mpo_poor   = [ noninterstate_poor_mpo.baseline, null, null, noninterstate_poor_mpo.targ_2023, null, noninterstate_poor_mpo.targ_2025 ];
	
	generate_pavement_viz(xValues, yValues_state_good, yValues_state_poor, yValues_mpo_good, yValues_mpo_poor, canvas_id, title, xAxis_label, yAxis_label);
} // bridge_pavement_viz
