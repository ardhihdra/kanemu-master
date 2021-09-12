require('dotenv').config()
const host = process.env.HOST || '0.0.0.0'
const port = process.env.PORT || 3001

const postgres = require('./src/core/db')
const { process_handler } = require('./src/core/helper')
const { initRoute } = require('./src/router/main')

const startApp = async () => {
    /** master data */
    const app = initRoute()
    const db = await postgres.init().catch(e => console.error(e))

    const server = app.listen(port, host, () => {
        console.log(`Kanemu listening at http://${host}:${port}`)
    })

    process_handler(server, db)
}

startApp()