const db = require("../db")
const { v4: uuid } = require("uuid")

module.exports = async (req, res) => {
  try {
    
    const testData = { id: uuid() } // Create object
    // Loop thru each field in json file and add as property to testData
    for (property in req.body) {
        testData.property = req.body.property.value
    }
    
    //for (const [key, value] of Object.entries(req.body)) {
    //  testData[key] = value
    //}
    
    
    await db.addTestData(testData)
    res.send(testData)
  } catch (err) {
    res.status(500).send(err)
  }
}