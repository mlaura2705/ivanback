
exports.up = function(knex) {
  knex.schema.createTable("usermsj",function(table){
    table.increments("id").primary();
    table.string("name");
    table.string("email",120);
    table.string("mensaje");
  }).then(()=>{
    console.log("exitoso")
  }).catch((err)=>{
    console.log(err)
  })
};

exports.down = function(knex) {
  
};
