/**
 * @fileoverview fancyForm implementation.  
 */

goog.provide('moose.fancyForm');

goog.require('goog.dom');
goog.require('goog.dom.classes');
goog.require('goog.array');
goog.require('goog.events');

/**
 * fancyForm
 * @param {string} id The id of the html-form
 * @param {number} fieldsetnumber The number of the fieldset, that should be visible
 * @constructor
 */
moose.fancyForm = function(id, fieldsetnumber) {
    this.active = fieldsetnumber;

    var htmlForm = goog.dom.getElement(id);

    this.fieldsetList = goog.dom.getElementsByTagNameAndClass('fieldset', undefined, htmlForm);
    this.legendList   = goog.dom.getElementsByTagNameAndClass('legend', undefined, htmlForm);

    goog.array.forEach(this.fieldsetList, this.makeInvisible, this);
    goog.dom.classes.remove(this.fieldsetList[this.active], 'invisible');
    var currentLegend = this.legendList[this.active];
    var previousFieldsetButton = goog.dom.getElement('previousFieldsetButton');
    var nextFieldsetButton = goog.dom.getElement('nextFieldsetButton');

    this.currentTitle = goog.dom.getElement('CurrentTitle');
    this.currentTitle.innerHTML = this.legendList[this.active].innerHTML;

    goog.events.listen(previousFieldsetButton, goog.events.EventType.CLICK, this.changeFieldset, false, this);
    goog.events.listen(nextFieldsetButton, goog.events.EventType.CLICK, this.changeFieldset, false, this);

};

moose.fancyForm.prototype.makeInvisible = function(fieldset){
    goog.dom.classes.add(fieldset, 'invisible');
}

moose.fancyForm.prototype.changeFieldset = function(e){
    if(e.target.id == 'nextFieldsetButton'){var add = 1;}
    else {var add = -1;}

    goog.dom.classes.toggle(this.fieldsetList[this.active], 'invisible');
    this.active += add;
    if(this.active < 0){this.active += this.fieldsetList.length;}

    this.active %= this.fieldsetList.length;
    goog.dom.classes.toggle(this.fieldsetList[this.active], 'invisible');
    this.currentTitle.innerHTML = this.legendList[this.active].innerHTML;
}

// If you don't do that, you get an "Uncaught ReferenceError: moose is not defined"
// http://code.google.com/intl/de-DE/closure/compiler/docs/api-tutorial3.html#export
window['fancyForm'] = moose.fancyForm; // <-- Constructor
