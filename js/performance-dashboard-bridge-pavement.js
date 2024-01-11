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
	// Generate a line chart for bridge condition data
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


function bridge_pavement_viz(bp_state_data, bp_mpo_data) {
	var canvas_id = '';
	var title = '';
	var xAxis_label = 'Year';
	var yAxis_label = '';
	var xValues = [ 2020, 2021, 2022, 2023, 2024, 2025 ];
	var yValues_state_good = [], yValues_state_poor = [], yValues_mpo_good = [], yValues_mpo_poor = [];
	
	console.log('Entering bridge_pavement_viz');
	
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
	
	
	return; // for now
	
	

	// Interstate pavement in GOOD condition
	var interstate_good_state = _.find(bp_state_data, function(o) { return o.perf_meas == 'Percent of pavements on the Interstate System in good condition'; });    
	// NOTE: There is **NO** interstate pavement condition data for the MPO only
	yValues_state = [ interstate_good_state.baseline, null, null, interstate_good_state.targ_2023, null, interstate_good_state.targ_2025 ];		
	
	// generate_bp_viz(xValues, yValues_state, null, mylayout, div_id);
	
	
	// Interstate pavement in POOR condition

	var interstate_poor_state = _.find(bp_state_data, function(o) { return o.perf_meas == 'Percent of pavements on the Interstate System in poor condition'; });  
	// NOTE: There is **NO** interstate pavement condition data for the MPO only
	yValues_state = [ interstate_poor_state.baseline, null, null, interstate_poor_state.targ_2023, null, interstate_poor_state.targ_2025 ];	
	
	// generate_bp_viz(xValues, yValues_state, null, mylayout, div_id);
	

	// Non-interstate NHS pavement in GOOD condition

	var noninterstate_good_state = _.find(bp_state_data, function(o) { return o.perf_meas == 'Percent of pavements on the non-Interstate NHS in good condition'; });  
	var noninterstate_good_mpo   = _.find(bp_mpo_data, function(o) { return o.perf_meas == 'Percent of pavements on the non-Interstate NHS in good condition'; });
	
	yValues_state = [ noninterstate_good_state.baseline, null, null, noninterstate_good_state.targ_2023, null, noninterstate_good_state.targ_2025 ];
	yValues_mpo   = [ null, noninterstate_good_mpo.cond_2021, null, null, null, null ];
	
	// generate_bp_viz(xValues, yValues_state, yValues_mpo, mylayout, div_id);
	
		
	// Non-interstate NHS pavement in POOR condition
	var noninterstate_poor_state = _.find(bp_state_data, function(o) { return o.perf_meas == 'Percent of pavements on the non-Interstate NHS in poor condition'; });  
	var noninterstate_poor_mpo  = _.find(bp_mpo_data, function(o) { return o.perf_meas == 'Percent of pavements on the non-Interstate NHS in poor condition'; });
	
	yValues_state = [ noninterstate_poor_state.baseline, null, null, noninterstate_poor_state.targ_2023, null, noninterstate_poor_state.targ_2025 ];
	yValues_mpo   = [ null, noninterstate_poor_mpo.cond_2021, null, null, null, null ];	
	
	// generate_bp_viz(xValues, yValues_state, yValues_mpo, mylayout, div_id);	
} // bridge_pavement_viz
