// Import dependencies
const express = require("express")
const cors = require('cors');
const bodyParser = require("body-parser")
const db = require("./db")

// Import API components
const addUser = require("./api/addUser")
const deleteUser = require("./api/deleteUser")
const getUsers = require("./api/getUsers")

const getForms = require("./api/getForms")
const getForm = require("./api/getForm")

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
		// Configure our server to listen on the port defiend by our port variable
		app.listen(port, () => console.log(`BACK_END_SERVICE_PORT: ${port}`))
	})
	.catch((err) => {
		console.log("Failed to connect to database. Exiting...")
		console.error(err)
		process.exit(1)
	})

//Add shutdown process
const gracefulShutdown = () => {
	db.teardown()
		.catch(() => {})
		.then(() => process.exit())
}

// This application level middleware prints incoming requests to the servers console, useful to see incoming requests
app.use((req, res, next) => {
	console.log(`Request_Endpoint: ${req.method} ${req.url}`)
	next()
})

// This middleware allows cross origin requests
app.use(cors())

//handel errors for add users

  app.post('/api/addUser', (req, res) => {
	const { email, firstName, lastName, accountType } = req.body;
  
	// Validate the email
	const emailRegex = /\S+@\S+\.\S+/;
	if (!emailRegex.test(email)) {
	  return res.status(400).json({ message: 'Invalid email' });
	}
  
	// Validate the first name and last name
	const nameRegex = /^[a-zA-Z]+$/;
	if (!nameRegex.test(firstName) || !nameRegex.test(lastName)) {
	  return res.status(400).json({ message: 'Invalid name' });
	}
  
	// Validate the account type
	const allowedTypes = ['user', 'admin'];
	if (!allowedTypes.includes(accountType)) {
	  return res.status(400).json({ message: 'Invalid account type' });
	}
	addUser(email, firstName, lastName, accountType)
  });
  
//

// This middleware parses incoming requests with JSON payloads
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// This middleware informs the express application to serve our compiled React files
if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "app/build")))
}

app.get("/api/getUsers", getUsers)

app.delete("/api/deleteUser", deleteUser)
app.get("/api/getForms", getForms)
app.get("/api/getForm", getForm)

// Catch any bad requests
app.get("*", (req, res) => {
	res.status(200).json({
		msg: "Catch All",
	})
})

process.on("SIGINT", gracefulShutdown)
process.on("SIGTERM", gracefulShutdown)
process.on("SIGUSR2", gracefulShutdown)
