const cartDAO = require("../dao/cart");

class CartService {
  async createCart(product, userId) {
    const cart = await cartDAO.createCart(product, userId);
    return cart;
  }

  async updateCartProduct(cartItemId, product, userId) {
    const cartItem = await cartDAO.getCartById(cartItemId);

    const cart = await cartDAO.updateCartProduct(cartItem, product, userId);
    return cart;
  }
}

module.exports = new CartService();
