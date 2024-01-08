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



function generate_bp_viz(xValues, yValues_state_targ, yValues_state_perf, yValues_mpo_perf, canvas_id, chart_title, xAxis_label, yAxis_label) {
	
} // generate_bp_viz


function bridge_pavement_viz(bp_state_data, bp_mpo_data) {
	console.log('bridge_pavement_viz: stubbed-out routine');
	
	return; // for now
	
	// 


	
	// Percent of NHS bridges in GOOD condition

	var bridge_good_state = _.find(bp_state_data, function(o) { return o.perf_meas == 'Percent of NHS bridges by deck area classified as in good condition'; });
	var bridge_good_mpo   = _.find(bp_mpo_data, function(o) { return o.perf_meas == 'Percent of NHS bridges by deck area classified as in good condition'; });
	
	yValues_state = [ bridge_good_state.baseline, null, null, bridge_good_state.targ_2023, null, bridge_good_state.targ_2025 ];
	yValues_mpo   = [ null, bridge_good_mpo.cond_2021, null, null, null, null ];
	
	// generate_bp_viz(xValues, yValues_state, yValues_mpo, mylayout, div_id);
	
	
	// Percent of NHS bridges in POOR condition

	var bridge_poor_state = _.find(bp_state_data, function(o) { return o.perf_meas == 'Percent of NHS bridges by deck area classified as in poor condition'; });
	var bridge_poor_mpo   = _.find(bp_mpo_data, function(o) { return o.perf_meas == 'Percent of NHS bridges by deck area classified as in poor condition'; });
	
	yValues_state = [ bridge_poor_state.baseline, null, null, bridge_poor_state.targ_2023, null, bridge_poor_state.targ_2025 ];
	yValues_mpo   = [ null, bridge_poor_mpo.cond_2021, null, null, null, null ];
	
	// generate_bp_viz(xValues, yValues_state, yValues_mpo, mylayout, div_id);
	

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
