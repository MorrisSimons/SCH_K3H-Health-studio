const db = require("../db")
const { v4: uuid } = require("uuid")

module.exports = async (req, res) => {
	const user = {
		id: uuid(),
		email: req.body.email,
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		accountType: req.body.accountType,
	}

	await db.addUser(user)
	res.send(user)
}
