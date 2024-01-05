// URLs for CSV files to be loaded
var roadwaySafetyURL 	= 'csv/roadway_safety.csv',
	transitSafetyURL 	= 'csv/transit_safety.csv',
	bridgeAndPavementURL = 'csv/bridge_and_pavement.csv',
	tamURL				= 'csv/tam.csv',
	ttrURL				= 'csv/ttr.csv',
	cmaqURL				= 'csv/cmaq.csv';


// CSV parser for transit safety CSV file
var ts_mpo_RowConverter = function(d) {
	return {
		agency:					d['Agency'],
		targ_2023_fat:			+d['2023 Target - Fatalities'],	//
		perf_2019_21_fat:		+d['2019-21 Performance - Fatalities'],	//
		targ_2023_fat_rate:		+d['2023 Target - Fatality Rate'],	//
		targ_2019_21_fat_rate:	+d['2019-21 Performance - Fatality Rate'],	//
		targ_2023_inj:			+d['2023 Target - Injuries'],		//
		perf_2019_21_inj:		+d['2019-21 Performance - Injuries'], //
		targ_2023_inj_rate:		+d['2023 Target - Injury Rate'], // 
		perf_2019_21_inr_rate:	+d['2019-21 Performance - Injury Rate'],
		targ_2023_saf:			+d['2023 Target - Safety Events'],	//
		perf_2019_21_saf:		+d['2019-21 Performance - Safety Events'],
		targ_2023_saf_rate:		+d['2023 Target - Safety Event Rate'], // 
		perf_2019_21_saf_rate:	+d['2019-21 Performance - Safety Event Rate'],
		targ_2023_sys:			+d['2023 Target - System Reliability in Miles'],
		perf_2019_21_sys:		+d['2019-21 Performance - System Reliability in Miles']
	};
};


function transit_safety_viz(ts_mpo_data) {
	console.log('Entered transit_safety_viz');
	return; // for now
	
	// Generate a bar chart for the transit safety data
	
} // transit_safety_viz

