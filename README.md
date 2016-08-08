# gobble-ractive-components

Compile ractive components in multi-file `.html`, `.css` and `.js` format into
single file format and produce `components.js` file that requires and registers 
all processed components onto global `Ractive.components`;

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
    |- widget
        |- widget.css
        |- widget.html
        |- widget.js
    |- foo
        |- foo.css
        |- foo.html
        |- foo.js
```

is transformed to:
```
|- components.js
|- widget.html
|- foo
```

where `components.js` is:

```js
import Ractive from "ractive";
import C0 from "./foo";
import C1 from "./widget";
Ractive.components['foo'] = C0;
Ractive.components['widget'] = C1;
```

Each components part ('html', 'css', 'js') is optional and can be omitted.

Hyphanated folder/file names are automatically transformed to camelCase.

Use `gobble-flatten` to handle nested component folders/files. 

**gobblefile.js**

```js
const components = gobble('src/components')
	// use gobble-flatten to handle trees of components:
	.transform( 'flatten' )
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
