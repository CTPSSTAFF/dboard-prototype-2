// CSV parser for TTR (travel time reliability) 'statewide' CSV file
var ttr_state_RowConverter = function(d) {
	return {
		perf_meas:		d['Performance Measure'],
		targ_2025:		+d['Four-Year Target (2025)'],
		targ_2023:		+d['Two-Year Target (2023)'],
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


function interstate_ttr_viz(xValues, yValues_targ, yValues_perf_state, yValues_perf_mpo) {
	var trace_targ = { 
	  x: xValues,
	  y: yValues_targ,
	  type: 'bar',
	  name: 'Target',
	  text: yValues_targ.map(String),
	  textposition: 'auto',
	  hoverinfo: 'none',
	  opacity: 0.5,
	  marker: {
		color: 'rgb(158,202,225)',
		line: {
		  color: 'rgb(8,48,107)',
		  width: 1.5
		}
	  }
	};	
	
	var trace_perf_state = {
	  x: xValues,
	  y: yValues_perf_state,
	  type: 'bar',
	  name: 'Performance - statewide',
	  text: yValues_perf_state.map(String),
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
	
	var trace_perf_mpo = {
	  x: xValues,
	  y: yValues_perf_mpo,
	  type: 'bar',
	  name: 'Performance - Boston Region MPO',
	  text: yValues_perf_mpo.map(String),
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
	
	
	var data = [trace_targ, trace_perf_state, trace_perf_mpo];

	var layout = {
		xaxis: { type: 'category' },
		title: 'Percent of person-miles traveled on the Interstate System that are reliable'
	};

	Plotly.newPlot('ttr-interstate-viz', data, layout);
	
} // interstate_ttr_viz

function non_interstate_ttr_viz(xValues, yValues_targ, yValues_perf_state, yValues_perf_mpo) {
	var trace_targ = { 
	  x: xValues,
	  y: yValues_targ,
	  type: 'bar',
	  name: 'Target',
	  text: yValues_targ.map(String),
	  textposition: 'auto',
	  hoverinfo: 'none',
	  opacity: 0.5,
	  marker: {
		color: 'rgb(158,202,225)',
		line: {
		  color: 'rgb(8,48,107)',
		  width: 1.5
		}
	  }
	};	
	
	var trace_perf_state = {
	  x: xValues,
	  y: yValues_perf_state,
	  type: 'bar',
	  name: 'Performance - statewide',
	  text: yValues_perf_state.map(String),
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
	
	var trace_perf_mpo = {
	  x: xValues,
	  y: yValues_perf_mpo,
	  type: 'bar',
	  name: 'Performance - Boston Region MPO',
	  text: yValues_perf_mpo.map(String),
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
	
	
	var data = [trace_targ, trace_perf_state, trace_perf_mpo];

	var layout = {
		xaxis: { type: 'category' },
		title: 'Percent of person-miles traveled on the non-Interstate NHS System that are reliable'
	};

	Plotly.newPlot('ttr-noninterstate-viz', data, layout);
} // non_interstate_ttr_viz

function truck_ttr_viz(xValues, yValues_targ, yValues_perf_state, yValues_perf_mpo) {
var trace_targ = { 
	  x: xValues,
	  y: yValues_targ,
	  type: 'bar',
	  name: 'Target',
	  text: yValues_targ.map(String),
	  textposition: 'auto',
	  hoverinfo: 'none',
	  opacity: 0.5,
	  marker: {
		color: 'rgb(158,202,225)',
		line: {
		  color: 'rgb(8,48,107)',
		  width: 1.5
		}
	  }
	};	
	
	var trace_perf_state = {
	  x: xValues,
	  y: yValues_perf_state,
	  type: 'bar',
	  name: 'Performance - statewide',
	  text: yValues_perf_state.map(String),
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
	
	var trace_perf_mpo = {
	  x: xValues,
	  y: yValues_perf_mpo,
	  type: 'bar',
	  name: 'Performance - Boston Region MPO',
	  text: yValues_perf_mpo.map(String),
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
	
	
	var data = [trace_targ, trace_perf_state, trace_perf_mpo];

	var layout = {
		xaxis: { type: 'category' },
		title: 'Truck Travel-time Reliability Index (Interstates only)'
	};

	Plotly.newPlot('ttr-truck-viz', data, layout);
} // truck_ttr_viz

function ttr_viz(ttr_state_data, ttr_mpo_data) {
	
	console.log('Entered ttr_viz');
	return; // for now
	
	// Generate a line chart for the TTR data
	
	
	
	var xValues = [ '2025' , '2023', '2021', '2019' ];
	var yValues_targ = [], yValues_perf_state, yValues_perf_mpo = [];
	
	// Interstate TTR - all vehicles 
	
	// 3 sets of Y values for TTR: target, performance statewide, performance in the MPO area.
	// Note that the 'statewide' record has targets for 2025, 2023, 2021 and 2019, and performance data for 2021 and 2019;
	// the 'MPO' record only has performance data for 2021 and 2019.
	var interstate_ttr_state = _.find(ttr_data, function(o) { return o.perf_meas == 'Percent of the person-miles traveled on the Interstate System that are reliable - Statewide'; });
	var interstate_ttr_mpo = _.find(ttr_data, function(o) { return o.perf_meas == 'Percent of the person-miles traveled on the Interstate System that are reliable - Boston Region'; });
	
	yValues_targ = [ interstate_ttr_state.targ_2025, interstate_ttr_state.targ_2023, interstate_ttr_state.targ_2021, interstate_ttr_state.targ_2019 ];
	yValues_perf_state = [ 0, 0, interstate_ttr_state.perf_2021, interstate_ttr_state.perf_2019 ];
	yValues_perf_mpo = [ 0, 0, interstate_ttr_mpo.perf_2021, interstate_ttr_mpo.perf_2019 ];
	interstate_ttr_viz(xValues, yValues_targ, yValues_perf_state, yValues_perf_mpo);
	
	// Non-interstate (NHS) TTR - all vehicles
	var non_interstate_ttr_state = _.find(ttr_data, function(o) { return o.perf_meas == 'Percent of the person-miles traveled on the non-Interstate NHS that are reliable - Statewide'; });
	var non_interstate_ttr_mpo = _.find(ttr_data, function(o) { return o.perf_meas == 'Percent of the person-miles traveled on the non-Interstate NHS that are reliable - Boston Region'; });
	
	yValues_targ = [ non_interstate_ttr_state.targ_2025, non_interstate_ttr_state.targ_2023, non_interstate_ttr_state.targ_2021, non_interstate_ttr_state.targ_2019 ];
	yValues_perf_state = [ 0, 0, non_interstate_ttr_state.perf_2021, non_interstate_ttr_state.perf_2019 ];
	yValues_perf_mpo = [ 0, 0, non_interstate_ttr_mpo.perf_2021, non_interstate_ttr_mpo.perf_2019 ];
	non_interstate_ttr_viz(xValues, yValues_targ, yValues_perf_state, yValues_perf_mpo);
	
	// Truck TTR
	var truck_ttr_state = _.find(ttr_data, function(o) { return o.perf_meas == 'Truck Travel Time Reliability Index (for truck travel on Interstate highways) - Statewide'; });
	var truck_ttr_mpo = _.find(ttr_data, function(o) { return o.perf_meas == 'Truck Travel Time Reliability Index (for truck travel on Interstate highways) - Boston Region'; });
	yValues_targ = [ truck_ttr_state.targ_2025, truck_ttr_state.targ_2023, truck_ttr_state.targ_2021, truck_ttr_state.targ_2019 ];
	yValues_perf_state = [ 0, 0, truck_ttr_state.perf_2021, truck_ttr_state.perf_2019 ];
	yValues_perf_mpo = [ 0, 0, truck_ttr_mpo.perf_2021, truck_ttr_mpo.perf_2019 ];
	truck_ttr_viz(xValues, yValues_targ, yValues_perf_state, yValues_perf_mpo);
} // ttr_viz
