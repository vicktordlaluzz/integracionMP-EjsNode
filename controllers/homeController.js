const axios = require('axios');
const { response } = require('express');
const base_uri = process.env.API_URI;
const controller = {};

controller.home = (req, res) => {
    let items;
    axios.get(`${base_uri}articulos/`)
        .then(response => {
            items = response.data.articulos;
            res.render('home', { items, vista: 'home' });
        }, error => {
            console.log(error);
            res.status(500);
        })
};

controller.comprar = (req, res) => {
    let itemID = req.params.item
    let item;
    axios.get(`${base_uri}articulos/${itemID}`)
        .then(response => {
            init_point = response.data.response.body.init_point;
            item = response.data.articulo;
            res.render('item', { item, init_point, vista: 'item' });
        }, error => {
            console.log(error);
            res.status(500);
        })
};

controller.payFailure = (req, res) => {
    let data = req.query;
    res.render('pay-failure', { data, vista: '' })
};

controller.payPending = (req, res) => {
    let data = req.query;
    res.render('pay-pending', { data, vista: '' })
};

controller.paySuccess = (req, res) => {
    let data = req.query;
    res.render('pay-success', { data, vista: '' })
};

module.exports = controller;