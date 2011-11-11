/*	This file uses JsDoc Toolkit documentation.
 *	http://code.google.com/p/jsdoc-toolkit/
 */

/**	@fileOverview This file contains the Burning Boots Javascript Library.
 *	@author Matt Clarkson
 */

/*jslint
	browser:	true,
	es5:		true,
	maxerr:		50,
	indent:		4,
 */

(function (window, undefined) {
	'use strict';

	if (!window) {
		// Something is seriously fucking wrong.
		return;
	}

	// Local copies of the window objects for speed
	var document			= window.document,
//		navigator			= window.navigator,
//		location			= window.location,
//		parent				= window.parent,
		console				= window.console,
		$					= window.$,
		ko					= window.ko,
		bb					= window.bb,
		page				= {};

	// Set up the failure article
	if (document) {
		page.javaScriptFail	= document.createElement('article');
		if (page.javaScriptFail) {
			page.javaScriptFail.id						= 'javascript-fail';
			page.javaScriptFail.innerHTML				= '<h1>Hmm, looks like something broke.</h1><p>It seems the JavaScript had a hiccup on this page.</p><p>You can <a href="mailto:developer@burningboots.co.uk?Subject=JavaScript%20Error%20-%20index.js">email us about this problem</a> or, if you\'re a member of <a href="http://github.com">github</a>, <a href="https://github.com/burning-boots/www.burningboots.co.uk/issues/new">create a new issue for us to solve</a>.</p>';
			page.javaScriptFail.style.color				= 'black';
			page.javaScriptFail.style.border			= '1px solid red';
			page.javaScriptFail.style.backgroundColor	= '#ffb3c6';
			page.javaScriptFail.style.textAlign			= 'center';
			page.javaScriptFail.style.padding			= '1em';
			page.javaScriptFail.add						= function () {
				var main	= document.getElementById('main');
				if (main) {
					main.firstChild.parentNode.insertBefore(this, main.firstChild);
				}
			};
		}
	}

	// Check the needed dependencies
	if ((window === undefined)		||
			($ === undefined)		||
			($.tmpl === undefined)	||
			(bb === undefined)		||
			(ko === undefined)) {
		if (console.error) {
			console.error('BB: Error: You must include jQuery, jQuery Templates, Knockout and the Burning Boots library for the index control Javascript to work.');
		}
		if (document) {
			if (page.javaScriptFail && page.javaScriptFail.add) {
				page.javaScriptFail.add();
			}
		}
		window.page	= undefined;
		return;
	}

	// If the control code has already been added don't add it again!
	if (window.page) {
		return;
	}

	/**	Private view model that can be used with Knockout JS to bind view elements
	 *	@namespace	Private view model
	 *	@public
	 *	@since Version 0.1.0
	 */
	page.viewModel =
		{
			/**	The version of the page control code
			 *	@public
			 *	@since Version 0.1.2
			 */
			version: [0, 1, 4],

			/**	The CSS view model code
			 *	@public
			 *	@since Version 0.1.0
			 */
			css:
				{
					/**	A list of presentation CSS classes
					 *	@public
					 *	@since Version 0.1.0
					 */
					presentationList: ko.observableArray([
						{string: 'Dark Fire', value: 'dark-fire'}
					]),

					/**	The selected presentation class
					 *	@public
					 *	@since Version 0.1.0
					 */
					presentation: ko.observable(),

					/**	A list of layout CSS classes
					 *	@public
					 *	@since Version 0.1.0
					 */
					layoutList: ko.observableArray([
						{string: 'Vertical', value: 'vertical'}
					]),

					/**	The selected layout CSS class
					 *	@public
					 *	@since Version 0.1.0
					 */
					layout: ko.observable(),
				}
		};

	/**	Occurs when the presentation CSS changes
	 *	@public
	 *	@since Version 0.1.2
	 */
	page.viewModel.css.presentation.subscribe(function (value) {
		bb.css.presentation = value.value;
	});

	/**	Occurs when the layout CSS changes
	 *	@public
	 *	@since Version 0.1.2
	 */
	page.viewModel.css.layout.subscribe(function (value) {
		bb.css.layout = value.value;
	});

	// Overload the toString method for the version
	page.viewModel.version.toString = function () { return page.viewModel.version.join('.'); };


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
					bb.log.info('Initialising Page Control Code');

					bb.log.verbose('Initialising View Model...');
					ko.applyBindings(page.viewModel);
					bb.log.info('Initialised View Model');

					// Set the default CSS classes
					if (!bb.css.layout) {
						bb.log.verbose('Setting default layout');
						bb.css.layout = page.viewModel.css.layout().value;
						bb.log.info('Set default layout');
					}
					if (!bb.css.presentation) {
						bb.log.verbose('Setting default presentation');
						bb.css.presentation = page.viewModel.css.presentation().value;
						bb.log.info('Set default presentation');
					}
				} catch (exception) {
					if (page.javaScriptFail && page.javaScriptFail.add) {
						page.javaScriptFail.add();
					}
					bb.log.error('Initialising Page Control Code...FAILED: ' + exception);
					$(document.documentElement).removeClass('js').addClass('no-js');
					return;
				}
				bb.log.info('Initialised Page Control Code');
			}
		};

	// Initialise the namespace when the DOM loads
	$(document).ready(page.methods.init);

	/**	The Burning Boots Javascript Library contains useful API calls
	 *	that can be useful for development.
	 *	@namespace	Control code for the main index page
	 *	@exports window.page as index
	 *	@version 0.1.4
	 */
	window.page = {};
}(window));
