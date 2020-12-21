const express = require('express');
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware")
const port = 8080;

const app = express();
const config = require('./webpack.config');
const compiler = webpack(config);

const mongoose = require('mongoose')
mongoose.connect("mongodb+srv://student:student@footgoals.olckg.mongodb.net/footgoals?retryWrites=true&w=majority\n",{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.use(
    webpackDevMiddleware(compiler, {
        publicPath: config.output.publicPath
    })
);

app.use(express.urlencoded({extended: true}));
const route =require('./server/route');
app.use(route);

const server = app.listen(port, (err)=> {
    console.log('Server is running on port ' + port);
})