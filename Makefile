lint-frontend:
	make -C frontend lint

install:
	make -C frontend install & make -C backend install

start-frontend:
	make -C frontend start

start-backend:
	npx start-server

start:
	make start-backend & make start-frontend