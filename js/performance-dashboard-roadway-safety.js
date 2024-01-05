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


function generate_roadway_safety_viz(xValues, yValues_state_perf, yValues_state_targ, yValues_mpo_perf, div_id, layout) {
	// 'trace' for statewide performance data
	var trace_state_perf = {
	  x: xValues,
	  y: yValues_state_perf,
	  type: 'bar',
	  name: 'Performance (State)',
	  text: yValues_state_perf.map(String),
	  textposition: 'auto',
	  hoverinfo: 'none',
	  marker: {
		color: 'rgba(58,200,225,.5)',
		line: {
		  color: 'rgb(8,48,107)',
		  width: 1.5
		}
	  }
	};	
	// 'trace' for statewide target data
	// There are some metrics for which there is no statewide target data.
	if (yValues_state_targ != null) {
		var trace_state_targ = { 
		  x: xValues,
		  y: yValues_state_targ,
		  type: 'bar',
		  name: 'Target (State)',
		  text: yValues_state_targ.map(String),
		  textposition: 'auto',
		  hoverinfo: 'none',
		 //  opacity: 0.5,
		  marker: {
			// color: 'rgb(158,202,225)',
			color: 'rgb(206,228,240)',
			line: {
			  color: 'rgb(8,48,107)',
			  width: 1.5
			},
			pattern: { fillmode: 'overlay', shape: 'X' }
		  }
		};
	}
	// 'trace' for MPO performance data
	var trace_mpo_perf = {
	  x: xValues,
	  y: yValues_mpo_perf,
	  type: 'bar',
	  name: 'Performance (MPO)',
	  text: yValues_mpo_perf.map(String),
	  textposition: 'auto',
	  hoverinfo: 'none',
	  marker: {
		color: 'rgba(255,144,17,.5)',
		line: {
		  color: 'rgb(8,48,107)',
		  width: 1.5
		}
	  }
	};
	var config = { responsive: true };
	var data = [];
	if (yValues_state_targ != null) {
		data = [trace_state_perf, trace_state_targ, trace_mpo_perf, config];
	} else {
		data = [trace_state_perf, trace_mpo_perf, config];
	}
	Plotly.newPlot(div_id, data, layout);	
} // generate_roadway_safety_viz
	
function roadway_safety_viz(rs_state_data, rs_mpo_data) {
	console.log('Entered roadway_safety_viz');
	
	var xValues = [2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022];
	var yValues_state_perf = [], yValues_state_targ = [], yValues_mpo_perf = [];
	var div_id = '';
	var layout = {
		autosize: true,
		width: 	1000,
		xaxis: { type: 'category',
				 automargin: true },
		yaxis: { automargin: true }
	};
	var mylayout = {};
	
	// Roadway fatalities: 5-year rolling average
	div_id = 'roadway-fatalities-5-yr-viz';
	
	mylayout = JSON.parse(JSON.stringify(layout));
	mylayout.title = 'Roadway Fatalities - 5-year Rolling Average';
	
	var road_fat_state = _.find(rs_state_data, function(o) { return o.perf_meas == 'Fatalities_5 year rolling average'; });     
	var road_fat_mpo   = _.find(rs_mpo_data, function(o) { return o.perf_meas == 'Fatalities_5 year rolling average'; });
	
	yValues_state_perf = [ road_fat_state.perf_2013, road_fat_state.perf_2014, road_fat_state.perf_2015, road_fat_state.perf_2016, road_fat_state.perf_2017, 
						   road_fat_state.perf_2018, road_fat_state.perf_2019, road_fat_state.perf_2020, road_fat_state.perf_2021, road_fat_state.perf_2022 ];
	yValues_state_targ = [ null, null, null, null, null, null, null, road_fat_state.targ_2020, road_fat_state.targ_2021, road_fat_state.targ_2022 ];
	yValues_mpo_perf = [ road_fat_mpo.perf_2013, road_fat_mpo.perf_2014, road_fat_mpo.perf_2015, road_fat_mpo.perf_2016,road_fat_mpo.perf_2017, 
						 road_fat_mpo.perf_2018, road_fat_mpo.perf_2019, road_fat_mpo.perf_2020, road_fat_mpo.perf_2021, road_fat_mpo.perf_2022 ];	
				
	generate_roadway_safety_viz(xValues, yValues_state_perf, yValues_state_targ, yValues_mpo_perf, div_id, mylayout);
	
	
	// Fatalities - 1 year
	div_id = 'roadway-fatalities-1-yr-viz';
	mylayout = JSON.parse(JSON.stringify(layout));
	mylayout.title = 'Roadway Fatalities - 1-year Totals';
	
	var road_fat_1yr_state = _.find(rs_state_data, function(o) { return o.perf_meas == 'Fatalities_1 year total'; });     
	var road_fat_1yr_mpo   = _.find(rs_mpo_data, function(o) { return o.perf_meas == 'Fatalities_1 year total'; });
	
	yValues_state_perf = [ road_fat_1yr_state.perf_2013, road_fat_1yr_state.perf_2014, road_fat_1yr_state.perf_2015, road_fat_1yr_state.perf_2016, road_fat_1yr_state.perf_2017, 
						   road_fat_1yr_state.perf_2018, road_fat_1yr_state.perf_2019, road_fat_1yr_state.perf_2020, road_fat_1yr_state.perf_2021, road_fat_1yr_state.perf_2022 ];
	// NOTE: No statewide targets for this metric
	yValues_mpo_perf = [ road_fat_1yr_mpo.perf_2013, road_fat_1yr_mpo.perf_2014, road_fat_1yr_mpo.perf_2015, road_fat_1yr_mpo.perf_2016, road_fat_1yr_mpo.perf_2017, 
						 road_fat_1yr_mpo.perf_2018, road_fat_1yr_mpo.perf_2019, road_fat_1yr_mpo.perf_2020, road_fat_1yr_mpo.perf_2021, road_fat_1yr_mpo.perf_2022 ];	
	
	generate_roadway_safety_viz(xValues, yValues_state_perf, null, yValues_mpo_perf, div_id, mylayout);

	// Fatality rate for 100 million Vehicle Miles Traveled
	div_id = 'roadway-fatality-rate-viz';
	mylayout = JSON.parse(JSON.stringify(layout));
	mylayout.title = 'Roadway Fatality Rate per 100 million VMT';

	var road_fat_rate_state = _.find(rs_state_data, function(o) { return o.perf_meas == 'Fatality rate per 100 million Vehicle Miles Traveled'; });
	var road_fat_rate_mpo   = _.find(rs_mpo_data, function(o) { return o.perf_meas == 'Fatality rate per 100 million Vehicle Miles Traveled'; });
											
	yValues_state_perf = [ road_fat_rate_state.perf_2013, road_fat_rate_state.perf_2014, road_fat_rate_state.perf_2015, road_fat_rate_state.perf_2016, road_fat_rate_state.perf_2017, 
						   road_fat_rate_state.perf_2018, road_fat_rate_state.perf_2019, road_fat_rate_state.perf_2020, road_fat_rate_state.perf_2021, road_fat_rate_state.perf_2022 ];
	yValues_state_targ = [ null, null, null, null, null, null, null, road_fat_rate_state.targ_2020, road_fat_rate_state.targ_2021, road_fat_rate_state.targ_2022 ];
	yValues_mpo_perf = [ road_fat_rate_mpo.perf_2013, road_fat_rate_mpo.perf_2014, road_fat_rate_mpo.perf_2015, road_fat_rate_mpo.perf_2016,road_fat_rate_mpo.perf_2017, 
						 road_fat_rate_mpo.perf_2018, road_fat_rate_mpo.perf_2019, road_fat_rate_mpo.perf_2020, road_fat_rate_mpo.perf_2021, road_fat_rate_mpo.perf_2022 ];	
				
	generate_roadway_safety_viz(xValues, yValues_state_perf, yValues_state_targ, yValues_mpo_perf, div_id, mylayout);
	
	
	// Roadway serious injuries: 5-year rolling average
	div_id = 'roadway-injuries-viz';
	mylayout = JSON.parse(JSON.stringify(layout));
	mylayout.title = 'Roadway Serious Injuries - 5-year Rolling Average';
	
	var road_inj_state = _.find(rs_state_data, function(o) {  return o.perf_meas == 'Serious Injuries_5 year rolling average'; });
	var road_inj_mpo   = _.find(rs_mpo_data, function(o) {  return o.perf_meas == 'Serious Injuries_5 year rolling average'; });
	
	yValues_state_perf = [ road_inj_state.perf_2013, road_inj_state.perf_2014, road_inj_state.perf_2015, road_inj_state.perf_2016, road_inj_state.perf_2017, 
						   road_inj_state.perf_2018, road_inj_state.perf_2019, road_inj_state.perf_2020, road_inj_state.perf_2021, road_inj_state.perf_2022 ];
	yValues_state_targ = [ null, null, null, null, null, null, null, road_inj_state.targ_2020, road_inj_state.targ_2021, road_inj_state.targ_2022 ];
	yValues_mpo_perf = [ road_inj_mpo.perf_2013, road_inj_mpo.perf_2014, road_inj_mpo.perf_2015, road_inj_mpo.perf_2016,road_inj_mpo.perf_2017, 
						 road_inj_mpo.perf_2018, road_inj_mpo.perf_2019, road_inj_mpo.perf_2020, road_inj_mpo.perf_2021, road_inj_mpo.perf_2022 ];				
					
	generate_roadway_safety_viz(xValues, yValues_state_perf, yValues_state_targ, yValues_mpo_perf, div_id, mylayout);
	
	
	// Roadway serious injuries: 1-year totals
	div_id = 'roadway-injuries-1yr-viz';
	mylayout = JSON.parse(JSON.stringify(layout));
	mylayout.title = 'Roadway Serious Injuries - 1-year Totals';
	
	var road_inj_1yr_state = _.find(rs_state_data, function(o) {  return o.perf_meas == 'Serious Injuries_1 year total'; });
	var road_inj_1yr_mpo   = _.find(rs_mpo_data, function(o) {  return o.perf_meas == 'Serious Injuries_1 year total'; });
	
	yValues_state_perf = [ road_inj_1yr_state.perf_2013, road_inj_1yr_state.perf_2014, road_inj_1yr_state.perf_2015, road_inj_1yr_state.perf_2016, road_inj_1yr_state.perf_2017, 
						   road_inj_1yr_state.perf_2018, road_inj_1yr_state.perf_2019, road_inj_1yr_state.perf_2020, road_inj_1yr_state.perf_2021, road_inj_1yr_state.perf_2022 ];
	// NOTE: There are no statewide targets for this metric
	yValues_mpo_perf = [ road_inj_1yr_mpo.perf_2013, road_inj_1yr_mpo.perf_2014, road_inj_1yr_mpo.perf_2015, road_inj_1yr_mpo.perf_2016, road_inj_1yr_mpo.perf_2017, 
						 road_inj_1yr_mpo.perf_2018, road_inj_1yr_mpo.perf_2019, road_inj_1yr_mpo.perf_2020, road_inj_1yr_mpo.perf_2021, road_inj_1yr_mpo.perf_2022 ];				
					
	generate_roadway_safety_viz(xValues, yValues_state_perf, null, yValues_mpo_perf, div_id, mylayout);
	
	
	// Serious injury rate for 100 million Vehicle Miles Traveled
	div_id = 'roadway-injury-rate-viz';
	mylayout = JSON.parse(JSON.stringify(layout));
	mylayout.title = 'Roadway Serious Injury Rate per 100 million VMT';
	
	var road_inj_rate_state = _.find(rs_state_data, function(o) {  return o.perf_meas == 'Serious injury rate per 100 million Vehicle Miles Traveled'; });
	var road_inj_rate_mpo   = _.find(rs_mpo_data, function(o) {  return o.perf_meas == 'Serious injury rate per 100 million Vehicle Miles Traveled'; });
	
	yValues_state_perf = [ road_inj_rate_state.perf_2013, road_inj_rate_state.perf_2014, road_inj_rate_state.perf_2015, road_inj_rate_state.perf_2016, road_inj_rate_state.perf_2017, 
						   road_inj_rate_state.perf_2018, road_inj_rate_state.perf_2019, road_inj_rate_state.perf_2020, road_inj_rate_state.perf_2021, road_inj_rate_state.perf_2022  ];
	yValues_state_targ = [ null, null, null, null, null, null, null, road_inj_rate_state.targ_2020, road_inj_rate_state.targ_2021, road_inj_rate_state.targ_2022 ];
	yValues_mpo_perf = [ road_inj_rate_mpo.perf_2013, road_inj_rate_mpo.perf_2014, road_inj_rate_mpo.perf_2015, road_inj_rate_mpo.perf_2016, road_inj_rate_mpo.perf_2017, 
						 road_inj_rate_mpo.perf_2018, road_inj_rate_mpo.perf_2019, road_inj_rate_mpo.perf_2020, road_inj_rate_mpo.perf_2021, road_inj_rate_mpo.perf_2022 ];
	
	generate_roadway_safety_viz(xValues, yValues_state_perf, yValues_state_targ, yValues_mpo_perf, div_id, mylayout);
	
	
	// Roadway non-motorized fatalities and serious injuries
	div_id = 'roadway-nonmotorized-viz';
	mylayout = JSON.parse(JSON.stringify(layout));
	mylayout.title = 'Nonmotorized Fatalities and Serious Injuries - 5 year rolling average';
	
	var non_mot_state = _.find(rs_state_data, function(o) {  return o.perf_meas == 'Nonmotorized fatalities and nonmotorized serious injuries_5 year rolling average'; });
	var non_mot_mpo   = _.find(rs_mpo_data, function(o) {  return o.perf_meas == 'Nonmotorized fatalities and nonmotorized serious injuries_5 year rolling average'; });

	yValues_state_perf = [ non_mot_state.perf_2013, non_mot_state.perf_2014, non_mot_state.perf_2015, non_mot_state.perf_2016, non_mot_state.perf_2017, 
						   non_mot_state.perf_2018, non_mot_state.perf_2019, non_mot_state.perf_2020, non_mot_state.perf_2021, non_mot_state.perf_2022 ];
	yValues_state_targ = [ null, null, null, null, null, null, null, non_mot_state.targ_2020, non_mot_state.targ_2021, non_mot_state.targ_2022 ];
	yValues_mpo_perf =	[ non_mot_mpo.perf_2013, non_mot_mpo.perf_2014, non_mot_mpo.perf_2015, non_mot_mpo.perf_2016, non_mot_mpo.perf_2017, 
						   non_mot_mpo.perf_2018, non_mot_mpo.perf_2019, non_mot_mpo.perf_2020, non_mot_mpo.perf_2021, non_mot_mpo.perf_2022 ];				 

	generate_roadway_safety_viz(xValues, yValues_state_perf, yValues_state_targ, yValues_mpo_perf, div_id, mylayout);
	
	
	// Roadway non-motorized fatalities (only)
	div_id = 'roadway-nonmotorized-fat-viz';
	mylayout = JSON.parse(JSON.stringify(layout));
	mylayout.title = 'Nonmotorized Fatalities 1-year Totals';
	
	var non_mot_fat_state = _.find(rs_state_data, function(o) {  return o.perf_meas == 'Nonmotorized fatalities_1 year total'; });
	var non_mot_fat_mpo   = _.find(rs_mpo_data, function(o) {  return o.perf_meas == 'Nonmotorized fatalities_1 year total'; });
	
	yValues_state_perf = [ non_mot_fat_state.perf_2013, non_mot_fat_state.perf_2014, non_mot_fat_state.perf_2015, non_mot_fat_state.perf_2016, non_mot_fat_state.perf_2017, 
						   non_mot_fat_state.perf_2018, non_mot_fat_state.perf_2019, non_mot_fat_state.perf_2020, non_mot_fat_state.perf_2021, non_mot_fat_state.perf_2022 ];
	// NOTE: There are no statewide targets for this metric
	yValues_mpo_perf =	[ non_mot_fat_mpo.perf_2013, non_mot_fat_mpo.perf_2014, non_mot_fat_mpo.perf_2015, non_mot_fat_mpo.perf_2016, non_mot_fat_mpo.perf_2017, 
						  non_mot_fat_mpo.perf_2018, non_mot_fat_mpo.perf_2019, non_mot_fat_mpo.perf_2020, non_mot_fat_mpo.perf_2021, non_mot_fat_mpo.perf_2022 ];	
	
	generate_roadway_safety_viz(xValues, yValues_state_perf, null, yValues_mpo_perf, div_id, mylayout);
	
	
	// Vehicle Miles Traveled
	div_id = 'vmt-viz';
	mylayout = JSON.parse(JSON.stringify(layout));
	mylayout.title = 'Vehicle Miles Traveled (in millions)';
	var vmt_state = _.find(rs_state_data, function(o) { return o.perf_meas == 'Vehicle Miles Traveled'; });
	var vmt_mpo =  _.find(rs_mpo_data, function(o) { return o.perf_meas == 'Vehicle Miles Traveled'; });
	yValues_state_perf = [ vmt_state.perf_2013, vmt_state.perf_2014, vmt_state.perf_2015, vmt_state.perf_2016, vmt_state.perf_2017, 
						   vmt_state.perf_2018, vmt_state.perf_2019, vmt_state.perf_2020, vmt_state.perf_2021, vmt_state.perf_2022 ];
	// NOTE: There are no statewide targets for this metric
	yValues_mpo_perf = [ vmt_mpo.perf_2013, vmt_mpo.perf_2014, vmt_mpo.perf_2015, vmt_mpo.perf_2016, vmt_mpo.perf_2017, 
						 vmt_mpo.perf_2018, vmt_mpo.perf_2019, vmt_mpo.perf_2020, vmt_mpo.perf_2021, vmt_mpo.perf_2022 ];
	generate_roadway_safety_viz(xValues, yValues_state_perf, null, yValues_mpo_perf, div_id, mylayout);
} // roadway_safey_viz	
