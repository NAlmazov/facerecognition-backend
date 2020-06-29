const Clarifai = require('clarifai');
const { json } = require('express');

const app = new Clarifai.App({
    apiKey: '38bcedaf954c43ad9a3a2a69a9d891bf'
   });


const handleApiCall = (req, res) => {
    app.models
    .predict( Clarifai.DEMOGRAPHICS_MODEL, req.body.input)
    .then(data => {
        res.json(data);
    })
    .catch(err => res.status(400).json('unable to wok with API'))
}

const handleImagePut = (req, res, knex) => {
    const { id } = req.body;
    knex('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0]);
        })
        .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
    handleImagePut: handleImagePut,
    handleApiCall: handleApiCall
};