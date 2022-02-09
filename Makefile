BIN = $(PWD)/.venv3/bin
MANAGE = $(BIN)/python3 $(PWD)/manage.py

.PHONY: debug install clean tidy

debug: install
	$(MANAGE) migrate
	DEBUG=True $(MANAGE) runserver

install: .venv3 db.sqlite3 node_modules

node_modules: package.json
	npm install

dist: install
	npm run build

db.sqlite3:
	$(MANAGE) migrate
	$(MANAGE) createsuperuser
	
clean:
	rm -rf */__pycache__ dist

tidy: clean
	rm -rf .venv3 db.sqlite3 node_modules

.venv3: requirements.txt
	[ -d $@ ] || python3 -m venv $@
	$(BIN)/python3 -m pip install -U pip wheel
	$(BIN)/pip3 install -r $<
	touch $@
