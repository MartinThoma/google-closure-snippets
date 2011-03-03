/**
 * @fileoverview Implementation for a username checker. Bound to input field 
 * http://code.google.com/intl/de-DE/closure/library/docs/xhrio.html#quick2
 */

goog.provide('moose.usernamechecker');

goog.require('goog.dom');
goog.require('goog.dom.classes');
goog.require('goog.events');
goog.require('goog.events.InputHandler');
goog.require('goog.net.XhrIo');

/**
 * Username checker
 * @param {string} inputTagId The id of the html-element that contains the username which is to be checked
 * @param {string} url URL to the script that returns 0 (if the username doesn't exist) or 1 (if it exists)
 * @param {number} minLength With how many latters do we begin to test?
 *
 * @constructor
 */
moose.usernamechecker = function(inputTagId, url, minLength) {
    var self = this;
    this.inputElement = goog.dom.getElement(inputTagId);
    this.minLength = minLength;
    this.url = url;

    this.cssClassForTakenUsername     = /** @type {string} */ "taken";
    this.cssClassForAvailableUsername = /** @type {string} */ "available";

    // S. 413  
    /** @type {goog.events.EventTarget} */
    var textIh =  new goog.events.InputHandler(self.inputElement);
    goog.events.listen( textIh, goog.events.InputHandler.EventType.INPUT, self.checkNumber, false, self);
    
}

moose.usernamechecker.prototype.checkNumber = function (e) {
    var self = this;
    if(self.inputElement.value.length >= self.minLength){
        self.makeRequest(self.inputElement.value);
    }
}

moose.usernamechecker.prototype.makeRequest = function (username) {
    var self = this;
    var fullUrl = self.url + '?username=' + username;
    goog.net.XhrIo.send(fullUrl, function(e) {
        var xhr = /** @type {goog.net.XhrIo} */ (e.target);
        var isAvailable = xhr.getResponseText();

        if(isAvailable == 1){goog.dom.classes.set(self.inputElement, self.cssClassForAvailableUsername);}
        else{goog.dom.classes.set(self.inputElement, self.cssClassForTakenUsername);}
    }, 'GET');
}

// If you don't do that, you get an "Uncaught ReferenceError: moose is not defined"
// http://code.google.com/intl/de-DE/closure/compiler/docs/api-tutorial3.html#export
window['usernamechecker'] = moose.usernamechecker; // <-- Constructor
