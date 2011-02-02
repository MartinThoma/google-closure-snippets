/**
 * @fileoverview Accordeon implementation.  
 */

goog.provide('moose.accordeon');

goog.require('goog.ui.AnimatedZippy');
goog.require('goog.ui.Zippy');
goog.require('goog.ui.ZippyEvent');

/**
 * Accordeon
 * @param {string} id The id of the html-element that contains all headers
 * @param {string} titletag For example 'h3'
 * @param {string} contenttag For example 'p'
 * @constructor
 */
moose.accordeon = function(id, titletag, contenttag) {
    var faqs = goog.dom.getElement(id);
    if (faqs != null){
        var helper1 = goog.dom.getElementsByTagNameAndClass(titletag, undefined, faqs);
        var helper2 = goog.dom.getElementsByTagNameAndClass(contenttag, undefined, faqs);

        for( var i=0;i<helper1.length;i++){
            new goog.ui.AnimatedZippy(helper1[i], helper2[i]);
        }
    } 
};

// If you don't do that, you get an "Uncaught ReferenceError: moose is not defined"
// http://code.google.com/intl/de-DE/closure/compiler/docs/api-tutorial3.html#export
window['accordeon'] = moose.accordeon; // <-- Constructor
