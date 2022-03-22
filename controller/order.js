const orderService = require("../service/order");

class OrderController {
  async createOrder(req, res, next) {
    // console.log(req.body);
    try {
      const order = await orderService.createOrder(req.body, req.user);

      res.json(order);
    } catch (err) {
      console.error(err);
      res.status(400).json(err);
    }
  }
}

module.exports = new OrderController();
