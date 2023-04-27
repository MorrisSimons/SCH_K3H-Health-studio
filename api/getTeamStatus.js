const { json } = require("body-parser")
const db = require("../db")

module.exports = async (req, res) => {
	try {
        teamName = req.body.teamName
		const users = await db.getTeamMembers(teamName)
        responses = []
        if (users.length != 0) {
            users.forEach(function(user) {
                response = {
                    "id": user.id,
                    "status": "active",
                    "name": user.firstName + " " + user.lastName,
                    "navigation": "/$" + user.id 
                }
                responses.push(response)
            });
        }
		res.send(responses)
	} catch (err) {
		res.status(500).send(err)
	}
}
