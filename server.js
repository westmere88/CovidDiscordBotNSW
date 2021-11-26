const express = require("express")

const server = express()

server.all("/", (req,res) => {
  res.send("Covid Bot is running!")
})

function keepAlive() {
  server.listen(3000,() => {
    console.log("Server ready")
  })
}

module.exports = keepAlive