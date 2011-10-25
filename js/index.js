/*	This file uses JsDoc Toolkit documentation.
 *	http://code.google.com/p/jsdoc-toolkit/
 */

/**	@fileOverview This file contains the Burning Boots Javascript Library.
 *	@author Matt Clarkson
 */

/*jslint
	devel:		true,
	browser:	true,
	es5:		true,
	vars:		true,
	plusplus:	true,
	maxerr:		50,
	indent:		4,
 */

(function (window, undefined) {
	'use strict';

	// Local copies of the window objects for speed
	var document	= window.document;
//	var navigator	= window.navigator;
//	var location	= window.location;
//	var parent		= window.parent;
	var console		= window.console;
	var $			= window.$;
	var ko			= window.ko;
	var bb			= window.bb;

	// Check the needed dependencies
	if ((window === undefined)		||
			($ === undefined)		||
			($.tmpl === undefined)	||
			(bb === undefined)		||
			(ko === undefined)) {
		if (console.error) {
			console.error('BB: Error: You must include jQuery, jQuery Templates, Knockout and the Burning Boots library for the index control Javascript to work.');
		}
		window.page	= undefined;
		return;
	}

	// If the control code has already been added don't add it again!
	if (window.page) {
		return;
	}

	/**	A local private copy of our page namespace.
	 *	@private
	 *	@since Version 0.1.0
	 */
	var page = {};

	/**	Private view model that can be used with Knockout JS to bind view elements
	 *	@namespace	Private view model
	 *	@private
	 *	@since Version 0.1.0
	 */
	page.viewModel =
		{
			/**	The version of the page control code
			 *	@private
			 *	@since Version 0.1.0
			 */
			version: [0, 1, 0],

			css:
				{
					presentationList: ko.observableArray([
							{string: 'Dark Fire', value: 'dark-fire'}
						]),

					presentation: ko.observable(),

					layoutList: ko.observableArray([
							{string: 'Vertical', value: 'vertical'}
						]),

					layout: ko.observable()
				}
		};

	// Overload the toString method for the version
	page.viewModel.version.__proto__.toString = function () { return page.viewModel.version.join('.'); };


	/**	Private Methods
	 *	@namespace	Private Methods
	 *	@private
	 *	@since Version 0.1.0
	 */
	page.methods =
		{
			/**	This initialises our namespace, doing various
			 *	things so that the page methods can be used effectively
			 *	in the user agent.
			 *	@private
			 *	@since Version 0.1.0
			 */
			init: function () {
				try {
					bb.log.info('Initialising View Model...');
					ko.applyBindings(page.viewModel);
				} catch (exception) {
					bb.log.error('Initialising View Model...FAILED: ' + exception);
					$(document.documentElement).removeClass('js').addClass('no-js');
					return;
				}
				bb.log.info('Initialised View Model');
			}
		};

	// Initialise the namespace when the DOM loads
	$(document).ready(page.methods.init);

	/**	The Burning Boots Javascript Library contains useful API calls
	 *	that can be useful for development.
	 *	@namespace	Control code for the main index page
	 *	@exports window.page as index
	 *	@version 0.1.0
	 */
	window.page = {viewModel: page.viewModel};
}(window));
