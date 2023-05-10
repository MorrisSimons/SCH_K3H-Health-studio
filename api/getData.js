const db = require("../db")

module.exports = async (req, res) => {
	try {
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
		res.status(200).send(await db.getData(tables))

	} catch (err) {
		res.status(500).send(err)
	}
}
