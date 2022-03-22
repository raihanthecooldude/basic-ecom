const Product = require("../models/product");

class ProductDAO {
  async createProduct(name, description, price, quantity, status) {
    return await Product.query().insert({
      name: name,
      description: description,
      price: price,
      quantity: quantity,
      status: status,
    });
  }

  async updateProduct(id, name, description, price, quantity, status) {
    return await Product.query().findById(id).patch({
      name: name,
      description: description,
      price: price,
      quantity: quantity,
      status: status,
    });
  }

  async addToCartProduct(id, cartItem) {
    const result = await Product.query()
      .findById(id)
      .patch({
        quantity: cartItem - 1,
      });
    return result;
  }

  async getProductById(id) {
    const result = await Product.query().findById(id);
    return result;
  }

  async getAllProduct(pageNo, batchSize) {
    let page = pageNo || 0;
    let batch = batchSize || 2;

    const result = await Product.query().page(page, batch);
    return result;
  }

  async searchProduct(search, pageNo, batchSize) {
    let page = pageNo || 0;
    let batch = batchSize || 2;

    const result = await Product.query()
      .where((builder) =>
        builder
          .where("name", "like", `%${search}%`)
          .orWhere("description", "like", `%${search}%`)
      )
      .where("status", "PUBLISHED")
      .andWhere("quantity", ">", 0)
      .page(page, batch);
    return result;
  }
}

module.exports = new ProductDAO();
