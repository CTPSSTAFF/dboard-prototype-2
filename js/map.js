// URLs for GeoJSON files to be loaded
var mpo_towns_URL 	= 'json/boston_region_mpo_towns_97.geo.json',
    expressway_lottr_URL = 'json/ctps_cmp_2019_exp_routes_v12_lottr.geo.json';
	
function generate_map_viz(towns, lottr) {
	var _DEBUG_HOOK = 0;
	var towns_feats = towns.features;
	var lottr_feats = lottr.features;
	
	var projection = d3.geoConicConformal()
						.parallels([41 + 43 / 60, 42 + 41 / 60])
						.rotate([71 + 30 / 60, -41 ])
						.scale([28000]) // N.B. The scale and translation vector were determined empirically.
						.translate([120, 1130]);

	var geoPath = d3.geoPath().projection(projection);

    var interstateRoads = lottr_feats;
	
	// The following function to be customized
/*
	var tip = d3.tip()
	  .attr('class', 'd3-tip')
	  .offset([0, 10])
	  .html(function(d) {
	    // return "AM LOTTR: " + d.properties.am_lottr + "<br>PM LOTTR: " + d.properties.pm_lottr;
	  });
*/

	// SVG Viewport
	var svgContainer = d3.select("#lottr_map").append("svg")
		.attr("width", "100%")
		.attr("height", 600);
		
	// svgContainer.call(tip);

	// Create Boston Region MPO map with SVG paths for individual towns.
	var mapcSVG = svgContainer.selectAll(".town")
		.data(towns_feats)
		.enter()
		.append("path")
			.attr("class", "town")
			.attr("d", function(d, i) {return geoPath(d); })
			.style("fill", "#ddd")
			.style("stroke", "#191b1d")
			.style("stroke-width", "1px")
			.style("opacity", .5);
			
	var interstateSVG = svgContainer.selectAll(".interstate")
		.data(interstateRoads)
		.enter()
		.append("path")
			.attr("id", function(d) { return d.tmc;})
			.attr("d", function(d, i) { return geoPath(d); })
			// .style("fill", "#ddd")
			.style("stroke-width", function(d) { return 3; /* return (1/d.properties.am_lottr*5); */ })
			.style("stroke-linejoin", "round")
			.style("stroke", function(d) {
				var retval;
				if (d.properties.am_lottr < 1.5) {
					console.log('low');
					retval = '#ff0000';
				} else {
					console.log('hi');
					retval = '#00ff00';
				}	
				console.log(d.properties.am_lottr);
				return retval;
			})
			.style("opacity", .5);
/*			
	interstateSVG.on("mouseenter", function(d) {
					tip.show(d);
					})
				.on("mouseleave", function(d) {
					tip.hide(d);
			});	
*/			
	
	_DEBUG_HOOK  = 1;
	
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