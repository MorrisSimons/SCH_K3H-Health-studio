const db = require("../db")

module.exports = async (req, res) => {
	try {
		if (!req.body.formId) return res.status(400).send("No form ID provided")
		const raw_form = await db.getColumns(req.body.formId)
		columns = []
		types = []
		//Select the contans within the ()
		console.log("DB")
		console.log(raw_form)
		selection = raw_form.sql.split("(")[1].split(")")[0]
		//Split using the , as a delimiter
		console.log("selection")
		selection = selection.split(",")
		console.log("selection")
		//
		for (let i = 0; i < selection.length; i++) {
			//Split using the space as a delimiter
			selection[i] = selection[i].split(" ")
			//Push the first element of the array to the columns array

			columns.push(selection[i][0])
			//Push the second element of the array to the types array
			types.push(selection[i][1])
		}
		console.log("columns")
		//Create a new object with the columns and types arrays
		form.fields = columns
		form.types = types
		//Send the new object

		res.send(form)
	} catch (err) {
		res.status(500).send(err)
	}
}
