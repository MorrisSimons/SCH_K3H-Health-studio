const db = require("../db")

module.exports = async (req, res) => {
	try {
        if (!req.body.teamEmail) {
            res.status(400).send({ message: "Invalid team email" })
            return
        }
        if (!req.body.names) {
            res.status(401).send({ message: "Invalid names" })
            return
        }
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
        tempWhere = "team.email = \"" + req.body.teamEmail + "\""

        const tables = {
            names: tempNames,
            columns: tempTables,
            where: tempWhere
        }
		res.status(200).send(await db.getDataWhere(tables))

	} catch (err) {
		res.status(500).send(err)
	}
}
