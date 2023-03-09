const db = require("../db")

module.exports = async (req, res) => {
	await db.removeUser(req.params.email)
	res.sendStatus(200)
}
