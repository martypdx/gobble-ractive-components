const request = require( 'superagent' );

component.exports = {
	data: {
		items: null
	},
	oninit() {
		request.get( '/api/items' ).then( items => this.set({ items }) );
	}
};