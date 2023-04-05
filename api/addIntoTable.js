const db = require("../db")

module.exports = async (req, res) => {
	
	try {
        console.log(req.body)
		const table = {
			name: req.body.name,
			fields: req.body.fields,
		}
		const data = {
            values: req.body.values,
		}
		console.log(table.name)
        console.log(table.fields)
        console.log(data.values)
		await db.addIntoTable(table, data)
		res.status(200).send()
	}
	catch (err) {
		
		res.status(500).send(err)
	}



}
