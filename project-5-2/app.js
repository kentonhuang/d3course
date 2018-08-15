var data            =   [
	{ key: 0, num: 6 },
	{ key: 1, num: 20 },
	{ key: 2, num: 21 },
	{ key: 3, num: 14 },
	{ key: 4, num: 2 },
	{ key: 5, num: 30 },
	{ key: 6, num: 7 },
	{ key: 7, num: 16 },
	{ key: 8, num: 25 },
	{ key: 9, num: 5 },
	{ key: 10, num: 11 },
	{ key: 11, num: 28 },
	{ key: 12, num: 10 },
	{ key: 13, num: 26 },
	{ key: 14, num: 9 }
];

// Create SVG Element
var chart_width     =   800;
var chart_height    =   400;
var bar_padding     =   5;
var svg             =   d3.select( '#chart' )
    .append( 'svg' )
    .attr( 'width', chart_width )
		.attr( 'height', chart_height );
		
// Create Scales
// 800 / 15 = 53.33
// 0, 53.33, 106.66
var x_scale = d3.scaleBand()
	.domain( d3.range(data.length))
	.rangeRound([0, chart_width])
	.paddingInner(0.05);

var y_scale = d3.scaleLinear()
	.domain([
		0, d3.max(data, function( d ) {
			return d.num;
		})
	])
	.range([ 0, chart_height ]);

// Bind Data and create bars
svg.selectAll( 'rect' )
    .data( data )
    .enter()
    .append( 'rect' )
    .attr( 'x', function( d, i ){
        return x_scale(i);
    })
    .attr( 'y', function(d ){
        return chart_height - y_scale(d);
    })
    .attr( 'width', x_scale.bandwidth() )
    .attr( 'height', function( d ){
        return y_scale(d);
    })
    .attr( 'fill', '#7ED26D' );

// Create Labels
svg.selectAll( 'text' )
    .data(data)
    .enter()
    .append( 'text' )
    .text(function( d ){
        return d;
    })
    .attr( 'x', function( d, i ){
        return x_scale(i) + x_scale.bandwidth()/2;
    })
    .attr( 'y', function(d ){
        return chart_height - y_scale(d) + 15;
    })
    .attr( 'font-size', 14 )
    .attr( 'fill', '#fff' )
		.attr( 'text-anchor', 'middle' );
		
// Events
d3.select('.update').on('click', () => {
	for(var i = 0; i < data.length; i++){
		var num = Math.round(Math.random() * 60);
		data[i] = num;
	}
	//data.reverse();
	// data[0] = 50;
	y_scale.domain([0, d3.max(data)])

	svg.selectAll('rect')
		.data(data)
		.transition()
		.delay((d, i) => {
			return i / data.length * 1000;
		})
		.duration( 1000 )
		.attr( 'y', function(d ){
        return chart_height - y_scale(d);
    })
    .attr( 'height', function( d ){
        return y_scale(d);
		})
		
	svg.selectAll('text')
		.data(data)
		.transition()
		.delay((d, i) => {
			return i / data.length * 1000;
		})
		.duration( 1000 )
		.text(function (d) {
			return d;
		})
		.attr('y', function (d) {
			return chart_height - y_scale(d) + 15;
		})

	
	
})

//Add Data
d3.select('.add').on('click', function(){
	var new_num = Math.floor(Math.random() * d3.max(data));
	data.push(new_num);

	// Update Scales
	x_scale.domain(d3.range(data.length));
	y_scale.domain([
		0, d3.max(data, function(d) {
			return d;
		})
	])

	// Select bars
	var bars = svg.selectAll('rect').data(data);

	// Add new bar
	bars.enter()
		.append('rect')
		.attr('x', function(d, i) {
			return x_scale(i);
		})
		.attr('y', chart_height)
		.attr('width', x_scale.bandwidth())
		.attr('height', 0)
		.attr('fill', '#7ED26D')
		.merge(bars)
		.transition()
		.duration(1000)
		.attr( 'x', function( d, i ){
        return x_scale(i);
    })
    .attr( 'y', function(d ){
        return chart_height - y_scale(d);
    })
    .attr( 'width', x_scale.bandwidth() )
    .attr( 'height', function( d ){
        return y_scale(d);
		})
		
	var labels = svg.selectAll('text').data(data);
	labels.enter()
		.append('text')
		.text(function(d){
			return d;
		})
		.attr('x', function(d,i) {
			return x_scale(i) + x_scale.bandwidth() / 2;
		})
		.attr('y', chart_height)
		.attr('font-size', '14px')
		.attr('fill', '#fff')
		.attr('text-anchor', 'middle')
		.merge(labels)
		.transition()
		.duration(1000)
    .attr( 'x', function( d, i ){
        return x_scale(i) + x_scale.bandwidth()/2;
    })
    .attr( 'y', function(d ){
        return chart_height - y_scale(d) + 15;
    })		
})

//Remove Data
d3.select('.remove').on('click', function() {
	data.shift();

	// Update Scales
	x_scale.domain(d3.range(data.length));
	y_scale.domain([0, d3.max(data)]);

	// Select bars
	var bars = svg.selectAll('rect').data(data);

	bars.transition()
		.duration(500)
		.attr('x', function(d, i) {
			return x_scale(i);
		})
		.attr('y', function(d) {
			return chart_height - y_scale(d);
		})
		.attr('width', x_scale.bandwidth())
		.attr('height', function(d) {
			return y_scale(d);
		})

	// Remove Bar
	bars.exit()
		.transition()
		.attr('x', chart_width)
		.remove();

	//Update labels
	var labels = svg.selectAll('text').data(data);
	labels.transition()
		.duration(500)
		.attr('text-anchor', 'start')
		.attr('x', function(d, i) {
			return x_scale(i) + x_scale.bandwidth() / 2;
		})
		.attr('y', function(d){
			return chart_height - y_scale(d) + 15;
		})

	labels.exit()
		.transition()
		.attr('x', chart_width)
		.remove();
})