
const express = require('express')
const formidable = require('formidable')
const bodyParser = require('body-parser')
const useragent = require(`express-useragent`)
const app = express()
const handler = require('../handler')

const initRoute = () => {
    // parse application/json
    app.use(bodyParser.json())
    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(useragent.express())
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin',  `${process.env.CLIENT}`); 
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, authorization');
        const form = new formidable.IncomingForm();
        form.parse(req, (err, fields, files) => {
            if (err) return res.status(400).json({ error: err.message })
            req.body = fields
            req.files = files
            next()
        })
    });
    app.get('/master/products', (req, res) => {
        handler.getProducts(req, res);
    })
    
    /** main API */
    app.post('/order', (req, res) => {
        handler.orderProducts(req, res);
    })

    return app
}

module.exports = {
    initRoute
}