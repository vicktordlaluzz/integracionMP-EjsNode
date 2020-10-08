const axios = require('axios');
const { response } = require('express');
const base_uri = process.env.API_URI;
const controller = {};

controller.home = (req, res) => {
    let items;
    axios.get(`${base_uri}articulos/`)
        .then(response => {
            items = response.data.articulos;
            res.render('home', { items });
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
            res.render('item', { item, init_point });
        }, error => {
            console.log(error);
            res.status(500);
        })
};

controller.save = (req, res) => {
    const data = req.body;
    console.log(req.body)
    req.getConnection((err, connection) => {
        const query = connection.query('INSERT INTO customer set ?', data, (err, customer) => {
            console.log(customer)
            res.redirect('/');
        })
    })
};

controller.edit = (req, res) => {
    const { id } = req.params;
    req.getConnection((err, conn) => {
        conn.query("SELECT * FROM customer WHERE id = ?", [id], (err, rows) => {
            res.render('customers_edit', {
                data: rows[0]
            })
        });
    });
};

controller.update = (req, res) => {
    const { id } = req.params;
    const newCustomer = req.body;
    req.getConnection((err, conn) => {

        conn.query('UPDATE customer set ? where id = ?', [newCustomer, id], (err, rows) => {
            res.redirect('/');
        });
    });
};

controller.delete = (req, res) => {
    const { id } = req.params;
    req.getConnection((err, connection) => {
        connection.query('DELETE FROM customer WHERE id = ?', [id], (err, rows) => {
            res.redirect('/');
        });
    });
}

module.exports = controller;