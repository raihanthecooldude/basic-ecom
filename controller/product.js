const productService = require("../service/product");

class ProductController {
  async createProduct(req, res, next) {
    try {
      const product = await productService.createProduct(
        req.body.name,
        req.body.description,
        req.body.price,
        req.body.quantity,
        req.body.status
      );

      res.json(product);
    } catch (err) {
      console.error(err);
      res.status(400).json(err);
    }
  }

  async updateProduct(req, res, next) {
    try {
      const product = await productService.updateProduct(
        req.params.id,
        req.body.name,
        req.body.description,
        req.body.price,
        req.body.quantity,
        req.body.status
      );

      if (product == 0) {
        res.status(404).json(`There is no product with ID ${req.params.id}`);
      } else {
        res.json(product);
      }
    } catch (err) {
      console.error(err);
      res.status(400).json(err);
    }
  }

  async addToCartProduct(req, res, next) {
    try {
      const product = await productService.addToCartProduct(
        req.params.id,
        req.user.email,
        req.user.id
      );
      if (!product) {
        res
          .status(404)
          .json(`There is no stock for product with ID ${req.params.id}`);
      } else {
        res.json(product);
      }
    } catch (err) {
      console.error(err);
      res.status(400).json(err);
    }
  }

  async updateToCartProduct(req, res, next) {
    try {
      const product = await productService.updateCartProduct(
        req.params.id,
        req.user.email,
        req.user.id,
        req.body.cartItemId
      );
      if (!product) {
        res
          .status(404)
          .json(`There is no stock for product with ID ${req.params.id}`);
      } else {
        res.json(product);
      }
    } catch (err) {
      console.error(err);
      res.status(400).json(err);
    }
  }

  async getAllProduct(req, res, next) {
    try {
      const product = await productService.getAllProduct(
        req.query.pageNo,
        req.query.batchSize
      );

      res.json(product);
    } catch (err) {
      console.error(err);
      res.status(404).json(err);
    }
  }

  async searchProduct(req, res, next) {
    try {
      const product = await productService.searchProduct(
        req.query.search,
        req.query.pageNo,
        req.query.batchSize
      );

      res.json(product);
    } catch (err) {
      console.error(err);
      res.status(404).json(err);
    }
  }
}

module.exports = new ProductController();
