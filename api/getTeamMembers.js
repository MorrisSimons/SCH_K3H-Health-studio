const db = require("../db")

module.exports = async (req, res) => {
	try {
		if (!req.body.teamName) return res.status(400).send("No team name provided")
		const form = await db.getTeamMembers(req.body.teamName, "")
		res.send(form)
	} catch (err) {
        console.log(err)
		res.status(500).send(err)
	}
}
