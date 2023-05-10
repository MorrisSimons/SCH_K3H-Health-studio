// Initialize the SQLite database and export functions for interacting with it.
const sqlite3 = require("sqlite3").verbose()
const { text } = require("body-parser")
const fs = require("fs")
const { getEnvironmentData } = require("worker_threads")
const location = process.env.SQLITE_DB_LOCATION || "./db/k3h.sqlite3"

let db, dbAll, dbRun

// This function initializes a SQLite database.
function init() {
	// Load the dirname function from the path module and use it to extract the directory name from the location string.
	const dirName = require("path").dirname(location);
	// If the directory does not exist, create it using the mkdirSync function from the fs module.
	if (!fs.existsSync(dirName)) {
	  fs.mkdirSync(dirName, { recursive: true });
	}
	// Return a Promise that will resolve once the SQLite database has been initialized.
	return new Promise((acc, rej) => {
		// Create a new SQLite database object and attempt to open the database at the specified location.
		db = new sqlite3.Database(location, (err) => {
		// If there is an error opening the database, reject the Promise with the error object.
		if (err) return rej(err);
		// If the NODE_ENV environment variable is not set to "test", log a message to the console indicating that the SQLite database is being used.
		if (process.env.NODE_ENV !== "test") {
		  console.log(`Using sqlite database at ${location}`);
		}
		// Create a user table with columns for id, email, firstName, lastName, and accountType.
		db.run(
		  	"CREATE TABLE IF NOT EXISTS user(id varchar(36), email VARCHAR(255) primary key, firstName VARCHAR(255), lastName VARCHAR(255), accountType VARCHAR(255))",
		  	(err, result) => {
			// If there is an error creating the table, reject the Promise with the error object.
			if (err) return rej(err);
			// If the table is created successfully, resolve the Promise with no value.
			acc();
		  }
		);
		// Create a team table with columns for name and email, and a primary key on (name, email).
		db.run(
		  	"CREATE TABLE IF NOT EXISTS team(name VARCHAR(255), email VARCHAR(255), PRIMARY KEY (name, email))",
		  	(err, result) => {
			if (err) return rej(err);
				acc()
				}
			)
		})
	})
}

// This function tears down the SQLite database.
async function teardown() {
	// Return a Promise that will resolve once the SQLite database has been closed.
	return new Promise((acc, rej) => {
		// Close the SQLite database and execute the callback function when the database is closed.
		db.close((err) => {
		// If there is an error closing the database, reject the Promise with the error object.
		if (err) rej(err);
		// If the database is closed successfully, resolve the Promise with no value.
		else acc();
		});
	});
}

// This function retrieves all users from the user table in the SQLite database.
async function getUsers() {
	return new Promise((acc, rej) => {
		// Use the db.all() function to execute a SQL query that selects all rows from the user table.
		db.all("SELECT * FROM user", (err, rows) => {
		// If there is an error executing the query, reject the Promise with the error object.
		if (err) return rej(err);
		// If the query is executed successfully, map the resulting rows to a new array of user objects.
		acc(rows.map((users) => Object.assign({}, users)));
	  	});
	});
}

// This function retrieves a user from the user table in the SQLite database with a matching email address.
async function getUser(email) {
	return new Promise((acc, rej) => {
		// Use the db.all() function to execute a SQL query that selects all rows from the user table where the email column matches the given email address.
		db.all("SELECT * FROM user WHERE email=?", [email], (err, rows) => {
		if (err) return rej(err);
		acc(rows);
	  	});
	});
}

// This function adds a new user to the user table in the SQLite database.
async function addUser(user) {
	return new Promise((acc, rej) => {
		// If any required properties of the user object are missing, return a 400 Bad Request error.
		if (!user.id || !user.email || !user.firstName || !user.lastName) {
			const error = new Error("Missing required user information.");
			error.statusCode = 400;
			return rej(error);
		}
		db.run(
			"INSERT INTO user (id, email, firstName, lastName, accountType) VALUES (?, ?, ?, ?, ?)",
			[
				user.id,
				user.email,
				user.firstName,
				user.lastName,
				user.accountType || "user", // If the accountType property is not provided, default to "user".
			],
			(err) => {
				if (err) {
					console.error(err.message);
					const error = new Error("Failed to add user to database.");
					error.statusCode = 500;
					return rej(error);
				}
				acc();
			}
	  	);
	});
}

// This function removes a user from the user table in the SQLite database with a matching email address.
async function removeUser(email) {
	return new Promise((acc, rej) => {
		db.run("DELETE FROM user WHERE email = ?", [email], (err) => {
			if (err) return rej(err)
			acc()
		})
	})
}

// This function retrieves all the tables from the SQLite database.
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

// This function retrieves all the data from a table in the SQLite database.
async function getTable(tableName) {
	return new Promise((acc, rej) => {
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

// This function retrieves all the data from a table in the SQLite database.
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
			})
		}
		catch (err) {
			rej(err)
		}
	})
}

// This function retrieves all the columns from a table in the SQLite database.
async function getColumns(table) {
	return new Promise((acc, rej) => {
		// Use the db.all() function to execute a SQL query that selects all rows from the table.
		try {
			const result = db.all(
				'SELECT sql FROM sqlite_master WHERE tbl_name = ? AND type = "table"',
				[table],
				(err, rows) => {
					if (err) return rej(err)
					acc(rows)
				}
			)
		}
		// If there is an error executing the query, reject the Promise with the error object.
		catch (err) {
			rej(err)
		}
	})
}

// This function adds a new table to the SQLite database.
async function addTable(table) {
	return new Promise((acc, rej) => {
		// Use the db.run() function to execute a SQL query that inserts a new table into the database with the values from the table object.
		try {
			req_text = "CREATE TABLE IF NOT EXISTS " + table.name + " ("
			// Loop through the tabels and get the data from each one
			for (i = 0; i < table.fields.length; i++) {
				req_text += table.fields[i] + " " + table.types[i]
				// Check if the field is a primary key
				if (i != table.fields.length - 1) {
					req_text += ", "
				}
			}
			// Make an inner join between those tabels and team
			req_text += ")"
			db.exec(req_text, (err, result) => {
				if (err) return rej(err)
			})
			// If the query is executed successfully, resolve the Promise with no value.
			acc("Table created successfully")
		}
		// If there is an error executing the query, reject the Promise with the error object.
		catch (err) {
			rej(err)
		}
	})
}

// This function drops a table from the SQLite database.
async function dropTable(table) {
	return new Promise((acc, rej) => {
		// Use the db.run() function to execute a SQL query that drops a table from the database with the values from the table object.
		try {
			console.log(table)
			req_text = "DROP TABLE " + table.name
			db.exec(req_text, (err, result) => {
				if (err) return rej(err)
			})
			// If the query is executed successfully, resolve the Promise with no value.
			acc("Table dropped successfully")
		}
		// If there is an error executing the query, reject the Promise with the error object.
		catch (err) {
			rej(err)
		}
	})
}

// This function adds a new table to the SQLite database.
async function addIntoTable(table, data) {
	return new Promise((acc, rej) => {
		// Use the db.run() function to execute a SQL query that inserts a new table into the database with the values from the table object.
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
					// Note if you enter a date, we might need a check for that
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
			// If the query is executed successfully, resolve the Promise with no value.
			console.log("Data added successfully")
			acc({})
		}
		// If there is an error executing the query, reject the Promise with the error object.
		catch (err) {
			rej(err)
		}
	})
}

async function getTeamMembers(teamName, teamWhere) {
	return new Promise((acc, rej) => {
		// Use the db.all() function to execute a SQL query that selects all rows from the table.
		try {
			req_text = "SELECT * FROM user INNER JOIN team ON user.email = team.email WHERE team.name = \"" + teamName + "\" AND user.firstName LIKE \"" + teamWhere + "%\"";
			console.log(req_text)
			db.all(req_text, (err, rows) => {
				// If there is an error executing the query, reject the Promise with the error object.
				if (err) return rej(err)
				// If the query is executed successfully, resolve the Promise with an array of table objects.
				acc(rows)
			})
		}
		// If there is an error executing the query, reject the Promise with the error object.
		catch (err) {
			rej(err)
		}
	})
}

// This function retrieves all the data from a table in the SQLite database.
async function getUserType(email) {
	return new Promise((acc, rej) => {
		try {
			req_text = "SELECT accountType FROM user WHERE email = \"" + email + "\"";
			console.log(req_text)
			db.all(req_text, (err, rows) => {
				// If there is an error executing the query, reject the Promise with the error object.
				if (err) return rej(err)
				// If the query is executed successfully, resolve the Promise with an array of table objects.
				acc(rows)
			})
		}
		// If there is an error executing the query, reject the Promise with the error object.
		catch (err) {
			rej(err)
		}
	})
}

// This function retrieves all the data from a table in the SQLite database.
async function getTeam(email) {
	return new Promise((acc, rej) => {
		try {
			req_text = "SELECT * FROM team WHERE email = \"" + email + "\"";
			db.all(req_text, (err, rows) => {
				// If there is an error executing the query, reject the Promise with the error object.
				if (err) return rej(err)
				// If the query is executed successfully, resolve the Promise with an array of table objects.
				acc(rows)
			})
		}
		// If there is an error executing the query, reject the Promise with the error object.
		catch (err) {
			rej(err)
		}
	})
}

// This function retrieves all the data from a table in the SQLite database.
async function getDataWhere(table) {
	return new Promise((acc, rej) => {
		try {
			tableNames = table.names
			tableColumns = table.columns
			whereStatment = table.where
			req_text = "SELECT "
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
			// Make an inner join between those tabels and team
			req_text += " INNER JOIN team ON team.email = " + tableNames[0] + ".email"
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

// This function removes a user from the user table in the SQLite database with a matching email address.
async function removeUserFromEverything(email) {
	return new Promise((acc, rej) => {
		// Get all the tables
		db.all("SELECT name FROM sqlite_master WHERE type='table'", (err, rows) => {
			// Loop through the tables and remove the user from each one
			try {
				console.log("Rows:", rows)
				for (i = 0; i < rows.length; i++) {
					// Get the name of the table
					tableName = rows[i].name
					console.log("Removing user from table: " + tableName)
					// Remove the user from the table
					req_text = "DELETE FROM " + tableName + " WHERE email = \"" + email + "\""
					db.exec(req_text, (err, result) => {
						if (err) return rej(err)
					})
				}
				acc()
			}
			catch (err) {
				console.log(err)
				//This should really never happen, but for testing or other purposes it might
			}
		})
	})
}

// Export the functions so they can be used by other modules.
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
	removeUserFromEverything,
}
