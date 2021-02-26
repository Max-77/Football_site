const express = require('express');
const port = 3000;

const app = express();

const db = require('./database/db').db;
db.authenticate()
    .then(()=> console.log('Database connected'))
    .catch(err => console.log('Error that i wrote ', err.message))

app.use(express.urlencoded({extended: true}));

const videoRoute = require('./assets/getVideo');
app.use(videoRoute);

const route =require('./routes/route');
app.use(route);

const server = app.listen(port, (err)=> {
    if (err) {
        return console.log(`Error: ${err}`);
    }
    console.log('Server is running on port' + port);
})