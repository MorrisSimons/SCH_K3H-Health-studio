const db = require("../db")
const { v4: uuid } = require("uuid")

module.exports = async (req, res) => {
	try {
		if (!req.body.email || !req.body.firstName || !req.body.lastName || !req.body.accountType) {
			res.status(400).send({ message: "Bad request" })
			return
		}
		const user = {
			id: uuid(),
			email: req.body.email,
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			accountType: req.body.accountType,
		}

		await db.addUser(user)
		res.send(user)
	} catch (err) {
		res.status(500).send(err)
	}
}
