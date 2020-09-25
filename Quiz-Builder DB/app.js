const express = require("express");
const morgan =require('morgan');
const parser=require('body-parser');
const routes = require("./routes");
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3001;

mongoose.connect("mongodb://localhost:27017/quizBuilderReact", { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
.then(() => {
    console.log("Database Connected!");
})
.catch((err) => {
    console.error("Error while connecting to Database: ", err);
});

app.use(cors());
app.use(morgan('dev'));
app.use(parser.json());
app.use('/',routes);

app.listen(port,function(){
    console.log("API listening on port "+port);
});