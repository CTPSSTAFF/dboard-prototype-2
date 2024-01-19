// CSV parser for TAM (transit asset management) CSV file
var tam_mpo_RowConverter = function(d) {
	// NOTE: These values are now entered in percent, with a trailing '%' character.
	//       They will probably have to be read as strings and THEN converted to numbers.
	temp =  {
		pm_or_ac:	d['Performance Measure or Asset Category'],
		agency:		d['Agency'],
		mode:		d['Mode'],
		targ_2023:	+(d['2023 Target']replace('%','')),
		perf_2022:	+(d['2022 Performance']replace('%','')),
		targ_2022:	+(d['2021 Performance']replace('%',''))
	};
	return temp;
};

function generate_mbta_tam_9_category_viz() {
	// 9-step color palette from: https://colorbrewer2.org/#type=qualitative&scheme=Paired&n=9
	// with 0.75 opacity added.
	//
	// 'rgba(166,206,227,0.75)'
	// 'rgba(31,120,180,0.75)'
	// 'rgba(178,223,138,0.75)'
	// 'rgba(51,160,44,0.75)'
	// 'rgba(251,154,153,0.75)'
	// 'rgba(227,26,28,0.75)'
	// 'rgba(253,191,111,0.75)'
	// 'rgba(255,127,0.75)'
	// 'rgba(202,178,214,0.75)'
	
	return; // for now
} // generate_mbta_tam_viz

function tam_viz(tam_mpo_data) {
	console.log('Entered tam_viz');
	// Generate bar charts for the TAM data
	
	var mbta  = _.filter(tam_mpo_data, function(o) { return  o.agency == 'MBTA'; });
	var cata  =  _.filter(tam_mpo_data, function(o) { return o.agency == 'CATA'; });
	var mwrta = _.filter(tam_mpo_data, function(o) { return o.agency == 'MWRTA'; });
	
	// MBTA TAM
	//
	// MBTA Rolling Stock
	var ab  = _.find(mbta, function(o) { return o.pm_or_ac == 'Rolling Stock' && o.mode == 'Articulated Buses'; });
	var b   = _.find(mbta, function(o) { return o.pm_or_ac == 'Rolling Stock' && o.mode == 'Busses'; });
	var crl = _.find(mbta, function(o) { return o.pm_or_ac == 'Rolling Stock' && o.mode == 'CR Locomotives'; });
	var crc = _.find(mbta, function(o) { return o.pm_or_ac == 'Rolling Stock' && o.mode == 'CR Passenger Coaches'; });
	var fb  = _.find(mbta, function(o) { return o.pm_or_ac == 'Rolling Stock' && o.mode == 'Ferry Boats'; });
	var hr  = _.find(mbta, function(o) { return o.pm_or_ac == 'Rolling Stock' && o.mode == 'Heavy Rail'; });
	var lr  = _.find(mbta, function(o) { return o.pm_or_ac == 'Rolling Stock' && o.mode == 'Light Rail'; });
	var vt  = _.find(mbta, function(o) { return o.pm_or_ac == 'Rolling Stock' && o.mode == 'Vintage Trolleys'; });
	var pt  = _.find(mbta, function(o) { return o.pm_or_ac == 'Rolling Stock' && o.mode == 'Paratransit Vehicles'; });
	
	var yValues_ab = [ ab.perf_2022, ab.targ_2022, ab.targ_2023 ];
	var yValues_b = [ b.perf_2022, b.targ_2022, b.targ_2023 ];
	var yValues_crl = [ crl.perf_2022, crl.targ_2022, crl.targ_2023 ];
	var yValues_crc = [ crc.perf_2022, crc.targ_2022, crc.targ_2023 ];
	var yValues_fb = [ fb.perf_2022, fb.targ_2022, fb.targ_2023 ];
	var yValues_hr = [ hr.perf_2022, hr.targ_2022, hr.targ_2023 ];
	var yValues_lr = [ lr.perf_2022, lr.targ_2022, lr.targ_2023 ];
	var yValues_vt = [ vt.perf_2022, vt.targ_2022, vt.targ_2023 ];
	var yValues_pt = [ pt.perf_2022, pt.targ_2022, pt.targ_2023 ];
	
	// generate_mbta_tam_9_category_viz ....
	
	// MBTA Equipment
	var equip = _.find(mbta, function(o), return o.mode == 'All Equipment'; });
	
	// MBTA Facilities
	var pp = _.find(mbta, function(o) return o.mode == 'Passenger/Parking'; });
	var am = _.find(mbta, function(o) return o.mode == 'Admin/Maintenance'; });
	
	// MBTA Fixed Guideway
	
	
	// CATA TAM
	//
	// CATA Rolling Stock
	
	
	// CATA Equipment
	
	
	// CATA Facilities
	
	
	
	// MWRTA 
	//
	// MWRTA TAM 
	//
	
	// MWRTA Rolling Stock
	
	
	// MWRTA Equipment
	
	
	// MWRTA Facilities
	
	
	return; // for now
	
} // tam_viz
