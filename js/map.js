// URLs for GeoJSON files to be loaded
var mpo_towns_URL 	= 'json/boston_region_mpo_towns_97.geo.json',
    expressway_lottr_URL = 'json/ctps_cmp_2019_exp_routes_v12_lottr.geo.json';
	
function generate_map_viz(towns, lottr) {
	var _DEBUG_HOOK = 0;
	
} // generate_map_viz

function initialize() {
	Promise.all([
		d3.json(mpo_towns_URL),
		d3.json(expressway_lottr_URL)
	]).then(function(files) {
		var towns = files[0];
		var lottr = files[1];
		var _DEBUG_HOOK = 0;
		generate_map_viz(towns, lottr)
	}).catch(function(err) {
		var _DEBUG_HOOK = 0;
		alert('Error during initialization. Exiting.');
	});
} //initialize