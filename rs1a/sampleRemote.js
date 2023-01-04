let express = require("express");
let router = express.Router();
let customers = ["Jack", "Bob", "Kathy", "Steve", "Anna"];
let products = ["Pepsi", "Coke", "Maggi", "Colgate", "Snickers"];
let orders = [
  { customer: "Jack", product: "Pepsi", quantity: 1 },
  { customer: "Bob", product: "Pepsi", quantity: 1 },
  { customer: "Kathy", product: "Maggi", quantity: 2 },
  { customer: "Jack", product: "Pepsi", quantity: 2 },
  { customer: "Bob", product: "Maggi", quantity: 3 },
  { customer: "Jack", product: "Colgate", quantity: 1 },
  { customer: "Anna", product: "Snickers", quantity: 3 },
  { customer: "Kathy", product: "Colgate", quantity: 1 },
  { customer: "Jack", product: "Coke", quantity: 2 },
  { customer: "Bob", product: "Snickers", quantity: 1 },
  { customer: "Jack", product: "Coke", quantity: 4 },
  { customer: "Steve", product: "Maggi", quantity: 2 },
  { customer: "Anna", product: "Colgate", quantity: 1 },
  { customer: "Steve", product: "Snickers" },
  { customer: "Bob", product: "Maggi", quantity: 1 },
  { customer: "Jack", product: "Colgate", quantity: 2 },
  { customer: "Bob", product: "Snickers", quantity: 2 },
];
router.get("/customers", function (req, res) {
  res.send(customers);
});
router.get("/products", function (req, res) {
  res.send(products);
});
router.get("/orders", function (req, res) {
  let { cust, prod } = req.query;
  let orders1 = orders;
  if (cust) orders1 = orders1.filter((ord) => ord.customer === cust);
  if (prod) orders1 = orders1.filter((ord) => ord.product === prod);
  res.send(orders1);
});
router.get("/orders/customer/:cust", function (req, res) {
  let cust = req.params.cust;
  let orders1 = orders.filter((ord) => ord.customer === cust);
  res.send(orders1);
});
router.get("/orders/product/:prod", function (req, res) {
  let { prod } = req.params;
  let orders1 = orders.filter((ord) => ord.product === prod);
  res.send(orders1);
});
router.post("/orders", function (req, res) {
  let body = req.body;
  let c1 = customers.find((cust) => cust === body.customer);
  let p1 = products.find((prod) => prod === body.product);
  let q1 = +body.quantity;
  let newOrder = {
    customer: body.customer,
    product: body.product,
    quantity: q1,
  };
  if (!q1) {
    res.status(400).send("Check the quantity");
  } else if (c1 && p1) {
    orders.push(newOrder);
    res.send(newOrder);
  } else res.status(400).send("Customer/product did not match");
});

module.exports = router;
