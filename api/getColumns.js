const db = require('../db')

module.exports = async (req, res) => {
  try {
    if (!req.body.name) return res.status(400).send('No form name provided')

    const rawForm = await db.getColumns(req.body.name)
    columns = []
    types = []
    // Take the value of sql from the json object
    const rawValue = rawForm[0].sql
    // Get the index of (
    const start = rawVvalue.indexOf('(')
    // Get the index of the last )
    const end = rawValue.lastIndexOf(')')
    // Get the substring between the two indexes
    const selection = rawValue.substring(start + 1, end)
    // Split the string using the comma as a delimiter
    const array = selection.split(',')
    for (let i = 0; i < array.length; i++) {
      // Trim the string
      array[i] = array[i].trim()
      // Split using the space as a delimiter
      array[i] = array[i].split(' ')
      // Push the first element of the array to the columns array
      if (array[i][0] === 'PRIMARY') {
        // Break the loop if the primary key is found
        break
      }
      columns.push(array[i][0])
      // Push the second element of the array to the types array
      types.push(array[i][1])
    }

    const form = {
      fields: columns,
      types
    }
    // Send the new object
    res.send(form)
  } catch (err) {
    res.status(500).send(err)
    console.log(err)
  }
}
