lint-frontend:
	make -C frontend lint

install:
	npm ci

start-frontend:
	make -C frontend start

start-backend:
	npx start-server

deploy:
	git push heroku main

startas:
	make start-backend & make start-frontend

lint:
	npx eslint .

build:
    npm run build --prefix frontend

start:
    start-server -s ./frontend/build