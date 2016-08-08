const gobble = require( 'gobble' );
const test = require( 'gobble-test' );
const join = require( 'path' ).join;
const sass = require( '../' );

test([{
	name: 'transform',
	definition: gobble( join( __dirname, 'src' ) ).transform( sass, {
		includePaths: [ join( __dirname, 'include') ],
		sourceMap: true
	}),
	expected: join( __dirname, 'expected' ) 
}]);
