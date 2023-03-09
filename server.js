// Import dependencies
const express = require("express")
const db = require("./persistence")

// Import API components
const addUser = require("./api/addUser")
const deleteUser = require("./api/deleteUser")
const getUsers = require("./api/getUsers")

//--------------------------------
// Note app in exspress is diffrent from the app folder in react
//--------------------------------

// Create a new express application named 'app'
const app = express()

// Set our backend port to be either an environment variable or port 5000
const port = process.env.PORT || 5000

// Import our database
db.init()
	.then(() => {
		app.listen(port, () => console.log("Listening on port ${port}"))
	})
	.catch((err) => {
		console.error(err)
		process.exit(1)
	})

// This application level middleware prints incoming requests to the servers console, useful to see incoming requests
app.use((req, res, next) => {
	console.log(`Request_Endpoint: ${req.method} ${req.url}`)
	next()
})

// This middleware parses incoming requests with JSON payloads
app.use(express.json())

// This middleware informs the express application to serve our compiled React files
if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "app/build")))
}

app.get("/api/getUsers", getUsers)
app.post("/api/addUser", addUser)
app.delete("/api/deleteUser", deleteUser)

// Catch any bad requests
app.get("*", (req, res) => {
	res.status(200).json({
		msg: "Catch All",
	})
})

// Configure our server to listen on the port defiend by our port variable
app.listen(port, () => console.log(`BACK_END_SERVICE_PORT: ${port}`))
