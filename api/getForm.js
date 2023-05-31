const db = require('../db')

module.exports = async (req, res) => {
  try {
    if (!req.body.name) return res.status(400).send('No form name provided')
    const form = await db.getTable(req.body.name)
    res.send(form)
  } catch (err) {
    res.status(500).send(err)
  }
}
