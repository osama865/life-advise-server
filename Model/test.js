const connection = require('./index');

connection().then((result) => {
    console.log(result.db);
}).catch((err) => {
    
});