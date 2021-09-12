const { Client } = require('pg')

let config = {}
if(process.env.DATABASE_URL && process.env.DATABASE_URL !== '') {
    config.connectionString = process.env.DATABASE_URL
} else {
    config = {
        user: process.env.DBUSER,
        host: process.env.DBHOST,
        database: process.env.DB,
        password: process.env.DBPASS,
        port: process.env.DBPORT,
    }
}

const db = new Client(config)

const init = async () => {
    await db.connect()
    const res = await db.query('SELECT $1::text as message', ['DB started!'])
    console.log(res.rows[0].message)
    return db
}

module.exports = {
    init,
    db
}