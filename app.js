const express = require('express')

const app = express()

app.use(express.urlencoded({extended: true}));

// PORT?? WHY??
const port =  3000


app.get("/", (req, res) => {
  res.send("hi")
})

// Listening?? WTF??
app.listen(port, () => {
  console.log(`We are listening on ${port}`)
})