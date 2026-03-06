require('dotenv').config();
const express = require('express');

const sequelize = require('./config/db');
const redisClient = require('./config/redis');
const cityRouter = require('./routes/cityRoutes');
const userRouter = require('./routes/userRoutes');
const movieRouter = require('./routes/movieRoutes');
const theaterRouter = require('./routes/theaterRoutes');
const screenRouter = require('./routes/screenRoutes');
const advancedRouter = require('./routes/advancedRoutes');
const bookingRouter = require('./routes/bookingRoutes');

const swaggerUi = require('swagger-ui-express');
const swaggerFile = require("./swagger-output.json");
const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerFile));

app.use('/api/city',cityRouter);
app.use('/api/user',userRouter);
app.use('/api/movie',movieRouter);
app.use('/api/theater',theaterRouter);
app.use('/api/screen',screenRouter);
app.use('/api/advanced',advancedRouter);
app.use('/booking',bookingRouter);

sequelize.authenticate()
.then(()=>{
    console.log('DB connected successfully!');
    redisClient.connect()
    .then(()=>{
        console.log('Redis Connected!');
        app.listen(PORT,()=>{
            console.log('server is running on ',PORT);
        });
    })
    .catch((err)=>{
        console.log(err);
    });
})
.catch((err)=>console.log(err));
