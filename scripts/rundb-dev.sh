#!/bin/bash
# This scripts create a PostgreSQL container for development purposes.
# NOTE: This scripts removes current db container (if exists) and creates a new one.

PASS=1234
DBUSER=postgres
PORT=5432

docker rm -f rika-db-dev

docker run \
	--name rika-db-dev \
	-d \
	-p $PORT:5432 \
	-e POSTGRES_USER=$DBUSER \
	-e POSTGRES_PASSWORD=$PASS \
	--restart always \
	-v rika-db-data:/var/lib/postgresql/data \
	postgres