/**
 * @fileoverview Autocompleter implementation.  
 */

goog.provide('moose.autocompleter');

goog.require('goog.array');
goog.require('goog.ui.AutoComplete');
goog.require('goog.ui.AutoComplete.ArrayMatcher');
goog.require('goog.ui.AutoComplete.InputHandler');
goog.require('goog.ui.AutoComplete.Renderer');

/**
 * Autocompleter
 * @param {string} id The id of the html-element that gets the autocompleter
 * @param {Array} ViewValues 
 * @param {Array} InsertValues 
 * @constructor
 * @extends {goog.ui.AutoComplete}
 */
moose.autocompleter = function(id, ViewValues, InsertValues) {
    this.htmlTag = goog.dom.getElement(id);
    this.ViewValues = ViewValues;
    this.InsertValues = InsertValues;

    var matcher = new goog.ui.AutoComplete.ArrayMatcher(ViewValues, true);
    var renderer = new goog.ui.AutoComplete.Renderer();
    var inputhandler = new goog.ui.AutoComplete.InputHandler(null, null, false);

    goog.ui.AutoComplete.call(this, matcher, renderer, inputhandler);

    inputhandler.attachAutoComplete(this);
    inputhandler.attachInputs(this.htmlTag);
};
goog.inherits(moose.autocompleter, goog.ui.AutoComplete);

/**
 * Selects the given row.  Implements the SelectionHandler interface.
 * @param {Object} row The row to select.
 * @param {Array} ViewValues 
 * @param {Array} InsertValues 
 * @return {boolean} Whether to suppress the update event.
 */
goog.ui.AutoComplete.InputHandler.prototype.selectRow = function(row, ViewValues, InsertValues) {
  var index = goog.array.indexOf(ViewValues, row.toString());
  this.setTokenText(InsertValues[index], false);
  return false;
};

/**
 * If there are any current matches, this passes the hilited row data to
 * <code>selectionHandler.selectRow()</code>
 * @return {boolean} Whether there are any current matches.
 */
goog.ui.AutoComplete.prototype.selectHilited = function() {
  var index = this.getIndexOfId(this.hiliteId_);
  if (index != -1) {
    var selectedRow = this.rows_[index];
    var suppressUpdate = this.selectionHandler_.selectRow(selectedRow , this.ViewValues, this.InsertValues);
    this.dismiss();
    if (!suppressUpdate) {
      this.dispatchEvent({
        type: goog.ui.AutoComplete.EventType.UPDATE,
        row: selectedRow
      });
      if (this.triggerSuggestionsOnUpdate_) {
        this.selectionHandler_.update(true);
      }
    }
    return true;
  } else {
    this.dismiss();
    this.dispatchEvent(
        {
          type: goog.ui.AutoComplete.EventType.UPDATE,
          row: null
        });
    return false;
  }
};

// If you don't do that, you get an "Uncaught ReferenceError: moose is not defined"
// http://code.google.com/intl/de-DE/closure/compiler/docs/api-tutorial3.html#export
window['autocompleter'] = moose.autocompleter; // <-- Constructor
