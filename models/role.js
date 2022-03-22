const { Model } = require("objection");

class Role extends Model {
  static get tableName() {
    return "role";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name"],
      properties: {
        id: { type: "integer" },
        name: { type: "string", minLength: 1, maxLength: 55 },
      },
    };
  }
}

module.exports = Role;
