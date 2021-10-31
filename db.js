const knex = require("knex")({
    client:"mysql",
    connection:{
        host:"127.0.0.1",
        port:3306,
        user:"root",
        password:"",
        database:"products"
    },
    pool:{
        min:2,max:8
    }
})

knex.schema.createTableIfNotExists("productos",(table)=>{
    table.increments("id").primary();
    table.string("name");
    table.string("description",128);
    table.string("price");
}).then(()=>{
    console.log("tabla creada con exito!")
}).catch((error)=>{
    console.log(error);
})


module.exports = knex