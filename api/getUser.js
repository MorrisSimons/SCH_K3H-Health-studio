const db = require("../db")

module.exports = async (req, res) => {
	try {
		const user = await db.getUser(req.params.email)
		res.send(user)
	} catch (err) {
		res.status(500).send(err)
	}
}
