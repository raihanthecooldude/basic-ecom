const { Model } = require("objection");

class Product extends Model {
  static get tableName() {
    return "product";
  }

  //   $beforeInsert() {
  //     this.createdAt = new Date().toISOString();
  //   }

  //   static get nameColumn() {
  //     return "name";
  //   }

  //   static get descriptionColumn() {
  //     return "description";
  //   }

  //   static get priceColumn() {
  //     return "price";
  //   }

  //   static get quantityColumn() {
  //     return "quantity";
  //   }

  //   static get statusColumn() {
  //     return "status";
  //   }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "price", "quantity", "status"],
      properties: {
        id: { type: "integer" },
        name: { type: "string", minLength: 1, maxLength: 50 },
        description: { type: ["string", "null"] },
        price: { type: "integer" },
        quantity: { type: "number" },
        status: {
          type: "string",
          enum: ["PUBLISHED", "UNPUBLISHED"],
          default: "UNPUBLISHED",
        },
      },
    };
  }

  static get relationMappings() {
    const Category = require("./category");
    return {
      category: {
        relation: Model.HasManyRelation,
        modelClass: Category,
        join: {
          from: "product.categoryId",
          to: "category.id",
        },
      },
    };
  }
}

module.exports = Product;
