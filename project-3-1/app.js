d3.csv('data.csv').then(( data ) => {
	console.log(data);
	generate(data);
});

d3.json( 'data.json' ).then((data) => {
	//console.log(data);
	//generate(data);
})

function generate(dataset) {

	var el = d3.select('body')
		.selectAll('p')
		.data(dataset)
		.enter()
		.append('p')
		.text((d) => {
			return 'This paragraph is binded to the number ' + d;
		})
		// .append( 'p' )
		.attr('class', (d) => {
			if (d > 25) return 'foo';
			else return null;
		})
		// .attr( 'class', 'bar' )
		// .classed( 'foo', true )
		.classed('bar', (d) => {
			return d < 25;
		})
		.style('color', (d) => {
			if (d > 25) return 'red';
			else return 'blue';
		})
	// .text( 'Hello World!' );

	console.log(el);
}

