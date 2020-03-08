require('dotenv').config();

module.exports = {
    POSTMAN_COLLECTION_NAME : process.env.POSTMAN_COLLECTION_NAME,
    POSTMAN_ENVIRONMENT_NAME : process.env.POSTMAN_ENVIRONMENT_NAME,
    PARALLEL_RUNS : process.env.PARALLEL_RUNS
};
