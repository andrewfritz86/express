const express = require('express')

const app = express()

app.use(express.urlencoded({extended: true}));

// PORT?? WHY??
const port =  3000


app.get("/", (req, res) => {
  res.send("hi")
})

app.get('/test', (req, res) => {
  res.send("hello world!!")
});

app.get("/better-api", (req,res) => {
  res.json({name: "pasha"})
})

app.post("/test", (req,res) =>{
  res.send("HELLSLDLSL")
})

app.get("/dog-name", (req, res) => {
  res.send(`<span>my dogs name is </span> <h1 style="color:red">Pasha </h1> <span> and he is cute </span>`)
})

app.get("/api", (req,res ) => {
  res.send("DOG NAME IS PASHA")
})

// Listening?? WTF??
app.listen(port, () => {
  console.log(`We are listening on ${port}`)
})