require("dotenv").config();
const bodyParser = require("body-parser");

let express = require('express');
let app = express();
const absolutePath = __dirname + '/views/index.html';

app.use(bodyParser.urlencoded({ extended: false }));
app.use((req,res,next)=>{
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    next();
})
app.use("/public",express.static(__dirname + '/public'));
console.log("Hello World");
app.get('/', (req, res)=>{
        res.sendFile(absolutePath)
})

app.get('/json', (req, res)=>{
    process.env.MESSAGE_STYLE==="uppercase" ? res.json({"message": "HELLO JSON"}) : res.json({"message": "Hello json"})
        
})

app.get("/now", (req, res , next)=>{
            req.time= new Date().toString();
            next();
}, (req,res)=>{
    res.json({"time": req.time})
})

app.get("/:word/echo", (req, res)=>{
        res.json({"echo": req.params.word})
})

app.get("/name", (req, res)=>{
        res.json({"name": `${req.query.first} ${req.query.last}`})
}).post("/name", (req, res)=>{
     res.json({"name": `${req.body.first} ${req.body.last}`})
})




































 module.exports = app;
