const { Recipe } = require("../models/recipe.model");
const nodemailer = require("nodemailer");
const jwt = require('jsonwebtoken');
var ObjectId = require('mongoose').Types.ObjectId;

// ************ CREATE ***************** //
module.exports.createRecipe = (req, res) => {
    console.log("created Recipe")
    req.body._id = ObjectId();
    console.log(req.body)
    Recipe.create((req.body))
        .then(newRecipes => {
            res.json({ results: newRecipes });
        })
        .catch(err => res.status(400).json({ message: "that didn't work", err }))
}

// ************ READ ***************** //

module.exports.findOneRecipe = (req, res) => {
    console.log("Find One", req.params._id)
    console.log(ObjectId(req.params._id));
    Recipe.findOne({ _id: ObjectId(req.params._id) })
        .then(results => res.json({ results }))
        .catch(err => res.status(400).json({ message: "that didn't quite work.", err }));
}


module.exports.findAllRecipe = (req, res) => {
    console.log("find all recipes")
    Recipe.find({})
        .then(results => res.json({ results: results }))
        .catch(err => res.status(400).json({ message: "that didn't quite work.", err }));
}

module.exports.latestRecipe = (req, res) => {
    Recipe.find({}).sort({ $natural: -1 }).limit(5)
        .then(latest => res.json({ results: latest }))
        .catch(err => res.status(400).json({ message: "that didn't quite work.", err }));
}

module.exports.allLatestRecipes = (req, res) => {
    Recipe.find({}).sort({ $natural: -1 })
        .then(latest => res.json({ results: latest }))
        .catch(err => res.status(400).json({ message: "that didn't quite work.", err }));
}

module.exports.randomRecipe = (req, res) => {
    Recipe.aggregate([{ $sample: { size: 1 } }])
        .then(results => res.json({ results: results }))
        .catch(err => res.status(400).json({ message: "that didn't quite work.", err }));
}

// ************ UPDATE ***************** //
module.exports.updateOneRecipe = (req, res) => {
    Recipe.updateOne({ _id: req.params._id }, req.body, { runValidators: true })
        // run update one you give it the query { _id: req.params._id } give it the information to change (req.body)
        //3rd parameter
        .then(results => res.json({ results: results }))
        .catch(err => res.status(400).json({ message: "that didn't quite work.", err }));
}

// ************ DELETE ***************** //
module.exports.deleteRecipe = (req, res) => {
    Recipe.deleteOne({ _id: req.params._id })
        .then(results => res.json({ results: results }))
        .catch(err => res.status(400).json({ message: "that didn't quite work.", err }));
}

// ************ SEARCH ***************** //
module.exports.searchRecipe = (req, res) => {
    const searchQuery = req.params.searchTerm
    Recipe.find({ title: { $regex: searchQuery, $options: "i" } })
        .then(results => res.json({ results: results }))
        .catch(err => {
            res.status(400).json({ message: "that didn't quite work.", err })
        });
}

// ******* CUISINE ROUTES *******//
module.exports.findMainCuisine = (req, res) => {
    Recipe.aggregate([
        { $group: { _id: "$cuisine", image: { $first: "$cuisineImg" } } },
        { $project: { _id: 0, name: '$_id', image: 1 } }
    ]).limit(5)
        .then(results => res.json({ results: results }))
        .catch(err => res.status(400).json({ message: "that didn't quite work.", err }));
}

module.exports.findAllCuisine = (req, res) => {
    Recipe.aggregate([
        { $group: { _id: "$cuisine", image: { $first: "$cuisineImg" } } },
        { $project: { _id: 0, name: '$_id', image: 1 } }
    ])
        .then(results => res.json({ results: results }))
        .catch(err => res.status(400).json({ message: "that didn't quite work.", err }));
}

module.exports.findOneCuisine = (req, res) => {
    Recipe.find({ "cuisine": req.params.name })
        .then(results => res.json({ results: results }))
        .catch(err => res.status(400).json({ message: "that didn't quite work.", err }));
}

