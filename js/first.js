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
	
	// Example 2 - modified from example on website
	const c2 = document.getElementById('example_2');
	const cfg2 = {
	  type: 'line',
	  data: {
		datasets: [{
		  data: [{x: 10, y: 20}, {x: 15, y: 5}, {x: 20, y: 10}]
		}],
		labels: [10, 15, 20]
	  }
	}
	new Chart(c2, cfg2);

	// Example 3
	const c3 = document.getElementById('example_3');
	const cfg3 = {
	  type: 'line',
	  data: {
		datasets: [{
		  data: [{x: '2016-12-25', y: 20}, {x: '2016-12-26', y: 10}]
		}]
	  }
	}
	new Chart(c3, cfg3);
	
	// Example 4
	const c4 = document.getElementById('example_4');
	const cfg4 = {
	  type: 'bar',
	  data: {
		datasets: [{
		  data: [{x: 'Sales', y: 20}, {x: 'Revenue', y: 10}]
		}]
	  }
	}
	new Chart(c4, cfg4);
	
	// Example 5
	const c5 = document.getElementById('example_5');
	const cfg5 = {
	  type: 'bar',
	  data: {
		datasets: [{
		  data: [{id: 'Sales', nested: {value: 1500}}, {id: 'Purchases', nested: {value: 500}}]
		}]
	  },
	  options: {
		parsing: {
		  xAxisKey: 'id',
		  yAxisKey: 'nested.value'
		}
	  }
	}
	new Chart(c5, cfg5);
	
} //initialize