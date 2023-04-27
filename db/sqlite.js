const sqlite3 = require("sqlite3").verbose()
const { text } = require("body-parser")
const fs = require("fs")
const { getEnvironmentData } = require("worker_threads")
const location = process.env.SQLITE_DB_LOCATION || "./db/k3h.sqlite3"

let db, dbAll, dbRun

function init() {
	const dirName = require("path").dirname(location)
	if (!fs.existsSync(dirName)) {
		fs.mkdirSync(dirName, { recursive: true })
	}

	return new Promise((acc, rej) => {
		db = new sqlite3.Database(location, (err) => {
			if (err) return rej(err)

			if (process.env.NODE_ENV !== "test")
				console.log(`Using sqlite database at ${location}`)
			// Create a user table 
			db.run(
				"CREATE TABLE IF NOT EXISTS user(id varchar(36), email VARCHAR(255) primary key, firstName VARCHAR(255), lastName VARCHAR(255), accountType VARCHAR(255))",
				(err, result) => {
					if (err) return rej(err)
					acc()
				}
			)
			// Create a team 
			// Really should use a foreign key, but long story short, It would ruin more than it would help.
			db.run(
				"CREATE TABLE IF NOT EXISTS team(name VARCHAR(255), emails VARCHAR(255), PRIMARY KEY (name, emails))",
				(err, result) => {
					if (err) return rej(err)
					acc()
					}
				)
		})
	})
}

async function teardown() {
	return new Promise((acc, rej) => {
		db.close((err) => {
			if (err) rej(err)
			else acc()
		})
	})
}

async function getUsers() {
	return new Promise((acc, rej) => {
		db.all("SELECT * FROM user", (err, rows) => {
			if (err) return rej(err)
			acc(rows.map((users) => Object.assign({}, users)))
		})
	})
}

async function getUser(email) {
	return new Promise((acc, rej) => {
		db.all("SELECT * FROM user WHERE email=?", [email], (err, rows) => {
			if (err) return rej(err)
			acc(rows)
		})
	})
}

async function addUser(user) {
	return new Promise((acc, rej) => {
		if (!user.id || !user.email || !user.firstName || !user.lastName) {
			const error = new Error("Missing required user information.")
			error.statusCode = 400
			return rej(error)
		}
		db.run(
			"INSERT INTO user (id, email, firstName, lastName, accountType) VALUES (?, ?, ?, ?, ?)",
			[
				user.id,
				user.email,
				user.firstName,
				user.lastName,
				user.accountType || "user",
			],
			(err) => {
				if (err) {
					console.error(err.message) // log the specific error message
					const error = new Error("Failed to add user to database.")
					error.statusCode = 500
					return rej(error)
				}
				acc()
			}
		)
	})
}

async function removeUser(email) {
	return new Promise((acc, rej) => {
		db.run("DELETE FROM user WHERE email = ?", [email], (err) => {
			if (err) return rej(err)
			acc()
		})
	})
}

async function getTabels() {
	return new Promise((acc, rej) => {
		try {
			const result = db.all(
				'SELECT name FROM sqlite_master WHERE type="table" NOT LIKE "sqlite_%" AND name NOT LIKE "sqlite_%"',
				(err, rows) => {
					if (err) return rej(err)
					acc(rows)
				}
			)
		} catch (err) {
			rej(err)
		}
	})
}

async function getTable(tableName) {
	return new Promise((acc, rej) => {
		// Get all the data in the table provided 
		console.log("Getting table: " + tableName)
		try {
			req_text = "SELECT * FROM " + tableName
			const result = db.all(req_text, (err, rows) => {
				if (err) return rej(err)
				acc(rows)
			})
		}
		catch (err) {
			rej(err)
		}

	})
}

async function getData(table) {
	return new Promise((acc, rej) => {
		try {
			tableNames = table.names
			tableColumns = table.columns
			req_text = "SELECT "
			// Loop through the tabels and get the data from each one
			for (i = 0; i < tableColumns.length; i++) {
				req_text += tableColumns[i]
				if (i != tableColumns.length - 1) {
					req_text += ", "
				}
			}
			console.log(req_text)
			req_text += " FROM "
			for (i = 0; i < tableNames.length; i++) {
				req_text += tableNames[i]
				if (i != tableNames.length - 1) {
					req_text += ", "
				}
			}
			console.log(req_text)
			const result = db.all(req_text, (err, rows) => {
				if (err) return rej(err)
				acc(rows)
			}

			)
		} catch (err) {
			rej(err)
		}
	})
}

async function getColumns(table) {
	return new Promise((acc, rej) => {
		try {
			const result = db.all(
				'SELECT sql FROM sqlite_master WHERE tbl_name = ? AND type = "table"',
				[table],
				(err, rows) => {
					if (err) return rej(err)
					acc(rows)
				}
			)
		} catch (err) {
			rej(err)
		}
	})
}

async function addTable(table) {
	return new Promise((acc, rej) => {
		try {
			req_text = "CREATE TABLE IF NOT EXISTS " + table.name + " ("
			for (i = 0; i < table.fields.length; i++) {
				req_text += table.fields[i] + " " + table.types[i]
				if (i != table.fields.length - 1) {
					req_text += ", "
				}
			}
			req_text += ")"
			db.exec(req_text, (err, result) => {
				if (err) return rej(err)
			})
			acc("Table created successfully")
		} catch (err) {
			rej(err)
		}
	})
}

async function dropTable(table) {
	return new Promise((acc, rej) => {
		try {
			console.log(table)
			req_text = "DROP TABLE " + table.name
			db.exec(req_text, (err, result) => {
				if (err) return rej(err)
			})
			acc("Table dropped successfully")
		} catch (err) {
			rej(err)
		}
	})
}

async function addIntoTable(table, data) {
	return new Promise((acc, rej) => {
		try {
			console.log("Adding data into table " + table.name)
			req_text = "INSERT INTO " + table.name + " ("
			for (i = 0; i < table.fields.length; i++) {
				req_text += table.fields[i]
				if (i != table.fields.length - 1) {
					req_text += ", "
				}
			}
			req_text += ") VALUES ("
			for (i = 0; i < data.values.length; i++) {
				// Check if the value is a number
				if (isNaN(data.values[i])) {
					stringify = "\"" + data.values[i] + "\""
					req_text += stringify
				} else {
					//Note if you enter a date, we might need a check for that
					req_text += data.values[i]
				}
				
				if (i != data.values.length - 1) {
					req_text += ", "
				}
			}
			req_text += ")"
			console.log(req_text)
			db.exec(req_text, (err, result) => {
				if (err) return rej(err)
			})
			console.log("Data added successfully")
			acc({})
		} catch (err) {
			rej(err)
		}
	})
}

async function getTeamMembers(teamName) {
	return new Promise((acc, rej) => {
		try {
			req_text = "SELECT * FROM user INNER JOIN team ON user.email = team.emails WHERE team.name = \"" + teamName + "\"";

			db.all(req_text, (err, rows) => {
				if (err) return rej(err)
				acc(rows)
			})
		} catch (err) {
			rej(err)
		}
	})
}

async function getUserType(email) {
	return new Promise((acc, rej) => {
		try {
			req_text = "SELECT accountType FROM user WHERE email = \"" + email + "\"";
			console.log(req_text)
			db.all(req_text, (err, rows) => {
				if (err) return rej(err)
				console.log(rows)
				acc(rows)
			})
		} catch (err) {
			rej(err)
		}
	})
}

async function getTeam(email) {
	return new Promise((acc, rej) => {
		try {
			req_text = "SELECT * FROM team WHERE emails = \"" + email + "\"";
			
			db.all(req_text, (err, rows) => {
				if (err) return rej(err)
				acc(rows)
			})
		} catch (err) {
			rej(err)
		}
	})
}

async function getDataWhere(table) {
	return new Promise((acc, rej) => {
		try {
			tableNames = table.names
			tableColumns = table.columns
			whereStatment = table.where
			req_text = "SELECT "
			// Loop through the tabels and get the data from each one
			for (i = 0; i < tableColumns.length; i++) {
				req_text += tableColumns[i]
				if (i != tableColumns.length - 1) {
					req_text += ", "
				}
			}
			console.log(req_text)
			req_text += " FROM "
			for (i = 0; i < tableNames.length; i++) {
				req_text += tableNames[i]
				if (i != tableNames.length - 1) {
					req_text += ", "
				}
			}
			// Check if 
			// Make an inner join between those tabels and team
			req_text += " INNER JOIN team ON team.emails = " + tableNames[0] + ".email"

			req_text += " WHERE " + whereStatment

			console.log(req_text)
			const result = db.all(req_text, (err, rows) => {
				if (err) return rej(err)
				acc(rows)
			}

			)
		} catch (err) {
			rej(err)
		}
	})
}

module.exports = {
	init,
	teardown,
	getUsers,
	getUser,
	addUser,
	removeUser,
	getTabels,
	getTable,
	addTable,
	dropTable,
	getColumns,
	addIntoTable,
	getData,
	getTeamMembers,
	getUserType,
	getTeam,
	getDataWhere,
}
