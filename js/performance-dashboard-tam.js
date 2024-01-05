// CSV parser for TAM (transit asset management) CSV file
var tam_mpo_RowConverter = function(d) {
	// NOTE: These values are now entered in percent, with a trailing '%' character.
	//       They will probably have to be read as strings and THEN converted to numbers.
	return {
		pm_or_ac:	d['Performance Measure or Asset Category'],
		agency:		d['Agency'],
		mode:		d['Mode'],
		targ_2023:	+d['2023 Target'],
		perf_2022:	+d['2022 Performance'],
		targ_2022:	+d['2021 Performance']
	}
};


function tam_viz(tam_mpo_data) {
	console.log('Entered tam_viz');
	return; // for now
	
	// Generate a bar chart for the TAM data
	
} // tam_viz
