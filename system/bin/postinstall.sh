#!/bin/bash
#
# npm postinstall script
######################################################################
bower install
system/bin/bugfix.sh
node_modules/protractor/bin/webdriver-manager update --standalone
