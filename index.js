const fs = require( 'fs' );
const join = require( 'path' ).join;

const newline = '\n';

module.exports = function makeComponents ( src, outputdir, options, callback ) {

	const list = [];
	let imports = `import Ractive from "ractive";${newline}`;
	let set = '';

	try {
		writeDirectory( src );

		list.forEach( function( c, i ) {
			const tmp = `C${i}`;
			imports += `import ${tmp} from "./${c}";${newline}`;
			set += `Ractive.components['${c}'] = ${tmp};${newline}`;
		});

		fs.writeFileSync( join ( outputdir, 'components.js' ), imports + set );

		callback();
	} catch(err){
		callback(err);
	}

	function writeComponent ( src, c ) {
		const dir = join( src, c );
		let file = readFile( dir, c, 'html' );
		file += wrapFile( 'style', readFile( dir, c, 'css' ) );
		file += wrapFile( 'script', readFile( dir, c, 'js' ) );
		if ( file ) {
			var write = join( outputdir, c + '.html' );
			fs.writeFileSync( write, file );
			list.push( c );
		}
	}

	function writeDirectory ( dir ) {
		fs.readdirSync( dir )
			.filter( f => isDirectory( dir, f ) )
			.forEach( c => {
				writeComponent( dir, c );
				writeDirectory( join( dir, c ) );
			});
	}
};

function isDirectory( dir, f ){
	return fs.lstatSync( join( dir, f ) ).isDirectory();
}

function readFile( dir, name, ext ){
	var p = join( dir, name + '.' + ext );
	return  fs.existsSync(p) ? fs.readFileSync( p, 'utf8' ) : '';
}

function wrapFile( tag, file ){
	return file ? '\n\n' + `<${tag}>` + '\n' + file + '\n\n' + `</${tag}>` + '\n' : '';
}
