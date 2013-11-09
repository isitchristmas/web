SHELL := /bin/bash
NODE   = node

test:
	@./node_modules/.bin/mocha

test-perf:
	@$(NODE) test/performance/buildTree.js
	@$(NODE) test/performance/queryInterval.js
	@$(NODE) test/performance/queryOverlap.js

.PHONY: test test-perf