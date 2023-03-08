// Import dependencies
const express = require("express")
const sqlite3 = require("sqlite3").verbose()

// Import API components
const controller = require("./api/controllers/controllers")

//--------------------------------
// Note app in exspress is diffrent from the app folder in react
//--------------------------------

// Import our database
const db = new sqlite3.Database("db/k3h.sqlite3", (err) => {
	if (err) {
		console.error(err.message)
	}
	console.log("Connected to the k3h database.")
})

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

app.post("/api/addUser", (req, res) => {
	const sql = "INSERT INTO user (email) VALUES (?)"
	const params = ["test2@test2.test7"]

	db.run(sql, params, function (err, result) {
		if (err) {
			res.status(400).json({ error: err.message })
			return
		}
		res.json({
			message: "success",
			data: params,
		})
	})
})

app.get("/api/getUsers", (req, res) => {
	getUsers()
		.then((users) => {
			res.json({
				message: "success",
				data: users,
			})
		})
		.catch((error) => {
			res.status(400).json({ error: error.message })
		})
})

app.get("/api/saySomething", controller.saySomething)

// Catch any bad requests
app.get("*", (req, res) => {
	res.status(200).json({
		msg: "Catch All",
	})
})

// Configure our server to listen on the port defiend by our port variable
app.listen(port, () => console.log(`BACK_END_SERVICE_PORT: ${port}`))

async function getUsers() {
	return new Promise((resolve, reject) => {
		db.all("SELECT * FROM user", (err, rows) => {
			if (err) return reject(err)
			resolve(rows)
		})
	})
}
