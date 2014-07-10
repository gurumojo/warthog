#!/bin/bash
#
# temporary file bugfix for grunt-contrib-jasmine dependency
######################################################################
SEARCH="temp : tempDir"
REPLACE="temp : exports.getRelativeFileList(outdir, tempDir)"
FILE=node_modules/grunt-contrib-jasmine/tasks/lib/jasmine.js
TMP=/tmp/sed_txt_`date +%F`

echo Applying text replacement: /$SEARCH/$REPLACE/

sed -e "s/$SEARCH/$REPLACE/" $FILE > $TMP
mv $TMP $FILE

echo Saved revision to file: $FILE

