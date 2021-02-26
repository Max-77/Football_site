const {Router} = require('express')
const route = Router();

const Rating = require('../models/rating_old')

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

route.get('/api/getMaxRpl', (req,res)=>{
    Rating.findOne({})
        .sort({'rating': -1, 'count': -1}).limit(1)
        .then(found=>{
            console.log(found.name + " " + found.rating + " " + found.count)
            res.json({"name": found.name,
                           "rating": found.rating,
                           "count": found.count})
        })
})

route.get('*', (req,res)=>{
    res.send('Error. Page not found');
})

module.exports = route;