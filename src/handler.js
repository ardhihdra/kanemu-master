const {db} = require('./core/db')
const mail = require('./core/mailer')

const sendError = (e, res) => {
    console.error(e.stack)
    res.status(500).send(e.message)
}

const getProducts = async (req, res) => {
    const result = await db.query('SELECT * FROM products WHERE status_id = $1', [1]).catch(e => sendError(e, res))
    res.send(result.rows)
}

const orderProducts = async (req, res) => {
    mail.send(req.body).catch(console.error);
    res.sendStatus(200)
}

module.exports = {
    getProducts,
    orderProducts
}