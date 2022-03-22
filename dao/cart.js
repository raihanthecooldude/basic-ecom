const Cart = require("../models/cart");

class CartDAO {
  async createCart(product, userId) {
    return await Cart.query().insert({
      productId: product.id,
      quantity: 1,
      userId: userId,
      unitPrice: product.price,
      totalPrice: product.price,
    });
  }

  async updateCartProduct(cartItem, product, userId) {
    return await Cart.query()
      .findById(cartItem.id)
      .patch({
        quantity: cartItem.quantity + 1,
        totalPrice: cartItem.totalPrice + product.price,
      });
  }

  async getCartById(id) {
    const result = await Cart.query().findById(id);
    return result;
  }
}

module.exports = new CartDAO();
