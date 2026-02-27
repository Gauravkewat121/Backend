require('dotenv').config();
const express = require('express');

const sequelize = require('./config/db');

const userRoutes = require('./routes/userRoutes');
const movieRoutes = require('./routes/movieRoutes');
const theaterRouter = require('./routes/theaterRoutes');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

app.use('/api/user',userRoutes);
app.use('/api/movie',movieRoutes);
app.use('/api/theater',theaterRouter);

sequelize.authenticate()
.then(()=>{
    console.log('DB connected successfully!');
    app.listen(PORT,()=>{
        console.log('server is running on ',PORT);
    });
})
.catch((err)=>console.log(err));
