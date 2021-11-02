const express = require("express");
const { Router } = express;
const router = new Router();
const knex = require("../db");

router.get("/", (req, res) => {
  // res.sendFile("public/productos.html", { root: "." });
  knex("productos")
    .select("id","name", "description", "price")
    .then((x) => {
      res.send(x);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post("/", (req, res) => {
  // console.log(req.body)
  let obj = {
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
  };
  knex("productos")
    .insert(obj)
    .then(res.send({ msj: "producto agregado con exito!" }))
    .catch(res.send({ msj: "error al agregar producto" }));
});

router.put("/:id", (req, res) => {
  knex("productos")
    .where({ id: req.params.id })
    .update({ name: req.body.name, description: req.body.description,price:req.body.price})
    .then(() => {
      res.send({ msg: "success" });
    })
    .catch((err) => {
      console.log(err);
    });
// console.log(req.params.id)
});

router.delete("/:id",(req,res)=>{
    knex("productos").where({id:req.params.id}).del()
    .then(()=>{
        res.send({message:"producto eliminado"})
    }).catch((err)=>{console.log(err)})
})

module.exports = router;
