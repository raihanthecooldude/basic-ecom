exports.up = function (knex) {
  return knex.schema
    .createTable("product", (table) => {
      table.increments().primary();
      table.string("name", 50).notNullable();
      table.string("description", 500);
      table.integer("price").notNullable();
      table.integer("quantity").notNullable().defaultTo(0);
      table.string("status").notNullable().defaultTo("UNPUBLISHED");
      table.integer("categoryId");
      table.timestamps(true, true);
    })
    .createTable("role", (table) => {
      table.increments().primary();
      table.string("name", 55).notNullable();
      table.timestamps(true, true);
    })
    .createTable("user", (table) => {
      table.increments().primary();
      table.string("name").notNullable();
      table.string("email").notNullable().unique();
      table.string("password");
      table.integer("roleId").unsigned().defaultTo(1);
      table.timestamps(true, true);
    })
    .createTable("cart", (table) => {
      table.increments().primary();
      table.integer("productId").notNullable();
      table.integer("quantity").notNullable();
      table.integer("userId").notNullable();
      table.integer("unitPrice").notNullable();
      table.integer("totalPrice").notNullable();
      table.integer("orderId");
      table.string("ordered").notNullable().defaultTo("NO");
      table.timestamps(true, true);
    })
    .createTable("order", (table) => {
      table.increments().primary();
      table.integer("userId").notNullable();
      table.integer("totalPrice").notNullable();
      table.string("orderStatus").notNullable().defaultTo("ORDERED");
      table.string("paymentStatus").notNullable().defaultTo("NOT_PAID");
      table.integer("paymentId");
      table.timestamps(true, true);
    })
    .createTable("category", (table) => {
      table.increments().primary();
      table.string("name").notNullable();
      table.timestamps(true, true);
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("product")
    .dropTableIfExists("role")
    .dropTableIfExists("user")
    .dropTableIfExists("cart")
    .dropTableIfExists("order")
    .dropTableIfExists("category");
};
