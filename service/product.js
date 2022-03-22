const productDAO = require("../dao/product");
const CartService = require("./cart");

class ProductService {
  async createProduct(name, description, price, quantity, status) {
    const product = await productDAO.createProduct(
      name,
      description,
      price,
      quantity,
      status
    );
    return product;
  }

  async updateProduct(id, name, description, price, quantity, status) {
    const product = await productDAO.updateProduct(
      id,
      name,
      description,
      price,
      quantity,
      status
    );

    return product;
  }

  async addToCartProduct(id, email, userId) {
    const product = await productDAO.getProductById(id);
    let cart;
    if (product.quantity > 0) {
      cart = await CartService.createCart(product, userId);
      const result = await productDAO.addToCartProduct(id, product.quantity);

      if (result > 0) {
        product.quantity--;
      }
    } else {
      return null;
    }
    mail(email, product);
    return cart;
  }

  async updateCartProduct(id, email, userId, cartItemId) {
    const product = await productDAO.getProductById(id);
    let cart;
    if (product.quantity > 0) {
      cart = await CartService.updateCartProduct(cartItemId, product, userId);
      const result = await productDAO.addToCartProduct(id, product.quantity);

      if (result > 0) {
        product.quantity--;
      }
    } else {
      return null;
    }
    return cart;
  }

  async getProductById(id) {
    return await productDAO.findById(id);
  }

  async getAllProduct(pageNo, batchSize) {
    const product = await productDAO.getAllProduct(pageNo, batchSize);

    return product;
  }

  async searchProduct(search, pageNo, batchSize) {
    const product = await productDAO.searchProduct(search, pageNo, batchSize);

    return product;
  }
}

module.exports = new ProductService();
