const db = require('../db')

module.exports = async (req, res) => {
  try {
    if (!req.body.email) return res.status(400).send({ fault: 'No email provided' })
    await db.removeUserFromEverything(req.body.email)
    res.status(200).send({ success: 'success' })
  } catch (err) {
    res.status(500).send(err)
  }
}
