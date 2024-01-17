# dboard-prototype-2
Prototype #2 of 'Performance Dashboard'.  
This version uses the __chart.js__ library to generate data visualizations.

## Software Dependencies
* bootstrap - for layout
* chart.js - for data viz
* d3.js - for CSV loading / parsing
* jquery.js - for event management and DOM navigation \(not currently used for the latter\)
* lodash.js - functional programming utilities

## Data Viz Types
As requested by Sam Taylor.

Bar charts:
* Roadway safety - implemented in current version
* Transit safety - implemented in curretn version (MBTA only)
* Transit asset management

Line charts:
* Bridge and pavement condition - implemented in current version
* TTR - implemented in current version
* CMAQ - implemented in current version

## Data 
The data for the application was compiled by Sam Taylor and 
is found in this [Google Drive folder](https://drive.google.com/drive/u/0/folders/1__VECPvTx3DuBCAkn20ojae9joF3sOHB).
The data consists of 9 CSV files.
The CSV files have been copied into this repo, and have been renamed \(by 
replacing blanks and other non-alphanumeric characters with underscores\) 
in order to have file names that won't be problematical on LINUX-based web servers.

There are 6 categories of performance data rendered by the app.
For some categories, there is both 'statewide' and 'MPO area' data;
for others, there is only 'MPO area' data. When there is both 'statewide'
and 'MPO area' data for a given category, it is stored in _separate_ CSV files 
that do not necessarily have identical 'schemas' \(i.e.,e row- and column-organization\).
The following table summarizes this situation:

| Category | Statewide | MPO area |
| --- | --- | --- |
| Roadway Safety | x | x |
| Transit Safety |  | x |
| Transit Asset Management |  | x |
| Bridge and Pavement Condition | x | x |
| Travel-time Reliability | x | x |
| CMAQ |  | x |

# Page Layout 
The layout of the single page containing the was created using [Bootstrap](https://getbootstrap.com/).
The layout organizes the page into a number of 'pills' \(similar to 'tabs'\).

## Organization of the Code
The code for this app is currently organized in 7 JavaScript source files: one 'main' 
file \(__performance-dashboard-main.js\) containing the application initializion code,
and one file for each of the 6 'classes' of performance data. 
This organization is soley for convenience and simplicity
during development. In practice, the contents of all these files could be concatenated
into a single file \(which itself could be minifiled\) to optimize app download and
start-up time, if this ever becomes a concern. \(This isn't the case at the moment.\)

### App Start-up
The thesingle HTML file for the app \(__index.html__\) contains a single \<script\>
tag that 'kicks' off the application. It reads as follows:
```
<script> 
	$(document).ready(function() { initialize(); });
</script>
```
Here, we use the jQuery library to 'listen' for the browser firing the __ready__
event on the page. When this event is fired, the code snippet above calls the app's
__initialize__ function, in \(__performance-dashboard-main.js \).

### App Initialization Code
The main driver code contains the URLs for the 9 CSV files containing the data to be
presented by the app, and the driver logic _per se_.

The driver logic is worth quoting in full:
```
function initialize() {
	Promise.all([
		// Part 1: Load the CSV files
		d3.csv(roadwaySafety_state_URL, rs_state_RowConverter),
		d3.csv(roadwaySafety_mpo_URL, rs_mpo_RowConverter),
		d3.csv(transitSafety_mpo_URL, ts_mpo_RowConverter),
		d3.csv(tam_mpo_URL, tam_mpo_RowConverter),
		d3.csv(bridgeAndPavement_state_URL, b_and_p_state_RowConverter),
		d3.csv(bridgeAndPavement_mpo_URL, b_and_p_mpo_RowConverter),
		d3.csv(ttr_state_URL, ttr_state_RowConverter),
		d3.csv(ttr_mpo_URL, ttr_mpo_RowConverter),
		d3.csv(cmaq_mpo_URL, cmaq_mpo_RowConverter)
	]).then(function(files) {
		// Part 2: Call the main function to generate the viz'es for each class of data
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
		// Part 3
		alert('Error during initialization. Exiting.');
	});
}
```
I have added comments to the code sinppet above, to simplify the reader's 'navigation' of the
code while reading the following description. 
Each 'part' consists of an anonymous JavaScript function.

The __Part 1__ function is concerned with loading the 9 CSV files that contain the data 
to be displayed by the app. We use a JS 'Promise' to wait for all 
of the 9 files to be successfully loaded. 

Each CSV file is loaded using the __d3.csv__ function.
This function handles all the details of submitting the asynchronous request 
to the backing server for the data, receiving the server's response, and parsing the response.
Each of the 9 CSV files has a unique structure \(organization of rows and columns\).
Consequently, a different parsing function is passed to each invocation of __d3.csv__.
The parsing functions are found in the JS source file for the 'class' of performance data 
to be presented \(e.g., roadway safety, bridge and pavement condition, etc.\)

When all the CSV files have been successfully loaded, the __Part 2__ function is called.
\(If there were errors loading the CSV files, the __Part 3__ function is called.)
Part 2 simply passes the results of parsing the CSV files to the main 'driver' function
responsible for generating the visualizations of each 'class' of performance data.

### The Catecory-Specific Code
There is one main 'driver' routine for producing the visualization for each
of the 6 categories of performance data. Depending upon whether there is both
'statewide' and 'MPO area' or only 'MPO area' data for a particular category,
the main 'driver' for it is passed either two or one parameters. The values 
passed for these parameters are the _parsed_ data read from the relevant CSV file\(s\).

The main business of these 'driver' routines are to extract information from the 
raw parsed data passed to it, and 'package' it in a form suitable for the 
generation of each required visualization. The driver routines then call one 
or more category-specific routines that contain the code to generate a Chart.js
visualization.
