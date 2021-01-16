const mongodb = require('mongodb').MongoClient;
const connectionString = require('./config');

async function connect() {
    try {
        const client = await mongodb.connect(connectionString, { useNewUrlParser: true });
        console.log('connected to mongodb');

        return client;
    } catch (err) {
        console.error(err);
    }
}

module.exports = connect;
