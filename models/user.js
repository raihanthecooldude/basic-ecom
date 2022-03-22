const { Model } = require("objection");

class User extends Model {
  static get tableName() {
    return "user";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "email", "password"],
      properties: {
        id: { type: "integer" },
        name: { type: "string", minLength: 1, maxLength: 100 },
        email: { type: "string" },
        password: { type: "string" },
      },
    };
  }

  static get relationMappings() {
    const Role = require("./role");
    return {
      Role: {
        relation: Model.HasOneRelation,
        modelClass: Role,
        join: {
          from: "user.roleId",
          to: "role.id",
        },
      },
    };
  }
}

module.exports = User;
