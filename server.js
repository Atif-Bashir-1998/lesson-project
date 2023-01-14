const { MongoClient } = require("mongodb");
// establish a connection with mongodb
const uri =
	"mongodb+srv://dauris-dude:dyWNzqsGVhErKgwX@cluster0.sz0fk0v.mongodb.net/?retryWrites=true&w=majority"; //uri for mongodb
const client = new MongoClient(uri);

async function connect() {
  // try to establish a connection with the mongodb
  try {
    await client.connect().then(() => console.log("connected to mongodb"));
  } catch (e) {
    console.log("error while connecting to mongodb", e);
  } finally {
    await client.close(); // if there are errors, close the client's connection to mongodb
  }
}

connect();

// get all lessons
const express = require("express");

const app = express();
app.use(express.json());

// Defining api routes
app.get("/api/lesson", (req, res) => {
  res.send({
    msg: "load all the lessons"
  });
});

app.post("/api/order", (req, res) => {
  res.send({
		msg: "create a new order",
		sentData: req.body
	});
});

app.put("/api/lesson/:id", (req, res) => {
	res.send({
    msg: `update spaces in lesson with id: {${req.params.id}}`,
    sentData: req.body,
  });
});

// PORT
const PORT = 3000;

// Starting the server
app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
