const { json } = require('body-parser')
const db = require('../db')

module.exports = async (req, res) => {
  try {
    email = req.body.email
    const teamInfo = await db.getTeam(email)
    const team = {
      name: teamInfo[0].name
    }
    res.send(team)
  } catch (err) {
    res.status(500).send(err)
  }
}
