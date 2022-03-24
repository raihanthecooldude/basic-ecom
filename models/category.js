const { Model } = require("objection");

class Category extends Model {
  static get tableName() {
    return "category";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name"],
      properties: {
        id: { type: "integer" },
        name: { type: "string", minLength: 1, maxLength: 50 }
      },
    };
  }
}

module.exports = Category;
