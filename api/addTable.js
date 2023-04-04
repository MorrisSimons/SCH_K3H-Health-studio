const db = require("../db")

module.exports = async (req, res) => {
	try {
		const table = {
			name: req.body.name,
			fields: req.body.fields,
			types: req.body.types,
		}
		await db.addTable(table)
		res.status(200).send("Table created successfully")
	}
	catch (err) {
		res.status(500).send(err)
	}



}
