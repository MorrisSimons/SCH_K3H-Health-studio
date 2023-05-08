const db = require("../db")

module.exports = async (req, res) => {
	try {
		if (!req.body.email) return res.status(400).send({"fault":"No email provided"})
		console.log("Deleting user: " + req.body.email)
		await db.removeUserFromEverything(req.body.email)
		console.log("User deleted")
		res.status(200).send({"success":"User deleted"})
	} catch (err) {
		console.log(err)
		res.status(500).send(err)
	}
}
