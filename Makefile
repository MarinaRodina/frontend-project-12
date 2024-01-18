lint-frontend:
	make -C frontend lint

install:
	npm ci

start-frontend:
	make -C frontend start

start:
	npx start-server

deploy:
	git push heroku main

starts:
	make start & make start-frontend