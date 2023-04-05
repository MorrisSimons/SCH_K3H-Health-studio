const db = require("../db")

module.exports = async (req, res) => {
	try {
		const table = {
			name: req.body.name,
			fields: req.body.fields,
			types: req.body.dataType,
		}
		await db.addTable(table)
		res.status(200).send({ message: "Success"})
	}
	catch (err) {
		res.status(500).send(err)
	}



}
