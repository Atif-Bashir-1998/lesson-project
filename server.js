//const { response } = require('express');
const express = require('express');
const app = express();

// Define the lessons array
// app.get('/lessons', (request, response, next) => {
var lessons = [
    { topic: 'math', location: 'Hendon', price: 100 },
    { topic: 'math', location: 'Colindale', price: 80 },
    { topic: 'math', location: "Brent Cross", price: 90 },
    { topic: 'math', location: 'Golders Green', price: 120 }
];
//   response.send(lessons)
// });

app.get('/lessons', (req, res) => {
    var lessons = [
        { topic: 'math', location: 'Hendon', price: 100 },
        { topic: 'math', location: 'Colindale', price: 80 },
        { topic: 'math', location: "Brent Cross", price: 90 },
        { topic: 'math', location: 'Golders Green', price: 120 }
    ];
    res.json(lessons);
})




app.get("/user", (req, res, next) => {
    var user = { 'email': 'user@email.com', 'password': 'mypassword' };
    res.json(user);
    (user);
});

app.use(express.static("./"));

app.listen(3000, () => console.log('Server listening on port 3000'));