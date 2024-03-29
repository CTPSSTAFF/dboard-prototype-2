// CSV parser for roadway safety 'statewide' CSV file
var rs_state_RowConverter = function(d) {
	return {
		perf_meas:		d['Performance Measure'],
		targ_2023:		+d['2023 Targets'],
		targ_2022:		+d['2022 Targets'],
		targ_2021:		+d['2021 Targets'],
		targ_2020:		+d['2020 Targets'],
		perf_2022:		+d['2022 Performance'],	
		perf_2021:		+d['2021 Performance'],
		perf_2020:		+d['2020 Performance'],
		perf_2019:		+d['2019 Performance'],
		perf_2018:		+d['2018 Performance'],
		perf_2017:		+d['2017 Performance'],
		perf_2016:		+d['2016 Performance'],
		perf_2015:		+d['2015 Performance'],
		perf_2014:		+d['2014 Performance'],
		perf_2013:		+d['2013 Performance'],
	};
};

// CSV parser for roadway safety 'mpo' CSV file
var rs_mpo_RowConverter = function(d) {
	return {
		perf_meas:		d['Performance Measure'],
		perf_2022:		+d['2022 Performance'],	
		perf_2021:		+d['2021 Performance'],
		perf_2020:		+d['2020 Performance'],
		perf_2019:		+d['2019 Performance'],
		perf_2018:		+d['2018 Performance'],
		perf_2017:		+d['2017 Performance'],
		perf_2016:		+d['2016 Performance'],
		perf_2015:		+d['2015 Performance'],
		perf_2014:		+d['2014 Performance'],
		perf_2013:		+d['2013 Performance'],
	};
};


function generate_roadway_safety_viz(xValues, yValues_state_perf, yValues_state_targ, yValues_mpo_perf, canvas_id, chart_title, xAxis_label, yAxis_label) {
	var state_perf_dataset = { 	label: 'Performance (State)',
								backgroundColor: 'rgba(58,200,225,.75)',
								borderWidth: 1.5,
								borderColor:  'rgb(8,48,107)',
								data: yValues_state_perf
						};
	var state_targ_dataset = { 	label: 'Target (State)',
								backgroundColor: 'rgb(00,204,107,.75)',
								borderWidth: 1.5,
								borderColor: 'rgb(8,48,107)',
								data: yValues_state_targ
							};
	var mpo_perf_dataset = 	{ 	label: 'Performance (MPO)',
								backgroundColor: 'rgba(255,144,17,.75)',
								borderWidth: 1.5,
								borderColor: 'rgb(8,48,107)',
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
} // generate_roadway_safety_viz
	
function roadway_safety_viz(rs_state_data, rs_mpo_data) {
	console.log('Entered roadway_safety_viz');
	
	var xValues = [2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022];
	var yValues_state_perf = [], yValues_state_targ = [], yValues_mpo_perf = [];
	var canvas_id = '';
	var xAxis_label = 'Year';
	var yAxis_label = '';
	var title = '';
	
	// Roadway fatalities: 5-year rolling average
	canvas_id = 'roadway-fatalities-5-yr-viz';
	title = 'Roadway Fatalities - 5-year Rolling Average';
	yAxis_label = 'Fatalities';
	
	var road_fat_state = _.find(rs_state_data, function(o) { return o.perf_meas == 'Fatalities_5 year rolling average'; });     
	var road_fat_mpo   = _.find(rs_mpo_data, function(o) { return o.perf_meas == 'Fatalities_5 year rolling average'; });
	
	yValues_state_perf = [ road_fat_state.perf_2013, road_fat_state.perf_2014, road_fat_state.perf_2015, road_fat_state.perf_2016, road_fat_state.perf_2017, 
						   road_fat_state.perf_2018, road_fat_state.perf_2019, road_fat_state.perf_2020, road_fat_state.perf_2021, road_fat_state.perf_2022 ];
	yValues_state_targ = [ null, null, null, null, null, null, null, road_fat_state.targ_2020, road_fat_state.targ_2021, road_fat_state.targ_2022 ];
	yValues_mpo_perf = [ road_fat_mpo.perf_2013, road_fat_mpo.perf_2014, road_fat_mpo.perf_2015, road_fat_mpo.perf_2016,road_fat_mpo.perf_2017, 
						 road_fat_mpo.perf_2018, road_fat_mpo.perf_2019, road_fat_mpo.perf_2020, road_fat_mpo.perf_2021, road_fat_mpo.perf_2022 ];	
				
	generate_roadway_safety_viz(xValues, yValues_state_perf, yValues_state_targ, yValues_mpo_perf, canvas_id, title, xAxis_label, yAxis_label);
	
	
	// Fatalities - 1 year
	canvas_id = 'roadway-fatalities-1-yr-viz';
	title = 'Roadway Fatalities - 1-year Totals';
	yAxis_label = 'Fatalities';
	
	var road_fat_1yr_state = _.find(rs_state_data, function(o) { return o.perf_meas == 'Fatalities_1 year total'; });     
	var road_fat_1yr_mpo   = _.find(rs_mpo_data, function(o) { return o.perf_meas == 'Fatalities_1 year total'; });
	
	yValues_state_perf = [ road_fat_1yr_state.perf_2013, road_fat_1yr_state.perf_2014, road_fat_1yr_state.perf_2015, road_fat_1yr_state.perf_2016, road_fat_1yr_state.perf_2017, 
						   road_fat_1yr_state.perf_2018, road_fat_1yr_state.perf_2019, road_fat_1yr_state.perf_2020, road_fat_1yr_state.perf_2021, road_fat_1yr_state.perf_2022 ];
	// NOTE: No statewide targets for this metric
	yValues_mpo_perf = [ road_fat_1yr_mpo.perf_2013, road_fat_1yr_mpo.perf_2014, road_fat_1yr_mpo.perf_2015, road_fat_1yr_mpo.perf_2016, road_fat_1yr_mpo.perf_2017, 
						 road_fat_1yr_mpo.perf_2018, road_fat_1yr_mpo.perf_2019, road_fat_1yr_mpo.perf_2020, road_fat_1yr_mpo.perf_2021, road_fat_1yr_mpo.perf_2022 ];	
	
	generate_roadway_safety_viz(xValues, yValues_state_perf, null, yValues_mpo_perf, canvas_id, title, xAxis_label, yAxis_label);


	// Fatality rate for 100 million Vehicle Miles Traveled
	canvas_id = 'roadway-fatality-rate-viz';
	title = 'Roadway Fatality Rate per 100 million VMT';
	yAxis_label = 'Fatalities per 100 million VMT';

	var road_fat_rate_state = _.find(rs_state_data, function(o) { return o.perf_meas == 'Fatality rate per 100 million Vehicle Miles Traveled'; });
	var road_fat_rate_mpo   = _.find(rs_mpo_data, function(o) { return o.perf_meas == 'Fatality rate per 100 million Vehicle Miles Traveled'; });
											
	yValues_state_perf = [ road_fat_rate_state.perf_2013, road_fat_rate_state.perf_2014, road_fat_rate_state.perf_2015, road_fat_rate_state.perf_2016, road_fat_rate_state.perf_2017, 
						   road_fat_rate_state.perf_2018, road_fat_rate_state.perf_2019, road_fat_rate_state.perf_2020, road_fat_rate_state.perf_2021, road_fat_rate_state.perf_2022 ];
	yValues_state_targ = [ null, null, null, null, null, null, null, road_fat_rate_state.targ_2020, road_fat_rate_state.targ_2021, road_fat_rate_state.targ_2022 ];
	yValues_mpo_perf = [ road_fat_rate_mpo.perf_2013, road_fat_rate_mpo.perf_2014, road_fat_rate_mpo.perf_2015, road_fat_rate_mpo.perf_2016,road_fat_rate_mpo.perf_2017, 
						 road_fat_rate_mpo.perf_2018, road_fat_rate_mpo.perf_2019, road_fat_rate_mpo.perf_2020, road_fat_rate_mpo.perf_2021, road_fat_rate_mpo.perf_2022 ];	
				
	generate_roadway_safety_viz(xValues, yValues_state_perf, yValues_state_targ, yValues_mpo_perf, canvas_id, title, xAxis_label, yAxis_label);
	
	
	// Roadway serious injuries: 5-year rolling average
	canvas_id = 'roadway-injuries-viz';
	title = 'Roadway Serious Injuries - 5-year Rolling Average';
	yAxis_label = 'Serious Injuries';
	
	var road_inj_state = _.find(rs_state_data, function(o) {  return o.perf_meas == 'Serious Injuries_5 year rolling average'; });
	var road_inj_mpo   = _.find(rs_mpo_data, function(o) {  return o.perf_meas == 'Serious Injuries_5 year rolling average'; });
	
	yValues_state_perf = [ road_inj_state.perf_2013, road_inj_state.perf_2014, road_inj_state.perf_2015, road_inj_state.perf_2016, road_inj_state.perf_2017, 
						   road_inj_state.perf_2018, road_inj_state.perf_2019, road_inj_state.perf_2020, road_inj_state.perf_2021, road_inj_state.perf_2022 ];
	yValues_state_targ = [ null, null, null, null, null, null, null, road_inj_state.targ_2020, road_inj_state.targ_2021, road_inj_state.targ_2022 ];
	yValues_mpo_perf = [ road_inj_mpo.perf_2013, road_inj_mpo.perf_2014, road_inj_mpo.perf_2015, road_inj_mpo.perf_2016,road_inj_mpo.perf_2017, 
						 road_inj_mpo.perf_2018, road_inj_mpo.perf_2019, road_inj_mpo.perf_2020, road_inj_mpo.perf_2021, road_inj_mpo.perf_2022 ];				
					
	generate_roadway_safety_viz(xValues, yValues_state_perf, yValues_state_targ, yValues_mpo_perf, canvas_id, title, xAxis_label, yAxis_label);
	
	
	// Roadway serious injuries: 1-year totals
	canvas_id = 'roadway-injuries-1yr-viz';
	title = 'Roadway Serious Injuries - 1-year Totals';
	yAxis_label = 'Serious Injuries';
	
	var road_inj_1yr_state = _.find(rs_state_data, function(o) {  return o.perf_meas == 'Serious Injuries_1 year total'; });
	var road_inj_1yr_mpo   = _.find(rs_mpo_data, function(o) {  return o.perf_meas == 'Serious Injuries_1 year total'; });
	
	yValues_state_perf = [ road_inj_1yr_state.perf_2013, road_inj_1yr_state.perf_2014, road_inj_1yr_state.perf_2015, road_inj_1yr_state.perf_2016, road_inj_1yr_state.perf_2017, 
						   road_inj_1yr_state.perf_2018, road_inj_1yr_state.perf_2019, road_inj_1yr_state.perf_2020, road_inj_1yr_state.perf_2021, road_inj_1yr_state.perf_2022 ];
	// NOTE: There are no statewide targets for this metric
	yValues_mpo_perf = [ road_inj_1yr_mpo.perf_2013, road_inj_1yr_mpo.perf_2014, road_inj_1yr_mpo.perf_2015, road_inj_1yr_mpo.perf_2016, road_inj_1yr_mpo.perf_2017, 
						 road_inj_1yr_mpo.perf_2018, road_inj_1yr_mpo.perf_2019, road_inj_1yr_mpo.perf_2020, road_inj_1yr_mpo.perf_2021, road_inj_1yr_mpo.perf_2022 ];				
					
	generate_roadway_safety_viz(xValues, yValues_state_perf, null, yValues_mpo_perf, canvas_id, title, xAxis_label, yAxis_label);
	
	
	// Serious injury rate for 100 million Vehicle Miles Traveled
	canvas_id = 'roadway-injury-rate-viz';
	title = 'Roadway Serious Injury Rate per 100 million VMT';
	yAxis_label = 'Serious Injuries per 100 million VMT';
	
	var road_inj_rate_state = _.find(rs_state_data, function(o) {  return o.perf_meas == 'Serious injury rate per 100 million Vehicle Miles Traveled'; });
	var road_inj_rate_mpo   = _.find(rs_mpo_data, function(o) {  return o.perf_meas == 'Serious injury rate per 100 million Vehicle Miles Traveled'; });
	
	yValues_state_perf = [ road_inj_rate_state.perf_2013, road_inj_rate_state.perf_2014, road_inj_rate_state.perf_2015, road_inj_rate_state.perf_2016, road_inj_rate_state.perf_2017, 
						   road_inj_rate_state.perf_2018, road_inj_rate_state.perf_2019, road_inj_rate_state.perf_2020, road_inj_rate_state.perf_2021, road_inj_rate_state.perf_2022  ];
	yValues_state_targ = [ null, null, null, null, null, null, null, road_inj_rate_state.targ_2020, road_inj_rate_state.targ_2021, road_inj_rate_state.targ_2022 ];
	yValues_mpo_perf = [ road_inj_rate_mpo.perf_2013, road_inj_rate_mpo.perf_2014, road_inj_rate_mpo.perf_2015, road_inj_rate_mpo.perf_2016, road_inj_rate_mpo.perf_2017, 
						 road_inj_rate_mpo.perf_2018, road_inj_rate_mpo.perf_2019, road_inj_rate_mpo.perf_2020, road_inj_rate_mpo.perf_2021, road_inj_rate_mpo.perf_2022 ];
	
	generate_roadway_safety_viz(xValues, yValues_state_perf, yValues_state_targ, yValues_mpo_perf, canvas_id, title, xAxis_label, yAxis_label);
	
	
	// Roadway non-motorized fatalities and serious injuries
	canvas_id = 'roadway-nonmotorized-viz';
	title = 'Nonmotorized Fatalities and Serious Injuries - 5 year rolling average';
	yAxis_label = 'Fatalities and Serious Injuries';
	
	var non_mot_state = _.find(rs_state_data, function(o) {  return o.perf_meas == 'Nonmotorized fatalities and nonmotorized serious injuries_5 year rolling average'; });
	var non_mot_mpo   = _.find(rs_mpo_data, function(o) {  return o.perf_meas == 'Nonmotorized fatalities and nonmotorized serious injuries_5 year rolling average'; });

	yValues_state_perf = [ non_mot_state.perf_2013, non_mot_state.perf_2014, non_mot_state.perf_2015, non_mot_state.perf_2016, non_mot_state.perf_2017, 
						   non_mot_state.perf_2018, non_mot_state.perf_2019, non_mot_state.perf_2020, non_mot_state.perf_2021, non_mot_state.perf_2022 ];
	yValues_state_targ = [ null, null, null, null, null, null, null, non_mot_state.targ_2020, non_mot_state.targ_2021, non_mot_state.targ_2022 ];
	yValues_mpo_perf =	[ non_mot_mpo.perf_2013, non_mot_mpo.perf_2014, non_mot_mpo.perf_2015, non_mot_mpo.perf_2016, non_mot_mpo.perf_2017, 
						   non_mot_mpo.perf_2018, non_mot_mpo.perf_2019, non_mot_mpo.perf_2020, non_mot_mpo.perf_2021, non_mot_mpo.perf_2022 ];	

	generate_roadway_safety_viz(xValues, yValues_state_perf, yValues_state_targ, yValues_mpo_perf, canvas_id, title, xAxis_label, yAxis_label);
	
	
	// Roadway non-motorized fatalities (only)
	canvas_id = 'roadway-nonmotorized-fat-viz';
	title = 'Nonmotorized Fatalities 1-year Totals';
	yAxis_label = 'Fatalities';
	
	var non_mot_fat_state = _.find(rs_state_data, function(o) {  return o.perf_meas == 'Nonmotorized fatalities_1 year total'; });
	var non_mot_fat_mpo   = _.find(rs_mpo_data, function(o) {  return o.perf_meas == 'Nonmotorized fatalities_1 year total'; });
	
	yValues_state_perf = [ non_mot_fat_state.perf_2013, non_mot_fat_state.perf_2014, non_mot_fat_state.perf_2015, non_mot_fat_state.perf_2016, non_mot_fat_state.perf_2017, 
						   non_mot_fat_state.perf_2018, non_mot_fat_state.perf_2019, non_mot_fat_state.perf_2020, non_mot_fat_state.perf_2021, non_mot_fat_state.perf_2022 ];
	// NOTE: There are no statewide targets for this metric
	yValues_mpo_perf =	[ non_mot_fat_mpo.perf_2013, non_mot_fat_mpo.perf_2014, non_mot_fat_mpo.perf_2015, non_mot_fat_mpo.perf_2016, non_mot_fat_mpo.perf_2017, 
						  non_mot_fat_mpo.perf_2018, non_mot_fat_mpo.perf_2019, non_mot_fat_mpo.perf_2020, non_mot_fat_mpo.perf_2021, non_mot_fat_mpo.perf_2022 ];	
	
	generate_roadway_safety_viz(xValues, yValues_state_perf, null, yValues_mpo_perf, canvas_id, title, xAxis_label, yAxis_label);
	
	
	// Vehicle Miles Traveled
	canvas_id = 'vmt-viz';
	title = 'Vehicle Miles Traveled (in millions)';
	yAxis_label = 'Vehicle Miles Traveled (millions)';
	var vmt_state = _.find(rs_state_data, function(o) { return o.perf_meas == 'Vehicle Miles Traveled'; });
	var vmt_mpo =  _.find(rs_mpo_data, function(o) { return o.perf_meas == 'Vehicle Miles Traveled'; });
	yValues_state_perf = [ vmt_state.perf_2013, vmt_state.perf_2014, vmt_state.perf_2015, vmt_state.perf_2016, vmt_state.perf_2017, 
						   vmt_state.perf_2018, vmt_state.perf_2019, vmt_state.perf_2020, vmt_state.perf_2021, vmt_state.perf_2022 ];
	// NOTE: There are no statewide targets for this metric
	yValues_mpo_perf = [ vmt_mpo.perf_2013, vmt_mpo.perf_2014, vmt_mpo.perf_2015, vmt_mpo.perf_2016, vmt_mpo.perf_2017, 
						 vmt_mpo.perf_2018, vmt_mpo.perf_2019, vmt_mpo.perf_2020, vmt_mpo.perf_2021, vmt_mpo.perf_2022 ];
	generate_roadway_safety_viz(xValues, yValues_state_perf, null, yValues_mpo_perf, canvas_id, title, xAxis_label, yAxis_label);
} // roadway_safey_viz	
