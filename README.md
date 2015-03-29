In this project I collect all those little snippets I write for some online projects. All of them are written in `JavaScript` with Google Closure Library.

# How to Compile two snippets #
```
python ../closure-library/closure/bin/calcdeps.py \
-i ../closure-library/closure/goog/deps.js \
-i checkbox.js \
-i tab-nav.js \
-p ../closure-library/closure/goog/ \
-o compiled \
-c ../closure-compiler/build/compiler.jar \
-f "--compilation_level=ADVANCED_OPTIMIZATIONS" \
-f "--warning_level=VERBOSE" \
-f "--define=goog.LOCALE='de'" > checkboxandtabnav-compiled.js
```

# Which scripts are here? #
  * accordeon.js
  * autocompleter.js
  * checkbox.js
  * fancyForm.js : Make a form with many fieldsets nicer
  * formValidator.js: Validate a form
  * tab-nav.js : Create a tabbed Navigation
  * tooltipps.js
  * username-check.js