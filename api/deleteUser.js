const db = require("../db")

module.exports = async (req, res) => {
	try {
		await db.removeUser(req.params.email)
		res.sendStatus(200)
	} catch (err) {
		res.status(500).send(err)
	}
}
