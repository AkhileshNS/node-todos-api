
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

    db.db().collection(config.users).findOneAndUpdate({
        name: 'Akhilesh'
    },{
        $set: {
            location: 'Bangalore'
        }
    },{
        returnOriginal: false
    }).then((res) => {
        console.log(res);
    })

})