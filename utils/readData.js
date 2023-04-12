const fs = require("fs")

const readData = (filePath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, "utf8", (err, data) => {
            if (err) {
                reject(err)
                return
            }

            try {
                const jsonArray = JSON.parse(data)
                resolve(jsonArray)
            } catch (err) {
                reject(err)
            }
        })
    })
}

module.exports = readData