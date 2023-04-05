const db = require("../db")

module.exports = async (req, res) => {
	try {
		const table = {
			name: req.body.formName,
		}
		await db.dropTable(table)
		res.status(200).send("Table dropped successfully")
	}
	catch (err) {
		res.status(500).send(err)
	}



}
