let express = require("express");
let router = express.Router();
let users = [
  { name: "George", password: "George" },
  { name: "David", password: "David" },
  { name: "Clara", password: "Clara" },
  { name: "Steve", password: "Steve" },
  { name: "Anna", password: "Anna" },
];
let messagesData = {
  maxid: 6,
  messages: [
    { id: 1, name: "George", topic: "Javascript", title: "How to copy a JSON" },
    {
      id: 2,
      name: "David",
      topic: "React",
      title: "Error while using setState",
    },
    { id: 3, name: "Clara", topic: "Javascript", title: "How to compare NaN" },
    {
      id: 4,
      name: "George",
      topic: "Javascript",
      title: "Promises vs Async/Await",
    },
    {
      id: 5,
      name: "David",
      topic: "React",
      title: "Parameters to useEffect hook",
    },
    {
      id: 6,
      name: "Clara",
      topic: "Javascript",
      title: "Difference between let and var",
    },
  ],
};
let currentData = [];
function checkAuth(req, res, next) {
  let token = +req.header("authorization");
  if (!token) {
    res.status(401).send("Login first. No token found in Authorizaton header");
    return;
  }
  let cd1 = currentData.find((cd) => cd.token === token);
  if (!cd1) {
    res
      .status(401)
      .send(
        "Login first. Token in Authorizaton header is not valid or has expired"
      );
    return;
  }
  cd1.lastUse = Date.now();
  next();
}
router.get("/getAllTokens", function (req, res) {
  let token = req.header("authorization");
  if (token !== "masterTokenXYZ561") {
    res.status(401).send("Not Authorized");
    return;
  }
  let tokens = currentData.map((cd) => ({
    token: cd.token,
    lastUse: cd.lastUse,
  }));
  res.send(tokens);
});

router.get("/removeAllTokens", function (req, res) {
  let token = req.header("authorization");
  if (token !== "masterTokenXYZ561") {
    res.status(401).send("Not Authorized");
    return;
  }
  currentData = [];
  res.send("Tokens reset");
});

router.post("/login", function (req, res) {
  let body = req.body;
  let user = users.find(
    (u) => u.name === body.name && u.password === body.password
  );
  if (user) {
    let token = Date.now();
    let messages1 = messagesData.messages.map((m1) => ({ ...m1 }));
    currentData = currentData.filter(
      (cd) => Date.now() - cd.lastUse < 286400000
    );
    currentData.push({
      token: token,
      user: body.name,
      lastUse: token,
      messagesData: { maxid: messagesData.maxid, messages: messages1 },
    });
    res.send("" + token);
  } else res.status(401).send("Name or password does not match");
});

router.get("/messages", checkAuth, function (req, res) {
  let token = +req.header("authorization");
  let cd1 = currentData.find((cd) => cd.token === token);
  res.send(cd1.messagesData.messages);
});
router.post("/messages", function (req, res) {
  let token = +req.header("authorization");
  let cd1 = currentData.find((cd) => cd.token === token);
  let body = req.body;
  let newMsg = {
    id: cd1.messagesData.maxid + 1,
    name: cd1.user,
    topic: body.topic,
    title: body.title,
  };
  if (body.topic && body.title) {
    cd1.messagesData.maxid = cd1.messagesData.maxid + 1;
    cd1.messagesData.messages.push(newMsg);
    res.send(newMsg);
  } else res.status(400).send("Topic and title should be specified");
});

module.exports = router;
