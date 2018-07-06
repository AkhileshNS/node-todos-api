
const {MongoClient} = require('mongodb');

const config = {
    path: `localhost:27017`,
    name: 'TodoApp',
    todos: 'Todos',
    users: 'Users'
}

MongoClient.connect(`mongodb://${config.path}/${config.name}`, (err, db) => {
    if (err) {
        return console.log(`Error loading database : ${err}`);
    }

    console.log(`Connected to database`);

    db.db().collection(config.todos).find({completed: false}).toArray().then((docs) => {
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log(`Error getting todos : ${err}`);
    }) 

    /* db.db().collection(config.todos).find().count().then((count) => {
        console.log(`Todos Count = ${count}`);
    }, (err) => {
        console.log(`Error getting todos : ${err}`);
    }) */

})