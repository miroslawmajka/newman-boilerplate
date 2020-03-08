#!/usr/bin/env bash

./node_modules/.bin/newman run SampleExpressAppApi.postman_collection.json \
        -e Local.postman_environment.json \
        -r cli,junit \
        --reporter-junit-export ./test-results/junit/junit-acceptance.xml
