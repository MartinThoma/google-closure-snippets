/**
 * @fileoverview Klassencheckboxen for selecting many checkboxes with one 
 * tri-state root checkbox
 */
goog.provide('moose.Klassencheckboxen');

goog.require('goog.dom');
goog.require('goog.array');
goog.require('goog.events');
goog.require('goog.ui.Checkbox');
goog.require('goog.ui.Checkbox.State');

/**
 * Checkbox
 * @param {string} parentTagId The html-id of the tag which is arround each checkbox
 * @param {string} rootTagId The id of the html-span-element which should be the root checkbox
 * @param {string} childTag e.g. 'p'
 * @constructor
 */
moose.Klassencheckboxen = function(parentTagId, rootTagId, childTag) {
    this.all = new goog.ui.Checkbox();
    this.all.decorate(goog.dom.getElement(rootTagId));
    this.all.setLabel(/** @type {Element} */ (this.all.getElement().parentNode) );
    goog.events.listen(this.all, goog.ui.Component.EventType.CHANGE, this.rootChanged, false, this);


    var parentTag  = goog.dom.getElement(parentTagId);
    this.leafes = goog.dom.getElementsByTagNameAndClass(childTag, undefined, parentTag);
    this.leafObjects = new Array();
    this.leafObjLen = 0;
    goog.array.forEach(this.leafes, this.addToObject, this);
    goog.array.forEach(this.leafObjects, this.setListener, this);
};

moose.Klassencheckboxen.prototype.setListener = function(leaf){
    goog.events.listen(leaf, goog.ui.Component.EventType.CHANGE, this.leafChanged, false, this);
}

moose.Klassencheckboxen.prototype.addToObject = function(leaf){
    this.leafObjects[this.leafObjLen] = goog.dom.getElementsByTagNameAndClass('input', undefined, leaf)[0];
    this.leafObjLen++;
}

moose.Klassencheckboxen.prototype.leafChanged = function(e){
    var status = this.leafObjects[0].checked;
    var same = true;
    for(var i=0;i<this.leafObjLen;i++){
        if(this.leafObjects[i].checked != status){
            same = false;
        }
    }
    this.all.setChecked(same ? status : goog.ui.Checkbox.State.UNDETERMINED);
}

moose.Klassencheckboxen.prototype.rootChanged = function(e) {
    var status = this.all.getChecked();
    for(var i=0;i<this.leafObjLen;i++){
        this.leafObjects[i].checked = (status);
    }
}

// If you don't do that, you get an "Uncaught ReferenceError: moose is not defined"
// http://code.google.com/intl/de-DE/closure/compiler/docs/api-tutorial3.html#export
window['Klassencheckboxen'] = moose.Klassencheckboxen; // <-- Constructor
