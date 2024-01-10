// CSV parser for TTR (travel time reliability) 'statewide' CSV file
var ttr_state_RowConverter = function(d) {
	return {
		perf_meas:		d['Performance Measure'],
		targ_2025:		+d['Four Year Target (2025)'],
		targ_2023:		+d['Two Year Target (2023)'],
		targ_2021:		+d['2021 Target'],
		targ_2019:		+d['2019 Target'],
		perf_2021:		+d['2021 Performance'],
		perf_2020:		+d['2020 Performance'],
		perf_2019:		+d['2019 Performance'],
		perf_2018:		+d['2018 Performance'],
		perf_2017:		+d['2017 Performance'],
	}
};

// CSV parser for TTR (travel time reliability) 'mpo' CSV file
var ttr_mpo_RowConverter = function(d) {
	return {
		perf_meas:		d['Performance Measure'],
		perf_2021:		+d['2021 Performance'],
		perf_2020:		+d['2020 Performance'],
		perf_2019:		+d['2019 Performance'],
		perf_2018:		+d['2018 Performance'],
		perf_2017:		+d['2017 Performance'],
	}
};


function generate_ttr_viz(xValues, yValues_state_targ, yValues_state_perf, yValues_mpo_perf, canvas_id, chart_title, xAxis_label, yAxis_label) {
	// Generate a line chart for TTR data
	var state_perf_dataset = { 	label: 'Performance (State)',
								backgroundColor: 'rgba(58,200,225,.75)',
								borderWidth: 1.5,
								borderColor:  'rgb(58,200,255)',
								spanGaps: true,
								data: yValues_state_perf
						};
	var state_targ_dataset = { 	label: 'Target (State)',
								backgroundColor: 'rgb(0,204,107,.75)',
								borderWidth: 1.5,
								borderColor: 'rgb(0,204,107)',
								spanGaps: true,
								data: yValues_state_targ
							};
	var mpo_perf_dataset = 	{ 	label: 'Performance (MPO)',
								backgroundColor: 'rgba(255,144,17,.75)',
								borderWidth: 1.5,
								borderColor: 'rgb(255,144,17)',
								spanGaps: true,
								data: yValues_mpo_perf
							};
							
	// Note: Handle case that some viz's do not have state target data
	var aDatasets = [];
	if (yValues_state_targ != null) {
		aDatasets = [ state_perf_dataset, state_targ_dataset, mpo_perf_dataset ];
	} else {
		aDatasets = [ state_perf_dataset, mpo_perf_dataset ];
	}
	
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
} // generate_ttr_viz


function ttr_viz(ttr_state_data, ttr_mpo_data) {
	console.log('Entered ttr_viz');
	
	var xValues = [ 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025 ];;
	var yValues_state_perf = [], yValues_state_targ = [], yValues_mpo_perf = [];
	var canvas_id = '';
	var title = '';
	var xAxis_label = 'Year';
	var yAxis_label = '';
	
	// Interstate TTR - all vehicles 
	canvas_id = 'ttr-interstate-viz';
	title = 'Percent of Person-miles on the Interstate System That Are Reliable';
	yAxis_label = 'Percent of Person-miles That Are Reliable';
	
	var interstate_ttr_state = _.find(ttr_state_data, function(o) { return o.perf_meas == 'Percent of the person miles traveled on the Interstate System that are reliable_Statewide'; });
	var interstate_ttr_mpo = _.find(ttr_mpo_data, function(o) { return o.perf_meas == 'Percent of the person miles traveled on the Interstate System that are reliable_Boston Region'; });
	
	yValues_state_targ = [ null, null, interstate_ttr_state.targ_2019, null, interstate_ttr_state.targ_2021, null, interstate_ttr_state.targ_2023, null, interstate_ttr_state.targ_2025 ];
	yValues_state_perf = [ interstate_ttr_state.perf_2017, interstate_ttr_state.perf_2018, interstate_ttr_state.perf_2019, interstate_ttr_state.perf_2020, 
	                       interstate_ttr_state.perf_2021, null, null, null, null ];
	yValues_mpo_perf = [ interstate_ttr_mpo.perf_2017, interstate_ttr_mpo.perf_2018, interstate_ttr_mpo.perf_2019, interstate_ttr_mpo.perf_2020, 
                         interstate_ttr_mpo.perf_2021, null, null, null, null ];
	
	generate_ttr_viz(xValues, yValues_state_targ, yValues_state_perf, yValues_mpo_perf, canvas_id, title, xAxis_label, yAxis_label);
	

	// Non-interstate (NHS) TTR - all vehicles
	canvas_id = 'ttr-noninterstate-viz';
	title = 'Percent of Person-miles on the Non-Interstate NHS That Are Reliable';
	yAxis_label = 'Percent of Person-miles That Are Reliable';
	
	var noninterstate_ttr_state = _.find(ttr_state_data, function(o) { return o.perf_meas == 'Percent of the person miles traveled on the non Interstate NHS that are reliable_Statewide'; });
	var noninterstate_ttr_mpo = _.find(ttr_mpo_data, function(o) { return o.perf_meas == 'Percent of the person miles traveled on the non Interstate NHS that are reliable_Boston Region'; });
	
	yValues_state_targ = [ null, null, noninterstate_ttr_state.targ_2019, null, noninterstate_ttr_state.targ_2021, null, 
	                       noninterstate_ttr_state.targ_2023, null, noninterstate_ttr_state.targ_2025 ];
	yValues_state_perf = [ noninterstate_ttr_state.perf_2017, noninterstate_ttr_state.perf_2018, noninterstate_ttr_state.perf_2019, noninterstate_ttr_state.perf_2020, 
	                       noninterstate_ttr_state.perf_2021, null, null, null, null ];
	yValues_mpo_perf = [ noninterstate_ttr_mpo.perf_2017, noninterstate_ttr_mpo.perf_2018, noninterstate_ttr_mpo.perf_2019, noninterstate_ttr_mpo.perf_2020, 
                         noninterstate_ttr_mpo.perf_2021, null, null, null, null ];
	
	generate_ttr_viz(xValues, yValues_state_targ, yValues_state_perf, yValues_mpo_perf, canvas_id, title, xAxis_label, yAxis_label);


	// Truck TTR
	canvas_id = 'ttr-truck-viz';
	title = 'Truck Travel Time Reliability (Interstates only)';
	yAxis_label = 'Travel Time Reliability Index';
	
	var truck_ttr_state = _.find(ttr_state_data, function(o) { return o.perf_meas == 'Truck Travel Time Reliability Index (for truck travel on Interstate highways)_Statewide'; });
	var truck_ttr_mpo = _.find(ttr_mpo_data, function(o) { return o.perf_meas == 'Truck Travel Time Reliability Index (for truck travel on Interstate highways)_Boston Region'; });
	
	
	yValues_state_targ = [ null, null, truck_ttr_state.targ_2019, null, truck_ttr_state.targ_2021, null, 
	                       truck_ttr_state.targ_2023, null, truck_ttr_state.targ_2025 ];
	yValues_state_perf = [ truck_ttr_state.perf_2017, truck_ttr_state.perf_2018, truck_ttr_state.perf_2019, truck_ttr_state.perf_2020, 
	                       truck_ttr_state.perf_2021, null, null, null, null ];
	yValues_mpo_perf = [ truck_ttr_mpo.perf_2017, truck_ttr_mpo.perf_2018, truck_ttr_mpo.perf_2019, truck_ttr_mpo.perf_2020, 
                         truck_ttr_mpo.perf_2021, null, null, null, null ];
						 
	generate_ttr_viz(xValues, yValues_state_targ, yValues_state_perf, yValues_mpo_perf, canvas_id, title, xAxis_label, yAxis_label);
} // ttr_viz
