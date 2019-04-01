
exports.up = function(knex, Promise) {
  return knex.schema.createTable("user", table => {
        table.string("username").notNullable();
        table.string("password").notNullable();
        table.primary("username");
  });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable("user");
};