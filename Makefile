SHELL=/bin/bash

# some commands need sudo on linux, but not on macs, or travis
# (see .travis.yml)
export MAYBE_SUDO=sudo
ifeq ($(shell uname -s),Darwin)
	export MAYBE_SUDO=
endif

### installing / building

install:
	$(MAKE) npm

npm:
	npm install
	which gulp || $(MAYBE_SUDO) npm install -g gulp@3.8.6
	which karma || $(MAYBE_SUDO) npm install -g karma-cli@0.0.4
	which mocha || $(MAYBE_SUDO) npm install -g mocha@1.20.1

### ci / testing

ci: gulp-ci karma

gulp-ci:
	gulp lint

karma:
	karma start karma.conf.js

karma-single:
	karma start karma.conf.js --single-run
