const express = require('express')
const app = express()
app.use(express.json())
const cors = require('cors')
app.use(cors())
require('dotenv').config()
const dbConfig = require('./config/dbConfig')
const port = process.env.PORT || 5000;

const userRoute = require('./routes/usersRoute')
const productsRoute = require('./routes/productsRouter')

app.use('/api/users', userRoute)
app.use('/api/products', productsRoute)

app.listen(port, () => console.log(`NodeJS SERVER started on port ${port}`));