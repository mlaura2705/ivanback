const express = require("express");
const { Router } = express;
const router = new Router;
const app = express();

router.get("/",(req,res)=>{
    res.sendFile("public/index.html",{root:"."})
})


module.exports = router;