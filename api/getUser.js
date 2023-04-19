const db = require("../db")

module.exports = async (req, res) => {
	try {
		const user = await db.getUser(req.body.email)
		res.send(user)
	} catch (err) {
		res.status(500).send(err)
	}
}
