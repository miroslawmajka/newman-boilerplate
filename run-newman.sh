#!/usr/bin/env bash

POSTMAN_URL=https://www.getpostman.com/collections/${POSTMAN_COLLECTION_ID}

./node_modules/.bin/newman run ${POSTMAN_URL} \
        -e postman-environment.json \
        -r cli,junit \
        --reporter-junit-export ./test-results/junit/junit.xml
