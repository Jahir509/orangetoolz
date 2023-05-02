const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Customer = require('./customer.model');
const connection_string =  'mongodb://localhost:27017/';


app.get('/',async(req,res)=>{
    const user = await Customer.find().limit(10)
    res.status(200).send(user);
})

app.post('/',async(req,res)=>{
    res.status(200).send("Post");
})

app.listen(3000,()=>{
    mongoose.connect(connection_string,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: 'orange-toolz'
    })
    .then(() => {
        console.log('Database Connection is ready...');
        console.log("app is running on port 3000")
    })
    .catch((err) => {
        console.log(err);
    })
})
