const fs = require("fs")

const writeData = (object) => {
    const appendObjectToArray = () => {
        fs.readFile("db/orders.json", "utf8", (err, data) => {
            if (err) throw err

            const jsonArray = JSON.parse(data)

            jsonArray.push(object)

            const jsonData = JSON.stringify(jsonArray, null, 2)

            fs.writeFile("db/orders.json", jsonData, (err) => {
                if (err) throw err
            })
        })
    }

    fs.access("db/orders.json", fs.constants.F_OK, (err) => {
        if (err) {
            fs.writeFile("db/orders.json", "[]", (err) => {
                if (err) throw err
                appendObjectToArray()
            })
        } else {
            appendObjectToArray()
        }
    })
}

module.exports = writeData