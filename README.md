# Newman Boilerplate

Circle CI Build Status: [![CircleCI](https://circleci.com/gh/miroslawmajka/newman-boilerplate.svg?style=svg)](https://circleci.com/gh/miroslawmajka/newman-boilerplate)

The project focuses on "Postman/Newman" testing of the API part of the [Sample Express App](https://www.npmjs.com/package/sample-express-app).

Postman collection [web link](https://miroslawmajka.postman.co/collections/8965684-9e451885-a44f-40c1-b714-9703d6ff7285?version=latest&workspace=cdd8fa83-b4e5-406b-8561-abab423f0dd4).

Run newman acceptance tests:
```shell script
./run-newman.sh ${POSTMAN_COLLECTION_ID}
```

Run newman load tests:
```shell script
npm test
```

