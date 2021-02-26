const db = require("./db").db
const { Sequelize } = require('sequelize')

const Rating = require('../models/rating')(db, Sequelize)

async function findByName(name){
    return await Rating.findOne({
        where: {
            name : name
        }
    })
}

async function createRating(name, rating, count){
    let newRating = Rating.build({name:name, rating:rating, count: count} );
    return await newRating.save();
}

async function getMax(){
    return await (
        Rating.findOne({order: [['rating', 'desc'],['count', 'desc']]})
    )
}

async function changeRating(name, rating){
    findByName(name)
        .then(toChange=>{
            if (toChange){
                console.log(`${name} was found.`);
                let current_rating = toChange.rating;
                let current_count = toChange.count;
                toChange.rating = (current_rating*current_count+rating)/(current_count+1);
                toChange.count++;
                return toChange.save();
            }
            else{
                console.log(`${name} wasn't found. Creating...`);
                createRating(name, rating, 1)
                    .then(err=>{
                        if (err) console.log('Error. ', err.message);
                        else console.log('Created.');
                    });
            }
        });
}

exports.findByName = findByName;
exports.createRating = createRating;
exports.getMax = getMax;
exports.changeRating = changeRating;