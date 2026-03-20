require('dotenv').config();
const express = require('express');

const sequelize = require('./config/db');
const redisClient = require('./config/redis');
const baseRouter = require('./routes/index');

const swaggerUi = require('swagger-ui-express');
const swaggerFile = require("./swagger-output.json");
const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

app.use('/',baseRouter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

sequelize.authenticate()
    .then(() => {
        console.log('DB connected successfully!');
    })
    .catch((err) => console.log(err));

redisClient.connect()
    .then(() => {
        console.log('Redis Connected!');
    })
    .catch((err) => {
        console.log(err);
    });

app.listen(PORT, () => {
    console.log('server is running on ', PORT);
});

