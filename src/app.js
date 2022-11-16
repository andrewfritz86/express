const express = require('express')
const fs = require('fs')

const app = express()
const fetch = (...args) =>
	import('node-fetch').then(({default: fetch}) => fetch(...args));

app.use(express.urlencoded({extended: true}));
app.use(express.static('public'))

// PORT?? WHY??
const port =  5000


function getPeopleJSON() {
  const raw = fs.readFileSync("./db/people.json")
  const parsed = JSON.parse(raw)
  return parsed;
}

async function getPeopleFromAPI() {
  const response = await fetch("http://localhost:3000/people")
  const json = await response.json()

  const peopleList = json.map(person => `<li> ${person.name} loves ${person.dog} </li>`)

  const baseHTML = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>App</title>
      </head>
      <body>
      <script> console.log("hello") </script>
      <ul>
        ${peopleList}
      </ul>
      </body>
    </html>
  `

  return baseHTML
}




function getIndexTemplate() {
  const peopleJSON = getPeopleJSON()
  const peopleList = peopleJSON.map(person => `<li> ${person.name} loves ${person.dog} </li>`)

  const baseHTML = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>App</title>
      </head>
      <body>
      <script> console.log("hello") </script>
      <ul>
        ${peopleList}
      </ul>
      </body>
    </html>
  `

  return baseHTML
}


app.get("/", async (req, res) => {
  const html =  await getPeopleFromAPI();
  console.log("HTML", html)
  res.send(html)
})

app.get("/foo", (req, res) => {
  res.send("hello")
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