# gobble-ractive-components

Compile a folder tree of ractive components in multi-file 
format (`.html`, `.css` and `.js`) into a flat
single file format that includes a `components.js` file that 
imports and registers all processed components onto 
`Ractive.components`;

## Installation

First, you need to have gobble installed - see 
the [gobble readme](https://github.com/gobblejs/gobble) for details. Then,

```bash
npm i -D gobble-flatten
```

## Usage

Components need to be in folder with same name as filenames without prefix:

```
|- components
    |- foo-bar
        |- bizz-buzz
            |- bizz-buzz.css
            |- bizz-buzz.html
            |- bizz-buzz.js
        |- foo-bar.css
        |- foo-bar.html
        |- foo-bar.js
    |- widget
        |- widget.css
        |- widget.html
        |- widget.js
```

is transformed to:

```
|- bizz-buzz.html
|- components.js
|- foo-bar.html
|- widget.html
```

where `components.js` is:

```js
import Ractive from "ractive";
import C0 from "./bizz-buzz";
import C1 from "./foo-bar";
import C2 from "./widget";
Ractive.components['bizz-buzz'] = C0;
Ractive.components['foo-bar'] = C1;
Ractive.components['widget'] = C2;
```

Each components part ('html', 'css', 'js') is optional and can be omitted. 

The folder/file name is used for the component name in the components registry.


**gobblefile.js**

```js
const components = gobble('src/components')
	// scss and es6 js can be transpiled prior to combining:
	.transform( 'sass-file' )
	.transform('babel', {
		sourceMaps: true,
		blacklist: ['es6.modules', 'strict']
	})
	// combine into single file and create "components.js"
	.transform( 'ractive-components' )
	// pass to gobble-ractive to compile into js:
	.transform('ractive', { type: 'es6' });

// non-component js:
const js = gobble( 'src/js' )	
    .transform('babel', {
		sourceMaps: true,
		blacklist: ['es6.modules', 'strict']
	});

// bundle as siblings of components, which means
// imports in components can treat js as same directory
const bundle = gobble([ js, components ]).transform( 'rollup', {
  entry: 'index.js',
  dest: 'bundle.js',
  format: 'umd',
  sourceMaps: true,
});
```

Then require output file `components.js` in `app.js` or whatever 
your entry point is to register all components globally on `Ractive.components`.

## Tests

Uses [gobble-test](https://github.com/gobblejs/gobble-test) example based testing. Run via:

```bash
npm test
```

## License

[MIT](https://opensource.org/licenses/MIT). Copyright 2016 Marty Nelson
