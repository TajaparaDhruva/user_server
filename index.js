const express = require("express");

const app = express();

app.use(express.json());

const users = [
    {uid : 108568 , name : "Dhruva", att : 80 , total_sub : 15 , bouns : 20 },
    {uid : 104289 , name : "Dharmi", att : 81 , total_sub : 16 , bouns : 5 },
    {uid : 105689 , name : "Yatri", att : 79 , total_sub : 12 , bouns : 25 }
];

app.get("/users/:id", (req, res) => {
  const userId = Number(req.params.id);
  const user = users.find((u) => u.uid === userId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json(user);
});

app.post("/users", (req, res) => {
  const newUser = {
    uid: req.body.uid,
    name: req.body.name,
    att : req.body.att,
    total_sub : req.body.total_sub,
    bouns : req.body.bouns
  };

  users.push(newUser);

  res.status(201).json({
    message: "User created",
    user: newUser,
  });
});

app.put("/users/:id", (req, res) => {
  const userId = Number(req.params.id);
  const index = users.findIndex((u) => u.uid === userId);

  if (index === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  users[index] = {
    uid: req.body.uid,
    name: req.body.name,
    att : req.body.att,
    total_sub : req.body.total_sub,
    bouns : req.body.bouns
  };

  res.status(200).json({
    message: "User replaced",
    user: users[index],
  });
});


app.patch("/users/:id", (req, res) => {
  const userId = Number(req.params.id);
  const user = users.find((u) => u.uid === userId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (req.body.name) user.name = req.body.name;
  if (req.body.att) user.att = req.body.att;
  if (req.body.total_sub) user.total_sub = req.body.total_sub;
  if (req.body.bouns) user.bouns = req.body.bouns;

  res.status(200).json({
    message: "User updated",
    user,
  });
});

app.delete("/users/:id", (req, res) => {
  const userId = Number(req.params.id);
  const index = users.findIndex((u) => u.uid === userId);

  if (index === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  users.splice(index, 1);

  res.status(204).json({ message: "User deleted" }).end();
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});