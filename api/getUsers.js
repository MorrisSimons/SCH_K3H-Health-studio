const db = require('../db')

module.exports = async (req, res) => {
  try {
    const users = await db.getUsers()
    res.send(users)
  } catch (err) {
    res.status(500).send(err)
  }
}
