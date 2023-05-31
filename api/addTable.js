const db = require('../db')

module.exports = async (req, res) => {
  try {
    // Change to lower case
    if (!req.body.name || !req.body.fields || !req.body.dataType) {
      res.status(400).send({ message: 'Bad request' })
      return
    }

    const table = {
      name: req.body.name.toLowerCase(),
      fields: req.body.fields,
      types: req.body.dataType
    }
    await db.addTable(table)
    res.status(200).send({ message: 'Success' })
  } catch (err) {
    res.status(500).send(err)
  }
}
