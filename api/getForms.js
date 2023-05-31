const db = require('../db')

module.exports = async (req, res) => {
  try {
    const forms = await db.getTabels()
    res.send(forms)
  } catch (err) {
    res.status(500).send(err)
  }
}
