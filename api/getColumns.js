const db = require("../db")

module.exports = async (req, res) => {
	try {
		if (!req.body.formId) return res.status(400).send("No form ID provided")
		const raw_form = await db.getColumns(req.body.formId)
		columns = []
		types = []
		//Select the contans within the ()
		console.log("DB1")
		console.log(raw_form)

		// Take the value of sql from the json object
		const raw_value = raw_form[0].sql
		//Get the index of (
		const start = raw_value.indexOf("(")
		//Get the index of the last )
		const end = raw_value.lastIndexOf(")")
		//Get the substring between the two indexes
		const selection = raw_value.substring(start + 1, end)
		// Split the string using the comma as a delimiter
		const array = selection.split(",")

		console.log(array)
		//
		for (let i = 0; i < array.length; i++) {
			// Trim the string
			array[i] = array[i].trim()
			//Split using the space as a delimiter
			array[i] = array[i].split(" ")
			//Push the first element of the array to the columns array

			columns.push(array[i][0])
			//Push the second element of the array to the types array
			types.push(array[i][1])
		}
		console.log("columns")

		const form = {
			fields: columns,
			types: types,
		}

		//Send the new object

		res.send(form)
	} catch (err) {
		res.status(500).send(err)
		console.log(err)
	}
}
