const express = require('express')

const app = express()

app.use(express.urlencoded({extended: true}));
app.use(express.static('public'))

const fetch = (...args) =>
	import('node-fetch').then(({default: fetch}) => fetch(...args));


// PORT?? WHY??
const port =  4000


app.get("/server-rendered-html", async (req,res) => {
  

  //Fetch JSON from our API
  console.log("are we hitting the route?")
  const data = await fetch("http://localhost:3000/friends");
  console.log("did we hit the endpoint?", data)
  const json = await data.json()
  
  //Format it as HTML!!
  const html = json.map(person => `<li>${person.name} loves their dog ${person.dog} </li>`)


  const response = `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>HTML 5 Boilerplate</title>
      <link rel="stylesheet" href="style.css">
    </head>
    <script>console.log("hello world") </script>
    <body>
      <h1> HELLO SERVER RENDRED HTML</h1>
      <ul>
        ${html}
      </ul>
    </body>
  </html>
  `

  res.send(response);
  // Return it
})


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