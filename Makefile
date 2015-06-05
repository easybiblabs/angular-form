### installing / building

install:
	$(MAKE) npm

npm:
	npm install

### ci / testing

ci: gulp-ci karma distdiff

gulp-ci:
	npm run-script gulp-lint

karma:
	npm run-script karma

distdiff: build
	@git diff --exit-code dist/index.js || \
		(echo "Release file \"dist/index.js\" is out of date."; false)

### updating dist

build:
	gulp build
