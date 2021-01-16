const user = 'user';
const password = 'password';
const dbname = 'dbname';
const cluster = 'cluster.mongodb.net';

const connectionString = `mongodb+srv://${user}:${password}@${cluster}/${dbname}?retryWrites=true&w=majority`;

module.exports = connectionString;
