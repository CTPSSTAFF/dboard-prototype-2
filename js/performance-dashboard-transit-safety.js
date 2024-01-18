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

// Generate Chart.js visualization of transit saftey data for the MBTA
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

// Generate Chart.js visualization of transit saftey data for CATA and MWRTA
function generate_cata_mwrta_safety_viz(xValues, yValues_fixed, yValues_demand, canvas_id, chart_title, xAxis_label, yAxis_label) {
	var fixed_dataset = { 	label: 'Fixed Route',
							backgroundColor: 'rgba(58,200,225,.75)',
							borderWidth: 1.5,
							borderColor:  'rgb(8,48,107)',
							data: yValues_fixed
						};
	var demand_dataset = { 	label: 'Demand Response',
							backgroundColor: 'rgb(00,204,107,.75)',
							borderWidth: 1.5,
							borderColor: 'rgb(8,48,107)',
							data: yValues_demand
						};

	
	var aDatasets = [ fixed_dataset, demand_dataset];
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
} // generate_cata_mwrta_safety_viz

function transit_safety_viz(ts_mpo_data) {
	console.log('Entered transit_safety_viz');
	
	// Generate bar charts for the transit safety data
	
	var xValues = ['2023 Target', '2019-21 Performance'];
	var yValues_bus = [], yValues_hr = [], yValues_lr = [], yValues_pt = [];
	var canvas_id = '';
	var xAxis_label = 'Year';
	var yAxis_label = '';
	var title = '';
	
	/////////////////////////////////////////////
	// MBTA
	//
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
	
	// Transit serious injuries - MBTA
	canvas_id = 'injuries-mbta';
	title = 'Serious Injuries';
	yAxis_label = 'Serious Injuries';
	yValues_bus = [ mbta_bus_fat.targ_2023_inj, mbta_bus_fat.perf_2019_21_inj ];
	yValues_hr =  [ mbta_hr_fat.targ_2023_inj,  mbta_hr_fat.perf_2019_21_inj ];
	yValues_lr =  [ mbta_lr_fat.targ_2023_inj,  mbta_lr_fat.perf_2019_21_inj ];
	yValues_pt =  [ mbta_pt_fat.targ_2023_inj,  mbta_pt_fat.perf_2019_21_inj ];
	
	generate_mbta_safety_viz(xValues, yValues_bus, yValues_hr, yValues_lr, yValues_pt, canvas_id, title, xAxis_label, yAxis_label);
	
	// Transit serious injuries rate - MBTA
	canvas_id = 'injury-rate-mbta';
	title = 'Serious Injury Rate';
	yAxis_label = 'Serious Injury Rate';
	yValues_bus = [ mbta_bus_fat.targ_2023_inj_rate, mbta_bus_fat.perf_2019_21_inj_rate ];
	yValues_hr =  [ mbta_hr_fat.targ_2023_inj_rate,  mbta_hr_fat.perf_2019_21_inj_rate ];
	yValues_lr =  [ mbta_lr_fat.targ_2023_inj_rate,  mbta_lr_fat.perf_2019_21_inj_rate ];
	yValues_pt =  [ mbta_pt_fat.targ_2023_inj_rate,  mbta_pt_fat.perf_2019_21_inj_rate ];
	
	generate_mbta_safety_viz(xValues, yValues_bus, yValues_hr, yValues_lr, yValues_pt, canvas_id, title, xAxis_label, yAxis_label);
	
	// Transit safety events - MBTA
	canvas_id = 'safety-mbta';
	title = 'Safety Events';
	yAxis_label = 'Saftey Events';
	yValues_bus = [ mbta_bus_fat.targ_2023_saf, mbta_bus_fat.perf_2019_21_saf ];
	yValues_hr =  [ mbta_hr_fat.targ_2023_saf,  mbta_hr_fat.perf_2019_21_saf ];
	yValues_lr =  [ mbta_lr_fat.targ_2023_saf,  mbta_lr_fat.perf_2019_21_saf ];
	yValues_pt =  [ mbta_pt_fat.targ_2023_saf,  mbta_pt_fat.perf_2019_21_saf ];
	
	generate_mbta_safety_viz(xValues, yValues_bus, yValues_hr, yValues_lr, yValues_pt, canvas_id, title, xAxis_label, yAxis_label);
	
	// Transit safety event rate - MBTA
	canvas_id = 'safety-rate-mbta';
	title = 'Safety Event Rate';
	yAxis_label = 'Saftey Event Rate';
	yValues_bus = [ mbta_bus_fat.targ_2023_saf_rate, mbta_bus_fat.perf_2019_21_saf_rate ];
	yValues_hr =  [ mbta_hr_fat.targ_2023_saf_rate,  mbta_hr_fat.perf_2019_21_saf_rate ];
	yValues_lr =  [ mbta_lr_fat.targ_2023_saf_rate,  mbta_lr_fat.perf_2019_21_saf_rate ];
	yValues_pt =  [ mbta_pt_fat.targ_2023_saf_rate,  mbta_pt_fat.perf_2019_21_saf_rate ];
	
	generate_mbta_safety_viz(xValues, yValues_bus, yValues_hr, yValues_lr, yValues_pt, canvas_id, title, xAxis_label, yAxis_label);
	
	// System reliability - MBTA
	canvas_id = 'system-mbta';
	title = 'System Reliability';
	yAxis_label = 'System Reliability';
	yValues_bus = [ mbta_bus_fat.targ_2023_sys_rel, mbta_bus_fat.perf_2019_21_sys_rel ];
	yValues_hr =  [ mbta_hr_fat.targ_2023_sys_rel,  mbta_hr_fat.perf_2019_21_sys_rel ];
	yValues_lr =  [ mbta_lr_fat.targ_2023_sys_rel,  mbta_lr_fat.perf_2019_21_sys_rel ];
	yValues_pt =  [ mbta_pt_fat.targ_2023_sys_rel,  mbta_pt_fat.perf_2019_21_sys_rel ];
	
	generate_mbta_safety_viz(xValues, yValues_bus, yValues_hr, yValues_lr, yValues_pt, canvas_id, title, xAxis_label, yAxis_label);
	
	
	/////////////////////////////////////////////
	// CATA
	//
	// Transit fatalities - CATA
	canvas_id = 'fatalities-cata';
	title = 'Transit Fatalities';
	yAxis_label = 'Fatalities';
	
	var cata_fixed_fat = _.find(ts_mpo_data, function(o) { return o.agency == 'CATA' && o.mode == 'Fixed Route'; });     
	var cata_demand_fat  = _.find(ts_mpo_data, function(o) { return o.agency == 'CATA' && o.mode == 'Demand Response';  });

	
	yValues_fixed = [ cata_fixed_fat.targ_2023_fat, cata_fixed_fat.perf_2019_21_fat ];
	yValues_demand  = [ cata_demand_fat.targ_2023_fat, cata_demand_fat.perf_2019_21_fat ];
	
	generate_cata_mwrta_safety_viz(xValues, yValues_fixed, yValues_demand, canvas_id, title, xAxis_label, yAxis_label);
	
	
	
	/////////////////////////////////////////////
	// MWRTA
	//
	// Transit fatalities - MWRTA
	canvas_id = 'fatalities-mwrta';
	title = 'Transit Fatalities';
	yAxis_label = 'Fatalities';
	
	var mwrta_fixed_fat = _.find(ts_mpo_data, function(o) { return o.agency == 'MWRTA' && o.mode == 'Fixed Route'; });     
	var mwrta_demand_fat  = _.find(ts_mpo_data, function(o) { return o.agency == 'MWRTA' && o.mode == 'Demand Response';  });
	
	yValues_fixed = [ mwrta_fixed_fat.targ_2023_fat, mwrta_fixed_fat.perf_2019_21_fat ];
	yValues_demand  = [ mwrta_demand_fat.targ_2023_fat, mwrta_demand_fat.perf_2019_21_fat ];
	
	generate_cata_mwrta_safety_viz(xValues, yValues_fixed, yValues_demand, canvas_id, title, xAxis_label, yAxis_label);
	
	
	return;
} // transit_safety_viz

