### installing / building

install:
	$(MAKE) npm

npm:
	npm install

### ci / testing

ci: gulp-ci karma

gulp-ci:
	npm run-script gulp-lint

karma:
	npm run-script karma

### updating dist

build:
	gulp build
