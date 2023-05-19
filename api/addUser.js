const db = require("../db")
const { v4: uuid } = require("uuid")

module.exports = async (req, res) => {
	try {
		if (!req.body.email || !req.body.firstName || !req.body.lastName || !req.body.accountType || !req.body.teamName) {
			res.status(400).send({ message: "Bad request" })
			return
		}
		const { email, firstName, lastName, accountType } = req.body
		// Validate the email
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		if (!emailRegex.test(email)) {
			return res.status(400).json({ message: "Invalid email" })
		}
	
		// Validate the first name and last name
		const nameRegex = /^[a-zA-Z]+$/
		if (!nameRegex.test(firstName) || !nameRegex.test(lastName)) {
			return res.status(400).json({ message: "Invalid name, dont use numbers" })
		}
	
		// Validate the account type
		const allowedTypes = ["user", "admin", "coach"]
		if (!allowedTypes.includes(accountType)) {
			return res.status(400).json({ message: "Invalid account type" })
		}
		const user = {
		    id: uuid(),
		    email: req.body.email,
		    firstName: req.body.firstName,
		    lastName: req.body.lastName,
		    accountType: req.body.accountType,
		}

		const table = {
			name: "team",
			fields: ["name", "email"]
		}
		const data = {
			values: [req.body.teamName, req.body.email]
		}

		await db.addIntoTable(table, data)
		await db.addUser(user)
		res.send(user)
	} catch (err) {
		res.status(500).send(err)
	}
}
