/**
 * @fileoverview Tab-Navigation implementation.
 * for display:
 *    http://www.w3schools.com/css/pr_class_display.asp
 *    http://www.css4you.de/display.html
 * for visibility:
 *    http://www.w3schools.com/css/pr_class_visibility.asp
 *    http://www.css4you.de/visibility.html
 */

goog.provide('moose.tabnav');

goog.require('goog.dom');
goog.require('goog.style');
goog.require('goog.events');

/**
 * Tab-Nav: Horizontal navigation with tabs
 * @param {Array} navigation This array contains subarrays. These subarrays have
 * two elements: 0: titleId, 1:blockElementId
 * There have to be at least 2 subarrays!
 * @param {number} display
 * @constructor
 */
moose.tabnav = function(navigation, display) {
    this.navigation = navigation;
    for(var i=0;i < navigation.length;i++){
        var el = navigation[i];

        if(i!= display){
            goog.style.showElement(goog.dom.getElement(el[1]), false);
        }
        goog.events.listen(goog.dom.getElement(el[0]), goog.events.EventType.CLICK, this.titleClick, false, this);
    }
};

moose.tabnav.prototype.titleClick = function(e) {
    for(var i=0;i < this.navigation.length;i++){
        var subarray = this.navigation[i];
        var domEl =goog.dom.getElement(subarray[0]);
        goog.dom.classes.remove(domEl, 'WirdAngezeigt');
        if(subarray[0] == e.currentTarget.id){
            goog.dom.classes.add(domEl, 'WirdAngezeigt');
            goog.style.showElement(goog.dom.getElement(subarray[1]), true);
        } else {
            goog.style.showElement(goog.dom.getElement(subarray[1]), false);
        }
    }
}

// If you don't do that, you get an "Uncaught ReferenceError: moose is not defined"
// http://code.google.com/intl/de-DE/closure/compiler/docs/api-tutorial3.html#export
window['tabnav'] = moose.tabnav; // <-- Constructor
