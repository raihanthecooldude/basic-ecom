const { Model } = require("objection");

class Order extends Model {
  static get tableName() {
    return "order";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["userId", "totalPrice", "orderStatus", "paymentStatus"],
      properties: {
        id: { type: "integer" },
        userId: { type: "integer" },
        totalPrice: { type: "integer" },
        orderStatus: {
          type: "string",
          enum: ["ORDERED", "CANCELLED", "ON PROCESS", "DELIVERED"],
          default: "ORDERED",
        },
        paymentStatus: {
          type: "string",
          enum: ["NOT_PAID", "PAID", "REFUNDED"],
          default: "NOT_PAID",
        },
        paymentId: { type: "integer" },
      },
    };
  }
}

module.exports = Order;
