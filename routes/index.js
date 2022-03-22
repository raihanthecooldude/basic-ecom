const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const ProductController = require("../controller/product");
const UserController = require("../controller/user");
const OrderController = require("../controller/order");
const express = require("express");

const router = express.Router();

router.post("/api/product", [auth, admin], ProductController.createProduct);
router.patch(
  "/api/product/:id",
  [auth, admin],
  ProductController.updateProduct
);
router.get("/api/product", ProductController.getAllProduct);
router.get("/api/product/search", ProductController.searchProduct);
router.patch("/api/product/:id/cart", auth, ProductController.addToCartProduct);
router.patch(
  "/api/product/:id/cart/update",
  auth,
  ProductController.updateToCartProduct
);

router.post("/api/user/signup", UserController.signUp);
router.post("/api/user/login", UserController.login);

router.post("/api/order", auth, OrderController.createOrder);

module.exports = router;
