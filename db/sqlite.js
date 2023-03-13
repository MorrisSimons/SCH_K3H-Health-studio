const sqlite3 = require("sqlite3").verbose()
const fs = require("fs")
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

			db.run(
				"CREATE TABLE IF NOT EXISTS user(id varchar(36), email VARCHAR(255) primary key, firstName VARCHAR(255), lastName VARCHAR(255), accountType VARCHAR(255))",
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
			acc(rows)[0]
		})
	})
}

async function addUser(user) {
	return new Promise((acc, rej) => {
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
				if (err) return rej(err)
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
				'SELECT name FROM sqlite_master WHERE type="table" NOT LIKE "sqlite_%"',
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
		try {
			const result = db.all("SELECT * FROM ?", [tableName], (err, rows) => {
				if (err) return rej(err)
				acc(rows)
			})
		} catch (err) {
			rej(err)
		}
	})
}

async function addTable(table) {
	return new Promise((acc, rej) => {
		try {
			tableName = table.name
			tableFields = table.fields
			tableTypes = table.types

			db.run("CREATE TABLE IF NOT EXISTS ?", [tableName], (err, result) => {
				if (err) return rej(err)
			})

			while (tableFields.length > 0) {
				db.run(
					"ALTER TABLE ? ADD COLUMN ? ?",
					[tableName, tableFields.pop(), tableTypes.pop()],
					(err, result) => {
						if (err) return rej(err)
					}
				)
			}

			acc()
		} catch (err) {
			rej(err)
		}
	})
}

async function removeTable(tableName) {
	return new Promise((acc, rej) => {
		try {
			db.run("DROP TABLE ?", [tableName], (err, result) => {
				if (err) return rej(err)
			})

			acc()
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
	removeTable,
}
