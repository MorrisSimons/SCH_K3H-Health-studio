const db = require("../db")

module.exports = async (req, res) => {
	const form = await db.getTable(req.params.formId)
	res.send(form)
}
