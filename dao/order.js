const Order = require("../models/order");

class OrderDAO {
  async createOrder(totalPrice, userId) {
    return await Order.query().insert({
      userId: userId,
      totalPrice: totalPrice,
    });
  }
}

module.exports = new OrderDAO();
