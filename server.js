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

const cookieParser = require('cookie-parser');
const session = require('express-session');

app.use(session({
    secret: "SECRET", //hash the session
    saveUninitialized: true,
    resave: true,
}));
app.use(cookieParser());
app.get('*', (req,res,next)=>{
    if (req.cookies['vote'] !== 'false' && req.cookies['vote'] !== 'true') {
        res.cookie('vote', 'false', { expires: new Date(Date.now() + 900000)});
    }
    next();
})

app.use(
    webpackDevMiddleware(compiler, {
        publicPath: config.output.publicPath
    })
);

app.use(express.urlencoded({extended: true}));
const Rating = require('./models/rating')
// const path = require('path')
app.post('/rate', (req,res)=>{
    if (req.cookies['vote']==='true'){
        console.log('you have voted')
        res.redirect('/#/rpl');
        return;
    }
    res.cookie('vote', 'true', { expires: new Date(Date.now() + 900000)});
    let name = req.query.name;
    console.log(name);
    let user_rating = Number(req.body.user_rating);
    Rating.findOne({name: name})
        .then(ifFound=>{
            if (ifFound){
                console.log(name + ' was found');
                let current_rating = ifFound.rating;
                let current_count = ifFound.count;
                let new_rating = (current_rating*current_count+user_rating)/(current_count+1);

                let newLine = new Rating({name:name, rating:new_rating, count:current_count+1})

                ifFound.remove();

                newLine.save((err)=>{
                    if (err) console.log('Error: ' + err);
                    console.log('Changed!');
                });
            }
            else {
                console.log(name + " wasn't found. Creating...");
                let newLine = new Rating({name:name , rating: user_rating, count:1})
                newLine.save((err)=>{
                    if (err) console.log('Error: ' + err);
                    console.log('Done!');
                });
            }
            res.redirect("/#/rpl")
        })
        .catch(err=>{console.log(err)})
})

app.get('/max', (req,res)=>{
    Rating.findOne({})
        .sort('-rating').limit(1)
        .then(found=>{
            console.log(found.name + " " + found.rating)
        })
})

app.get('*', (req,res)=>{
    res.send('Error. Page not found');
})

const server = app.listen(port, (err)=> {
    console.log('Server is running on port ' + port);
})