const { Client } = require('pg')
const db = new Client({
    user: process.env.DBUSER,
    host: process.env.DBHOST,
    database: process.env.DB,
    password: process.env.DBPASS,
    port: process.env.DBPORT,
  })

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