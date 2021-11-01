const express = require('express');
const { Router } = express;
const router = new Router();
const app = express();

app.use(express.static(__dirname + "./public"));

router.get("/",(req,res)=>{
    res.sendFile("./public/index.html",{root:"."})
    // res.send("hola")
})

module.exports = router;