function initialize() {
	
	// 'Getting Started' example - from https://www.chartjs.org/docs/latest/getting-started/
	const ctx = document.getElementById('myChart');
	new Chart(ctx, {
		type: 'bar',
		data: {
			labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
			datasets: [{
				label: '# of Votes',
				data: [12, 19, 3, 5, 2, 3],
				borderWidth: 1
			}]
		},
		options: {
			scales: {
				y: {
					beginAtZero: true
					}
			}
		}
	});
	
	// Example 1 from 'Data Structures' page: https://www.chartjs.org/docs/latest/general/data-structures.html
	const c1 = document.getElementById('example_1');
	const cfg1 = {
		type: 'bar',
		data: {
		datasets: [{
			data: [20, 10],
			}],
		labels: ['a', 'b']
		}
	}
	new Chart(c1, cfg1);
} //initialize