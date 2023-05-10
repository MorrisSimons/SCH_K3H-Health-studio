const db = require("../db")

module.exports = async (req, res) => {
	if (!req.body.formName) {
		res.status(400).send({ message: "Bad request" })
		return
	}
	try {
		const table = {
			name: req.body.formName,
		}
		await db.dropTable(table)
		res.status(200).send({ message: "success"})
	}
	catch (err) {
		res.status(500).send(err)
	}



}
