const sqlite3 = require("sqlite3").verbose()
const fs = require("fs")
const location = process.env.SQLITE_DB_LOCATION || "/db/k3h.sqlite3"

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
				"CREATE TABLE IF NOT EXISTS user (id varchar(36), email varchar(255), firstName varchar(255), lastName varchar(255), accountType varchar(255))",
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
			acc(rows)
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

module.exports = {
	init,
	teardown,
	getUsers,
	getUser,
	storeUser,
	updateUser,
	removeUser,
}
