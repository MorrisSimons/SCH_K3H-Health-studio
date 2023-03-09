const db = require("../db")

module.exports = async (req, res) => {
	const users = await db.getUsers()
	res.send(users)
}
