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

	// If the library has already been added don't add it again!
	if (window.page) {
		return;
	}

	/**	A local private copy of our page namespace.
	 *	@private
	 *	@since Version 0.1.0
	 */
	var page = {};

	/**	Definitions that can be used throughout the library.
	 *	<br/><br/>
	 *	They are <code>Object.freeze</code>'ed in the
	 *	<code>page.methods.init()</code> function to prevent
	 *	values being changed.
	 *	<br/><br/>
	 *	These are like <code>#define</code> in C programming.
	 *	@namespace	Private Definitions
	 *	@private
	 *	@since Version 0.1.0
	 */
	page.defines = {};

	/**	Enumerators that can be used throughout the library.
	 *	<br/><br/>
	 *	They are <code>Object.freeze</code>'ed in the
	 *	<code>page.methods.init()</code> function to prevent
	 *	values being changed.
	 *	<br/><br/>
	 *	These are like <code>enums</code> in C programming.
	 *	@namespace	Private enumerators
	 *	@private
	 *	@since Version 0.1.0
	 */
	page.enums = {};

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
			version: [0, 1, 0]
		};

	// Overload the toString method for the version
	page.viewModel.version.__proto__.toString = function () { return page.viewModel.version.join('.'); };

	/**	Private elements that can be added to the page dynamically
	 *	@namespace	Private elements
	 *	@private
	 *	@since Version 0.1.0
	 */
	page.elements =	{};

	/**	Private event handlers
	 *	@namespace	Private event handlers
	 *	@private
	 *	@since Version 0.1.0
	 */
	page.eventCallback = {};

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
					bb.log.info('Initialising Page Control Code...');

					bb.log.verbose('Freezing stuff');
					if ('function' === typeof (Object.freeze)) {
						Object.freeze(page.defines);
						Object.freeze(page.enums);
					}

					bb.log.info('Initialising View Model...');

					ko.applyBindings(page.viewModel);

					bb.log.info('Initialised View Model');
				} catch (exception) {
					bb.log.error('Page Control Code Initialisation...FAILED: ' + exception);
					return;
				}
				bb.log.info('Page Control Code Initialisation...DONE!');
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
	window.page = {};
}(window));
