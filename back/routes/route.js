const {Router} = require('express')
const route = Router();

const getMax = require('../database/actionsDB').getMax;
const changeRating = require('../database/actionsDB').changeRating;

route.post('/api/rate', (req,res)=>{
    let name = req.query.name;
    console.log(name);
    if (name === undefined || name === null){
        console.log("Error")
        res.redirect('/#/rpl');
        return;
    }
    let user_rating = Number(req.body.user_rating);
    console.log(user_rating);
    if (user_rating === undefined || user_rating === null || isNaN(user_rating)){
        console.log("Star wasn't chosen");
        res.redirect('/#/rpl');
        return;
    }
    changeRating(name,user_rating)
        .then(console.log('Edited'))
        .catch(err=>{console.log(`Error. ${err.message}`)});
    res.redirect("/#/rpl");
})

route.get('/api/getMaxRpl', (req,res)=>{
    getMax()
        .then((found)=>{
            console.log(found.name + " " + found.rating + " " + found.count)
            res.json({"name": found.name,
                "rating": found.rating,
                "count": found.count});
            res.send.json({"name": found.name,
                "rating": found.rating,
                "count": found.count});

        })
        .catch((err)=>{console.log('Error. ', err.message)});
})

route.get('*', (req,res)=>{
    console.log('Error. Page not found.');
    res.send('Error. Page not found');
})

module.exports = route;