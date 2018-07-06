const MongoClient = require('mongodb').MongoClient;

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

    /* db.db().collection(config.todos).insertOne({
        text: `Complete MongoDB for NodeJS course`,
        completed: false
    }, (err, result) => {
        if (err) {
            return console.log(`Error inserting todo : ${err}`);
        }

        console.log(JSON.stringify(result.ops, undefined, 2));
    }) */

    db.db().collection(config.users).insertOne({
        name: `Akhilesh`,
        age: 20,
        location: `Bangalore`
    }, (err, result) => {
        if (err) {
            return console.log(`Error inserting user : ${err}`);
        }

        console.log(JSON.stringify(result.ops, undefined, 2));
    })

    db.close();
})