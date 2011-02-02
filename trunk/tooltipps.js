/**
 * @fileoverview Tooltips implementation.  
 */

goog.provide('moose.tips');

goog.require('goog.dom');
goog.require('goog.ui.Tooltip');

/**
 * Tooltipps: all images with the css class cssClass get a tooltip instead of 
 * the alt-tag
 * @param {string} cssClass The CSS class of the html-elements that should have tooltips instead of alt-tags
 * @constructor
 */
moose.tips = function(cssClass) {
    var elements = goog.dom.getElementsByTagNameAndClass('img', cssClass);
    for(var i=0;i<elements.length;i++){
        var msg = elements[i].alt.split('::');
        var tempTip = new goog.ui.Tooltip(elements[i], elements[i].alt);
        tempTip.setHideDelayMs(300);
        if(msg.length >= 2){
            tempTip.setHtml('<div class="tip-title">' + msg[0] + '</div><div class="tip-text">' + msg[1] + '</div>');
        } else {
            tempTip.setHtml('<div class="tip-title">' + msg[0] + '</div>');
        }
    }
};

// If you don't do that, you get an "Uncaught ReferenceError: moose is not defined"
// http://code.google.com/intl/de-DE/closure/compiler/docs/api-tutorial3.html#export
window['tips'] = moose.tips; // <-- Constructor
