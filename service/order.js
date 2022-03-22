const mail = require("../helper/mail");
const orderDAO = require("../dao/order");

class OrderService {
  async createOrder(cart, user) {
    let totalPrice = 0;
    for (const val of cart) {
      totalPrice = totalPrice + val.totalPrice;
      //   console.log(val.totalPrice);
    }
    // console.log(totalPrice);
    const order = await orderDAO.createOrder(totalPrice, user.id);

    mail(user.email, order);
    return order;
  }
}

module.exports = new OrderService();
