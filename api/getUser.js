const db = require("../db")

module.exports = async (req, res) => {
	const user = await db.getUser(req.params.email)
	res.send(user)
}
