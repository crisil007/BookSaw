const express=require('express')
const app=express();
const dotenv=require('dotenv')
dotenv.config()
const mongoConnect=require('./db/connect')
const path = require("path");
mongoConnect()
const UserRoutes=require("./routes/userRoutes")
const authRoutes=require("./routes/authRoutes")



app.use(express.static( "../client"));
app.get('/test', (req, res) => {
    res.status(200).send("Test successful");
});

app.use(express.json({ limit: "100mb" }));


app.use(express.urlencoded({extended : true}));


app.use(UserRoutes)
app.use(authRoutes)

app.listen(process.env.PORT,()=>{
    console.log(`server runnig at http://localhost:${process.env.PORT}`)
})