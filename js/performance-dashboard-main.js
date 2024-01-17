// performance-dashboard-main.js - main JS file for the chart.js version of this application
// The following JS files MUST be loaded before this one:
//	1. performance-dashboard-roadway-safety.js
// 	2. performance-dashbard-transit-safety.js
//	3. performance-dashboard-tam.js
//	4. performance-dashboard-bridge-pavement.js
//	5. performance-dashboard-ttr.js
//	6. performance-dashboard-cmaq.js


// URLs for CSV files to be loaded
var roadwaySafety_state_URL 	= 'csv/PBPP_Dashboard_Roadway_Safety_State_Totals.csv',
    roadwaySafety_mpo_URL 		= 'csv/PBPP_Dashboard_Roadway_Safety_Boston_Region.csv',
	transitSafety_mpo_URL 		= 'csv/PBPP_Dashboard_Transit_Safety_Boston_Region.csv',
	bridgeAndPavement_state_URL = 'csv/PBPP_Dashboard_Bridge_and_Pavement_State_Totals.csv',
	bridgeAndPavement_mpo_URL 	= 'csv/PBPP_Dashboard_Bridge_and_Pavement_Boston_Region.csv',
	tam_mpo_URL					= 'csv/PBPP_Dashboard_TAM_Boston_Region.csv',
	ttr_state_URL				= 'csv/PBPP_Dashboard_TTR_State_Totals.csv',
	ttr_mpo_URL					= 'csv/PBPP_Dashboard_TTR_Boston_Region.csv',
	cmaq_mpo_URL				= 'csv/PBPP_Dashboard_CMAQ_Boston_Region.csv';


function initialize() {
	Promise.all([
		d3.csv(roadwaySafety_state_URL , rs_state_RowConverter),
		d3.csv(roadwaySafety_mpo_URL , rs_mpo_RowConverter),
		d3.csv(transitSafety_mpo_URL, ts_mpo_RowConverter),
		d3.csv(tam_mpo_URL, tam_mpo_RowConverter),
		d3.csv(bridgeAndPavement_state_URL, b_and_p_state_RowConverter),
		d3.csv(bridgeAndPavement_mpo_URL, b_and_p_mpo_RowConverter),
		d3.csv(ttr_state_URL, ttr_state_RowConverter),
		d3.csv(ttr_mpo_URL, ttr_mpo_RowConverter),
		d3.csv(cmaq_mpo_URL, cmaq_mpo_RowConverter)
	]).then(function(files) {
		rs_state_data 	= files[0];
		rs_mpo_data 	= files[1];
		ts_mpo_data 	= files[2];
		tam_mpo_data 	= files[3];
		bp_state_data 	= files[4];
		bp_mpo_data 	= files[5];
		ttr_state_data	= files[6];
		ttr_mpo_data	= files[7];
		cmaq_mpo_data 	= files[8];
		roadway_safety_viz(rs_state_data, rs_mpo_data);
		transit_safety_viz(ts_mpo_data);
		tam_viz(tam_mpo_data);
		bridge_pavement_viz(bp_state_data, bp_mpo_data);
		ttr_viz(ttr_state_data, ttr_mpo_data);
		cmaq_viz(cmaq_mpo_data);
	}).catch(function(err) {
		var _DEBUG_HOOK = 0;
		alert('Error during initialization. Exiting.');
	});
}