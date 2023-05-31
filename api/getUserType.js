const db = require('../db')

module.exports = async (req, res) => {
  try {
    if (!req.body.email) {
      res.status(400).send({ Fault: 'Missing email' })
    }
    email = req.body.email
    const accountType = await db.getUserType(email)
    if (accountType.length === 0) {
      res.status(400).send({ Fault: 'No account found' })
    } else {
      res.send(accountType)
    }
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
}
