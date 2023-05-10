const db = require("../db")

module.exports = async (req, res) => {
	if (!req.body.name || !req.body.fields || !req.body.values) {
		res.status(400).send({ message: "Bad request" })
		return
	}

	try {
		const table = {
			name: req.body.name,
			fields: req.body.fields,
		}
		const data = {
            values: req.body.values,
		}

		await db.addIntoTable(table, data)
		res.status(200).send({ message:"success" })
	}
	catch (err) {
		
		res.status(500).send(err)
	}
}
