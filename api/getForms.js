const db = require("../db")

module.exports = async (req, res) => {
	const forms = await db.getTabels()
	res.send(forms)
}
