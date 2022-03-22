const { Model } = require("objection");

class Cart extends Model {
  static get tableName() {
    return "cart";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: [
        "productId",
        "quantity",
        "userId",
        "unitPrice",
        "totalPrice",
        "ordered",
      ],
      properties: {
        id: { type: "integer" },
        productId: { type: "integer" },
        quantity: { type: "integer" },
        userId: { type: "integer" },
        unitPrice: { type: "integer" },
        totalPrice: { type: "integer" },
        orderId: { type: "integer" },
        ordered: {
          type: "string",
          enum: ["YES", "NO"],
          default: "NO",
        },
      },
    };
  }

  static get relationMappings() {
    const Product = require("./product");
    return {
      Role: {
        relation: Model.HasOneRelation,
        modelClass: Product,
        join: {
          from: "cart.productId",
          to: "product.id",
        },
      },
    };
  }
}

module.exports = Cart;
