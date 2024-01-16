/// CSV parser for transit safety CSV file
var ts_mpo_RowConverter = function(d) {
	return {
		agency:					d['Agency'],
		mode:					d['Mode'],
		targ_2023_fat:			+d['2023 Target - Fatalities'],	//
		perf_2019_21_fat:		+d['2019-21 Performance - Fatalities'],	
		targ_2023_fat_rate:		+d['2023 Target - Fatality Rate'],	//
		perf_2019_21_fat_rate:	+d['2019-21 Performance - Fatality Rate'],	
		targ_2023_inj:			+d['2023 Target - Injuries'],	
		perf_2019_21_inj:		+d['2019-21 Performance - Injuries'], 
		targ_2023_inj_rate:		+d['2023 Target - Injury Rate'], 
		perf_2019_21_inj_rate:	+d['2019-21 Performance - Injury Rate'],
		targ_2023_saf:			+d['2023 Target - Safety Events'],
		perf_2019_21_saf:		+d['2019-21 Performance - Safety Events'],
		targ_2023_saf_rate:		+d['2023 Target - Safety Event Rate'], 
		perf_2019_21_saf_rate:	+d['2019-21 Performance - Safety Event Rate'],
		targ_2023_sys_rel:		+d['2023 Target - System Reliability in Miles'],
		perf_2019_21_sys_rel:	+d['2019-21 Performance - System Reliability in Miles']
	};
};

function generate_mbta_safety_viz(xValues, yValues_bus, yValues_hr, yValues_lr, yValues_pt, canvas_id, chart_title, xAxis_label, yAxis_label) {
	var bus_dataset = { label: 'Bus',
						backgroundColor: 'rgba(58,200,225,.75)',
						borderWidth: 1.5,
						borderColor:  'rgb(8,48,107)',
						data: yValues_bus
					};
	var hr_dataset = { 	label: 'Heavy Rail',
						backgroundColor: 'rgb(00,204,107,.75)',
						borderWidth: 1.5,
						borderColor: 'rgb(8,48,107)',
						data: yValues_hr
					};
	var lr_dataset = { 	label: 'Light Rail',
						backgroundColor: 'rgba(255,144,17,.75)',
						borderWidth: 1.5,
						borderColor: 'rgb(8,48,107)',
						data: yValues_lr
					};
	var pt_dataset = { label: 'Paratransit',
						backgroundColor: 'rgba(228,112,214,.75)',
						borderWidth: 1.5,
						borderColor: 'rgb(8,48,107)',
						data: yValues_pt
					};
	
	var aDatasets = [ bus_dataset, hr_dataset, lr_dataset, pt_dataset ];
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
	}
	new Chart(ctx, cfg);
} // generate_mbta_safety_viz

function transit_safety_viz(ts_mpo_data) {
	console.log('Entered transit_safety_viz');
	
	// Generate a bar chart for the transit safety data
	
	var xValues = ['2023 Target', '2019-21 Performance'];
	var yValues_bus = [], yValues_hr = [], yValues_lr = [], yValues_pt = [];
	var canvas_id = '';
	var xAxis_label = 'Year';
	var yAxis_label = '';
	var title = '';
	
	// Transit fatalities -- MBTA
	canvas_id = 'fatalities-mbta';
	title = 'Transit Fatalities';
	yAxis_label = 'Fatalities';
	
	var mbta_bus_fat = _.find(ts_mpo_data, function(o) { return o.agency == 'MBTA' && o.mode == 'Bus'; });     
	var mbta_hr_fat  = _.find(ts_mpo_data, function(o) { return o.agency == 'MBTA' && o.mode == 'Heavy Rail';  });
	var mbta_lr_fat  = _.find(ts_mpo_data, function(o) { return o.agency == 'MBTA' && o.mode == 'Light Rail';  });
	var mbta_pt_fat  = _.find(ts_mpo_data, function(o) { return o.agency == 'MBTA' && o.mode == 'Paratransit';  });
	
	yValues_bus = [ mbta_bus_fat.targ_2023_fat, mbta_bus_fat.perf_2019_21_fat ];
	yValues_hr  = [ mbta_hr_fat.targ_2023_fat, mbta_hr_fat.perf_2019_21_fat ];
	yValues_lr  = [ mbta_lr_fat.targ_2023_fat, mbta_lr_fat.perf_2019_21_fat ];
	yValues_pt  = [ mbta_pt_fat.targ_2023_fat, mbta_pt_fat.perf_2019_21_fat ];
	
	generate_mbta_safety_viz(xValues, yValues_bus, yValues_hr, yValues_lr, yValues_pt, canvas_id, title, xAxis_label, yAxis_label);
	
	// Transit fataility rate - MBTA
	canvas_id = 'fatality-rate-mbta';
	title = 'Transit Fatality Rate';
	yAxis_label = 'Fatality Rate';
	yValues_bus = [ mbta_bus_fat.targ_2023_fat_rate, mbta_bus_fat.perf_2019_21_fat_rate ];
	yValues_hr =  [ mbta_hr_fat.targ_2023_fat_rate,  mbta_hr_fat.perf_2019_21_fat_rate ];
	yValues_lr =  [ mbta_lr_fat.targ_2023_fat_rate,  mbta_lr_fat.perf_2019_21_fat_rate ];
	yValues_pt =  [ mbta_pt_fat.targ_2023_fat_rate,  mbta_pt_fat.perf_2019_21_fat_rate ];
	
	generate_mbta_safety_viz(xValues, yValues_bus, yValues_hr, yValues_lr, yValues_pt, canvas_id, title, xAxis_label, yAxis_label);
	
	
	
	return; // for now
} // transit_safety_viz

