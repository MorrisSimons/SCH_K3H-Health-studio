const db = require("../db")

module.exports = async (req, res) => {
	try {
		console.log("Getting data from tables")
		console.log(req.body)
		console.log(req.body.names)
		console.log(req.body.names[1])
		// Make a variable for storing the names of the coloumns
		var tempNames = []

		// Make a variable for storing the names of the tables
		var tempTables = []
		// From the request body get the table names and the columns to get from each table
		for (i = 0; i < req.body.names.length; i++) {
			tempNames.push(req.body.names[i].tableName)
			tempTables.push(req.body.names[i].tableName + "." + req.body.names[i].columnName)
		}
		// Select only the distinct values in tempNames
		tempNames = [...new Set(tempNames)]

        const tables = {
            names: tempNames,
            columns: tempTables
        }
		console.log("Sending data from tables")
        console.log(tables)
		res.status(200).send(await db.getData(tables))

	} catch (err) {
		res.status(500).send(err)
	}
}
