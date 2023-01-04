let express = require("express");
let router = express.Router();
let studentsData = [
  {
    id: 1,
    name: "Jack",
    course: "React",
    grade: "A",
    city: "London",
    projects: ["Employee Management Portal"],
  },
  {
    id: 2,
    name: "Tim",
    course: "Node",
    grade: "A",
    city: "Paris",
    projects: [
      "Backend Server with Express",
      "User auths with Passport",
      "Promises and Async/Await",
    ],
  },
  {
    id: 3,
    name: "Anna",
    course: "JS",
    grade: "B",
    city: "London",
    projects: ["Shopping site", "Flight ticketing"],
  },
  {
    id: 4,
    name: "Bob",
    course: "Angular",
    grade: "B",
    city: "Mumbai",
    projects: ["Employee Management Portal"],
  },
  {
    id: 5,
    name: "Mary",
    course: "React",
    grade: "A",
    city: "Tokyo",
    projects: ["Quizzing App", "School LMS"],
  },
  {
    id: 6,
    name: "Steve",
    course: "React",
    grade: "B",
    city: "London",
    projects: ["Shopping site", "Flight ticketing"],
  },
  {
    id: 7,
    name: "Kathy",
    course: "Node",
    grade: "C",
    city: "Tokyo",
    projects: [
      "Ecommerce site",
      "Backend Server with Express",
      "User auths with Passport",
      "Cars Portal with SQL and Node",
    ],
  },
  {
    id: 8,
    name: "Vivian",
    course: "Node",
    grade: "D",
    city: "Mumbai",
    projects: ["Cars Portal with SQL and Node", "Ecommerce site"],
  },
  {
    id: 9,
    name: "Edwards",
    course: "JS",
    grade: "D",
    city: "Mumbai",
    projects: ["Employee Management Portal"],
  },
  {
    id: 10,
    name: "George",
    course: "JS",
    grade: "C",
    city: "Tokyo",
    projects: [
      "Backend Server with Express",
      "User auths with Passport",
      "Promises and Async/Await",
    ],
  },
  {
    id: 11,
    name: "Sam",
    course: "Angular",
    grade: "B",
    city: "Paris",
    projects: ["Shopping site", "Flight ticketing"],
  },
  {
    id: 12,
    name: "Amy",
    course: "Angular",
    grade: "A",
    city: "Paris",
    projects: ["Employee Management Portal"],
  },
  {
    id: 13,
    name: "Jill",
    course: "JS",
    grade: "A",
    city: "Tokyo",
    projects: ["Quizzing App", "School LMS"],
  },
  {
    id: 14,
    name: "Duke",
    course: "JS",
    grade: "B",
    city: "Mumbai",
    projects: ["Shopping site", "Flight ticketing"],
  },
  {
    id: 15,
    name: "Anita",
    course: "JS",
    grade: "B",
    city: "Paris",
    projects: ["Store Management System"],
  },
  {
    id: 16,
    name: "Mike",
    course: "React",
    grade: "C",
    city: "London",
    projects: ["Employee Management Portal"],
  },
  {
    id: 17,
    name: "Teddy",
    course: "Node",
    grade: "C",
    city: "Tokyo",
    projects: [
      "Backend Server with Express",
      "User auths with Passport",
      "Promises and Async/Await",
    ],
  },
  {
    id: 18,
    name: "Charles",
    course: "JS",
    grade: "D",
    city: "Mumbai",
    projects: ["Shopping site", "Flight ticketing"],
  },
  {
    id: 19,
    name: "Bill",
    course: "Node",
    grade: "D",
    city: "London",
    projects: ["Employee Management Portal"],
  },
  {
    id: 20,
    name: "Carla",
    course: "React",
    grade: "D",
    city: "Tokyo",
    projects: ["Quizzing App", "School LMS"],
  },
  {
    id: 21,
    name: "Joanna",
    course: "Node",
    grade: "A",
    city: "Paris",
    projects: [
      "Backend Server with Express",
      "User auths with Passport",
      "Promises and Async/Await",
    ],
  },
  {
    id: 22,
    name: "Pam",
    course: "JS",
    grade: "B",
    city: "Paris",
    projects: ["Cars Portal with SQL and Node", "Ecommerce site"],
  },
  {
    id: 23,
    name: "Peter",
    course: "Angular",
    grade: "B",
    city: "Mumbai",
    projects: ["Quizzing App", "School LMS"],
  },
  {
    id: 24,
    name: "Amelia",
    course: "Angular",
    grade: "A",
    city: "Paris",
    projects: ["Employee Management Portal"],
  },
  {
    id: 25,
    name: "Jordan",
    course: "JS",
    grade: "A",
    city: "London",
    projects: ["Cars Portal with SQL and Node", "Ecommerce site"],
  },
  {
    id: 26,
    name: "Davidson",
    course: "JS",
    grade: "B",
    city: "Paris",
    projects: ["Employee Management Portal"],
  },
  {
    id: 27,
    name: "Alicia",
    course: "JS",
    grade: "B",
    city: "Mumbai",
    projects: ["Shopping site", "Flight ticketing"],
  },
  {
    id: 28,
    name: "Margaret",
    course: "React",
    grade: "C",
    city: "Tokyo",
    projects: ["Cars Portal with SQL and Node", "Ecommerce site"],
  },
  {
    id: 29,
    name: "Greg",
    course: "Node",
    grade: "C",
    city: "Tokyo",
    projects: ["Quizzing App", "School LMS"],
  },
];
let cities = ["Paris", "Tokyo", "London", "Mumbai", "New York"];
let courses = ["JS", "Node", "React", "Angular", "Python"];
let currentData = [];

router.get("/getToken", function (req, res) {
  let token = Date.now();
  let newData = studentsData.map((st) => ({ ...st }));
  currentData = currentData.filter((cd) => Date.now() - cd.lastUse < 286400000);
  currentData.push({ token: token, lastUse: token, data: [...newData] });
  res.send("" + token);
});

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

router.get("/courses", function (req, res) {
  res.send(courses);
});

router.get("/cities", function (req, res) {
  res.send(cities);
});

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
      .send("Login first. Token in Authorizaton header is not valid");
    return;
  }
  cd1.lastUse = Date.now();
  next();
}
router.get("/resetData", checkAuth, function (req, res) {
  let token = +req.header("authorization");
  let cd1 = currentData.find((cd) => cd.token === token);
  let newData = studentsData.map((st) => ({ ...st }));
  cd1.data = [...newData];
  res.send("Data successfully reset");
});

router.get("/deleteToken", checkAuth, function (req, res) {
  let token = +req.header("authorization");
  let index = currentData.findIndex((cd) => cd.token === token);
  currentData.splice(index, 1);
  res.send("Token successfully deleted");
});

router.get("/students", checkAuth, function (req, res) {
  console.log("GET /svr/students", req.query);
  let courseStr = req.query.course;
  let grade = req.query.grade;
  let token = +req.header("authorization");
  let cd1 = currentData.find((cd) => cd.token === token);
  let arr1 = cd1.data;
  if (courseStr) {
    let courseArr = courseStr.split(",");
    arr1 = arr1.filter((st) => courseArr.find((c1) => c1 === st.course));
  }
  if (grade) {
    arr1 = arr1.filter((st) => st.grade === grade);
  }
  res.send(arr1);
});

router.get("/students/:id", checkAuth, function (req, res) {
  let id = +req.params.id;
  let token = +req.header("authorization");
  let cd1 = currentData.find((cd) => cd.token === token);
  let arr1 = cd1.data;
  let student = arr1.find((st) => st.id === id);
  if (student) res.send(student);
  else res.status(404).send("No student found");
});

router.get("/students/course/:name", checkAuth, function (req, res) {
  let name = req.params.name;
  let token = +req.header("authorization");
  let cd1 = currentData.find((cd) => cd.token === token);
  let arr1 = cd1.data;
  arr1 = arr1.filter((st) => st.course === name);
  res.send(arr1);
});

router.post("/students", checkAuth, function (req, res) {
  let body = req.body;
  console.log(body);
  let maxid = studentsData.reduce(
    (acc, curr) => (curr.id >= acc ? curr.id : acc),
    0
  );
  let newid = maxid + 1;
  let newStudent = { id: newid, ...body };
  let token = +req.header("authorization");
  let cd1 = currentData.find((cd) => cd.token === token);
  let arr1 = cd1.data;
  arr1.push(newStudent);
  res.send(newStudent);
});

router.put("/students/:id", checkAuth, function (req, res) {
  let id = +req.params.id;
  let body = req.body;
  let token = +req.header("authorization");
  let cd1 = currentData.find((cd) => cd.token === token);
  let arr1 = cd1.data;
  let index = arr1.findIndex((st) => st.id === id);
  if (index >= 0) {
    let updatedStudent = { ...arr1[index], ...body };
    arr1[index] = updatedStudent;
    res.send(updatedStudent);
  } else res.status(404).send("No student found");
});

router.delete("/students/:id", checkAuth, function (req, res) {
  let id = +req.params.id;
  let token = +req.header("authorization");
  let cd1 = currentData.find((cd) => cd.token === token);
  let arr1 = cd1.data;
  let index = arr1.findIndex((st) => st.id === id);
  if (index >= 0) {
    let deletedStudent = arr1.splice(index, 1);
    res.send(deletedStudent);
  } else res.status(404).send("No student found");
});

module.exports = router;
