const express = require('express');
const port = 8080;

const app = express();

const mongoose = require('mongoose')
mongoose.connect("mongodb+srv://student:student@footgoals.olckg.mongodb.net/footgoals?retryWrites=true&w=majority\n",{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.use(express.urlencoded({extended: true}));

const videoRoute = require('./assets/getVideo');
app.use(videoRoute);

const route =require('./routes/route');
app.use(route);

const server = app.listen(port, (err)=> {
    console.log('Server is running on port ' + port);
})