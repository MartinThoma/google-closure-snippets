/**
 * @fileoverview FormValidation
 * see also http://www.whatwg.org/specs/web-apps/current-work/multipage/states-of-the-type-attribute.html#text-state-and-search-state
 * for the html-elements
 */

goog.provide('moose.formValidator');

goog.require('goog.dom');
goog.require('goog.dom.forms');
goog.require('goog.events');
goog.require('goog.ui.Bubble');
goog.require('goog.format.EmailAddress');

/**
 * formValidator: checks if the Elements of the form have valid values when the
 * form is submitted
 * @param {string} formId The id of the form-element that should be checked
 * @constructor
 */
moose.formValidator = function(formId) {
    this.form = goog.dom.getElement(formId);
    this.elements = goog.dom.getElementsByTagNameAndClass('input', undefined, this.form);
    this.checkboxGroups = goog.dom.getElementsByTagNameAndClass('div', 'at-least-one-checkbox', this.form);
    this.bubbles = new Array();
    this.bubbleLen= 0;
    this.alreadValidatedOnce = false;
    goog.events.listen(this.form, goog.events.EventType.SUBMIT, this.checkElements, false, this);
};

moose.formValidator.prototype.checkElements = function(e) {
    if (!this.alreadyValidatedOnce){
        goog.events.listen(this.form, goog.events.EventType.INPUT, this.checkElements, false, this);
        this.alreadyValidatedOnce = true;
    }
    var error = false;

    // clear all pre-existing bubbles

    for(var i=0;i<this.bubbleLen;i++){
        this.bubbles[i].dispose();
    }
    this.bubbles = new Array();
    this.bubbleLen = 0;

    for(var i=0;i<this.elements.length;i++){
        if(this.elements[i].type == 'submit'){
            continue;
        }

        var el = this.elements[i];
        var elValid = true;
        // el.required works only in chrome (html5-support?)
        if(!goog.isNull(el.getAttribute('required')) && el.value.length == 0){
            var bubble = new goog.ui.Bubble('Dieses Feld muss ausgef&uuml;llt werden.');
            bubble.setAutoHide(false);
            bubble.setPosition(new goog.positioning.AnchoredPosition(el, goog.positioning.Corner.TOP_RIGHT));
            bubble.setTimeout(0);
            bubble.render();
            bubble.attach(el);
            bubble.setVisible(true);

            elValid = false;
            
            this.bubbles[this.bubbleLen] = bubble;
            this.bubbleLen++;
        }

        // el.type works only in chrome, but not in IE / FF
        if(el.getAttribute('type') == 'email' && el.value.length > 0){
            // Falls der Browser nicht html5-fähig ist, wird el.type == 'text'!!!! auch wenn email drinn steht
            var mail = new goog.format.EmailAddress(el.value);
            if(!mail.isValid()){
                var bubble = new goog.ui.Bubble('Bitte geben Sie eine korrekte Email-Adresse an.');
                bubble.setAutoHide(false);
                bubble.setPosition(new goog.positioning.AnchoredPosition(el, goog.positioning.Corner.TOP_RIGHT));
                bubble.setTimeout(0);
                bubble.render();
                bubble.attach(el);
                bubble.setVisible(true);

                elValid = false;

                this.bubbles[this.bubbleLen] = bubble;
                this.bubbleLen++;
            }
        }
        //if(goog.dom.classes.has(el, 'nodigit') && el.value.length > 0 && ... ) Wie überprüfe ich ob keine Zahl im string ist?
        if(elValid){
            goog.dom.classes.remove(el, 'invalid');
            goog.dom.classes.add(el, 'valid');
        } else {
            error = true;
            goog.dom.classes.remove(el, 'valid');
            goog.dom.classes.add(el, 'invalid');
        }
    }

    for(var i=0;i<this.checkboxGroups.length;i++){
        var oneWasChecked = false;
        var checkboxes = goog.dom.getElementsByTagNameAndClass('input', undefined, this.checkboxGroups[i]);
        for(var j=0;j< checkboxes.length;j++){
            if(checkboxes[j].checked){oneWasChecked = true;break;}
        }
        if(oneWasChecked){
            goog.dom.classes.remove(this.checkboxGroups[i], 'invalid');
            goog.dom.classes.add(this.checkboxGroups[i], 'valid');
        } else {
            var bubble = new goog.ui.Bubble('Bitte w&auml;hlen Sie mindestens eine Checkbox aus');
            bubble.setAutoHide(false);
            bubble.setPosition(new goog.positioning.AnchoredPosition(this.checkboxGroups[i], goog.positioning.Corner.TOP_RIGHT));
            bubble.setTimeout(0);
            bubble.render();
            bubble.attach(this.checkboxGroups[i]);
            bubble.setVisible(true);

            this.bubbles[this.bubbleLen] = bubble;
            this.bubbleLen++;

            error = true;
            goog.dom.classes.remove(this.checkboxGroups[i], 'valid');
            goog.dom.classes.add(this.checkboxGroups[i], 'invalid');
        }
    }

    if(error){
        goog.dom.classes.add(this.form, 'invalid');
        e.preventDefault(); 
        return false;
    } else {
        goog.dom.classes.swap(this.form, 'invalid', 'valid');
        return true;
    }


}

// If you don't do that, you get an "Uncaught ReferenceError: moose is not defined"
// http://code.google.com/intl/de-DE/closure/compiler/docs/api-tutorial3.html#export
window['formValidator'] = moose.formValidator; // <-- Constructor
