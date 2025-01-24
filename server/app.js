const express=require('express')
const app=express();
const dotenv=require('dotenv')
dotenv.config()
const mongoConnect=require('./db/connect')
const path = require("path");
mongoConnect()



app.use(express.static( "../client"));
app.get('/test', (req, res) => {
    res.status(200).send("Test successful");
});
app.listen(process.env.PORT,()=>{
    console.log(`server runnig at http://localhost:${process.env.PORT}`)
})