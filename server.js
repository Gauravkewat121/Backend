const express = require('express');
require('dotenv').config();
const sequelize = require('./config/db');

const PORT = process.env.PORT || 4000;
const app = express();

sequelize.authenticate()
.then(()=>{
    console.log('DB connected successfully!');
    app.listen(PORT,()=>{
        console.log('server is running on ',PORT);
    });
})
.catch((err)=>console.log(err));
