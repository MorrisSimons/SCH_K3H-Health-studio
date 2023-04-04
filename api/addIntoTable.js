const db = require("../db")

module.exports = async (req, res) => {
	try {
        console.log(req.body)
		const table = {
			name: req.body.name,
			fields: req.body.fields,
		}
		const data = {
            values: req.body.data,
		}
        console.log(table)
        console.log(data)
		await db.addIntoTable(table, data)
		res.status(200).send("Table created successfully")
	}
	catch (err) {
		res.status(500).send(err)
	}



}
