const db = require("../db")
const { v4: uuid } = require("uuid")

module.exports = async (req, res) => {
	try {
		const table = {
			name: req.body.name,
			fields: req.body.fields,
			types: req.body.types,
		}
		await db.addTable(table)
		res.send(table)
	}
	catch (err) {
		res.status(500).send(err)
	}



}
