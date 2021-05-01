.PHONY: dev test watch_ts watch_test test_servers lint lint_fix

BIN=node_modules/.bin
DEV_ARGS=`test -f .dev.args && cat .dev.args | xargs`

default: build

node_modules: package.json package-lock.json
	npm install && touch node_modules

watch_ts: node_modules src
	$(BIN)/tsc -p . --outDir ./build --pretty --watch --preserveWatchOutput

dev: node_modules src
	$(BIN)/concurrently \
		-n ts,script \
		"make watch_ts" \
		"nodemon cli.js ${DEV_ARGS}"

build: node_modules src
	$(BIN)/tsc -p . --outDir ./build --pretty

test: node_modules src
	$(BIN)/jest --verbose

watch_test: node_modules src build
	$(BIN)/jest -c jest.compiled.config.js --verbose --watch

test_compiled: node_modules src build
	$(BIN)/jest -c jest.compiled.config.js --verbose

# coveralls: logs/jest/lcov.info
# 	$(BIN)/coveralls < logs/jest/lcov.info

e2e_test: build
	npm link
	./e2e-test.sh

test_servers:
	npm link
	./test-servers.sh

lint: node_modules
	$(BIN)/eslint . --ext .ts

lint_fix: node_modules
	$(BIN)/eslint . --ext .ts --fix

verify: build test_compiled lint

precommit: verify
