const db = require("../db")

module.exports = async (req, res) => {
	try {
        if (!req.body.teamName || !req.body.names ) {
            res.status(400).send({ message: "Bad request" })
            return
        }
		var tempNames = []
		var tempTables = []

		// From the request body get the table names and the columns to get from each table
		for (i = 0; i < req.body.names.length; i++) {
			tempNames.push(req.body.names[i].tableName)
			tempTables.push(req.body.names[i].tableName + "." + req.body.names[i].columnName)
		}
		// Select only the distinct values in tempNames
		tempNames = [...new Set(tempNames)]
        tempWhere = "team.name = \"" + req.body.teamName + "\""

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
