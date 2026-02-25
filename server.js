const express = require('express');
require('dotenv').config();
const PORT = process.env.PORT || 4000;
const app = express();




app.listen(PORT,()=>{
    console.log('server is running on ',PORT);

    console.log("hellolooenn,.,,,,")
});