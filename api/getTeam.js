const { json } = require("body-parser")
const db = require("../db")

module.exports = async (req, res) => {
	try {
        console.log(req.body)
        email = req.body.email
		const teamInfo = await db.getTeam(email)
        const team = {
            "name": teamInfo[0].name,
        }
        console.log(team)
		res.send(team)
	} catch (err) {
        console.log(err)
		res.status(500).send(err)
	}
}
