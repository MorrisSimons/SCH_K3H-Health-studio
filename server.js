// Import dependencies
const express = require("express")
const fs = require("fs")
const sqlite3 = require("sqlite3").verbose()

//--------------------------------
// Note app in exspress is diffrent from the app folder in react
//--------------------------------

// Import our database
const db = new sqlite3.Database("db/k3h.sqlite3")

// Create a new express application named 'app'
const app = express()

// Set our backend port to be either an environment variable or port 5000
const port = process.env.PORT || 5000

// This application level middleware prints incoming requests to the servers console, useful to see incoming requests
app.use((req, res, next) => {
	console.log(`Request_Endpoint: ${req.method} ${req.url}`)
	next()
})

// This middleware informs the express application to serve our compiled React files
if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "app/build")))
}

app.get("/api/getAll", (req, res) => {
	const sql = "SELECT * FROM k3h"
	res.json({
		msg: "Get All",
		query: db.exec(sql),
	})
})

// Catch any bad requests
app.get("*", (req, res) => {
	res.status(200).json({
		msg: "Catch All",
	})
})

// Configure our server to listen on the port defiend by our port variable
app.listen(port, () => console.log(`BACK_END_SERVICE_PORT: ${port}`))
