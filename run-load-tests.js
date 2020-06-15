const newman = require('newman');

const env = require('./envHandler');

const collectionPath = `./${env.POSTMAN_COLLECTION_NAME}.postman_collection.json`;
const environmentPath = `./${env.POSTMAN_ENVIRONMENT_NAME}.postman_environment.json`;

const POSTMAN_COLLECTION = require(collectionPath);
const POSTMAN_ENVIRONMENT = require(environmentPath);
const PARALLEL_RUNS = env.PARALLEL_RUNS || 3;

const loadTestRuns = [];

for (let i = 0; i < PARALLEL_RUNS; i++) loadTestRuns.push(i);

(async () => {
    try {
        const results = await Promise.all(loadTestRuns.map(i => runTestCollection(i)));

        console.log(`Finished running ${results.length} concurrent collections`);

        const failedRuns = results.filter(r => r.failures.length > 0);

        const failCount = failedRuns.length;

        if (failCount > 0) {
            const failPrefix = '[FAIL]';

            console.warn(`${failPrefix} failed collection runs: ${failCount}`);

            failedRuns.forEach(fr => {
                console.warn(`${failPrefix} collection with failed tests: ${fr.colName}`);

                fr.failures.forEach((f, i) => {
                    console.warn(`${failPrefix} ${fr.colName} index ${i}:`);
                    console.warn(`${failPrefix} ${fr.colName} request: ${f.parent.name} / ${f.source.name}`);
                    console.warn(`${failPrefix} ${fr.colName} test: ${f.error.test}`);
                    console.warn(`${failPrefix} ${fr.colName} error message: ${f.error.message}`);
                });
            });

            process.exit(1);
        } else {
            console.log('[SUCCESS] All collections passed');
        }
    } catch (err) {
        console.error('Failed running load tests');
        console.error(err);
    }
})();

async function runTestCollection(runIndex) {
    return new Promise((resolve, reject) => {
        const colName = `COL-${runIndex}`;
        const newmanConfig = {
            collection: POSTMAN_COLLECTION,
            environment: POSTMAN_ENVIRONMENT,
            reporters: 'junit',
            reporter: {
                junit: {
                    export: `./test-results/junit/junit-load-${colName}.xml`
                }
            }
        };

        console.log(`Running ${colName} collection...`);

        newman.run(newmanConfig, (err, summary) => {
            if (err) return reject(err);

            const failures = summary.run.failures;

            console.log(`Finsihed ${colName} collection run with ${failures.length} test failures`);

            resolve({
                colName,
                failures
            });
        });
    });
}
