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

			// Createt the user tables
			db.run("CREATE DATABASE IF NOT EXISTS k3h")
			db.run("USE k3h")
			db.run(
				"CREATE TABLE IF NOT EXISTS user (id varchar(36), email varchar(255), firstName varchar(255), lastName varchar(255), accountType varchar(255))",
				(err, result) => {
					if (err) return rej(err)
					acc()
				}
			)
			// Create the Form tabels
			db.run("CREATE DATABASE IF NOT EXISTS forms")
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

async function getForms() {
	return new Promise((acc, rej) => {
		try {
			db.run("USE forms")
			const result = db.all("SELECT TABLES", (err, rows) => {
				if (err) return err
				rows
			})
			db.run("USE k3h")
			acc(result)
		} catch (err) {
			rej(err)
		}
	})
}

async function getForm(formName) {
	return new Promise((acc, rej) => {
		try {
			db.run("USE forms")
			const result = db.all("SELECT * FROM ?", [formName], (err, rows) => {
				if (err) return err
				rows
			})
			db.run("USE k3h")
			acc(result)
		} catch (err) {
			rej(err)
		}
	})
}

async function addForm(form) {
	return new Promise((acc, rej) => {
		try {
			formName = form.name
			formFields = form.fields
			formTypes = form.types

			db.run("USE forms")
			db.run("CREATE TABLE IF NOT EXISTS ?", [formName], (err, result) => {
				if (err) return rej(err)
			})

			while (formFields.length > 0) {
				db.run(
					"ALTER TABLE ? ADD COLUMN ? ?",
					[formName, formFields.pop(), formTypes.pop()],
					(err, result) => {
						if (err) return rej(err)
					}
				)
			}
			db.run("USE k3h")
			acc()
		} catch (err) {
			rej(err)
		}
	})
}

async function removeForm(formName) {
	return new Promise((acc, rej) => {
		try {
			db.run("USE forms")
			db.run("DROP TABLE ?", [formName], (err, result) => {
				if (err) return rej(err)
			})
			db.run("USE k3h")
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
	getForms,
	getForm,
	addForm,
	removeForm,
}
