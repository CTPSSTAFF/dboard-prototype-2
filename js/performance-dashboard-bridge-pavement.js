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



function generate_bp_viz(xValues, yValues_state, yValues_mpo, layout, div_id) {
	var trace_state = {
		x: xValues,
		y: yValues_state,
		name: 'Statewide',
		text: yValues_state.map(String),
		mode: 'lines+markers',
		connectgaps: true
	}
	
	if (yValues_mpo != null) {
		var trace_mpo = {
			x: xValues,
			y: yValues_mpo,
			name: 'MPO (2021)',
			text: yValues_mpo.map(String),
			mode: 'markers'	
		};
	}
	
	if (yValues_mpo != null) {
		data = [trace_state, trace_mpo]; 
	} else {
		data = [trace_state];
	}
	
	var config = {responsive: true};
	
	Plotly.newPlot(div_id, data, layout, config);
} //generate_bp_viz

function bridge_pavement_viz(bp_state_data, bp_mpo_data) {
	console.log('Entered bridge_pavement_viz');
	
	// Percent of NHS bridges in good condition
	var xValues = [ '2020 Baseline', '2021', '2022',  '2-year Target (2023)', '2024', '5-year Target (2025)' ];
	var yValues_state = [], yValues_mpo = [];
	var div_id = '';
	var layout = { 
		autosize: true,
		width: 	900,
		xaxis: { type: 'category',
				 automargin: true },
		yaxis: { automargin: true },
	};

	
	// NHS bridges in GOOD condition
	div_id = 'bridges-good-viz';
	var bridge_good_state = _.find(bp_state_data, function(o) { return o.perf_meas == 'Percent of NHS bridges by deck area classified as in good condition'; });
	var bridge_good_mpo   = _.find(bp_mpo_data, function(o) { return o.perf_meas == 'Percent of NHS bridges by deck area classified as in good condition'; });
	
	yValues_state = [ bridge_good_state.baseline, null, null, bridge_good_state.targ_2023, null, bridge_good_state.targ_2025 ];
	yValues_mpo   = [ null, bridge_good_mpo.cond_2021, null, null, null, null ];
	
	var mylayout = JSON.parse(JSON.stringify(layout));
	mylayout.yaxis.range = [0, 20];
	mylayout.title = 'Percent of NHS Bridges in Good Condition';

	generate_bp_viz(xValues, yValues_state, yValues_mpo, mylayout, div_id);
	
	
	// NHS bridges in POOR condition
	div_id = 'bridges-poor-viz';
	var bridge_poor_state = _.find(bp_state_data, function(o) { return o.perf_meas == 'Percent of NHS bridges by deck area classified as in poor condition'; });
	var bridge_poor_mpo   = _.find(bp_mpo_data, function(o) { return o.perf_meas == 'Percent of NHS bridges by deck area classified as in poor condition'; });
	
	yValues_state = [ bridge_poor_state.baseline, null, null, bridge_poor_state.targ_2023, null, bridge_poor_state.targ_2025 ];
	yValues_mpo   = [ null, bridge_poor_mpo.cond_2021, null, null, null, null ];
	
	mylayout = JSON.parse(JSON.stringify(layout));
	mylayout.yaxis.range = [0, 20];
	mylayout.title = 'Percent of NHS Bridges in Poor Condition';
	
	generate_bp_viz(xValues, yValues_state, yValues_mpo, mylayout, div_id);
	

	// Interstate pavement in GOOD condition
	div_id = 'interstate-pavement-good-viz';
	var interstate_good_state = _.find(bp_state_data, function(o) { return o.perf_meas == 'Percent of pavements on the Interstate System in good condition'; });    
	// NOTE: There is **NO** interstate pavement condition data for the MPO only
	yValues_state = [ interstate_good_state.baseline, null, null, interstate_good_state.targ_2023, null, interstate_good_state.targ_2025 ];		
	
	mylayout = JSON.parse(JSON.stringify(layout));
	mylayout.yaxis.range = [0, 100];
	mylayout.title = 'Percent of Pavements on the Interstate System in Good Condition'

	generate_bp_viz(xValues, yValues_state, null, mylayout, div_id);
	
	
	// Interstate pavement in POOR condition
	div_id = 'interstate-pavement-poor-viz';
	caption = 'Percent of Pavements on the Interstate System in Poor Condition';
	var interstate_poor_state = _.find(bp_state_data, function(o) { return o.perf_meas == 'Percent of pavements on the Interstate System in poor condition'; });  
	// NOTE: There is **NO** interstate pavement condition data for the MPO only
	yValues_state = [ interstate_poor_state.baseline, null, null, interstate_poor_state.targ_2023, null, interstate_poor_state.targ_2025 ];	
	
	mylayout = JSON.parse(JSON.stringify(layout));
	mylayout.yaxis.range = [0, 20];
	mylayout.title = 'Percent of Pavements on the Interstate System in Poor Condition';
	
	generate_bp_viz(xValues, yValues_state, null, mylayout, div_id);
	

	// Non-interstate NHS pavement in GOOD condition
	div_id = 'non-interstate-pavement-good-viz';
	var noninterstate_good_state = _.find(bp_state_data, function(o) { return o.perf_meas == 'Percent of pavements on the non-Interstate NHS in good condition'; });  
	var noninterstate_good_mpo   = _.find(bp_mpo_data, function(o) { return o.perf_meas == 'Percent of pavements on the non-Interstate NHS in good condition'; });
	
	yValues_state = [ noninterstate_good_state.baseline, null, null, noninterstate_good_state.targ_2023, null, noninterstate_good_state.targ_2025 ];
	yValues_mpo   = [ null, noninterstate_good_mpo.cond_2021, null, null, null, null ];
	
	mylayout = JSON.parse(JSON.stringify(layout));
	mylayout.yaxis.range = [0, 100];
	mylayout.title = 'Percent of pavements on the non-Interstate NHS in Good condition';

	generate_bp_viz(xValues, yValues_state, yValues_mpo, mylayout, div_id);
	
		
	// Non-interstate NHS pavement in POOR condition
	div_id = 'non-interstate-pavement-poor-viz';
	var noninterstate_poor_state = _.find(bp_state_data, function(o) { return o.perf_meas == 'Percent of pavements on the non-Interstate NHS in poor condition'; });  
	var noninterstate_poor_mpo  = _.find(bp_mpo_data, function(o) { return o.perf_meas == 'Percent of pavements on the non-Interstate NHS in poor condition'; });
	
	yValues_state = [ noninterstate_poor_state.baseline, null, null, noninterstate_poor_state.targ_2023, null, noninterstate_poor_state.targ_2025 ];
	yValues_mpo   = [ null, noninterstate_poor_mpo.cond_2021, null, null, null, null ];	
	
	mylayout = JSON.parse(JSON.stringify(layout));
	mylayout.yaxis.range = [0, 30];
	mylayout.title = 'Percent of pavements on the non-Interstate NHS in Poor condition';
	
	generate_bp_viz(xValues, yValues_state, yValues_mpo, mylayout, div_id);	
} // bridge_pavement_viz
