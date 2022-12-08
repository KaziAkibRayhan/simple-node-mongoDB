const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server running yay!");
});

const users = [
  { name: "Abdul", age: 34, email: "abdul@gmail.com" },
  { name: "Babdul", age: 37, email: "babdul@gmail.com" },
  { name: "Cabdul", age: 35, email: "cabdul@gmail.com" },
];

// username DB: DBUser1
// password : RhW1rVIDsYOp5cLz

const uri =
  "mongodb+srv://DBUser1:RhW1rVIDsYOp5cLz@cluster0.mtie7a8.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  const userCollection = client.db("simpleNode").collection("users");
  const user = { name: "Balam Mia", email: "balam@gmail.com" };

  app.get("/users", async (req, res) => {
    const cursor = userCollection.find({});
    const users = await cursor.toArray();
    res.send(users);
  });

  app.post("/users", async (req, res) => {
    const user = req.body;
    const result = await userCollection.insertOne(user);
    console.log(result);
    user.id = result.insertedId;
    res.send(user);
  });
}

run().catch((err) => console.log(err));

// app.get("/users", (req, res) => {
//   if (req.query.name) {
//     const search = req.query.name;
//     const filtered = users.filter(
//       (usr) => usr.name.toLowerCase().indexOf(search) >= 0
//     );
//     res.send(filtered);
//   } else {
//     res.send(users);
//   }
// });

// app.post("/users", (req, res) => {
//   console.log("Post api called");
//   const user = req.body;
//   user.id = users.length + 1;
//   users.push(user);
//   res.send(user);
//   console.log(user);
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
