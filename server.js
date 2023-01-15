const { MongoClient, ObjectId } = require("mongodb");
// establish a connection with mongodb
const uri =
	"mongodb+srv://dauris-dude:dyWNzqsGVhErKgwX@cluster0.sz0fk0v.mongodb.net/?retryWrites=true&w=majority"; //uri for mongodb
var client = new MongoClient(uri);

async function connect() {
  // try to establish a connection with the mongodb
  try {
    await client.connect().then(() => console.log("connected to mongodb"));
  } catch (e) {
    console.log("error while connecting to mongodb", e);
  }
}

connect();

// defining all the functions responsible for contacting mongodb and doing database transactions
async function createOrder(order) {
	return await client.db("project").collection("orders").insertOne(order);
}

async function getLessons() {
	return client
    .db("project")
    .collection("lessons")
    .find().toArray();
}

async function updateLesson(id, space) {
	return await client
    .db("project")
    .collection("lessons")
    .updateOne({ _id: ObjectId(id) }, { $inc: { "space": -space } });
}

// setting up express server
const express = require("express");

const app = express();
app.use(express.json());

// Defining api routes
app.get("/api/lesson", async (req, res) => {
  const result = await getLessons();
  res.send({
    result,
  });
});

app.post("/api/order", async (req, res) => {
	const result = await createOrder(req.body);
  res.send({
		msg: `New order with id [${result.insertedId}] has been created successfully!`,
	});
});

app.put("/api/lesson/:id", async(req, res) => {
	const result = await updateLesson(req.params.id, req.body.space);
	res.send({
    msg: `Spaces in the lesson [id: ${req.params.id}] updated after successful order`,
  });
});

// PORT
const PORT = 3000;

// Starting the server
app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
