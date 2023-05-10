const { json } = require("body-parser")
const db = require("../db")

module.exports = async (req, res) => {
	try {
        if (!req.body.teamName) {
            res.status(400).send({ message: "Invalid team name" })
            return
        }
        teamName = req.body.teamName
        teamWhere = req.body.teamWhere
        if (!teamWhere) {
            teamWhere = "";
        }
		const users = await db.getTeamMembers(teamName, teamWhere)
        responses = []
        if (users.length != 0) {
            users.forEach(function(user) {
                response = {
                    "id": user.id,
                    "type": user.accountType,
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
